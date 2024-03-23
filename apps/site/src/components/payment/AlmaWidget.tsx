import React, { useEffect } from 'react';

declare const Alma: any;

interface AlmaWidgetProps {
    amount: number; // Montant direct à utiliser
}

const AlmaWidget: React.FC<AlmaWidgetProps> = ({ amount }) => {
    useEffect(() => {
        // S'assurer que le script Alma n'est ajouté qu'une seule fois
        if (!document.getElementById('alma-widgets-script')) {
            const script = document.createElement('script');
            script.id = 'alma-widgets-script';
            script.src = 'https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js';
            script.async = true;
            script.onload = () => initializeAlmaWidget();
            document.body.appendChild(script);
        } else {
            initializeAlmaWidget();
        }
        //  console.log('amount', amount)
    }, [amount]);
    //console.log('prix', data?.regular_price)
    const convertedPrice = amount * 100; // Convertir le prix en centimes
    // Définition des montants minimum et maximum pour les plans de paiement, également en centimes
    const minAmountForPlans = 50 * 100; // 50.00 € en centimes
    const maxAmountForPlans = 8000 * 100; // 8000.00 € en centimes
    const initializeAlmaWidget = () => {
        // Utilisation d'une assertion de type directe pour accéder à Alma
        const alma = (window as any).Alma;

        if (alma) {

            const merchantId = process.env.NEXT_PUBLIC_ALMA_MERCHANT_ID;
            const widgets = alma.Widgets.initialize(merchantId, alma.ApiMode.TEST);

            widgets.add(alma.Widgets.PaymentPlans, {
                container: '#alma-widget-container',
                purchaseAmount: convertedPrice,
                locale: 'fr',
                hideIfNotEligible: true,
                plans: [
                    { installmentsCount: 2, minAmount: minAmountForPlans, maxAmount: maxAmountForPlans },
                    { installmentsCount: 3, minAmount: minAmountForPlans, maxAmount: maxAmountForPlans },
                    { installmentsCount: 4, minAmount: minAmountForPlans, maxAmount: maxAmountForPlans },
                ],
            });
        } else {
            // Si Alma n'est pas encore disponible, réessayer après un court délai
            setTimeout(initializeAlmaWidget, 100); // Attendre 100ms avant de réessayer
        }
    };

    return (
        <div id="alma-widget-container"></div>
    );
};

export default AlmaWidget;
