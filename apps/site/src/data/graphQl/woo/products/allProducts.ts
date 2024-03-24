import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query {
  products(where: {status: "PUBLISH"}, first: 300) {
    found
    edges {
      node {
        id
        name
        slug
        ... on SimpleProduct {
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          productId
          regularPrice
          salePrice
          stockQuantity
          stockStatus
          date
        }
      }
    }
  }
  }
`;
