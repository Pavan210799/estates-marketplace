import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const PREFIX = "estates.scroll:";
const MIN_WAIT_MS = 680;
const MAX_WAIT_MS = 4000;
const USER_INPUT = ["wheel", "touchstart", "keydown", "pointerdown"];

const keyOf = (pathname, search) => `${PREFIX}${pathname}${search}`;

function read(key) {
  try {
    const y = Number(sessionStorage.getItem(key));
    return Number.isFinite(y) && y > 0 ? y : 0;
  } catch {
    return 0;
  }
}

function write(key, y) {
  try {
    sessionStorage.setItem(key, String(Math.round(y)));
  } catch {}
}

const navEntry = performance.getEntriesByType?.("navigation")?.[0];
let pendingReload =
  navEntry?.type === "reload" ? keyOf(window.location.pathname, window.location.search) : null;

function restoreTo(y, onDone) {
  const startedAt = Date.now();
  let timer;
  let finished = false;

  const stop = () => {
    if (finished) return false;
    finished = true;
    window.clearTimeout(timer);
    USER_INPUT.forEach((type) => window.removeEventListener(type, finish));
    return true;
  };

  const finish = () => {
    if (stop()) onDone();
  };

  const jump = () => window.scrollTo({ top: y, left: 0, behavior: "instant" });

  const attempt = () => {
    const elapsed = Date.now() - startedAt;
    const room = document.documentElement.scrollHeight - window.innerHeight;
    if (elapsed >= MIN_WAIT_MS && (room >= y || elapsed >= MAX_WAIT_MS)) {
      jump();
      timer = window.setTimeout(() => {
        if (Math.abs(window.scrollY - y) > 2) jump();
        finish();
      }, 350);
      return;
    }
    timer = window.setTimeout(attempt, 50);
  };

  USER_INPUT.forEach((type) => window.addEventListener(type, finish, { passive: true }));
  attempt();
  return stop;
}

export default function useRouteScrollRestoration() {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();
  const prevPathname = useRef(null);
  const restoring = useRef(pendingReload === keyOf(pathname, search));

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const key = keyOf(pathname, search);
    let lastY = window.scrollY;
    let timer;

    const save = (force = false) => {
      if (restoring.current) return;
      if (!force && lastY < 1) return;
      write(key, lastY);
    };
    const onScroll = () => {
      lastY = window.scrollY;
      if (restoring.current) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(save, 120);
    };
    const onHide = () => {
      if (restoring.current) return;
      lastY = window.scrollY;
      save(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onHide);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onHide);
      if (lastY > 0) save();
    };
  }, [pathname, search]);

  useEffect(() => {
    const key = keyOf(pathname, search);
    const previous = prevPathname.current;
    prevPathname.current = pathname;

    const startRestore = (y, after) => {
      restoring.current = true;
      const cancel = restoreTo(y, () => {
        restoring.current = false;
        after?.();
      });
      return () => {
        cancel();
        restoring.current = false;
      };
    };

    if (pendingReload === key) {
      const y = read(key);
      if (!y) {
        pendingReload = null;
        restoring.current = false;
        return undefined;
      }
      return startRestore(y, () => {
        pendingReload = null;
      });
    }

    if (previous === null || previous === pathname) return undefined;

    if (navigationType === "POP") {
      const y = read(key);
      if (y) return startRestore(y);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return undefined;
  }, [pathname, search, navigationType]);
}
