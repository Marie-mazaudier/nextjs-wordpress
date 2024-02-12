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

interface ShippingMethod {
    id: number;
    title: string; // Utilisation de 'title' au lieu de 'name'
    price: number;
    method_id?: string; // Ajout de 'method_id' si nécessaire
    // autres propriétés si nécessaire
}

export const useFetchShippingMethods = (cartData: CartData, cartSummaryData: CartSummaryData) => {
    const [shippingMethods, setshippingMethods] = useState<ShippingMethod[]>([]);
    const [totalWithShipping, setTotalWithShipping] = useState<number>(0); // Nouvel état pour le coût total




    return {
        shippingMethods,
        totalWithShipping // Retourner le coût total
    };
};
