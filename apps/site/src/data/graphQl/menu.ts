import { gql } from "@apollo/client";
import client from "lib/utils/apollo-client";

export const MENU_QUERY = async () => {
    const { data } = await client.query({
        query: gql`
      query GET_MENU_BY_NAME {
        menu(id: "Main-nav", idType: NAME) {
          count
          id
          menuItems(first: 100) {
            nodes {
              id
              cssClasses
              path
              label
              parentId
            }
          }
        }
      }
    `,
    });
    return data.menu.menuItems.nodes;
};