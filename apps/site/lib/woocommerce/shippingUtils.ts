import { useState, useEffect } from 'react';

interface InitialShippingMethod {
    id: number;
    // autres propriétés de InitialShippingMethod si nécessaire
}

interface CartData {
    items_weight?: number;
    // autres propriétés de CartData si nécessaire
}

interface CartSummaryData {
    total: number;
    // autres propriétés de CartSummaryData si nécessaire
}
interface SetCartSummaryData {
    (data: CartSummaryData): void;
}



interface ShippingMethod {
    id: number;
    name: string;
    price: number;
    // autres propriétés si nécessaire
}

export const useFetchShippingMethods = (cartData: CartData, cartSummaryData: CartSummaryData) => {
    const [shippingMethodsInfo, setShippingMethodsInfo] = useState<ShippingMethod[]>([]);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);
    const [selectedShippingMethodValue, setSelectedShippingMethodValue] = useState<string>('');
    const [selectedServicePointId, setSelectedServicePointId] = useState("");
    const [totalWithShipping, setTotalWithShipping] = useState<number>(0); // Nouvel état pour le coût total

    useEffect(() => {
        if (cartData?.items_weight && shippingMethodsInfo.length === 0) {
            const roundedWeight = Math.ceil(cartData.items_weight);
            fetch(`/api/sendcloud/sendcloud?type=shipping_products&weight=${roundedWeight}`)
                .then(response => response.json())
                .then((data: InitialShippingMethod[]) => {
                    const ids = data.map(method => method.id);
                    let price: number;
                    if (cartSummaryData.total <= 10000) {
                        price = 50;
                    } else {
                        price = 120;
                    }
                    return Promise.all(ids.map(id =>
                        fetch(`/api/sendcloud/sendcloud?type=shipping_method_info&methodId=${id}`)
                            .then(response => response.json())
                            .then(info => ({
                                id: info.shipping_method.id,
                                name: info.shipping_method.name,
                                price: price
                            }))
                    ));
                })
                .then(setShippingMethodsInfo)
                .catch(error => console.error('Erreur:', error));
        }
    }, [cartData, cartSummaryData.total]);

    // Nouveau useEffect pour définir la méthode de livraison par défaut
    // Nouveau useEffect pour définir la méthode de livraison par défaut
    useEffect(() => {
        if (shippingMethodsInfo.length > 0) {
            let shippingCost = 0;
            let selectedMethod = null;

            if (selectedShippingMethodValue !== "-1") {
                selectedMethod = shippingMethodsInfo.find(method => method.id.toString() === selectedShippingMethodValue) || shippingMethodsInfo[0];
                shippingCost = selectedMethod ? selectedMethod.price : 0;
            }

            setSelectedShippingMethod(selectedMethod);
            // Assurez-vous que cartSummaryData.total et shippingCost sont des nombres
            const totalValue = Number(cartSummaryData.total) + Number(shippingCost);
            // Utilisation de toFixed pour arrondir le résultat à deux décimales
            const total = totalValue.toFixed(2);
            setTotalWithShipping(Number(total)); // Convertir la chaîne de caractères en nombre
            console.log("total livraison", shippingCost);
            console.log("total panier", cartSummaryData.total);
        }
    }, [shippingMethodsInfo, selectedShippingMethodValue, cartSummaryData.total]);

    useEffect(() => {
        console.log("total commande", totalWithShipping);
    }, [totalWithShipping]);




    const handleServicePointSelected = (servicePointId: string) => {
        // Logique pour gérer la sélection d'un point relais
    };


    return {
        shippingMethodsInfo,
        selectedShippingMethod,
        setSelectedShippingMethod,
        selectedShippingMethodValue,
        setSelectedShippingMethodValue,
        selectedServicePointId,
        handleServicePointSelected,
        totalWithShipping // Retourner le coût total
    };
};
