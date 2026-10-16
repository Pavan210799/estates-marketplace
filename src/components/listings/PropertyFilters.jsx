import { useState } from "react";
import {
  BED_OPTIONS,
  FURNISHING,
  PROPERTY_TYPES,
  budgetOptions,
} from "../../data/content";
import Button from "../ui/Button";
import { SelectField, TextField } from "../ui/Fields";

export default function PropertyFilters({
  values,
  cities,
  onChange,
  onClear,
  idPrefix = "filter",
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const budgets = budgetOptions(values.status);
  const fieldId = (name) => `${idPrefix}-${name}`;

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField
        id={fieldId("q")}
        label="Search"
        placeholder="City or locality"
        value={values.q}
        onChange={(event) => onChange({ q: event.target.value })}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id={fieldId("city")}
          label="City"
          value={values.city}
          onChange={(event) => onChange({ city: event.target.value })}
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </SelectField>
        <SelectField
          id={fieldId("status")}
          label="Buy or rent"
          value={values.status}
          onChange={(event) => onChange({ status: event.target.value })}
        >
          <option value="">Either</option>
          <option value="For Sale">Buy</option>
          <option value="For Rent">Rent</option>
        </SelectField>
      </div>
      <SelectField
        id={fieldId("budget")}
        label="Budget"
        value={values.status ? values.budget : ""}
        disabled={!values.status}
        onChange={(event) => onChange({ budget: event.target.value })}
      >
        <option value="">{values.status ? "Any budget" : "Select buy or rent first"}</option>
        {budgets.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.label}
          </option>
        ))}
      </SelectField>

      <button
        type="button"
        className="text-left text-sm font-medium text-forest"
        onClick={() => setMoreOpen((open) => !open)}
        aria-expanded={moreOpen}
      >
        {moreOpen ? "Fewer filters" : "More filters"}
      </button>

      {moreOpen ? (
        <div className="grid gap-5 border-t border-sand pt-5 sm:grid-cols-2">
          <SelectField
            id={fieldId("type")}
            label="Type"
            value={values.type}
            onChange={(event) => onChange({ type: event.target.value })}
          >
            <option value="">All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
          <SelectField
            id={fieldId("beds")}
            label="Bedrooms"
            value={values.beds}
            onChange={(event) => onChange({ beds: event.target.value })}
          >
            <option value="">Any</option>
            {BED_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <SelectField
            id={fieldId("furnishing")}
            label="Furnishing"
            value={values.furnishing}
            onChange={(event) => onChange({ furnishing: event.target.value })}
            className="sm:col-span-2"
          >
            <option value="">Any</option>
            {FURNISHING.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
        </div>
      ) : null}

      <Button type="button" variant="ghost" className="w-full" onClick={onClear}>
        Clear all
      </Button>
    </form>
  );
}
