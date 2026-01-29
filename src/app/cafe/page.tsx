// src/app/cafe/page.tsx
import CafeClient from "./CafeClient";
import { sanityClient } from "@/lib/sanityClient";

// ISR: evita “snapshot vacío” en producción y actualiza el contenido
//export const revalidate = 60;
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type MenuItem = {
  _id: string;
  title: string;
  section: "cafes" | "cervezas" | "reposteria" | "otros";
  order?: number;
  description?: string;
  priceCop?: number;
  priceText?: string;

  // cervezas
  beerStyle?: string;
  abv?: string;
  ibus?: number;

  // categorías normalizadas
  category?: string; // café: Calientes/Fríos/Métodos
  categories?: string[]; // cerveza: multi-categoría

  // media
  mediaSrc?: string;
  mediaVideoUrl?: string;
  mediaImageUrl?: string;
  posterUrl?: string;
};

const MENU_QUERY = /* groq */ `
*[
  _type == "menuItem"
  && (isActive != false)
]{
  _id,
  title,
  section,
  order,
  description,
  priceCop,
  priceText,

  // cerveza
  beerStyle,
  abv,
  ibus,

  // NORMALIZACIÓN:
  "category": coalesce(coffeeCategory, category),

  // - Para cervezas: categories intenta beerCategories; si no, tags; si no, [category]
  "categories": coalesce(beerCategories, tags, select(defined(category) => [category], [])),

  // media
  mediaSrc,
  mediaVideoUrl,
  "mediaImageUrl": mediaImage.asset->url,
  "posterUrl": posterImage.asset->url
}
| order(section asc, order asc, title asc)
`;

export default async function CafePage() {
  const items: MenuItem[] = await sanityClient.fetch(MENU_QUERY);

  const cafes = items.filter((i) => i.section === "cafes");
  const cervezas = items.filter((i) => i.section === "cervezas");
  const reposteria = items.filter((i) => i.section === "reposteria");
  const otros = items.filter((i) => i.section === "otros");

  return (
    <CafeClient
      cafes={cafes}
      cervezas={cervezas}
      reposteria={reposteria}
      otros={otros}
    />
  );
}
