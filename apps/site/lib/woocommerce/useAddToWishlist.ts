// lib/woocommerce/addProductToWishlist.js
import axios from 'axios';

export const addProductToWishlist = async (shareKey: any, productId: any) => {
    console.log("Attempting to add product to wishlist", { shareKey, productId });
    if (!shareKey || !productId) {
        throw new Error("Wishlist key or product ID is missing.");
    }

    try {
        const response = await axios.post(`/api/whishlist/add_product_wishlist?share_key=${shareKey}`, {
            product_id: productId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        throw error;
    }
};