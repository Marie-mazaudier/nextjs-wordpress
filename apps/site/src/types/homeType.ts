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

export interface Marque1 {
    titreMarque1: string;
    descriptionMarque1: string;
    boutonMarque1: string;
}
export interface Marque2 {
    titreMarque2: string;
    descriptionMarque2: string;
    boutonMarque2: string;
}
export interface Marque3 {
    titreMarque3: string;
    descriptionMarque3: string;
    boutonMarque3: string;
}
export interface Marque4 {
    titreMarque4: string;
    descriptionMarque4: string;
    boutonMarque4: string;
}
export interface Bloc5MarquesDeBijoux {
    marque1: Marque1;
    marque2: Marque2;
    marque3: Marque3;
    marque4: Marque4;
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
