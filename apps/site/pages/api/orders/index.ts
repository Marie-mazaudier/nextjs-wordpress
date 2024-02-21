import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { billing, shipping, line_items, shipping_lines, payment_method_title, payment_method_description } = req.body;

  // Assurez-vous que payment_method est fourni dans la requête
  if (!payment_method_title) {
    return res.status(400).json({ error: "La méthode de paiement est requise" });
  }

  // et ne pas marquer immédiatement la commande comme payée
  WooCommerce.post('orders', {
    payment_method: payment_method_title, // Utilisation dynamique de la méthode de paiement
    payment_method_title: payment_method_description, // Titre pour la méthode de paiement
    set_paid: false, // Ne pas marquer la commande comme payée immédiatement
    status: 'pending', // Statut initial en attente
    billing: billing,
    shipping: shipping,
    line_items: line_items,
    shipping_lines: shipping_lines
  })
    .then((response) => {
      if (response?.data) {
        // Supprimer le cookie du panier après la création de la commande
        deleteCookie('cart_key', { req, res });

        // Retourner les données de la commande, y compris l'ID de commande pour le paiement Alma
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      // Gérer et retourner l'erreur si la création de la commande échoue
      res.status(400).json({ error: error.response.data });
    });
}
