import { groq } from 'next-sanity'

export const categoriesQuery = groq`*[_type=="category"]|order(title asc){
  _id,
  title,
  "slug": slug.current
}`

export const productsQuery = groq`*[_type=="product"]|order(_createdAt desc)[0..9]{
  _id,
  title,
  price,
  "slug": slug.current,
  category->{_id, title, "slug": slug.current},
  mainImage
}`

export const contactInfoQuery = groq`*[_type=="contactinfo"][0]{
  _id,
  businessName,
  phone,
  whatsapp,
  email,
  website,
  instagram,
  address,
  city,
  country,
  location,
  maps{
    googleMapsUrl,
    wazeUrl,
    howToGetThere
  },
  bookingUrl,
  openingHours[]{
    day,
    open,
    close,
    notes
  }
}`
