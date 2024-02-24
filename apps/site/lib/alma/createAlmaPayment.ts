// createAlmaPayment.ts
import axios from 'axios';

interface BillingAddress {
    company: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    address_2: string;
    postcode: string;
    city: string;
    country: string;

}

interface OrderData {
    id: number;
    billing: BillingAddress;
    shipping: BillingAddress;
    total: string; // Assurez-vous que cela correspond au type de votre structure de données
    number: number,
    customer_id: number,
    date_created: Date
}

const createAlmaPayment = async (orderInfo: OrderData) => {
    // switcher l'api api côté serveur next js => route api comme payplug
    const apiKey = process.env.NEXT_PUBLIC_ALMA_API_KEY; // 
    const payload = {
        payment: {
            purchase_amount: parseInt(orderInfo.total) * 100, // Convertit en centimes
            installments_count: 3,
            billing_address: {
                company: orderInfo.billing.company,
                first_name: orderInfo.billing.first_name,
                last_name: orderInfo.billing.last_name,
                email: orderInfo.billing.email,
                phone: orderInfo.billing.phone,
                line1: orderInfo.billing.address_1,
                line2: orderInfo.billing.address_2,
                postal_code: orderInfo.billing.postcode,
                city: orderInfo.billing.city,
                country: orderInfo.billing.country,
            },
            customer_cancel_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/checkout`,
            custom_data: "Quelques données personnalisées",
            deferred_months: 0,
            deferred_days: 0,
            ipn_callback_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/payments/validate-payment-alma/${orderInfo.id}`,
            origin: "online",
            return_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/order-summary/${orderInfo.id}?dummy=1&provider=alma`,

            shipping_address: {
                company: orderInfo.shipping.company,
                first_name: orderInfo.shipping.first_name,
                last_name: orderInfo.shipping.last_name,
                email: orderInfo.shipping.email,
                phone: orderInfo.shipping.phone,
                line1: orderInfo.shipping.address_1,
                line2: orderInfo.shipping.address_2,
                postal_code: orderInfo.shipping.postcode,
                city: orderInfo.shipping.city,
                country: orderInfo.shipping.country,
            },
            locale: "fr",
            expires_after: 2880,
            capture_method: "automatic",
            failure_return_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/paiement-error`,

        },

        customer: {
            // Complétez avec les données client, si disponibles         
            id: orderInfo.customer_id,
            created: orderInfo.date_created,
            first_name: orderInfo.billing.first_name,
            last_name: orderInfo.billing.last_name,
            addresses: [
                {
                    company: orderInfo.billing.company,
                    first_name: orderInfo.billing.first_name,
                    last_name: orderInfo.billing.last_name,
                    email: orderInfo.billing.email,
                    phone: orderInfo.billing.phone,
                    line1: orderInfo.billing.address_1,
                    line2: orderInfo.billing.address_2,
                    postal_code: orderInfo.billing.postcode,
                    city: orderInfo.billing.city,
                    country: orderInfo.billing.country,
                }
            ],
            email: orderInfo.billing.email,
            phone: orderInfo.billing.phone,
            birth_date: "1980-01-01",
            birth_place: "Paris, France",
            banking_data_collected: false, // ?
            is_business: false,
            business_id_number: "",
            business_name: orderInfo.billing.company
        },
        order: {
            merchant_reference: orderInfo.number,
            merchant_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}`,
            customer_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/account`,
            comment: "Commande de test"
        }

    };
    console.log("Alma Payload:", payload);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ALMA_API_URL_TEST}`, payload, {
            headers: {
                'Authorization': `Alma-Auth ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retourne la réponse de l'API Alma
    } catch (error) {
        console.error('Error creating Alma payment:', error);
        throw error;
    }
};

export default createAlmaPayment;
