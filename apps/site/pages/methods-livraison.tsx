import React from 'react';
import { useShippingMethods } from 'lib/woocommerce/shippingMethods';
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
interface ShippingMethod {
    id: string;
    title: string;
    // Autres champs si nécessaire
}

const ShippingMethodsComponent: React.FC = () => {
    const { shippingMethods, isError } = useShippingMethods();

    if (isError) {
        return <div>Erreur lors du chargement des méthodes de livraison.</div>;
    }

    return (
        <div>
            <h2>Méthodes de Livraison</h2>
            <ul>
                {shippingMethods.map((method: ShippingMethod) => (
                    <li key={method.id}>{method.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShippingMethodsComponent;

export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})