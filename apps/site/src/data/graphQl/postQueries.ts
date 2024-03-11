import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
{
  posts(first: 3) {
    nodes {
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      excerpt
      date
      categories {
        nodes {
          name
          slug
        }
      }
      title
      slug
    }
  }
}
`;
