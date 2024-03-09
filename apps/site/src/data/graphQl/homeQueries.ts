import { gql } from "@apollo/client";

export const HOME_QUERY = gql`
 query NewQuery {
  page(id: "/", idType: URI) {
    homeChamps {
      fieldGroupName
      bloc1 {
        titreDuSite
        descriptionDuSite
        boutonPopup
        photoArrierePlan {
          node {
            mediaItemUrl
          }
        }
      }
      bloc2 {
        montresDames {
          node {
            mediaItemUrl
          }
        }
        montresHomme {
          node {
            mediaItemUrl
          }
        }
      }
      bloc3Bijoux {
        titreBijoux
        descriptionBijoux
        boutonBijoux
        photoBijoux {
          node {
            mediaItemUrl
          }
        }
      }
      bloc4savoir_plus {
        titresavoirplus
        descriptionEnSavoirPlus
        sousTitreEnSavoirPlus
        description2EnSavoirPlus
        photoEnSavoirPlus {
          node {
            mediaItemUrl
          }
        }
        photo2EnSavoirPlus {
          node {
            mediaItemUrl
          }
        }
      }
      bloc5MarquesDeBijoux {
        marque1 {
          titreMarque1
          descriptionMarque1
          boutonMarque1
        }
        marque2 {
          titreMarque2
          descriptionMarque2
          boutonMarque2
        }
         marque3 {
          titreMarque3
          descriptionMarque3
          boutonMarque3
        }
        marque4 {
          titreMarque4
          descriptionMarque4
          boutonMarque4
        }
      }
    }
  }
}
`;
