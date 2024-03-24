import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
{
  posts(where: {status: PUBLISH},first: 3) {
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
