export interface PopupMediaDetails {
    height: number;
    width: number;
    file: string;
}

export interface PopupMediaNode {
    id: string;
    desiredSlug?: string;
    link: string;
    mediaItemUrl: string;
    mediaType: string;
    mediaDetails: PopupMediaDetails;
}

interface PopupChamps {
    dateDeFin: string;
    dateDebut: string;
    fieldGroupName: string;
    imagePopup: {
        node: {
            id: string;
            desiredSlug: string;
            link: string;
            mediaItemUrl: string;
            mediaType: string;
            mediaDetails: {
                height: number;
                width: number;
                file: string;
            };
        };
    };
    popupActive: boolean;
    cookiesAfficheLaPopupUneFoisParJour: boolean;
}

export interface PopupNode {
    id: string;
    title: string;
    date: string;
    popupChamps: PopupChamps;
}

export interface PopupsData {
    popupsAcf: {
        nodes: PopupNode[];
    };
}
interface PopupNodeWithChamps extends PopupNode {
    popupChamps: PopupChamps;
}