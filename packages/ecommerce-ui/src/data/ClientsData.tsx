// brandsdata.tsx
// clients.data.tsx

// Définissez l'interface ClientData avec la propriété featuredImage
interface ClientData {
    id: number;
    name: string;
    slug: string;
    logo: string; // Ajoutez la propriété logo si elle n'est pas déjà présente
    featuredImage: {
        sourceUrl: string;
        alt: string;
    };
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    description: string;
    // Autres propriétés ACF si nécessaire
}

export const generateBrandsData = (clientsData: ClientData[]) => {
    // clientsData est maintenant annoté avec le type ClientData[]
    console.log(clientsData)
    // Vous pouvez mapper les données clients pour obtenir le format souhaité
    const brandsData = clientsData.map((client, index) => ({
        image: client.featuredImage.sourceUrl, // Utilisez maintenant la propriété featuredImage
        index: index + 1,
    }));

    return brandsData;
};



