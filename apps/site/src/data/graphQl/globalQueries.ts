import { gql } from "@apollo/client";

export const GLOBAL_QUERY = gql`
query GET_MENU_BY_NAME {
  paramTresSite(where: {title: "global"}) {
    nodes {
      charteGrapphique {
        logo {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;
