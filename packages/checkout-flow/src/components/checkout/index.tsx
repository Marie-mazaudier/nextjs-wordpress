import React, { Fragment, useEffect, useState } from "react";
import { Country } from "country-state-city";
import { FormLoader, LoaderGrowing } from "../loader";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Image from "next/image";
import DeliveryOptions from "../DeliveryOptions";
import PaymentMethods from "../PaymentMethods";
import Link from "next/link";

interface CouponFormData {
  couponCode: string;
}
interface Coupon {
  code: string;
  amount: string | number;
}
interface Billing {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  company?: string;

}
interface Shipping {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  company?: string;

}
// user data interface
interface userDataInterface {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  company?: string;
  billing?: Billing,
  shipping?: Shipping
}

// cart data interface array of object
interface cartDataInterface {
  id: number;
  title: string;
  totals: {
    total: number;
  };
  featured_image: string;
  quantity: {
    value: number;
    min_purchase: number;
    max_purchase: number;
  };
  item_key: string;
}

// summery data interface
interface summeryDataInterface {
  total: number;
  subtotal: number;
  discount: number;
  shipping_total?: number;
}

// policy data interface
interface policyDataInterface {
  title: string;
  description: string;
  link: {
    title: string;
    url: string;
    target: string;
  };
}

// sign up data interface
interface signUpDataInterface {
  title: string;
}

// company policy data interface
interface companyPolicyDataInterface {
  title: string;
  companyName: string;
  link: {
    title: string;
    url: string;
    target: string;
  };
}
interface FormValues {
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
  password?: string;

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
interface DiscountInfo {
  code: string;
  type: string; // 'percent' ou 'fixed_cart', etc.
  amount: string; // Montant de la réduction
}
interface cart {
  subtotal: string; // Sous-total du panier au format string avec 2 décimales
  totalQuantity: number; // Quantité totale d'articles dans le panier
  selectedShippingMethod: string; // Nouvelle propriété pour la méthode de livraison
  discount: DiscountInfo; //
}
// check out component props
interface CheckOutProps {
  updateCartItemHandler: (itemKey: any, count: number, setLoading: (loading: boolean) => void) => Promise<{ message: string; data: any; }>;
  removeCartItemHandler: (itemKey: any, setLoading: (loading: boolean) => void) => Promise<void>;
  shippingMethods?: any;
  billingData?: any;
  loading?: boolean;
  userData?: userDataInterface;
  formSubmit?: (data: any, shippingData: any) => void;
  formLoader?: boolean;
  couponSubmit?: (data: any) => void;
  couponLoader?: boolean;
  removeCouponHandler?: () => void;
  autoFill?: boolean;
  cartData?: cartDataInterface[];
  summeryData?: summeryDataInterface;
  policyData?: policyDataInterface;
  signUpData?: signUpDataInterface;
  companyPolicyData?: companyPolicyDataInterface;
  userLogin?: boolean;
  onShippingMethodSelected: (methodId: string) => void;
  setSelectedShippingMethod?: any;
  selectedShippingMethod?: any;
  updateCart: () => void;
  paymentMethods?: any;
  onPaymentMethodChange?: (method: { id: string; title: string; description: string }) => void; // Ajout de cette prop pour gérer le changement de la méthode de paiement
  isAlmaEligible?: boolean; // Nouvelle propriété pour gérer l'éligibilité d'Alma
  almaEligibilityDetails?: AlmaEligibilityResponse[]; // Ajoutez cette ligne
  onInstallmentsChange?: (count: number) => void; // Nouvelle fonction callback pour gérer le changement du nombre d'échéances
  validatePassword?: any;
  loginForm?: JSX.Element | null; // Permet un composant React, ou `null`
  setLoginModalOn: any;
  coupons?: any;
  updateDiscount: (discount: DiscountInfo) => void;
  cart: cart
}

export const CheckOut = ({
  loading,
  userData,
  formSubmit,
  formLoader,
  couponSubmit,
  couponLoader,
  removeCouponHandler,
  autoFill,
  cartData,
  summeryData,
  policyData,
  signUpData,
  companyPolicyData,
  userLogin,
  shippingMethods,
  billingData,
  onShippingMethodSelected,
  setSelectedShippingMethod,
  selectedShippingMethod,
  updateCartItemHandler,
  updateCart,
  removeCartItemHandler,
  paymentMethods,
  onPaymentMethodChange,
  isAlmaEligible,
  almaEligibilityDetails,
  onInstallmentsChange,
  validatePassword,
  loginForm,
  setLoginModalOn,
  coupons,
  updateDiscount,
  cart
}: CheckOutProps) => {
  const country = Country.getAllCountries();
  //const [state, setState] = useState(State.getAllStates());
  //const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');
  const [shippingLinesData, setShippingLinesData] = useState(null);
  const [isItemOutOfStock, setIsItemOutOfStock] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [shipingCheck, setShipingCheck] = React.useState(false);
  const [shippingDetails, setShippingDetails] = React.useState<FormValues>({
    first_name: "",
    last_name: "",
    phone: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postcode: "",
    state: "",
  });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showLoginLink, setShowLoginLink] = useState(true);
  console.log('cartSummaryData', summeryData?.discount)
  // Dans la fonction handleOnChangeShipingCheck
  const handleOnChangeShipingCheck = () => {
    setShipingCheck(!shipingCheck);

    if (!shipingCheck) {
      // Lorsque shipingCheck passe à true, initialiser les champs avec shippingDetails
      setValue("shipping_first_name", shippingDetails.first_name);
      setValue("shipping_last_name", shippingDetails.last_name);
      setValue("shipping_phone", shippingDetails.phone);
      setValue("shipping_address_1", shippingDetails.address_1);
      setValue("shipping_address_2", shippingDetails.address_2);
      setValue("shipping_city", shippingDetails.city);
      setValue("shipping_country", shippingDetails.country);
      setValue("shipping_postcode", shippingDetails.postcode);
      setValue("shipping_state", shippingDetails.state);
      // Répétez pour les autres champs nécessaires
    } else {
      // Lorsque shipingCheck passe à false, réinitialiser les champs à vide ou à leurs valeurs par défaut
      setValue("shipping_first_name", "");
      setValue("shipping_last_name", "");
      setValue("shipping_phone", "");
      setValue("shipping_address_1", "");
      setValue("shipping_address_2", "");
      setValue("shipping_city", "");
      setValue("shipping_country", "");
      setValue("shipping_postcode", "");
      setValue("shipping_state", "");
      // Répétez pour les autres champs nécessaires
    }
  };
  // Surveiller tous les champs de formulaire


