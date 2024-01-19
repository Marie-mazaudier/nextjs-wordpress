import React from 'react';

interface ShippingMethodInfo {
    id: number;
    name: string;
    price: number;
    // autres propriétés si nécessaire
}

interface ShippingMethod {
    id: number;
    name: string;
    price: number;
    // autres propriétés si nécessaire
}

// Note: ServicePointPicker est maintenant facultatif
interface DeliveryOptionsProps {
    shippingMethodsInfo: ShippingMethodInfo[];
    selectedShippingMethod: ShippingMethod | null;
    setSelectedShippingMethod: React.Dispatch<React.SetStateAction<ShippingMethod | null>>;
    selectedShippingMethodValue: string;
    setSelectedShippingMethodValue: React.Dispatch<React.SetStateAction<string>>;
    ServicePointPicker?: React.ComponentType<any>; // Type modifié pour être facultatif
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
    shippingMethodsInfo,
    selectedShippingMethod,
    setSelectedShippingMethod,
    selectedShippingMethodValue,
    setSelectedShippingMethodValue,
    ServicePointPicker
}) => {
    return (
        <div>
            <h2>Options de livraison :</h2>
            {shippingMethodsInfo.map((method, index) => (
                <div key={method.id}>
                    <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={selectedShippingMethod?.id === method.id}
                        onChange={() => {
                            setSelectedShippingMethod(method);
                            setSelectedShippingMethodValue(method.id.toString());
                        }}
                    />
                    {method.name} - {method.price} €
                </div>
            ))}
            {/* Option "Retrait en point de vente" */}
            <div>
                <input
                    type="radio"
                    name="shippingMethod"
                    value="-1"
                    checked={selectedShippingMethodValue === "-1"}
                    onChange={() => {
                        setSelectedShippingMethodValue("-1");
                    }}
                />
                Retrait en point de vente - Gratuit
            </div>
            {/* Utilisation de ServicePointPicker si nécessaire */}
            {selectedShippingMethodValue === "1448" && ServicePointPicker && (
                <ServicePointPicker /* props nécessaires */ />
            )}
        </div>
    );
};

export default DeliveryOptions;
