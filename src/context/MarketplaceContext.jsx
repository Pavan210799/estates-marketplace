import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PROPERTIES } from "../data/properties";
import { readStorage, writeStorage, todayISO } from "../lib/utils";
import { useAuth } from "./AuthContext";

const MarketplaceContext = createContext(null);

const SUBMIT_KEY = "estates.submissions";
const WISH_STORE = "estates.wishlist.byUser";
const COMPARE_STORE = "estates.compare.byUser";
const LEGACY_WISH = "estates.wishlist";
const LEGACY_COMPARE = "estates.compare";

function accountId(email) {
  return email.trim().toLowerCase();
}

function readUserList(storeKey, legacyKey, email) {
  if (!email) return [];
  const id = accountId(email);
  const store = readStorage(storeKey, {});
  if (Array.isArray(store[id])) return store[id];

  const legacy = readStorage(legacyKey, []);
  if (legacy.length) {
    store[id] = legacy;
    writeStorage(storeKey, store);
    localStorage.removeItem(legacyKey);
    return legacy;
  }
  return [];
}

function writeUserList(storeKey, email, list) {
  if (!email) return;
  const id = accountId(email);
  const store = readStorage(storeKey, {});
  store[id] = list;
  writeStorage(storeKey, store);
}

export function MarketplaceProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email ?? null;
  const activeAccount = useRef(null);

  const [wishlist, setWishlist] = useState([]);
  const [compare, setCompare] = useState([]);
  const [submissions, setSubmissions] = useState(() => readStorage(SUBMIT_KEY, []));
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(0);
  const wishlistSnapshot = useRef([]);
  const compareSnapshot = useRef([]);

  useEffect(() => {
    wishlistSnapshot.current = wishlist;
    compareSnapshot.current = compare;
  }, [wishlist, compare]);

  useEffect(() => {
    const next = email ? accountId(email) : null;
    const prev = activeAccount.current;

    if (prev && prev !== next) {
      writeUserList(WISH_STORE, prev, wishlistSnapshot.current);
      writeUserList(COMPARE_STORE, prev, compareSnapshot.current);
    }

    activeAccount.current = next;

    if (email) {
      setWishlist(readUserList(WISH_STORE, LEGACY_WISH, email));
      setCompare(readUserList(COMPARE_STORE, LEGACY_COMPARE, email));
    } else {
      setWishlist([]);
      setCompare([]);
    }
  }, [email]);

  const persistWishlist = useCallback(
    (next) => {
      if (email) writeUserList(WISH_STORE, email, next);
    },
    [email],
  );

  const persistCompare = useCallback(
    (next) => {
      if (email) writeUserList(COMPARE_STORE, email, next);
    },
    [email],
  );

  const pushToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const toggleWishlist = useCallback(
    (id) => {
      setWishlist((current) => {
        const next = current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id];
        persistWishlist(next);
        pushToast(current.includes(id) ? "Removed from saved homes" : "Saved to wishlist");
        return next;
      });
    },
    [persistWishlist, pushToast],
  );

  const toggleCompare = useCallback(
    (id) => {
      setCompare((current) => {
        if (current.includes(id)) {
          const next = current.filter((item) => item !== id);
          persistCompare(next);
          pushToast("Removed from compare");
          return next;
        }
        if (current.length >= 3) {
          pushToast("Compare up to three homes at a time");
          return current;
        }
        const next = [...current, id];
        persistCompare(next);
        pushToast("Added to compare");
        return next;
      });
    },
    [persistCompare, pushToast],
  );

  const submitProperty = useCallback(
    (payload) => {
      const entry = {
        id: `sub-${Date.now()}`,
        listedOn: todayISO(),
        status: "For Sale",
        featured: false,
        images: payload.images?.length ? payload.images : PROPERTIES[0].images,
        amenities: ["Owner submitted"],
        highlights: [],
        nearby: [],
        description: payload.note || "Submitted by owner via Estates.in.",
        ...payload,
      };
      setSubmissions((current) => {
        const next = [entry, ...current];
        writeStorage(SUBMIT_KEY, next);
        return next;
      });
      pushToast("Listing received — our desk will call you shortly");
      return entry;
    },
    [pushToast],
  );

  const removeFromWishlist = useCallback(
    (id) => {
      setWishlist((current) => {
        const next = current.filter((item) => item !== id);
        persistWishlist(next);
        return next;
      });
      pushToast("Removed from saved homes");
    },
    [persistWishlist, pushToast],
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    persistWishlist([]);
    pushToast("Wishlist cleared");
  }, [persistWishlist, pushToast]);

  const removeFromCompare = useCallback(
    (id) => {
      setCompare((current) => {
        const next = current.filter((item) => item !== id);
        persistCompare(next);
        return next;
      });
      pushToast("Removed from compare");
    },
    [persistCompare, pushToast],
  );

  const clearCompare = useCallback(() => {
    setCompare([]);
    persistCompare([]);
    pushToast("Comparison cleared");
  }, [persistCompare, pushToast]);

  const deleteSubmission = useCallback(
    (id) => {
      setSubmissions((current) => {
        const next = current.filter((item) => item.id !== id);
        writeStorage(SUBMIT_KEY, next);
        return next;
      });
      setWishlist((current) => {
        const next = current.filter((item) => item !== id);
        persistWishlist(next);
        return next;
      });
      setCompare((current) => {
        const next = current.filter((item) => item !== id);
        persistCompare(next);
        return next;
      });
      pushToast("Your listing was deleted");
    },
    [persistCompare, persistWishlist, pushToast],
  );

  const properties = useMemo(() => [...submissions, ...PROPERTIES], [submissions]);
  const ownIds = useMemo(() => new Set(submissions.map((item) => item.id)), [submissions]);

  const value = useMemo(
    () => ({
      properties,
      wishlist,
      compare,
      submissions,
      toast,
      isWishlisted: (id) => wishlist.includes(id),
      isCompared: (id) => compare.includes(id),
      isOwnListing: (id) => ownIds.has(id),
      toggleWishlist,
      toggleCompare,
      removeFromWishlist,
      clearWishlist,
      removeFromCompare,
      clearCompare,
      submitProperty,
      deleteSubmission,
      clearToast: () => setToast(null),
    }),
    [
      properties,
      wishlist,
      compare,
      submissions,
      toast,
      ownIds,
      toggleWishlist,
      toggleCompare,
      removeFromWishlist,
      clearWishlist,
      removeFromCompare,
      clearCompare,
      submitProperty,
      deleteSubmission,
    ],
  );

  return (
    <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error("useMarketplace must be used within MarketplaceProvider");
  return context;
}
