import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // Vérifier le secret pour sécuriser l'accès
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
        return res.status(401).json({ message: "Accès non autorisé" });
    }

    // Extraire les pages de la requête, supposant que 'pages' est une chaîne de caractères
    // avec des chemins séparés par des virgules, par exemple "page1,page2,page3"
    const pages = req.query.pages as string;

    if (!pages) {
        return res.status(400).json({ message: "Pages non spécifiées" });
    }

    // Séparer les pages en un tableau
    const paths = pages.split(',');

    try {
        // Boucler sur chaque chemin et revalider chaque page
        for (const path of paths) {
            await res.revalidate(`/${path}`);
        }
        return res.json({ revalidated: true, revalidatedPages: paths });
    } catch (err) {
        // En cas d'erreur lors de la revalidation
        return res.status(500).send("Erreur de revalidation");
    }
}
