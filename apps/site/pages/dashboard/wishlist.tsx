import useWishlist from "lib/woocommerce/useWishlist";
import WishlistItem from "src/components/wishlist/wishlistItem";
import { BlockLayout, Spaces, DashBoard } from "@jstemplate/ecommerce-ui";
import { sidebarMenu } from "../../src/data/SidebarMenu";
import dynamic from "next/dynamic";
import { useUserDetails } from "lib/woocommerce/user/useUserDetails";
import React, { useEffect } from "react";

const DashboardSideBar = dynamic(() => import("../../src/components/DashboardSideBar/DashboardSideBar"), {
    ssr: false,
});
export interface WishlistItem {
    item_id: number;
    product_id: number;
    variation_id: number;
    meta: {
        "tinvwl-hidden-fields": string;
        "add-to-cart": number;
        "product_id": number;
        "quantity": number;
    };
    date_added: string;
    price: string;
    in_stock: boolean;
}
const WishlistComponent = (/*{ userId }*/) => {
    const { user, error: userError, isLoading: userLoading } = useUserDetails();
    const { wishlistProducts, loading, error } = useWishlist(); // Utilisez les données renvoyées par useWishlist
    //console.log('user', user)

    return (
        <>
            <Spaces size="sm" />
            <BlockLayout>
                <div className="lg:flex items-start gap-10 space-y-10 lg:space-y-0">
                    <DashboardSideBar sidebarMenu={sidebarMenu} userData={user} />
                    <div className="grow">
                        <h2>Ma liste de favoris</h2>
                        {loading ? (
                            <p>Chargement de la liste de favoris...</p>
                        ) : error ? (
                            <p>Erreur lors de la récupération de la liste de favoris: {error}</p>
                        ) : wishlistProducts && wishlistProducts.length > 0 ? (
                            <ul>
                                {wishlistProducts.map((item: WishlistItem) => (
                                    <WishlistItem key={item.item_id} productId={item.product_id} item_id={item.item_id} />
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun favori trouvé.</p>
                        )}
                    </div>
                </div>
            </BlockLayout>
            <Spaces />
        </>
    );
};

export default WishlistComponent;