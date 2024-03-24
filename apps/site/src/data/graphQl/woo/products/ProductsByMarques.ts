import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_MARQUE_SLUG = gql`
  query GetProductsByMarqueSlug($slug: String!, $first: Int, $after: String) {
    products(
      where: {
        taxonomyFilter: {
          filters: [
            {taxonomy: MARQUE, terms: [$slug]}
          ]
        },
        status: "PUBLISH"
      },
      first: $first,
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
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
