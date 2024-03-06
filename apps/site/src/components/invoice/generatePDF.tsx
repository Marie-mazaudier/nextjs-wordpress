import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Interfaces pour typer les données de la commande
interface BillingDetailsPDF {
    first_name: string;
    last_name: string;
    address_1: string;
    phone: string;
    email: string;
    postcode: number;
    country: string;
    city: string;
}

interface ShippingDetailsPDF {
    first_name: string;
    last_name: string;
    address_1: string;
    phone: string;
    email: string;
}

interface LineItemPDF {
    id: number;
    name: string;
    quantity: number;
    total: string;
}

interface ShippingLinePDF {
    method_title: string;
    method_id: string;
}

interface MetaDataPDF {
    id: number;
    key: string;
    value: any; // 'value' peut être de type 'any' car il peut contenir différentes structures de données
}

interface OrderDetailsPDF {
    id: number;
    billing: BillingDetailsPDF;
    shipping: ShippingDetailsPDF;
    line_items: LineItemPDF[];
    total: string;
    status: string;
    payment_method: string;
    payment_method_title: string;
    date_created: string;
    shipping_lines: ShippingLinePDF[];
    meta_data?: MetaDataPDF[];
    shipping_total: number;

}

// Mettez à jour la signature de la fonction pour utiliser le nouveau nom d'interface
const generatePDF = (order: OrderDetailsPDF) => {
    const doc = new jsPDF();
    let currentY = 10; // Position initiale pour l'en-tête "FACTURE"
    // Configuration initiale de la police
    // doc.setFont('helvetica'); // Définir la police. Utilisez 'times', 'courier', etc., selon vos besoins.
    // doc.setFontSize(10); // Définir la taille de la police globalement.
    // Trouver les informations de la boutique dans meta_data
    const invoiceSettings = order.meta_data?.find(meta => meta.key === "_wcpdf_invoice_settings")?.value;
    const shopName = invoiceSettings?.shop_name?.default || "Nom de la boutique non spécifié";
    const shopAddress = invoiceSettings?.shop_address?.default || "Adresse de la boutique non spécifiée";
    const vatNumber = invoiceSettings?.vat_number || " ";
    const date = new Date(order.date_created);
    const invoiceNumber = order.meta_data?.find(meta => meta.key === "_wcpdf_invoice_number")?.value

    // Formatage de la date
    const formattedDate = date.toLocaleDateString('fr-FR', {
        year: 'numeric', // Année numérique
        month: 'long', // Mois en toutes lettres
        day: '2-digit' // Jour avec deux chiffres
    });

    currentY += 10; // Espace après l'en-tête "FACTURE"

    const pageWidth = doc.internal.pageSize.getWidth();
    const billingX = 15;
    const shopX = pageWidth - 15; // Position X à partir de la droite avec une marge
    // En-tête de la facture aligné à gauche avec une police en gras
    doc.setFont('helvetica', 'bold'); // Passer en gras pour l'en-tête
    doc.text(`FACTURE N° ${invoiceNumber}`, billingX, currentY);

    doc.setFont('helvetica', "normal"); // Revenir à la police normale
    doc.setFontSize(10); // Taille de la police par défaut pour le texte
    // Informations de facturation à gauche
    doc.text(`${order.billing.first_name} ${order.billing.last_name}`, billingX, currentY + 10);
    doc.text(`${order.billing.address_1}`, billingX, currentY + 14);
    doc.text(`${order.billing.postcode} ${order.billing.city}, ${order.billing.country}`, billingX, currentY + 18);
    doc.text(`${order.billing.phone}`, billingX, currentY + 23);
    doc.text(`${order.billing.email}`, billingX, currentY + 27);

    // Informations de la boutique alignées à droite
    doc.text(`${shopName}`, shopX, currentY + 10, { align: "right" });
    doc.text(`${shopAddress}`, shopX, currentY + 14, { align: "right" });
    doc.text(`${vatNumber}`, shopX, currentY + 18, { align: "right" });

    // Ajout d'un trait de séparation sous les blocs d'informations
    currentY += 35; // Ajustement pour le trait sous les informations
    doc.line(10, currentY, pageWidth - 15, currentY); // Dessine une ligne

    currentY += 0; // Espace après la ligne

    // Informations supplémentaires sous les blocs d'information
    doc.text(`Date de facture:  ${formattedDate}`, billingX, currentY + 10);
    doc.text(`N° de commande: ${order.id}`, billingX, currentY + 14);
    doc.text(`Date de commande: ${formattedDate}`, billingX, currentY + 18);
    doc.text(`Méthode de paiement: ${order.payment_method_title}`, billingX, currentY + 22);

    // Positionnement pour le tableau des articles
    currentY += 30; // Espacement avant le tableau


    // Génération du tableau des articles et récupération de la position Y finale
    const autoTableResult = autoTable(doc, {
        startY: currentY,
        head: [['Produit', 'Quantité', 'Total']],
        body: order.line_items.map((item) => [item.name, item.quantity.toString(), `${item.total} €`]),
        didParseCell: function (data) {
            // Vérifier si la cellule est dans l'en-tête et dans la première ligne
            if (data.row.index === 0 && data.section === 'head') {
                data.cell.styles.fillColor = [0, 0, 0]; // Appliquer la couleur de fond noir en RGB
            }
        },
        theme: 'grid',
    });



    // Information d'expédition

    let finalY = (doc as any).lastAutoTable.finalY; // 'finalY' est utilisé pour positionner le texte après le tableau
    doc.text(`Expédition: ${order.shipping_total} €`, shopX, finalY + 10, { align: "right" });
    doc.text(`Total: ${order.total} €`, shopX, finalY + 14, { align: "right" });
    // Téléchargement du PDF
    doc.save(`facture_${order.id}.pdf`);
};


export default generatePDF;