import React, { useEffect } from 'react';

interface ServicePointPickerProps {
    apiKey: string;
    country: string;
    postalCode: string;
    city: string;
    onServicePointSelected?: (servicePointId: string) => void; // Nouveau callback pour la sélection
}

interface ServicePoint {
    id: string; // Supposons que chaque point de service a un identifiant
    // Autres propriétés selon l'API SendCloud...
}

declare global {
    interface Window {
        sendcloud: {
            servicePoints: {
                open: (options: any, successCallback: (servicePoint: ServicePoint, postNumber: string) => void, failureCallback: (errors: string[]) => void) => void;
            };
        };
    }
}

export const ServicePointPicker: React.FC<ServicePointPickerProps> = ({ apiKey, country = 'FR', postalCode, city, onServicePointSelected }) => {
    // Déplacer la logique des callbacks à l'intérieur du composant pour accéder aux props
    const successCallback = (servicePoint: ServicePoint, postNumber: string) => {
        console.log("Success", servicePoint, postNumber);
        // Utiliser le callback pour notifier le composant parent
        if (onServicePointSelected) {
            onServicePointSelected(servicePoint.id);
        }
    };

    const failureCallback = (errors: string[]) => {
        if (errors.includes('Invalid event type')) {
            console.log('Type d\'événement non valide détecté');
        } else {
            console.error("Failure", errors);
        }
    };

    useEffect(() => {
        if (!document.getElementById('sendcloud-script')) {
            const script = document.createElement('script');
            script.id = 'sendcloud-script';
            script.src = "https://embed.sendcloud.sc/spp/1.0.0/api.min.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const openServicePointPicker = () => {
                    const options = {
                        apiKey,
                        country,
                        postalCode,
                        city,
                        language: 'fr-fr',
                        carriers: 'chronopost',
                        servicePointId: '',
                        postNumber: ''
                    };

                    window.sendcloud.servicePoints.open(options, successCallback, failureCallback);
                };

                const pickerButton = document.getElementById('openServicePointPicker');
                if (pickerButton) pickerButton.addEventListener('click', openServicePointPicker);
            };
        }
    }, [apiKey, country, postalCode, city]);

    return (
        <div>
            <button id="openServicePointPicker">Choisir un point de retrait</button>
        </div>
    );
};
