interface MenuItem {
    id: string;
    parentId: string | null;
    [key: string]: any; // Pour capturer les autres propriétés dynamiquement
    label?: string; // Assurez-vous que 'label' est inclus ici si c'est attendu
    cssClasses?: string[]; // Rendez 'cssClasses' optionnel si cela a du sens pour votre structure
    path: string;
    children?: MenuItem[]; // Pour la structure hiérarchique
}

interface HierarchicalOptions {
    idKey: string;
    parentKey: string;
    childrenKey: string;
}

const flatListToHierarchical = (
    data: MenuItem[] = [],
    { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' }: Partial<HierarchicalOptions> = {}
): MenuItem[] => {
    const tree: MenuItem[] = [];
    const childrenOf: { [key: string]: MenuItem[] } = {};
    data.forEach((item) => {
        const path = item.path || "defaultPath"; // Utilisez une logique de fallback appropriée.

        const newItem: MenuItem = { ...item };
        const id: string = newItem[idKey];
        const parentId: string | null = newItem[parentKey] || null;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        if (parentId) {
            childrenOf[parentId] = childrenOf[parentId] || [];
            childrenOf[parentId].push(newItem);
        } else {
            tree.push(newItem);
        }
    });
    return tree;
};

export default flatListToHierarchical;
