import { gql } from "@apollo/client";
import client from "lib/utils/apollo-client";
import { PostsQueryData } from "src/types/productsCatTypes";

export const PROD_MARQUES_QUERY = gql`
  query {
  marquesProducts(first: 80) {
    nodes {
      id
      marqueId
        name
      slug
      count
    }
  }
}
`;