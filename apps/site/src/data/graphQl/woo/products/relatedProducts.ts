import { gql } from "@apollo/client";

export const RELATED_PRODUCTS = gql`
  query GetRelatedProducts($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      related(first: 3) {
        nodes {
          name
          ... on SimpleProduct {
            slug
            name
            productId
            regularPrice
            salePrice
            stockQuantity
            date
            stockStatus
            featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
          }
        }
      }
    }
  }
`;
