// studio/schemas/menuItem.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuItem",
  title: "Menú - Ítem",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),

    defineField({
      name: "section",
      title: "Sección",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Cafés", value: "cafes" },
          { title: "Cervezas", value: "cervezas" },
          { title: "Panadería & Repostería", value: "reposteria" },
          { title: "Otros", value: "otros" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "isActive",
      title: "Activo (visible en la web)",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 100,
    }),

    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ---------- Precio ----------
    defineField({
      name: "priceCop",
      title: "Precio (COP)",
      type: "number",
      description:
        "Ej: 17000. Para precios no fijos, déjalo vacío y usa priceText.",
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const d = ctx.document as { priceText?: string } | undefined;
          if (value == null && !d?.priceText) {
            return "Define priceCop o priceText (al menos uno).";
          }
          return true;
        }),
    }),

    defineField({
      name: "priceText",
      title: "Precio (texto)",
      type: "string",
      description: 'Ej: "Consultar" o "Desde $9.500".',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const d = ctx.document as { priceCop?: number | null } | undefined;
          if (!value && (d?.priceCop == null || d?.priceCop === undefined)) {
            return "Define priceCop o priceText (al menos uno).";
          }
          return true;
        }),
    }),

    // ---------- Categorías por sección (B1) ----------
    defineField({
      name: "coffeeCategory",
      title: "Categoría café",
      type: "string",
      options: {
        list: [
          { title: "Calientes", value: "Calientes" },
          { title: "Fríos", value: "Fríos" },
          { title: "Métodos", value: "Métodos" },
        ],
      },
      hidden: ({ document }) => document?.section !== "cafes",
    }),

    defineField({
      name: "beerCategories",
      title: "Categorías cerveza",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Refrescantes", value: "Refrescantes" },
          { title: "Saison", value: "Saison" },
          { title: "Lupuladas", value: "Lupuladas" },
          { title: "Oscuras", value: "Oscuras" },
          { title: "Belgian Strong", value: "Belgian Strong" },
          { title: "Sour", value: "Sour" },
        ],
      },
      hidden: ({ document }) => document?.section !== "cervezas",
    }),

    defineField({
      name: "foodCategory",
      title: "Categoría repostería",
      type: "string",
      options: {
        list: [
          { title: "Sal", value: "Sal" },
          { title: "Dulce", value: "Dulce" },
        ],
      },
      hidden: ({ document }) => document?.section !== "reposteria",
    }),

    defineField({
      name: "otherCategory",
      title: "Categoría otros",
      type: "string",
      options: {
        list: [
          { title: "Bebidas", value: "Bebidas" },
          { title: "Comidas", value: "Comidas" },
        ],
      },
      hidden: ({ document }) => document?.section !== "otros",
    }),

    // ---------- Campos extra cerveza ----------
    defineField({
      name: "beerStyle",
      title: "Estilo",
      type: "string",
      hidden: ({ document }) => document?.section !== "cervezas",
    }),
    defineField({
      name: "abv",
      title: "ABV",
      type: "string",
      hidden: ({ document }) => document?.section !== "cervezas",
    }),
    defineField({
      name: "ibus",
      title: "IBUs",
      type: "number",
      hidden: ({ document }) => document?.section !== "cervezas",
    }),

    // ---------- Media ----------
    defineField({
      name: "mediaImage",
      title: "Media (imagen)",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "mediaVideoUrl",
      title: "Media (video URL externa)",
      type: "url",
      description:
        "URL pública del video. Si el video está en /public, usa mediaSrc.",
    }),

    defineField({
      name: "mediaSrc",
      title: "Media (ruta local /public)",
      type: "string",
      description:
        "Ruta local desde /public. Ej: /damaAlegre.mp4 o /laValiente.webp",
    }),

    defineField({
      name: "posterImage",
      title: "Poster (opcional)",
      type: "image",
      options: { hotspot: true },
    }),

    // Legacy para evitar “Unknown fields found” en documentos viejos
    defineField({
      name: "category",
      title: "Legacy: category",
      type: "string",
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      section: "section",
      media: "mediaImage",
      poster: "posterImage",
      active: "isActive",
    },
    prepare({ title, section, media, poster, active }) {
      const s =
        section === "cafes"
          ? "Cafés"
          : section === "cervezas"
            ? "Cervezas"
            : section === "reposteria"
              ? "Repostería"
              : "Otros";
      const status = active === false ? " (INACTIVO)" : "";
      return {
        title: `${title ?? ""}${status}`,
        subtitle: s,
        media: media || poster,
      };
    },
  },
});
