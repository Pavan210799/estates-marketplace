import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import CoverImage from "../../components/ui/CoverImage";
import { SelectField, TextArea, TextField } from "../../components/ui/Fields";
import { PROPERTY_TYPES } from "../../data/content";
import { galleries, landingStills } from "../../data/media";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { isEmail, isIndianMobile, todayISO } from "../../lib/utils";

const OWNER_PERKS = ["Free valuation", "Verified buyers only", "One advisor, start to close"];

const OWNER_STILLS = [galleries.juhu[0], galleries.boat[0], galleries.jubilee[0]];

export default function SubmitPropertyPage() {
  useDocumentTitle("Submit a home");
  const { submitProperty } = useMarketplace();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    city: "",
    type: "Apartment",
    price: "",
    contactName: "",
    phone: "",
    email: "",
    note: "",
  });
  const [error, setError] = useState("");

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const price = Number(form.price.replace(/[^\d]/g, ""));
    if (!form.title.trim() || !form.city.trim() || !price) {
      setError("Add a title, city, and price.");
      return;
    }
    if (!form.contactName.trim() || !isIndianMobile(form.phone) || !isEmail(form.email)) {
      setError("Add your name, a valid Indian mobile, and email.");
      return;
    }
    const entry = submitProperty({
      id: `owner-${Date.now()}`,
      title: form.title.trim(),
      city: form.city.trim(),
      locality: form.city.trim(),
      type: form.type,
      price,
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      state: "India",
      address: `${form.city}, India`,
      agentId: "estates-desk",
      listedOn: todayISO(),
      images: galleries.ahmedabad,
      note: form.note,
    });
    navigate(`/property/${entry.id}`);
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <CoverImage src={landingStills.owners} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/85 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/35" />

      <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center lg:gap-16 lg:py-20">
        <div className="min-w-0 text-ivory">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-bright">For owners</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Your home deserves the right buyer
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-ivory/75 sm:text-base sm:leading-7">
            Share a few details. An advisor from our desk calls you within a day.
          </p>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {OWNER_PERKS.map((perk, index) => (
              <li
                key={perk}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-ink">
                  {index + 1}
                </span>
                <span className="text-sm leading-5">{perk}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
            {OWNER_STILLS.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/20">
                <CoverImage src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <form
          className="grid min-w-0 gap-5 rounded-[1.75rem] bg-ivory p-6 shadow-2xl shadow-ink/40 ring-1 ring-white/20 sm:p-8"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="font-serif text-3xl text-ink">List a home</p>
            <p className="mt-1 text-sm text-stone">Takes about a minute.</p>
          </div>
          <TextField id="title" label="Home title" value={form.title} onChange={update("title")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="city" label="City" value={form.city} onChange={update("city")} />
            <SelectField id="type" label="Type" value={form.type} onChange={update("type")}>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectField>
          </div>
          <TextField
            id="price"
            label="Asking price (INR)"
            inputMode="numeric"
            value={form.price}
            onChange={update("price")}
          />
          <TextField id="contactName" label="Your name" value={form.contactName} onChange={update("contactName")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="phone" label="Mobile" value={form.phone} onChange={update("phone")} />
            <TextField id="email" label="Email" type="email" value={form.email} onChange={update("email")} />
          </div>
          <TextArea id="note" label="Note for our desk (optional)" value={form.note} onChange={update("note")} />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full">
            Send listing
          </Button>
        </form>
      </Container>
    </section>
  );
}
