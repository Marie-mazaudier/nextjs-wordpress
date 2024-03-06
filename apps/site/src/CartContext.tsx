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
    discount: DiscountInfo; //

}
interface DiscountInfo {
    code: string;
    type: string; // 'percent' ou 'fixed_cart', etc.
    amount: string; // Montant de la réduction
}
interface CartContextType {
    cart: CartState;
    setCart: React.Dispatch<React.SetStateAction<CartState>>;
    updateCart: () => void;
    setSelectedShippingMethod: (methodId: string) => void;
    selectedShippingMethod: string;
    updateStock: (productId: string, newStock: number) => void; // Nouvelle fonction pour mettre à jour le stock
    updateDiscount: (discount: DiscountInfo) => void;

}
const defaultDiscount: DiscountInfo = {
    code: '',
    type: 'fixed_cart', // ou 'percent', selon ce qui est plus logique par défaut
    amount: '0', // Assurez-vous que c'est une chaîne de caractères représentant 0
};
const CartContext = createContext<CartContextType>(null!);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartState>({
        items: [],
        subtotal: '0.00',
        totalQuantity: 0,
        selectedShippingMethod: '',
        discount: defaultDiscount,
    });

    // Nouveau: état pour gérer le chargement
    const [isLoading, setIsLoading] = useState(true);

    // Charger la réduction depuis localStorage uniquement côté client
    useEffect(() => {
        const loadDiscountFromStorage = () => {
            const savedDiscount = localStorage.getItem('cartDiscount');
            if (savedDiscount) {
                try {
                    const discount = JSON.parse(savedDiscount);
                    setCart(currentCart => ({ ...currentCart, discount }));
                } catch (error) {
                    console.error("Erreur lors de la récupération du discount dans le localStorage:", error);
                }
            }
            setIsLoading(false); // Mise à jour de l'état de chargement
        };

        if (typeof window !== 'undefined') {
            loadDiscountFromStorage();
        }
    }, []);


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

    // Définition des méthodes pour mettre à jour le panier, le stock, et la réduction
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
    const updateDiscount = (discount: DiscountInfo) => {
        setCart(currentCart => ({ ...currentCart, discount }));
        localStorage.setItem('cartDiscount', JSON.stringify(discount));
    };
    const setSelectedShippingMethod = (methodId: string) => {
        localStorage.setItem('selectedShippingMethod', methodId); // Stockage dans localStorage
        setCart((currentCart) => ({
            ...currentCart,
            selectedShippingMethod: methodId,
        }));
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            updateCart,
            setSelectedShippingMethod,
            selectedShippingMethod: cart.selectedShippingMethod,
            updateStock,
            updateDiscount // Méthode pour mettre à jour les informations de réduction
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);