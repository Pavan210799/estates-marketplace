import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingsFilterSheet from "../../components/listings/ListingsFilterSheet";
import ListingsToolbar from "../../components/listings/ListingsToolbar";
import Pagination from "../../components/listings/Pagination";
import PropertyGrid from "../../components/listings/PropertyGrid";
import PropertyFilters from "../../components/listings/PropertyFilters";
import { readFilters } from "../../components/listings/readFilters";
import Container from "../../components/ui/Container";
import CoverImage from "../../components/ui/CoverImage";
import { landingStills } from "../../data/media";
import { orderedCities } from "../../data/content";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { PAGE_SIZE, filterProperties, sortProperties } from "../../lib/filters";

export default function ListingsPage() {
  useDocumentTitle("Residences");
  const { properties } = useMarketplace();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = readFilters(params);
  const cities = orderedCities(properties);
  const filtered = sortProperties(filterProperties(properties, query), query.sort);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const resultsRef = useRef(null);
  const previousPage = useRef(page);

  useEffect(() => {
    if (previousPage.current === page) return;
    previousPage.current = page;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  useEffect(() => {
    if (!filtersOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [filtersOpen]);

  function update(partial) {
    const next = new URLSearchParams(params);
    const merged = { ...query, ...partial };
    if (partial.status !== undefined && partial.status !== query.status) {
      merged.budget = "";
    }
    if (!("page" in partial)) merged.page = 1;

    Object.entries(merged).forEach(([key, value]) => {
      const empty =
        value === "" ||
        value == null ||
        (key === "page" && Number(value) <= 1) ||
        (key === "sort" && value === "recommended");
      if (empty) next.delete(key);
      else next.set(key, String(value));
    });
    setParams(next, { replace: true });
  }

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
    setFiltersOpen(false);
  }

  const filterProps = {
    values: query,
    cities,
    onChange: (partial) => update(partial),
    onClear: clearFilters,
  };

  return (
    <>
      <div className="relative isolate min-h-[240px] overflow-hidden bg-ink sm:min-h-[280px]">
        <CoverImage src={landingStills.listingsBanner} alt="" fill className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <Container className="relative flex min-h-[240px] flex-col justify-center py-10 sm:min-h-[280px]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-bright">Residences</p>
          <h1 className="mt-3 font-serif text-4xl text-ivory sm:text-6xl">The collection</h1>
          <p className="mt-3 max-w-xl text-sm text-ivory/80">
            {filtered.length} homes across India
            {query.city ? ` · ${query.city}` : ""}
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 rounded-[1.75rem] bg-white p-6 ring-1 ring-sand">
              <h2 className="mb-5 font-serif text-3xl">Filters</h2>
              <PropertyFilters {...filterProps} idPrefix="desk" />
            </div>
          </aside>

          <div ref={resultsRef} className="min-w-0 flex-1 scroll-mt-24">
            <ListingsToolbar
              sort={query.sort}
              onSortChange={(event) => update({ sort: event.target.value, page: 1 })}
              onOpenFilters={() => setFiltersOpen(true)}
            />
            {query.sort.startsWith("price") && !query.status ? (
              <p className="mt-4 text-xs text-stone">
                Choose buy or rent for clearer price sorting.
              </p>
            ) : null}

            {visible.length ? (
              <div className="mt-6">
                <PropertyGrid
                  properties={visible}
                  columns={2}
                  priorityCount={2}
                  cardProps={{ allowDelete: true }}
                />
              </div>
            ) : (
              <div className="mt-6 rounded-[1.75rem] bg-white px-6 py-16 text-center ring-1 ring-sand">
                <h2 className="font-serif text-3xl">No matches</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-stone">Try clearing filters or another city.</p>
                <button type="button" className="page-btn mt-8" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}

            <Pagination page={page} pageCount={pageCount} onPage={(next) => update({ page: next })} />
            {filtered.length > 0 ? (
              <p className="mt-4 text-center text-xs text-stone">
                {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
            ) : null}
          </div>
        </div>

        <ListingsFilterSheet
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filterProps={filterProps}
        />
      </Container>
    </>
  );
}
