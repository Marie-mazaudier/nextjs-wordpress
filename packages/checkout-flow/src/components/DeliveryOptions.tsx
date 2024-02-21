import React, { useState, useEffect } from 'react';

interface ShippingMethod {
    id: number;
    title: string;
    price: number;
    method_id: string;
    enabled: boolean; // Ajouter le champ enabled à l'interface
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
        if (globalSelectedShippingMethod) {
            setSelectedShippingMethod(globalSelectedShippingMethod);
        } else if (ShippingMethod.length > 0) {
            // Trouver la première méthode de livraison enabled par défaut si aucune méthode globalement sélectionnée
            const defaultMethod = ShippingMethod.find(method => method.enabled);
            if (defaultMethod) {
                setSelectedShippingMethod(defaultMethod.method_id);
                console.log('Applying default enabled shipping method:', defaultMethod.method_id);
            }
        }
    }, [ShippingMethod, globalSelectedShippingMethod]);

    const handleMethodChange = (methodId: string) => {
        setSelectedShippingMethod(methodId);
        if (onShippingChange) {
            onShippingChange(methodId);
        }
    };

    return (
        <div>
            <h2>Options de livraison :</h2>
            {ShippingMethod.filter(method => method.enabled).map((method) => (
                <div key={method.id}>
                    <input
                        type="radio"
                        name="shippingMethod"
                        value={method.method_id}
                        checked={method.method_id === selectedShippingMethod}
                        onChange={() => handleMethodChange(method.method_id)}
                    />
                    {method.title} {(method.method_id !== 'free_shipping' && method.method_id !== 'local_pickup' && method.title !== 'Retrait en magasin') && ` - ${shippingTotal} €`}
                </div>
            ))}
        </div>
    );
};

export default DeliveryOptions;
