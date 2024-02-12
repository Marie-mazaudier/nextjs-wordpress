import React, { useState, useEffect } from 'react';

interface ShippingMethod {
    id: number;
    title: string;
    price: number;
    method_id: string;
    // autres propriétés si nécessaire
}

interface DeliveryOptionsProps {
    ShippingMethod: ShippingMethod[];
    shippingTotal?: number;
    cartData: any;
    onShippingChange?: (methodId: string) => void;
    selectedShippingMethod: string; // Prop ajoutée pour la méthode de livraison sélectionnée dans l'état global
    updateCart: any;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
    ShippingMethod,
    shippingTotal,
    cartData,
    onShippingChange,
    selectedShippingMethod: globalSelectedShippingMethod
}) => {
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');

    useEffect(() => {
        // Utiliser la méthode de livraison globalement sélectionnée comme valeur initiale
        if (globalSelectedShippingMethod) {
            setSelectedShippingMethod(globalSelectedShippingMethod);
        } else if (cartData && cartData.shipping && cartData.shipping.packages) {
            // Définir une méthode de livraison par défaut basée sur cartData
            console.log('test 1')
            const defaultPackage = cartData.shipping.packages['default'];
            if (defaultPackage && defaultPackage.chosen_method) {
                setSelectedShippingMethod(defaultPackage.chosen_method.split(':')[0]);
                console.log('test 2')

            } else {
                console.log('test 3')

                // Choix d'une méthode de livraison par défaut
                const defaultMethod = ShippingMethod.find(method => method.method_id !== 'free_shipping' && method.method_id !== 'local_pickup');
                if (defaultMethod) {
                    setSelectedShippingMethod(defaultMethod.method_id);
                }
            }
        }
        if (!globalSelectedShippingMethod && ShippingMethod.length > 0) {
            // Supposons que vous définissiez ici votre méthode par défaut
            const defaultMethod = ShippingMethod[0].method_id;
            console.log('Applying default shipping method:', defaultMethod);
            setSelectedShippingMethod(defaultMethod); // Appliquez la méthode par défaut
        }
    }, [ShippingMethod, cartData, globalSelectedShippingMethod]);


    const handleMethodChange = (methodId: string) => {
        setSelectedShippingMethod(methodId);
        if (onShippingChange) {
            onShippingChange(methodId);
        }
    };

    return (
        <div>
            <h2>Options de livraison :</h2>
            {ShippingMethod.map((method) => (
                <div key={method.id}>
                    <input
                        type="radio"
                        name="shippingMethod"
                        value={method.method_id}
                        checked={method.method_id === selectedShippingMethod}
                        onChange={() => handleMethodChange(method.method_id)}
                    />
                    {method.title} {(method.method_id !== 'free_shipping' && method.method_id !== 'local_pickup') && ` - ${shippingTotal} €`}
                </div>
            ))}
        </div>
    );
};

export default DeliveryOptions;
