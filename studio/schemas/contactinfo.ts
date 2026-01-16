// ./schema/contactinfo.ts
// Ajusta la ruta si tu proyecto usa ./schemaTypes o ./schemas en lugar de ./schema

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactinfo',
  title: 'Datos de contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Nombre del negocio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({name: 'phone', title: 'Teléfono', type: 'string'}),
    defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'website', title: 'Sitio web', type: 'url'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url'}),

    defineField({
      name: 'address',
      title: 'Dirección (texto)',
      type: 'string',
      description: 'Ej: Calle 10 #43A-12, El Poblado',
    }),
    defineField({name: 'city', title: 'Ciudad', type: 'string'}),
    defineField({name: 'country', title: 'País', type: 'string', initialValue: 'Colombia'}),

    defineField({
      name: 'location',
      title: 'Ubicación (coordenadas)',
      type: 'geopoint',
      description:
        'Marca el punto exacto. Útil para abrir mapas y generar enlaces de “Cómo llegar”.',
    }),

    defineField({
      name: 'maps',
      title: 'Cómo llegar (enlaces)',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'googleMapsUrl',
          title: 'Google Maps URL',
          type: 'url',
          description:
            'Pega el link de Google Maps (ideal: link de “Compartir” del lugar).',
        }),
        defineField({
          name: 'wazeUrl',
          title: 'Waze URL',
          type: 'url',
          description:
            'Pega un link de Waze. Ej: https://waze.com/ul?ll=LAT,LNG&navigate=yes',
        }),
        defineField({
          name: 'howToGetThere',
          title: 'Indicaciones cortas',
          type: 'text',
          rows: 3,
          description:
            'Texto breve para orientar: “Frente a…”, “Segundo piso…”, “Parqueadero…”.',
        }),
      ],
    }),

    defineField({
      name: 'openingHours',
      title: 'Horario',
      type: 'array',
      of: [
        defineType({
          name: 'openingHour',
          title: 'Horario',
          type: 'object',
          fields: [
            defineField({name: 'day', title: 'Día', type: 'string'}),
            defineField({name: 'open', title: 'Abre', type: 'string'}),
            defineField({name: 'close', title: 'Cierra', type: 'string'}),
            defineField({name: 'notes', title: 'Notas', type: 'string'}),
          ],
        }),
      ],
    }),

    defineField({
      name: 'notes',
      title: 'Notas adicionales',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'businessName',
      subtitle: 'city',
    },
  },
})
