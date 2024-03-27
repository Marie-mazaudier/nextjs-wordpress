import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // Vérifiez le secret pour sécuriser l'accès
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
        return res.status(401).json({ message: "Accès non autorisé" });
    }

    const path = req.query.path as string;

    if (!path) {
        return res.status(400).json({ message: "Chemin non spécifié" });
    }

    try {
        // Utilisez la méthode de revalidation ici
        await res.revalidate(path);
        return res.json({ revalidated: true });
    } catch (err) {
        // En cas d'erreur lors de la revalidation
        return res.status(500).send("Erreur de revalidation");
    }
}
