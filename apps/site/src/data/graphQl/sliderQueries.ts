import { gql } from "@apollo/client";

export const SLIDERS_QUERY = gql`
 {
  sliders {
    nodes {
      title
      id
      content
      sliderChamps {
        imageFlotante {
          node {
            mediaItemUrl
          }
        }
        lienBouton
        photoSlider {
          node {
            mediaItemUrl
          }
        }
      }
    }
    edges {
      node {
        id
      }
    }
  }
}
`;
