// Dans votre fichier ProductsByCatIDQueries.ts
import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
 query GetProductsByCategoryId($categoryId: Int!, $first: Int, $after: String) {
  products(where: {categoryId: $categoryId}, first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    found
    nodes {
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
      }
    }
  }
}
`;
