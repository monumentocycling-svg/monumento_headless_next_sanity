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
