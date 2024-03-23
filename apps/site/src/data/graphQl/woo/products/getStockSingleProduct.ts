import { gql } from "@apollo/client";

export const SINGLE_PRODUCT_STOCK = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ... on SimpleProduct {
        name
        productId
        regularPrice
        salePrice
        stockQuantity
        stockStatus
        lowStockAmount
        
      }
    }
  }
`;
