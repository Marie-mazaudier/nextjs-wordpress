import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import flatListToHierarchical from './transformMenuData'; // Assurez-vous que le chemin d'importation est correct
import { MenuData } from "src/types/menuTypes"; // Importez MenuData de vos types
import { MENU_QUERY } from "src/data/graphQl/menu"; // Assurez-vous que cette importation est correcte

// Type pour les fonctions getStaticProps que vous passerez à HocMenuData
type GetStaticPropsFuncType = (context: GetStaticPropsContext) => Promise<GetStaticPropsResult<any>>;

export const HocMenuData = (getStaticPropsFunc?: GetStaticPropsFuncType) =>
    async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<{ menuData: MenuData }>> => {
        // Supposons que MENU_QUERY() retourne les données au format attendu par flatListToHierarchical
        const flatMenuData = await MENU_QUERY();
        // Transformez les données en structure hiérarchique
        const menuData: MenuData = flatListToHierarchical(flatMenuData, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'children',
        });

        let pagePropsResult = getStaticPropsFunc ? await getStaticPropsFunc(context) : { props: {} };

        let pageProps = {};
        if ('props' in pagePropsResult) {
            pageProps = pagePropsResult.props;
        }

        return {
            props: {
                ...pageProps,
                menuData, // Ceci est maintenant conforme au type MenuData
            },
            revalidate: 86400, // Revalider une fois par jour
        };
    };