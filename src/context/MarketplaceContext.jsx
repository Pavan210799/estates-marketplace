import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { PROPERTIES } from "../data/properties";
import { readStorage, writeStorage, todayISO } from "../lib/utils";

const MarketplaceContext = createContext(null);

const WISH_KEY = "estates.wishlist";
const COMPARE_KEY = "estates.compare";
const SUBMIT_KEY = "estates.submissions";

export function MarketplaceProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStorage(WISH_KEY, []));
  const [compare, setCompare] = useState(() => readStorage(COMPARE_KEY, []));
  const [submissions, setSubmissions] = useState(() => readStorage(SUBMIT_KEY, []));
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(0);

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
        writeStorage(WISH_KEY, next);
        pushToast(current.includes(id) ? "Removed from saved homes" : "Saved to wishlist");
        return next;
      });
    },
    [pushToast],
  );

  const toggleCompare = useCallback(
    (id) => {
      setCompare((current) => {
        if (current.includes(id)) {
          const next = current.filter((item) => item !== id);
          writeStorage(COMPARE_KEY, next);
          pushToast("Removed from compare");
          return next;
        }
        if (current.length >= 3) {
          pushToast("Compare up to three homes at a time");
          return current;
        }
        const next = [...current, id];
        writeStorage(COMPARE_KEY, next);
        pushToast("Added to compare");
        return next;
      });
    },
    [pushToast],
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
        writeStorage(WISH_KEY, next);
        return next;
      });
      pushToast("Removed from saved homes");
    },
    [pushToast],
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    writeStorage(WISH_KEY, []);
    pushToast("Wishlist cleared");
  }, [pushToast]);

  const removeFromCompare = useCallback(
    (id) => {
      setCompare((current) => {
        const next = current.filter((item) => item !== id);
        writeStorage(COMPARE_KEY, next);
        return next;
      });
      pushToast("Removed from compare");
    },
    [pushToast],
  );

  const clearCompare = useCallback(() => {
    setCompare([]);
    writeStorage(COMPARE_KEY, []);
    pushToast("Comparison cleared");
  }, [pushToast]);

  const deleteSubmission = useCallback(
    (id) => {
      setSubmissions((current) => {
        const next = current.filter((item) => item.id !== id);
        writeStorage(SUBMIT_KEY, next);
        return next;
      });
      setWishlist((current) => {
        const next = current.filter((item) => item !== id);
        writeStorage(WISH_KEY, next);
        return next;
      });
      setCompare((current) => {
        const next = current.filter((item) => item !== id);
        writeStorage(COMPARE_KEY, next);
        return next;
      });
      pushToast("Your listing was deleted");
    },
    [pushToast],
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
