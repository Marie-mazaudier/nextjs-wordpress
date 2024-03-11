export interface MenuItem {
    id: string;
    parentId: string | null;
    label?: string; // Assurez-vous que 'label' est inclus ici si c'est attendu
    cssClasses?: string[]; // Rendez 'cssClasses' optionnel si cela a du sens pour votre structure
    children?: MenuItem[]; // Pour la structure hiérarchique
}

// MenuData est un alias pour un tableau de MenuItem, ce qui facilite son utilisation dans les composants et fonctions
export type MenuData = MenuItem[];

// Définition des types restants si nécessaire
export interface MenuItems {
    nodes: MenuItem[];
}

export interface Menu {
    menuItems: MenuItems;
}

export interface MenuQueryResponse {
    menu: Menu;
}