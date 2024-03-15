import { gql } from "@apollo/client";
import client from "lib/utils/apollo-client";
import { PostsQueryData } from "src/types/productsCatTypes";

export const PROD_CAT_QUERY = gql`
  query {
    productCategories(first: 80) {
    nodes {
      productCategoryId
      name
      slug
      count
      image {
        mediaItemUrl
      }
    }
  }
  }
`;

export async function fetchCategories(): Promise<PostsQueryData> {
  const { data } = await client.query<PostsQueryData>({
    query: PROD_CAT_QUERY,
  });

  return data;
}