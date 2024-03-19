
// Dans votre fichier ProductsByCatIDQueries.ts
import { gql } from "@apollo/client";

export const GET_PRODUCTS_STOCK = gql`
query GetProductsStock($perPage: Int!, $after: String) {
  products(where: {stockStatus: IN_STOCK},first: $perPage, after: $after) {
   edges {
      cursor
      node {
        ... on SimpleProduct {
          name
          stockQuantity
          productId
        }
      }
    }
    pageInfo {
      startCursor
      hasPreviousPage
      hasNextPage
      endCursor
    }
  }
}
`;

