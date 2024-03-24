
import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_SLUGS = gql`
  query GetAllProductsSlugs {
    products(where: {status: "PUBLISH"}, first: 300) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;