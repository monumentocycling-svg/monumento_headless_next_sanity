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

    // ---------- Precio ----------
    defineField({
      name: "priceCop",
      title: "Precio (COP)",
      type: "number",
      description:
        "Ej: 17000. Para precios no fijos, déjalo vacío y usa priceText.",
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const d = ctx.document as any;
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
          const d = ctx.document as any;
          if (!value && d?.priceCop == null) {
            return "Define priceCop o priceText (al menos uno).";
          }
          return true;
        }),
    }),

    // ---------- Categorías ----------
    // Café: Calientes/Fríos/Métodos
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

    // Cerveza: multi-categoría
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

    // Campos extra cerveza (opcionales)
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
    // NOTA: quitamos mediaType como “campo suelto” para evitar inconsistencias.
    // El tipo se deduce por qué campo llenas:
    // - mediaImage => imagen Sanity
    // - mediaVideoUrl => video externo
    // - mediaSrc => ruta local en /public (ej: /damaAlegre.mp4)
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
        "URL pública del video (mp4/webm). Si el video está en /public, usa mediaSrc.",
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
      description:
        "Si no hay media real, este poster puede ser el placeholder. Si lo dejas vacío, se usa el default del sitio.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      section: "section",
      media: "mediaImage",
      poster: "posterImage",
    },
    prepare({ title, section, media, poster }) {
      const s =
        section === "cafes"
          ? "Cafés"
          : section === "cervezas"
            ? "Cervezas"
            : section === "reposteria"
              ? "Repostería"
              : "Otros";
      return { title, subtitle: s, media: media || poster };
    },
  },
});
