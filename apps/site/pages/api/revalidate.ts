// pages/api/revalidate.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Autoriser uniquement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).end('Méthode non autorisée');
    }

    const { authorization } = req.headers;
    const secret = process.env.REVALIDATE_SECRET;

    // Vérifier la clé secrète
    if (!authorization || authorization.split(' ')[1] !== secret) {
        return res.status(401).json({ message: "Non autorisé" });
    }

    // Extrait les slugs des catégories à partir du corps de la requête
    const { categories } = req.body;

    if (!categories || categories.length === 0) {
        return res.status(400).json({ message: "Aucune catégorie fournie." });
    }

    try {
        // Revalide chaque page de catégorie fournie
        for (const slug of categories) {
            await res.revalidate(`/categorie-produit/${slug}`);
        }
        return res.json({ revalidated: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur de revalidation');
    }
}
