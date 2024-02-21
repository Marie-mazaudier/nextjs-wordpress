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
  // Ajoutez d'autres champs selon la structure de vos données
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

interface PaymentMethodsProps {
  billing?: AddressDetails;
  shippingDetails?: AddressDetails;
  shipingCheck?: boolean;
  paymentMethods?: PaymentMethod[];
  onPaymentMethodChange?: (params: PaymentMethodChangeParams) => void;
}

export const PaymentMethods = ({
  billing,
  shippingDetails,
  shipingCheck,
  paymentMethods = [],
  onPaymentMethodChange,
}: PaymentMethodsProps) => {
  const { addToast } = useToasts();
  const [paymentActive, setPaymentActive] = useState<string | null>(null);
  console.log("Active payment method ID:", paymentActive);

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
    const selectedMethod = paymentMethods.find((method) => method.id === methodId);
    if (selectedMethod && onPaymentMethodChange) {
      onPaymentMethodChange({
        id: selectedMethod.id,
        title: selectedMethod.method_title || selectedMethod.title || "",
        description:
          selectedMethod.description || selectedMethod.method_description || "",
      });
    }
  };

  return (
    <div key={paymentActive || "initial"} className="bg-white mt-7 border rounded-xl p-2.5">
      <div className="md:grid grid-cols-1 gap-4 p-4">
        {paymentMethods
          .filter((method) => !/^(alma_|payplug_|oney_)/.test(method.id) && method.enabled)
          .map((method) => (
            console.log("Method ID:", method.id), // Ajoutez cette ligne pour afficher method.id dans les logs
            <label
              key={method.id}
              className="flex flex-col md:flex-row items-center gap-7 rounded-lg w-full cursor-pointer"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentActive === method.id}
                onChange={handlePaymentSelection}
                className="cursor-pointer appearance-none	inline-block	relative bg-white text-themePrimary600 top-0 letf-0 border-2 border-themeSecondary300 rounded-full w-5 h-5 shrink-0 radio_style_one"
              />
              <div>
                {method.method_title && <span>{method.method_title}</span>}
                {method.title && <span> - {method.title}</span>}
              </div>
            </label>
          ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
