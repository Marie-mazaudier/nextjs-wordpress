import React, { useEffect } from 'react';
import { createParcel } from 'lib/sendcloud/sendcloud';

const TestPage = () => {
    useEffect(() => {
        const parcelData = {
            name: "John Doe",
            company_name: "Sendcloud",
            address: "Insulindelaan",
            house_number: "115",
            city: "Eindhoven",
            postal_code: "5642CV",
            telephone: "+31612345678",
            request_label: true,
            email: "john@doe.com",
            data: {},
            country: "NL",
            shipment: {
                id: 8
            },
            weight: "10.000",
            order_number: "1234567890",
            insured_value: 0,
            total_order_value_currency: "GBP",
            total_order_value: "11.11",
            quantity: 1,
            shipping_method_checkout_name: "DHL Express Domestic"
        };

        createParcel(parcelData)
            .then(data => console.log('Parcel created:', data))
            .catch(error => console.error('Error creating parcel:', error));
    }, []);

    return <div>Test Page</div>;
};

export default TestPage;
