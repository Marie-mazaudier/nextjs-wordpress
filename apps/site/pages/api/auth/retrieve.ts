// apps/site/pages/api/auth/retrieve.ts
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";
import { getCookie } from "cookies-next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Seules les requêtes GET sont acceptées
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const userInfoCookie = getCookie("__user__login__info", { req, res });

  // Vérifiez si userInfo existe
  if (!userInfoCookie) {
    // Si userInfo n'existe pas, retournez une erreur 401 (Non autorisé)
    return res.status(401).json({ message: "User not logged in" });
  }

  // userInfo existe, continuez avec la requête
  try {
    const user = JSON.parse(userInfoCookie as string);
    const id = user?.id;
    if (!id) {
      // L'ID utilisateur n'est pas défini, retournez une erreur 400 (Mauvaise Demande)
      return res.status(400).json({ message: "User ID is missing" });
    }

    const { data } = await WooCommerce.get(`customers/${id}`);
    return res.status(200).json(data);
  } catch (error) {
    // Gérez les erreurs de parsing ou d'autres erreurs
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
