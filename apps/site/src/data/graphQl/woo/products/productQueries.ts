import { gql } from "@apollo/client";

export const SINGLE_PRODUCTS = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ... on SimpleProduct {
        slug
        name
        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
            height
            width
            file
          }
          }
        }
        productId
        regularPrice
        salePrice
        stockQuantity
        date
        catalogVisibility
        galleryImages {
          nodes {
            mediaItemUrl
          }
        }
        produitACF {
          videoProduit {
            node {
              altText
              mediaItemUrl
            }
          }
          videoPoster {
            node {
              mediaItemUrl
            }
          }
        }
        terms {
          edges {
            node {
              id
            }
          }
        }
        stockStatus
        lowStockAmount
        attributes {
          nodes {
            name
          }
        }
        description
        shortDescription
        sku
        onSale
        averageRating
      }
    }
  }
`;
