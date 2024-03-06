import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

interface PaymentMethod {
  id: string;
  description: string | null;
  enabled: boolean;
  method_description?: string;
  method_title?: string;
  title?: string;
  order?: number;
}

interface AddressDetails {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  postcode?: string;
  state?: string;
}

interface PaymentMethodChangeParams {
  id: string;
  title: string;
  description: string;
}
interface AlmaEligibilityResponse {
  eligible: boolean;
  installments_count: number;
  payment_plan: {
    due_date: number;
    purchase_amount: number;
    customer_fee: number;
    customer_interest: number;
    total_amount: number;
    localized_due_date: string;
  }[];
}
interface PaymentMethodsProps {
  billing?: AddressDetails;
  shippingDetails?: AddressDetails;
  shipingCheck?: boolean;
  paymentMethods?: PaymentMethod[];
  onPaymentMethodChange?: (params: PaymentMethodChangeParams) => void;
  isAlmaEligible?: boolean; // Ajoutez cette ligne
  almaEligibilityDetails?: AlmaEligibilityResponse[]; // Ajout de cette ligne
  onInstallmentsChange?: (count: number) => void; // Nouvelle fonction callback pour gérer le changement du nombre d'échéances
}

const PaymentMethods = ({
  billing,
  shippingDetails,
  shipingCheck,
  paymentMethods = [],
  onPaymentMethodChange,
  isAlmaEligible,
  almaEligibilityDetails,
  onInstallmentsChange
}: PaymentMethodsProps) => {
  const { addToast } = useToasts();
  const [paymentActive, setPaymentActive] = useState<string | null>(null);
  const [isEligibleForAlma, setIsEligibleForAlma] = useState<boolean>(false); // État pour stocker l'éligibilité d'Alma
  const [selectedAlmaOptionIndex, setSelectedAlmaOptionIndex] = useState<number | null>(null);

  // console.log("Active payment method ID:", paymentActive);

  useEffect(() => {
    const filteredPaymentMethods = paymentMethods.filter(
      (method) => !/^(alma_|payplug_|oney_)/.test(method.id) && method.enabled
    );
    if (filteredPaymentMethods.length > 0 && paymentActive === null) {
      const defaultMethodId = filteredPaymentMethods[0].id;
      setPaymentActive(defaultMethodId);
      // Appelez ici onPaymentMethodChange avec les détails de la méthode par défaut
      const defaultMethod = filteredPaymentMethods[0];
      if (onPaymentMethodChange) {
        onPaymentMethodChange({
          id: defaultMethod.id,
          title: defaultMethod.method_title || defaultMethod.title || "",
          description:
            defaultMethod.description || defaultMethod.method_description || "",
        });
      }
    }
  }, [paymentMethods, paymentActive, onPaymentMethodChange]);


  const handlePaymentSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const methodId = event.target.value;
    setPaymentActive(methodId);
    setSelectedAlmaOptionIndex(null); // Réinitialiser la sélection d'option Alma lors du changement de méthode de paiement
    const selectedMethod = paymentMethods.find((method) => method.id === methodId);
    if (selectedMethod) {
      onPaymentMethodChange?.({
        id: selectedMethod.id,
        title: selectedMethod.method_title || selectedMethod.title || "",
        description: selectedMethod.description || selectedMethod.method_description || "",
      });
    }
  };

  const handleAlmaOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Number(event.target.value);
    setSelectedAlmaOptionIndex(newIndex);

    // Obtenir le nombre d'échéances à partir des détails d'éligibilité
    const installmentsCount = almaEligibilityDetails?.[newIndex]?.installments_count;

    // Appeler la fonction callback pour informer le composant parent si elle est définie
    if (installmentsCount !== undefined && onInstallmentsChange) {
      onInstallmentsChange(installmentsCount);
    }
  };


  // Utilisez useEffect pour réagir aux changements de selectedAlmaOptionIndex
  useEffect(() => {
    if (selectedAlmaOptionIndex !== null) {
      const selectedOption = almaEligibilityDetails?.[selectedAlmaOptionIndex];
      // Ici, vous pouvez effectuer des actions basées sur l'option sélectionnée, comme l'afficher dans la console
      console.log("Modalités de paiement sélectionnées:", selectedOption?.payment_plan);
      // Si vous avez besoin d'afficher ces informations dans l'UI, stockez-les dans l'état ou traitez-les comme nécessaire
    }
  }, [selectedAlmaOptionIndex, almaEligibilityDetails]);

  return (
    <div key={paymentActive || "initial"} className="bg-white mt-7 border rounded-xl p-2.5">
      <div className="md:grid grid-cols-1 gap-4 p-4">
        {paymentMethods
          .filter((method) => !/^(alma_|payplug_|oney_)/.test(method.id) && method.enabled)
          // Ajouter une condition pour inclure 'alma' uniquement si isAlmaEligible est vrai
          .filter(method => method.id !== 'alma' || (method.id === 'alma' && isAlmaEligible))
          .map((method) => (
            //  console.log("Method ID:", method.id), // Ajoutez cette ligne pour afficher method.id dans les logs
            <div key={method.id}>
              <label className="flex flex-col md:flex-row items-center gap-7 rounded-lg w-full cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentActive === method.id}
                  onChange={handlePaymentSelection}
                  className="cursor-pointer appearance-none inline-block relative bg-white text-themePrimary600 top-0 left-0 border-2 border-themeSecondary300 rounded-full w-5 h-5 shrink-0 radio_style_one"
                />
                <div>
                  {method.id && <span>{method.id}</span>}
                  {method.title && <span> - {method.title}</span>}
                </div>
              </label>
              {/* Affichage conditionnel des options Alma */}
              {method.id === 'alma' && paymentActive === 'alma' && isAlmaEligible && (
                <div className="flex space-x-4 ml-4 mt-2">
                  {almaEligibilityDetails?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`alma-option-${option.installments_count}`}
                        name="almaPaymentOption"
                        value={index}
                        onChange={handleAlmaOptionChange}
                        checked={selectedAlmaOptionIndex === index}
                        className="cursor-pointer"
                      />
                      <label htmlFor={`alma-option-${option.installments_count}`} className="ml-2">
                        {option.installments_count}x
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      {selectedAlmaOptionIndex !== null && isAlmaEligible && (
        <div className="mt-4">
          <h4>Modalités de paiement :</h4>
          <ul>
            {almaEligibilityDetails?.[selectedAlmaOptionIndex]?.payment_plan.map((plan, index) => {
              // Remplacer "aujourd'hui" par la date actuelle
              const dueDate = plan.localized_due_date === "aujourd'hui" ?
                new Date().toLocaleDateString("fr-FR", { // Assurez-vous que le format correspond à votre localisation
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }) :
                plan.localized_due_date;

              return (
                <li key={index}>
                  Paiement {index + 1}: {plan.total_amount / 100}€ le {dueDate}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