  // Cette fonction semble déjà bien configurée pour mettre à jour shippingDetails
  const handleOnChangeShipingDetails = (e: any) => {
    if (shipingCheck) {
      const { name, value } = e.target;
      setShippingDetails({ ...shippingDetails, [name]: value });
      console.log('ShippingDetails', shippingDetails)
    }
  };



  const handleRemoveCartItem = async (itemKey: string) => {
    setRemovingItemId(itemKey); // Indiquez quel article est en cours de suppression
    await removeCartItemHandler(itemKey, () => setRemovingItemId(null));
    // Réinitialisez après suppression
  };
  useEffect(() => {
    if (cartData) {
      const outOfStockItemExists = cartData.some(item => item.quantity.max_purchase <= 0);
      setIsItemOutOfStock(outOfStockItemExists);
    } else {
      setIsItemOutOfStock(false); // Assurez-vous que l'état est réinitialisé ou défini correctement si cartData n'existe pas
    }
  }, [cartData]);


  useEffect(() => {
    const adjustCartQuantities = async () => {
      let adjustmentsMade = false;

      // Assurez-vous que cartData est défini avant de continuer.
      if (!cartData) return;

      for (const item of cartData) {
        // Ajustez seulement si la quantité en panier dépasse le stock disponible et que max_purchase > 0.
        if (item.quantity.value > item.quantity.max_purchase && item.quantity.max_purchase > 0) {
          try {
            await updateCartItemHandler(item.item_key, item.quantity.max_purchase, () => { });
            adjustmentsMade = true;
            // Ici, au lieu d'utiliser console.log, vous pourriez vouloir mettre à jour l'UI pour refléter l'ajustement.
          } catch (error) {
            console.log("Erreur lors de la mise à jour du panier.", error);
          }
        }
      }

      if (adjustmentsMade && updateCart) {
        // Si des ajustements ont été faits, actualisez les données du panier.
        updateCart();
      }
    };

    adjustCartQuantities();
  }, [cartData]); // Ajoutez updateCartItemHandler comme dépendance si sa référence peut changer.


