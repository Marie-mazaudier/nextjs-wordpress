import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Gérer les requêtes POST pour créer une nouvelle commande
  if (req.method === 'POST') {
    const { billing, shipping, line_items, shipping_lines, payment_method_title, payment_method, customer_id, customer_ip_address } = req.body;

    if (!payment_method_title) {
      return res.status(400).json({ error: "La méthode de paiement est requise" });
    }
    let status;
    if (payment_method === "bacs") {
      status = 'on-hold';
    } else {
      status = 'pending';
    }
    // et ne pas marquer immédiatement la commande comme payée
    //console.log("customer_ip_address received:", customer_ip_address);

    WooCommerce.post('orders', {
      payment_method: payment_method, // Utilisation dynamique de la méthode de paiement
      payment_method_title: payment_method_title, // Titre pour la méthode de paiement
      set_paid: false, // Ne pas marquer la commande comme payée immédiatement
      status: status, // Statut initial en attente
      billing: billing,
      shipping: shipping,
      line_items: line_items,
      shipping_lines: shipping_lines,
      customer_id: customer_id,
      customer_ip_address: customer_ip_address
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
  // Gérer les requêtes GET pour afficher les commandes d'un client spécifique
  else if (req.method === 'GET') {
    const { customer } = req.query; // Récupérer le paramètre de requête 'customer'

    try {
      const endpoint = customer ? `orders?customer=${customer}` : 'orders';
      const response = await WooCommerce.get(endpoint);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
    }
  } else {
    // Méthodes HTTP non prises en charge
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
