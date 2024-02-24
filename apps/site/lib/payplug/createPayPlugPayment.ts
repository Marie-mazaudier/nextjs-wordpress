// lib/payplug/createPayPlugPayment.ts
import axios from 'axios';

interface BillingAddress {
    first_name: string;
    last_name: string;
    email: string;
    address_1: string;
    postcode: string;
    city: string;
    country: string;
    phone: string;
    company: string;
}

interface OrderData {
    id: number;
    billing: BillingAddress;
    shipping: BillingAddress;
    total: string;
}

const createPayPlugPayment = async (orderInfo: OrderData) => {

    // Fonction pour formater le numéro de téléphone
    const formatPhoneNumber = (phoneNumber: string) => {
        // Supposons que tous les numéros sont des numéros français sans l'indicatif international
        const formatted = phoneNumber.startsWith('0') ? '+33' + phoneNumber.substring(1) : phoneNumber;
        return formatted.replace(/\s/g, ''); // Supprimer les espaces s'il y en a
    };

    // Fournir une valeur par défaut pour company_name si vide
    const defaultCompanyName = 'N/A'; // ou tout autre valeur par défaut que vous jugez appropriée

    const payload = {
        amount: parseInt(orderInfo.total) * 100,
        currency: "EUR",
        billing: {
            first_name: orderInfo.billing.first_name,
            last_name: orderInfo.billing.last_name,
            email: orderInfo.billing.email,
            address1: orderInfo.billing.address_1,
            postcode: orderInfo.billing.postcode,
            city: orderInfo.billing.city,
            country: orderInfo.billing.country,
            mobile_phone_number: formatPhoneNumber(orderInfo.billing.phone),
            language: "fr"
        },
        shipping: {
            first_name: orderInfo.shipping.first_name,
            last_name: orderInfo.shipping.last_name,
            email: orderInfo.shipping.email,
            address1: orderInfo.shipping.address_1,
            postcode: orderInfo.shipping.postcode,
            city: orderInfo.shipping.city,
            country: orderInfo.shipping.country,
            mobile_phone_number: formatPhoneNumber(orderInfo.billing.phone),
            delivery_type: "BILLING",
            language: "fr",
            company_name: orderInfo.shipping.company || defaultCompanyName
        },
        hosted_payment: {
            return_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/order-summary/${orderInfo.id}?dummy=1&provider=payplug`,
            cancel_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/paiement-error`
        },
        notification_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/payments/notification-payplug/`,
        metadata: {
            customer_id: orderInfo.id
        },
        save_card: false,
        force_3ds: true
    };

    try {
        // Notez que nous pointons maintenant vers le proxy
        const response = await axios.post(`/api/payments/payplug-proxy`, payload);
        return response.data;
    } catch (error) {
        console.error('Error creating PayPlug payment:', error);
        throw error;
    }
};

export default createPayPlugPayment;
