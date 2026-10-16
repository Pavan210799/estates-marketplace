import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Estates.in` : "Estates.in";
  }, [title]);
}
