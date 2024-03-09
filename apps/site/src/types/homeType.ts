export interface PhotoNode {
    node: {
        mediaItemUrl: string;
    };
}

export interface Bloc1 {
    titreDuSite: string;
    descriptionDuSite: string;
    boutonPopup: string;
    photoArrierePlan: PhotoNode;
}

export interface Bloc2 {
    montresDames: PhotoNode;
    montresHomme: PhotoNode;
}

export interface Bloc3Bijoux {
    titreBijoux: string;
    descriptionBijoux: string;
    boutonBijoux: string;
    photoBijoux: PhotoNode;
}

export interface Bloc4SavoirPlus {
    titresavoirplus: string;
    descriptionEnSavoirPlus: string;
    sousTitreEnSavoirPlus: string;
    description2EnSavoirPlus: string;
    photoEnSavoirPlus: PhotoNode;
    photo2EnSavoirPlus: PhotoNode;
}

export interface Marque {
    titreMarque: string;
    descriptionMarque: string;
    boutonMarque: string;
}

export interface Bloc5MarquesDeBijoux {
    marque1: Marque;
    marque2: Marque;
    marque3: Marque;
    marque4: Marque;
}

export interface HomeChamps {
    fieldGroupName: string;
    bloc1: Bloc1;
    bloc2: Bloc2;
    bloc3Bijoux: Bloc3Bijoux;
    bloc4savoir_plus: Bloc4SavoirPlus;
    bloc5MarquesDeBijoux: Bloc5MarquesDeBijoux;
}

export interface HomePageData {
    page: {
        homeChamps: HomeChamps;
    };
}

export interface HomeQueryResult {
    data: HomePageData;
}
