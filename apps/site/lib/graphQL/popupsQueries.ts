import { gql } from "@apollo/client";

export const POPUPS_QUERY = gql`
  {
    popupsAcf {
      nodes {
        id
        title
        date
        popupChamps {
          dateDeFin
          dateDebut
          fieldGroupName
          imagePopup {
            node {
              id
              desiredSlug
              link
              mediaItemUrl
              mediaType
              mediaDetails {
                height
                width
                file
              }
            }
          }
          popupActive
          cookiesAfficheLaPopupUneFoisParJour
        }
      }
    }
  }
`;
