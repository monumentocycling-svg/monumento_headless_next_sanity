export const MENU_ITEMS_QUERY = /* groq */ `
*[_type == "menuItem" && (isActive != false)] | order(section asc, order asc, title asc) {
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

  mediaSrc,
  mediaVideoUrl,

  "mediaImageUrl": mediaImage.asset->url,
  "posterImageUrl": posterImage.asset->url
}
`;
