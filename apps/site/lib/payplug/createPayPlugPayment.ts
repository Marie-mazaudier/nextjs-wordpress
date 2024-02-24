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
            mobile_phone_number: orderInfo.billing.phone,
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
            mobile_phone_number: orderInfo.shipping.phone,
            delivery_type: "BILLING",
            language: "fr",
            company_name: orderInfo.shipping.company
        },
        hosted_payment: {
            return_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/order-summary/${orderInfo.id}?dummy=1&provider=payplug`,
            cancel_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/paiement-error`
        },
        notification_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/payments/notification-payplug/${orderInfo.id}`,
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
