import { SlidersHorizontal } from "lucide-react";
import { SORT_OPTIONS } from "../../data/content";
import { SelectField } from "../ui/Fields";

export default function ListingsToolbar({ sort, onSortChange, onOpenFilters }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <button
        type="button"
        className="btn-fx inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm ring-1 ring-sand lg:hidden"
        onClick={onOpenFilters}
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
      <div className="w-full sm:max-w-xs">
        <SelectField id="sort" label="Sort" value={sort} onChange={onSortChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
    </div>
  );
}
