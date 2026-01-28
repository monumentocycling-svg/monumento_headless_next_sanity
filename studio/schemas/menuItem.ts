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
    }),

    defineField({
      name: "priceText",
      title: "Precio (texto)",
      type: "string",
      description: 'Ej: "Consultar" o "Desde $9.500".',
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

    // Cerveza: Refrescantes/Saison/Lupuladas/Oscuras/Belgian Strong/Sour
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
    defineField({
      name: "mediaType",
      title: "Media tipo",
      type: "string",
      options: {
        list: [
          { title: "Imagen", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),

    defineField({
      name: "mediaImage",
      title: "Media (imagen)",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== "image",
    }),

    defineField({
      name: "mediaVideoUrl",
      title: "Media (video URL)",
      type: "url",
      description:
        "URL pública del video (mp4/webm). Por ahora úsalo como enlace directo; más adelante podemos subir a CDN.",
      hidden: ({ document }) => document?.mediaType !== "video",
    }),

    defineField({
      name: "posterImage",
      title: "Poster (opcional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Si no hay media real, este poster puede ser el placeholder específico del ítem. Si lo dejas vacío, se usa /video-poster.webp.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      section: "section",
      media: "mediaImage",
    },
    prepare({ title, section }) {
      const s =
        section === "cafes"
          ? "Cafés"
          : section === "cervezas"
            ? "Cervezas"
            : section === "reposteria"
              ? "Repostería"
              : "Otros";
      return { title, subtitle: s };
    },
  },
});