  const handleShippingChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
    onShippingMethodSelected(methodId); // Appeler la callback
    // console.log('methodId', methodId)
  };
  const convertPrice = (price: string) => {
    const finalPrice = parseFloat(price).toFixed(2);
    return finalPrice;
  };
  const calculateTotal = () => {
    let total = 0;

    // Déterminer le montant initial en fonction de la méthode de livraison sélectionnée
    if (selectedShippingMethod === 'free_shipping' || selectedShippingMethod === 'local_pickup') {
      total = billingData?.subtotal ? parseFloat(convertPrice(billingData?.subtotal)) : 0;
    } else {
      total = billingData?.total ? parseFloat(convertPrice(billingData?.total)) : 0;
    }
    // Vérifier si un discount est appliqué et ajuster le total en conséquence
    if (cart?.discount?.amount && parseFloat(cart.discount.amount) > 0) {
      const discountAmount = parseFloat(cart.discount.amount);
      if (cart.discount.type === 'percent') {
        // Si le discount est un pourcentage, calculer la réduction basée sur le total
        total = total - (total * discountAmount / 100);
      } else if (cart.discount.type === 'fixed_cart') {
        // Si le discount est un montant fixe, simplement le soustraire du total
        total = total - discountAmount;
      }
    }

    // S'assurer que le total n'est pas négatif
    total = Math.max(0, total);

    // Retourner le total formaté en chaîne de caractères avec le symbole de la devise
    return `$${total.toFixed(2)}`;
  };


  // billing form register hook
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  // Surveiller tous les champs de formulaire
  const watchedFields = watch(); // watch() sans argument renvoie toutes les valeurs du formulaire
  /* useEffect(() => {
     if (shipingCheck) {
       // Mettre à jour `shippingDetails` avec les valeurs des champs spécifiques à la livraison
       // Assurez-vous que les noms de vos champs de formulaire correspondent à ceux attendus par `shippingDetails`
       setShippingDetails({
         first_name: watchedFields.shipping_first_name || "",
         last_name: watchedFields.shipping_last_name || "",
         phone: watchedFields.shipping_phone || "",
         address_1: watchedFields.shipping_address_1 || "",
         address_2: watchedFields.shipping_address_2 || "",
         city: watchedFields.shipping_city || "",
         country: watchedFields.shipping_country || "",
         postcode: watchedFields.shipping_postcode || "",
         state: watchedFields.shipping_state || "",
       });
     }
     console.log("ShippingDetails", shippingDetails)
   }, [watchedFields, shipingCheck]); // Dépendances du useEffect*/
  // coupon form register hook
  const {
    register: couponRegister,
    handleSubmit: couponHandleSubmit,
    formState: { errors: couponErrors, isValid: couponIsValid },
  } = useForm<CouponFormData>({ // Assurez-vous de passer le type ici
    mode: "onBlur",
  });

  /* -------------------------------------------------------------------------- */
  /*                          if cartData is not passed                         */
  /* -------------------------------------------------------------------------- */
  if (!cartData) {
    cartData = null as any;
  }

  /* -------------------------------------------------------------------------- */
  /*                        if summeryData is not passed                        */
  /* -------------------------------------------------------------------------- */
  if (!summeryData) {
    summeryData = {
      total: 0,
      subtotal: 0,
      discount: 0,
      shipping_total: 0, // Add this line

    };
  }

  /* -------------------------------------------------------------------------- */
  /*                         if policyData is not passed                        */
  /* -------------------------------------------------------------------------- */
  if (!policyData) {
    policyData = {
      title: "",
      description: "",
      link: {
        title: "",
        url: "",
        target: "",
      },
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                         if signUpData is not passed                        */
  /* -------------------------------------------------------------------------- */
  if (!signUpData) {
    signUpData = {
      title: "",
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                     if companyPolicyData is not passed                     */
  /* -------------------------------------------------------------------------- */
  if (!companyPolicyData) {
    companyPolicyData = {
      title: "",
      companyName: "",
      link: {
        title: "",
        url: "",
        target: "",
      },
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                           state watch for country                          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (watch("country")) {
      //  setState(State.getStatesOfCountry(watch("country")));
      // if autoFill is true then auto set the state value
      /* if (autoFill && userData) {
         setValue("state", userData.state, { shouldValidate: true });
       }*/
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("country"), autoFill, userData]);

  /* -------------------------------------------------------------------------- */
  /*      if autoFill is true then auto fill the form using useEffect hook      */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (autoFill && userData) {
      setShowLoginLink(false);
      console.log('showLoginLink', showLoginLink)
      // Remplir les champs de facturation si billing n'est pas undefined
      const billingInfo: Billing | undefined = userData;
      //console.log(billingInfo)
      if (billingInfo) {
        (Object.keys(billingInfo) as (keyof Billing)[]).forEach((key) => {
          const value = billingInfo[key]; // TypeScript devrait maintenant reconnaître le type correctement
          if (value) {
            setValue(key, value, { shouldValidate: true }); // Utilisez directement 'key' sans préfixe

          }
        });
      }

      // Remplir les champs de livraison si shipping n'est pas undefined
      const shippingInfo: Shipping | undefined = userData;
      if (shippingInfo) {
        (Object.keys(shippingInfo) as (keyof Shipping)[]).forEach((key) => {
          const value = shippingInfo[key]; // TypeScript devrait maintenant reconnaître le type correctement
          if (value) {
            setValue(`shipping_${key}`, value, { shouldValidate: true });
            console.log(value)
          }
        });
      }
    }
  }, [userData]);

  /* -------------------------------------------------------------------------- */
  /*                        Soumission du formulaire                   */
  /* -------------------------------------------------------------------------- */
  const onSubmit = async (data: any) => {
    // form data console
    let shippingData;

    if (shipingCheck) {
      shippingData = {
        first_name: data.shipping_first_name || "",
        last_name: data.shipping_last_name || "",
        phone: data.shipping_phone || "",
        address_1: data.shipping_address_1 || "",
        address_2: data.shipping_address_2 || "",
        city: data.shipping_city || "",
        country: data.shipping_country || "",
        postcode: data.shipping_postcode || "",
        state: data.shipping_state || "",
      };
    } else {
      // Si shipingCheck est faux, utilisez les données de facturation
      shippingData = data;
    } console.log("shippingData", shippingData)

    if (formSubmit) {
      formSubmit(data, shippingData);
    } else {
      console.log("formSubmit", data);
    }
  };


  // /* -------------------------------------------------------------------------- */
  // /*                         Coupon Code submit handler                         */
  // /* -------------------------------------------------------------------------- */
  const couponSubmitHandler = async (data: CouponFormData) => {
    // Extrait le code du coupon saisi par l'utilisateur
    const { couponCode } = data;
    console.log('code', couponCode)
    // Recherche le coupon dans la liste des coupons disponibles
    const couponFound = coupons.find((coupon: Coupon) => coupon.code === data.couponCode);
    console.log('coupons', coupons)
    if (couponFound) {
      // Si le coupon est trouvé et valide, appliquez la réduction ici
      console.log(`Coupon valide: ${couponFound.code}, ${couponFound.amount} de réduction.`);

      // Ici, vous pouvez appeler une fonction pour appliquer la réduction au panier de l'utilisateur
      updateDiscount({
        code: couponFound.code,
        type: couponFound.discount_type,
        amount: couponFound.amount,
      });

      // Assurez-vous de gérer l'état de l'application pour refléter l'application du coupon
    } else {
      // Si le coupon n'est pas trouvé, affichez une erreur
      console.error("Coupon invalide ou non trouvé.");
      // Vous pourriez vouloir mettre à jour l'état de l'interface utilisateur pour refléter cette erreur
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         Remove Coupon Code handler                         */
  /* -------------------------------------------------------------------------- */
  const couponRemoveHandler = async (data: any) => {
    updateDiscount({
      code: '',
      type: 'fixed_cart', // ou 'percent', selon ce qui était défini par défaut
      amount: '0',
    });
  };
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  return (
    <div className="container mx-auto">
      <div className="lg:flex grid gap-10 mt-16 mb-28">
        {/* Form Body */}
        <div className="2xl:w-3/4 lg:w-2/3 w-11/12 mx-auto">
          <div className="bg-white shadow-md rounded-xl overflow-hidden p-6 relative">
            {showLoginLink && (
              <p>Déjà client ?
                <button onClick={() => setLoginModalOn(true)} className="text-blue-500 hover:underline">
                  Cliquez pour vous connecter
                </button>
              </p>
            )}
            {/*showLoginForm && showLoginLink && loginForm*/}
            {/* Form Loader */}
            {(!cartData || loading) && <LoaderGrowing />}
            <div className=" grid lg:gap-3 gap-8">
              {/* Form Title */}
              <div className="flex p-2.5 bg-themeLightGray rounded font-medium text-xl text-themeDark mb-6">
                <h3 className="w-full md:w-4/12 sm:w-5/12 ml-2">Billing Details</h3>
              </div>
              {/* Form input lists */}
              {cartData && cartData.length > 0 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full grid gap-8">
                    {/* First Name & Last Name */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      {/* First Name */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.first_name ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="first_name"
                          >
                            First Name
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 ${errors.first_name ? "border-red-400" : "border-[#DDE6F5]"
                              } text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline`}
                            type="text"
                            placeholder="First Name"
                            id="first_name"
                            {...register("first_name", {
                              required: "First Name is required",
                            })}
                          />
                        </div>
                      </div>
                      {/* Last Name */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.last_name ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="last_name"
                          >
                            Last Name
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.last_name ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="text"
                            placeholder="Last Name"
                            id="last_name"
                            {...register("last_name", {
                              required: "Last Name is required",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    {/* company name & country */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      {/* Company name */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label className="absolute -top-2 text-[#85929E] left-3 bg-white text-xs" htmlFor="company">
                            Company Name (Optional)
                          </label>
                          <input
                            className="appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 border-[#DDE6F5] leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                            type="text"
                            placeholder="Company Name"
                            id="company"
                            {...register("company")}
                          />
                        </div>
                      </div>
                      {/* Country / Region */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.country ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="country"
                          >
                            Country / Region
                          </label>
                          <select
                            title="Country"
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.country ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            id="country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                          >
                            <option value="">Select Country</option>
                            {country.map((item, index) => (
                              <option key={index} value={item.isoCode}>
                                {item.flag} {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Street address */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      <div className="w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.address_1 ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="address_1"
                          >
                            Street Address
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.address_1 ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="text"
                            placeholder="Address"
                            id="address_1"
                            {...register("address_1", {
                              required: "Address is required",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Town / City & District */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      {/* Town / City */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.city ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="city"
                          >
                            Your Town / City
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.city ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="text"
                            placeholder="City"
                            id="city"
                            {...register("city", {
                              required: "City is required",
                            })}
                          />
                        </div>
                      </div>
                      {/* State */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.address_2 ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="address_2"
                          >
                            Information de livraison
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.address_2 ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="text"
                            placeholder="Complément d'adresse"
                            id="address_2"
                            {...register("address_2")}
                          />
                          {/*  <label
                            className={`absolute -top-2 ${errors.state ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="state"
                          >
                            Your State
                          </label>
                          <select
                            title="state"
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 border-[#DDE6F5] leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.state ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            id="state"
                            {...register("state", {
                              required: "State is required",
                            })}
                          >
                            <option value="">Select State</option>
                            {state.map((item: any, index: any) => (
                              <option key={index} value={item.value}>
                                {item.name}
                              </option>
                            ))}
                            </select>*/}
                        </div>
                      </div>
                    </div>
                    {/* Postcode / ZIP & Phone */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      {/* Postcode / ZIP */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.postcode ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="postcode"
                          >
                            Postcode / ZIP
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.postcode ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="text"
                            placeholder="Your Postcode / ZIP"
                            id="postcode"
                            {...register("postcode", {
                              required: "Postcode is required",
                            })}
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div className="sm:w-1/2 w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.phone ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="phone"
                          >
                            Phone
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.phone ? "border-red-400" : "border-[#DDE6F5]"} `}
                            type="tel"
                            placeholder="Your Phone"
                            id="phone"
                            {...register("phone", {
                              required: "Phone is required",
                            })}
                          />

                        </div>
                      </div>
                    </div>
                    {/* Email address */}
                    <div className="sm:flex grid sm:gap-5 gap-8">
                      <div className="w-full">
                        <div className="relative">
                          <label
                            className={`absolute -top-2 ${errors.email ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="email"
                          >
                            Email Address
                          </label>
                          <input
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.email ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            type="email"
                            placeholder="Your Email Address"
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",
                              },
                            })}
                          />

                          {errors.email && typeof errors.email.message === 'string' && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                          )}

                        </div>
                      </div>
                    </div>
                    {/* Mot de passe */}
                    {!userLogin && (
                      <div className="sm:flex grid sm:gap-5 gap-8">
                        <div className="w-full">
                          <div className="relative">
                            <label
                              className={`absolute -top-2 ${errors.password ? "text-red-400" : "text-[#85929E]"} left-3 bg-white text-xs`}
                              htmlFor="password"
                            >
                              Mot de passe
                            </label>
                            <input
                              type="password"
                              id="password"
                              className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.password ? "border-red-500" : "border-themeSecondary300"}`}
                              placeholder="Password"
                              {...register("password", {
                                required: "Le mot de passe est requis",
                                pattern: {
                                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                  message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
                                },
                              })}
                            />
                            {errors.password && typeof errors.password.message === 'string' && (
                              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Policy checkbox */}
                    {/* {!userLogin && (
                      <div className="sm:flex grid sm:gap-5 gap-8">
                        <div className="w-full">
                          <div className="relative">
                            <div
                              className={`border rounded-md w-full flex gap-3 py-3.5 px-5 ${errors.accountPolicy
                                ? "text-redLight border-redLight"
                                : "border-[#DDE6F5] text-[#85929E]"
                                } leading-tight`}
                            >
                              <input
                                type="checkbox"
                                {...register("accountPolicy", {
                                  required: "Account Policy is required",
                                })}
                                defaultChecked={!userLogin}
                                id="accountPolicy"
                                className="flex-none form-check-input h-4 w-4 mt-1 border border-gray-300 rounded-sm bg-white checked:bg-blueTwo checked:border-blueTwo focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer group"
                              />
                              <label htmlFor="accountPolicy">
                                You are not logged in. We will automatically create a new account with your email
                                address. We will send you an email with your account details. If you already have an
                                account, please log in.
                              </label>
                            </div>
                            <label
                              className={`absolute -top-2 ${errors.accountPolicy ? "text-redLight" : "text-[#85929E]"
                                } left-3 bg-white text-xs`}
                            >
                              Account Policy
                            </label>
                          </div>
                        </div>
                      </div>
                    )} */}
                    {/* checkbox for shipping address */}
                    <div className="flex gap-3">
                      <input
                        onChange={handleOnChangeShipingCheck}
                        defaultChecked={shipingCheck}
                        id="ship-checkbox"
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer accent-themePrimary700"
                      />
                      <label htmlFor="ship-checkbox" className="text-base text-themeSecondary600">
                        Ship to a different address instead of the billing address
                      </label>
                    </div>

                  </div>
                  {/* shipping address form */}
                  {shipingCheck && (
                    <div className="grid lg:gap-3 gap-8">
                      {/* Form Title */}
                      <p className="text-xl font-medium p-2.5 bg-themeSecondary100 rounded-xl text-themeSecondary800">
                        Shipping Details
                      </p>
                      <div className="w-full grid gap-8">
                        {/* First Name & Last Name */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          {/* First Name */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.first_name ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="first_name"
                              >
                                First Name
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 ${errors.shipping_first_name ? "border-red-400" : "border-[#DDE6F5]"} text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline`}
                                type="text"
                                placeholder="First Name"
                                id="shipping_first_name" // Ajustez l'ID pour correspondre au nom enregistré
                                {...register("shipping_first_name", {
                                  required: shipingCheck && "First Name is required", // Rendre obligatoire si shipingCheck est true
                                })}
                              />
                            </div>
                          </div>
                          {/* Last Name */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.last_name ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="last_name"
                              >
                                Last Name
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 ${errors.shipping_last_name ? "border-red-400" : "border-[#DDE6F5]"} text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline`}
                                type="text"
                                placeholder="Last Name"
                                {...register("shipping_last_name", {
                                  required: shipingCheck ? "Last Name is required" : false,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        {/* company name & country */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          {/* Company name */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label className="absolute -top-2 text-[#85929E] left-3 bg-white text-xs" htmlFor="company">
                                Company Name (Optional)
                              </label>
                              <input
                                className="appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 border-[#DDE6F5] leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                                type="text"
                                placeholder="Company Name (Optional)"
                                {...register("shipping_company")}
                              />
                            </div>
                          </div>
                          {/* Country / Region */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.country ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="country"
                              >
                                Country / Region
                              </label>
                              <select
                                title="Country"
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.shipping_country ? "border-red-400" : "border-[#DDE6F5]"}`}
                                {...register("shipping_country", {
                                  required: shipingCheck ? "Country is required" : false,
                                })}
                              >
                                <option value="">Select Country</option>
                                {country.map((item, index) => (
                                  <option key={index} value={item.isoCode}>
                                    {item.flag} {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* Street address */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          <div className="w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.address_1 ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="address_1"
                              >
                                Street Address
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.shipping_address_1 ? "border-red-400" : "border-[#DDE6F5]"}`}
                                type="text"
                                placeholder="Address"
                                {...register("shipping_address_1", {
                                  required: shipingCheck ? "Address is required" : false,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Town / City & District */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          {/* Town / City */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.city ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="city"
                              >
                                Your Town / City
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.shipping_city ? "border-red-400" : "border-[#DDE6F5]"}`}
                                type="text"
                                placeholder="City"
                                {...register("shipping_city", {
                                  required: shipingCheck ? "City is required" : false,
                                })}
                              />
                            </div>
                          </div>
                          {/* State */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.address_2 ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="address_2"
                              >
                                Information de livraison
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.address_2 ? "border-red-400" : "border-[#DDE6F5]"
                                  }`}
                                type="text"
                                placeholder="Complément d'adresse"
                                id="address_2"

                                name="address_2"

                              />
                              {/*  <label
                            className={`absolute -top-2 ${errors.state ? "text-red-400" : "text-[#85929E]"
                              } left-3 bg-white text-xs`}
                            htmlFor="state"
                          >
                            Your State
                          </label>
                          <select
                            title="state"
                            className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 border-[#DDE6F5] leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.state ? "border-red-400" : "border-[#DDE6F5]"
                              }`}
                            id="state"
                            {...register("state", {
                              required: "State is required",
                            })}
                          >
                            <option value="">Select State</option>
                            {state.map((item: any, index: any) => (
                              <option key={index} value={item.value}>
                                {item.name}
                              </option>
                            ))}
                            </select>*/}
                            </div>
                          </div>
                        </div>
                        {/* Postcode / ZIP & Phone */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          {/* Postcode / ZIP */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.postcode ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="postcode"
                              >
                                Postcode / ZIP
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.shipping_postcode ? "border-red-400" : "border-[#DDE6F5]"}`}
                                type="text"
                                placeholder="Your Postcode / ZIP"
                                {...register("shipping_postcode", {
                                  required: shipingCheck ? "Postcode is required" : false,
                                })}
                              />
                            </div>
                          </div>
                          {/* Phone */}
                          <div className="sm:w-1/2 w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.phone ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="phone"
                              >
                                Phone
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.phone ? "border-red-400" : "border-[#DDE6F5]"} `}
                                type="tel"
                                placeholder="Your Phone"
                                id="phone"
                                {...register("phone", {
                                  required: "Phone is required",
                                })}
                              />

                            </div>
                          </div>
                        </div>
                        {/* Email address */}
                        <div className="sm:flex grid sm:gap-5 gap-8">
                          <div className="w-full">
                            <div className="relative">
                              <label
                                className={`absolute -top-2 ${errors.email ? "text-red-400" : "text-[#85929E]"
                                  } left-3 bg-white text-xs`}
                                htmlFor="email"
                              >
                                Email Address
                              </label>
                              <input
                                className={`appearance-none border rounded-md w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline ${errors.shipping_email ? "border-red-400" : "border-[#DDE6F5]"}`}
                                type="email"
                                placeholder="Your Email Address"
                                {...register("shipping_email", {
                                  required: shipingCheck ? "Email is required" : false,
                                  pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address",
                                  },
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Order Button */}
                    <button
                      id="buy-button"
                      type="submit"
                      className={`${isValid && !isItemOutOfStock && !formLoader
                        ? "bg-orangeTwo shadow-4xl text-white hover:opacity-70 cursor-pointer"
                        : "bg-gray-800 shadow-md text-white cursor-not-allowed opacity-50"
                        } transition-all duration-300 ease-in-out flex justify-center items-center gap-4 rounded-md text-base font-semibold font-Roboto capitalize py-4 px-7 mt-6`}
                      disabled={!isValid || formLoader || isItemOutOfStock}
                    >
                      {formLoader ? "Processing..." : "Place Order"}
                      {formLoader && <FormLoader color="text-white" />}
                    </button>

                    {/* Return to cart */}
                    <div className="flex justify-between mt-6">
                      <a
                        href="/cart"
                        className="flex items-center font-semibold text-themeNevyLight hover:text-themeRedLight text-base transition hover:duration-300 group"
                      >
                        <svg
                          className="mr-2.5 fill-themeNevyLight group-hover:fill-themeRedLight transition hover:duration-300"
                          width="16"
                          height="10"
                          viewBox="0 0 16 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292892 5.70711C-0.097633 5.31658 -0.0976329 4.68342 0.292892 4.29289L4.29289 0.292892C4.68342 -0.0976324 5.31658 -0.0976324 5.70711 0.292893C6.09763 0.683416 6.09763 1.31658 5.70711 1.70711L3.41421 4L15 4C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6L3.41421 6L5.70711 8.29289C6.09763 8.68342 6.09763 9.31658 5.70711 9.70711Z"
                          />
                        </svg>
                        Return to cart
                      </a>
                    </div>
                  </div>
                </form>
              )}
              {/* Cart Empty */}
              {(!cartData || cartData?.length === 0) && (
                <div className="flex-col flex gap-5 justify-center items-center min-h-[200px]">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-gray-400"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <desc></desc>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="6" cy="19" r="2"></circle>
                    <circle cx="17" cy="19" r="2"></circle>
                    <path d="M17 17h-11v-14h-2"></path>
                    <path d="M6 5l7.999 .571m5.43 4.43l-.429 2.999h-13"></path>
                    <path d="M17 3l4 4"></path>
                    <path d="M21 3l-4 4"></path>
                  </svg>
                  <h3 className="text-center text-gray-400 text-xl">Your cart is currently empty.</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Checkout Order Summery */}
        <div id="summary" className="2xl:max-w-md lg:w-1/3 w-11/12 mx-auto h-fit">
          <div className="bg-white sticky_menu top-2 p-6 shadow-md rounded-xl overflow-hidden">
            {/* Form Loader */}
            {(!cartData || loading) && <LoaderGrowing />}
            {/* Title */}
            <h1 className="font-semibold text-2xl pb-7">Order Summary</h1>
            {/* Order summary */}
            <div className="relative max-h-80 overflow-y-auto mb-10 scrollBar">
              {cartData && cartData.length > 0 ? (
                cartData.map((item: any) => (
                  <div className="mb-7 flex gap-5" key={item.id}>
                    {/* Image here */}
                    <div className="flex-none">
                      {item?.featured_image ? (
                        <Image
                          src={item.featured_image}
                          alt="Product"
                          width={90}
                          height={90}
                          className="w-full rounded-md object-cover"
                          priority
                          placeholder="blur"
                          blurDataURL={item.featured_image}
                        />
                      ) : (
                        <div className="w-[90px] h-[90px] rounded-md bg-[#F2F4F4] flex items-center justify-center" />
                      )}
                    </div>
                    {/* Product details */}
                    <div className="flex-initial w-auto mr-1">
                      <h3 className="line-clamp-2 text-lg text-[#283747] mb-3 leading-5">{item.title}</h3>
                      <span className="text-[#283747] leading-7">
                        {`${Math.round(Number(item.price) / 100).toFixed(2)}€ x ${item.quantity.value}`}
                      </span>
                    </div>
                    {item.quantity.value > item.quantity.max_purchase && item.quantity.max_purchase > 0 && (
                      <div className="text-sm text-orange-500">
                        Quantité ajustée à {item.quantity.max_purchase} en raison du stock.
                      </div>
                    )}
                    {item.quantity.max_purchase <= 0 && (
                      <>
                        <p className="text-sm text-red-500 mb-2">
                          Cet article n'est plus en stock, veuillez le retirer de votre panier.
                        </p>
                        <button
                          className="text-sm text-red-500 hover:underline"
                          onClick={() => removeCartItemHandler(item.item_key, () => { })}
                        >
                          {loading ? 'Suppression...' : 'Supprimer'}
                          {removingItemId === item.item_key ? (
                            'Suppression...'
                          ) : (
                            'Supprimer'
                          )}
                        </button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-14">
                  <h1 className="text-lg font-medium text-center text-gray-400">Your cart is empty</h1>
                </div>
              )}
            </div>
            {/* Discount Coupon input */}
            <form onSubmit={couponHandleSubmit(couponSubmitHandler)}>
              <div className="flex">
                <div className="w-full">
                  <div className="relative">
                    <label
                      htmlFor="couponCode"
                      className={`absolute -top-2 ${couponErrors.couponCode ? "text-red-400" : "text-[#85929E]"
                        } left-3 bg-white text-xs`}
                    >
                      Discount Coupon
                    </label>
                    <input
                      className={`appearance-none border rounded-tl-md rounded-bl-md w-full py-3.5 px-5 ${couponErrors.couponCode ? "border-red-400" : "border-[#DDE6F5]"
                        } text-gray-700 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline`}
                      type="text"
                      id="couponCode"
                      placeholder="Coupon Code"
                      {...couponRegister("couponCode", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!couponIsValid || couponLoader}
                  className={`bg-gradient-to-br ${couponIsValid ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"
                    } from-blueOne to-blueTwo flex justify-center items-center rounded-r duration-500 ease-in-out py-3 px-5 text-base text-white`}
                >
                  {couponLoader ? <FormLoader color="text-white" /> : "Apply"}
                </button>
              </div>
            </form>
            {/* information */}
            <div className="mt-5">
              <ul>
                {/* Sub-Total */}
                <li className="flex font-medium justify-between py-2 text-base text-[#5D6D7E]">
                  <span>Sub Total</span>
                  <span className="text-[#1B2631]">
                    ${summeryData?.subtotal?.toFixed(2) || 0}
                    {/* <span className="text-[#85929E] text-sm">/year</span> */}
                  </span>
                </li>
                {/*Livraison*/}
                <div>
                  <DeliveryOptions
                    ShippingMethod={shippingMethods}
                    shippingTotal={billingData.shipping_total}
                    onShippingChange={handleShippingChange} // Ajout de la callback
                    cartData={cartData}
                    updateCart
                    selectedShippingMethod={selectedShippingMethod}

                  />
                </div>
                {/* Discount */}
                <li className="flex font-medium justify-between py-2 text-base text-[#5D6D7E]">
                  <span>Discount</span>
                  <span className="text-[#FA4F58] flex gap-3 items-center">
                    - {summeryData?.discount.toFixed(2) || 0}
                    {cart?.discount?.type === 'percent' ? '%' : '€'}
                    {/* add delete icon */}
                    {summeryData?.discount > 0 && (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 cursor-pointer"
                        onClick={couponRemoveHandler}
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path>
                        </g>
                      </svg>
                    )}
                  </span>
                </li>
                {/* Renewal On */}
                <li className="flex font-medium justify-between py-2 text-base text-[#5D6D7E] border-t-2">
                  <span className="text-bold">Total</span>
                  <span className="text-[#1B2631]">
                    {/*${summeryData?.total?.toFixed(2) || 0}*/}
                    {calculateTotal()}
                  </span>
                </li>
              </ul>
            </div>
            {/* checkboxs */}
            <div className="mt-8">

              {/* newsletter checkbox */}
              {signUpData && (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center justify-between">
                      <input id="subscription" type="checkbox" defaultChecked />
                      <label htmlFor="subscription" className="ml-1 font-normal text-sm text-themeNevyLight">
                        {signUpData.title || "Sign me up to receive emil updates and news (optional)"}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* aggreement checkbox */}
              {companyPolicyData && (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center justify-between">
                      <input id="policy" type="checkbox" defaultChecked />
                      <label htmlFor="policy" className="ml-1 font-normal text-sm text-themeNevyLight">
                        {companyPolicyData.title || "I agree with the"}
                        <a
                          href={companyPolicyData.link.url || "#"}
                          target={companyPolicyData.link.target || "_self"}
                          rel="noopener noreferrer"
                          className="font-semibold text-themeRedLight hover:text-themeDark transition hover:duration-300"
                        >
                          {" "}
                          {companyPolicyData.companyName || "Company Policies"}
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* Add a image  
              <div className="flex justify-center mt-6 w-1/3">
                <Image
                  src="/2checkout_logo.png"
                  alt="payment icon"
                  width="300"
                  height="100"
                  priority
                  placeholder="blur"
                  blurDataURL="/2checkout_logo.png"
                />
              </div>
              {/*Paiement*/}
              <PaymentMethods onPaymentMethodChange={onPaymentMethodChange} paymentMethods={paymentMethods} billing={watchedFields} shippingDetails={shippingDetails} shipingCheck={shipingCheck} isAlmaEligible={isAlmaEligible} almaEligibilityDetails={almaEligibilityDetails} onInstallmentsChange={onInstallmentsChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function convertPrice(subtotal: any) {
  throw new Error("Function not implemented.");
}
