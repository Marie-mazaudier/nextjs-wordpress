import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGetCartData } from '../lib/coCart/getCart'; // Importez la fonction pour récupérer les données du panier

interface CartItem {
    id: string;
    quantity: {
        value: number;
        min_purchase: number;
        max_purchase: number;
    };
    name: string;
    price: number;
    featured_image?: string;
    slug: string;
    item_key: string;
    stock: number; // Ajout du champ stock

}

interface CartState {
    items: CartItem[];
    subtotal: string; // Sous-total du panier au format string avec 2 décimales
    totalQuantity: number; // Quantité totale d'articles dans le panier
    selectedShippingMethod: string; // Nouvelle propriété pour la méthode de livraison

}

interface CartContextType {
    cart: CartState;
    setCart: React.Dispatch<React.SetStateAction<CartState>>;
    updateCart: () => void;
    setSelectedShippingMethod: (methodId: string) => void;
    selectedShippingMethod: string;
    updateStock: (productId: string, newStock: number) => void; // Nouvelle fonction pour mettre à jour le stock

}

const CartContext = createContext<CartContextType>(null!);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartState>({
        items: [],
        subtotal: '0.00',
        totalQuantity: 0,
        selectedShippingMethod: ''
    });
    const [triggerUpdate, setTriggerUpdate] = useState(0); // Ajout pour déclencher la mise à jour
    const [test, setTest] = useState<number>(0); // Initialisation correcte avec une valeur par défaut
    const { data: cartData } = useGetCartData();
    useEffect(() => {
        const savedMethod = localStorage.getItem('selectedShippingMethod'); // Récupération depuis localStorage
        if (savedMethod) {
            setCart((currentCart) => ({
                ...currentCart,
                selectedShippingMethod: savedMethod,
            }));
        }
        // Autres initialisations basées sur cartData
    }, []);
    useEffect(() => {
        if (cartData) {
            const formattedSubtotal = (cartData.totals?.subtotal / 100).toFixed(2);
            setCart(prevState => ({
                ...prevState,
                items: cartData.items || [],
                subtotal: formattedSubtotal,
                totalQuantity: Number(cartData.item_count)
            }));
        }
    }, [cartData]);

    const updateCart = () => {
        setTriggerUpdate(prev => prev + 1);
    };
    const updateStock = (productId: string, newStock: number) => {
        setCart(prevCart => {
            const updatedItems = prevCart.items.map(item =>
                item.id === productId ? { ...item, stock: newStock } : item
            );
            return { ...prevCart, items: updatedItems };

        });
    };
    //console.log("cart", cart)
    // console.log("cartData", cartData)
    const setSelectedShippingMethod = (methodId: string) => {
        localStorage.setItem('selectedShippingMethod', methodId); // Stockage dans localStorage
        setCart((currentCart) => ({
            ...currentCart,
            selectedShippingMethod: methodId,
        }));
    };
    useEffect(() => {
        console.log("Méthode d'expédition sélectionnée: ", cart.selectedShippingMethod);
    }, [cart.selectedShippingMethod]);
    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            updateCart,
            setSelectedShippingMethod,
            selectedShippingMethod: cart.selectedShippingMethod,
            updateStock
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);