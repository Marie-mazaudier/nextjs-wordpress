import { PROD_CAT_QUERY } from "src/data/graphQl/woo/products/productCatQueries";
import client from "lib/utils/apollo-client";
import { PostsQueryData } from "src/types/productsCatTypes";

const Category = ({ productCategories }: PostsQueryData) => {

    console.log('productCategories', productCategories)
    return (
        <>
            <p>TEST</p>
        </>
    );
};
export const getStaticProps = async () => {


    const [catResponse] = await Promise.all([
        client.query({ query: PROD_CAT_QUERY }),

    ]);
    console.log("catResponse data:", catResponse.data); // Ajoutez cela pour le débogage

    const productCategories = catResponse.data.productCategories.nodes; // Ajustement correct

    return {
        props: {
            productCategories
        },
        revalidate: 10800, // Revalidation toutes les 3 heures comme souhaité
    };

};

export default Category;