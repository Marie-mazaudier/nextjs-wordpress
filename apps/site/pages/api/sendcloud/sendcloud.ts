import type { NextApiRequest, NextApiResponse } from 'next';

interface Functionalities {
    delivery_before: string; // Assurez-vous que ce type correspond à la réponse de l'API
    // Ajoutez d'autres propriétés si nécessaire
}

interface ShippingProduct {
    methods: Array<{
        id: number;
        name: string;
        functionalities: Functionalities;
        // Ajoutez d'autres propriétés si nécessaire
    }>;
    // Ajoutez d'autres propriétés si nécessaire
}
interface ServicePointDetails {
    id: number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_SEND_CLOUD_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SEND_CLOUD_SECRET_KEY}`).toString('base64')}`;

    try {
        if (req.method === 'POST') {
            const apiResponse = await fetch('https://panel.sendcloud.sc/api/v2/parcels', {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(req.body)
            });

            const data = await apiResponse.json();
            return res.status(apiResponse.ok ? 200 : apiResponse.status).json(data);

        } else if (req.method === 'GET') {
            if (req.query.type === 'shipping_products' && req.query.weight) {
                const weight = req.query.weight;
                const apiResponse = await fetch(`https://panel.sendcloud.sc/api/v2/shipping-products?from_country=FR&to_country=FR&carrier=chronopost&contract=3172&weight=${weight}&weight_unit=kilogram&contract_pricing=false&returns=false`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/json'
                    }
                });

                const shippingProducts: ShippingProduct[] = await apiResponse.json();
                if (!apiResponse.ok) {
                    return res.status(apiResponse.status).json(shippingProducts);
                }

                // Filtrer pour les méthodes "Chrono 18" avec "delivery_before" à "1800" et "Chrono Relais"
                const filteredProducts = shippingProducts.flatMap(product =>
                    product.methods.filter(method =>
                        (method.name.includes("Chrono 18") && method.functionalities.delivery_before === "1800")
                        // || (method.name.includes("Chrono Relais") && !method.name.includes("Chrono Relais Saturday"))
                    )
                );

                return res.status(200).json(filteredProducts);

            } else if (req.query.type === 'shipping_method_info' && req.query.methodId) {
                const methodId = req.query.methodId;
                const methodResponse = await fetch(`https://panel.sendcloud.sc/api/v2/shipping_methods/${methodId}?is_return=false&to_country=FR`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/json'
                    }
                });

                const methodInfo = await methodResponse.json();
                return res.status(methodResponse.ok ? 200 : methodResponse.status).json(methodInfo);

            } else if (req.method === 'GET' && req.query.type === 'download_label' && req.query.labelId) {
                const labelId = req.query.labelId;
                const labelResponse = await fetch(`https://panel.sendcloud.sc/api/v2/labels/normal_printer/${labelId}?start_from=0`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/pdf'
                    }
                });

                if (labelResponse.ok) {
                    const arrayBuffer = await labelResponse.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename=label-${labelId}.pdf`);
                    res.send(buffer);
                } else {
                    res.status(labelResponse.status).json({ message: 'Erreur lors du téléchargement du label' });
                }
            } else if (req.method === 'GET' && req.query.type === 'service_point_details' && req.query.servicePointId) {
                const servicePointId = req.query.servicePointId;
                const servicePointResponse = await fetch(`https://servicepoints.sendcloud.sc/api/v2/service-points/${servicePointId}?access_token=${process.env.SEND_CLOUD_ACCESS_TOKEN}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': authHeader
                    }
                });

                const servicePointDetails: ServicePointDetails = await servicePointResponse.json();
                return res.status(servicePointResponse.ok ? 200 : servicePointResponse.status).json(servicePointDetails);
            }
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        console.error("Erreur lors de la communication avec Sendcloud:", error);
        return res.status(500).json({ message: 'Erreur lors de la communication avec Sendcloud', error });
    }
}
