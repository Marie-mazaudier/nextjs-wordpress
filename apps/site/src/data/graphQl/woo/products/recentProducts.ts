import { gql } from "@apollo/client";

// Mise à jour du fragment pour inclure salePrice, regularPrice, et image
const PRODUCT_DETAILS_FRAGMENT = gql`
  fragment ProductDetails on SimpleProduct {
    id
    name
    salePrice
    regularPrice
    image {
      mediaItemUrl
    }
    slug
  }
`;

// Mise à jour de la requête pour les bijoux d'occasion à Saint-Tropez
export const GET_RECENT_JEWELRY_QUERY = gql`
  ${PRODUCT_DETAILS_FRAGMENT}
  query GetRecentJewelry {
    products(
      first: 6
      where: { taxonomyFilter: { filters: { terms: "bijoux-occasion-saint-tropez", taxonomy: PRODUCT_CAT } } }
    ) {
      nodes {
        ...ProductDetails
      }
    }
  }
`;

// Mise à jour de la requête pour les montres d'occasion à Saint-Tropez
export const GET_RECENT_WATCHES_QUERY = gql`
  ${PRODUCT_DETAILS_FRAGMENT}
  query GetRecentWatches {
    products(
      first: 6
      where: { taxonomyFilter: { filters: { terms: "montres-doccasion-saint-tropez", taxonomy: PRODUCT_CAT } } }
    ) {
      nodes {
        ...ProductDetails
      }
    }
  }
`;
