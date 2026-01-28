// FILE: src/app/cafe/page.tsx
import CafeClient from "./CafeClient";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source).width(1200).quality(80).auto("format").url();
}

type MenuItemDoc = {
  _id: string;
  title: string;
  section: "cafes" | "cervezas" | "reposteria" | "otros";
  order?: number;
  description?: string;

  priceCop?: number;
  priceText?: string;

  coffeeCategory?: "Calientes" | "Fríos" | "Métodos";

  beerCategories?: Array<
    | "Refrescantes"
    | "Saison"
    | "Lupuladas"
    | "Oscuras"
    | "Belgian Strong"
    | "Sour"
  >;
  beerStyle?: string;
  abv?: string;
  ibus?: number;

  mediaType?: "image" | "video";
  mediaImage?: SanityImageSource;
  mediaVideoUrl?: string;
  posterImage?: SanityImageSource;
};

export default async function CafePage() {
  const query = `*[_type == "menuItem"]|order(section asc, order asc, title asc){
    _id,
    title,
    section,
    order,
    description,
    priceCop,
    priceText,
    coffeeCategory,
    beerCategories,
    beerStyle,
    abv,
    ibus,
    mediaType,
    mediaImage,
    mediaVideoUrl,
    posterImage
  }`;

  const res = await sanityFetch({ query });
  const data = res.data as MenuItemDoc[];

  const cafes = data
    .filter((d) => d.section === "cafes")
    .map((d) => {
      const mt: "video" | "image" = d.mediaType === "video" ? "video" : "image";

      return {
        nombre: d.title,
        descripcion: d.description,
        precio: d.priceCop,
        precioTexto: d.priceText,
        categoriaCafe: d.coffeeCategory,
        mediaType: mt,
        mediaSrc:
          mt === "video"
            ? d.mediaVideoUrl
            : d.mediaImage
              ? urlFor(d.mediaImage)
              : undefined,
        posterSrc: d.posterImage ? urlFor(d.posterImage) : undefined,
      };
    });

  const cervezas = data
    .filter((d) => d.section === "cervezas")
    .map((d) => {
      const mt: "video" | "image" = d.mediaType === "video" ? "video" : "image";

      return {
        nombre: d.title,
        estilo: d.beerStyle ?? "",
        abv: d.abv ?? "",
        ibus: d.ibus ?? 0,
        descripcion: d.description ?? "",
        precio: d.priceCop ?? 0,
        categorias: d.beerCategories ?? [],
        mediaType: mt,
        mediaSrc:
          mt === "video"
            ? d.mediaVideoUrl
            : d.mediaImage
              ? urlFor(d.mediaImage)
              : undefined,
        posterSrc: d.posterImage ? urlFor(d.posterImage) : undefined,
      };
    });

  const reposteria = data
    .filter((d) => d.section === "reposteria")
    .map((d) => {
      const mt: "video" | "image" = d.mediaType === "video" ? "video" : "image";

      return {
        nombre: d.title,
        descripcion: d.description,
        precio: d.priceCop,
        precioTexto: d.priceText,
        mediaType: mt,
        mediaSrc:
          mt === "video"
            ? d.mediaVideoUrl
            : d.mediaImage
              ? urlFor(d.mediaImage)
              : undefined,
        posterSrc: d.posterImage ? urlFor(d.posterImage) : undefined,
      };
    });

  const otros = data
    .filter((d) => d.section === "otros")
    .map((d) => {
      const mt: "video" | "image" = d.mediaType === "video" ? "video" : "image";

      return {
        nombre: d.title,
        descripcion: d.description,
        precio: d.priceCop,
        precioTexto: d.priceText,
        mediaType: mt,
        mediaSrc:
          mt === "video"
            ? d.mediaVideoUrl
            : d.mediaImage
              ? urlFor(d.mediaImage)
              : undefined,
        posterSrc: d.posterImage ? urlFor(d.posterImage) : undefined,
      };
    });

  return (
    <CafeClient
      cafes={cafes}
      cervezas={cervezas}
      reposteria={reposteria}
      otros={otros}
    />
  );
}
