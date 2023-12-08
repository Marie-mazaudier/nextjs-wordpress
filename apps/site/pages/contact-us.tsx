import Head from "next/head";
import React from "react";
import { contactData } from "../src/data/ContactData";
import { BreadcrumbTwo, ContactForm, ContactInfo, Spaces } from "@jstemplate/ecommerce-ui";
import { useToasts } from "react-toast-notifications";

const ContactUs = () => {
  const { addToast } = useToasts();
  const [formInfo, setFormInfo] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  }) as any;

  // handle change form
  const formhandleChange = (e: any) => setFormInfo({ ...formInfo, [e.target.name]: e.target.value });

  // handle click form
  const formhandleClick = (e: any) => {
    e.preventDefault();
    // check if any field is empty
    const checkEmptyInput = Object.values(formInfo).some((input) => input === "");
    if (checkEmptyInput) {
      addToast("Please fill out all fields", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
      return;
    }
    // write here your code
  };

  return (
    <>
      <Head>
        <title>Contact-Us Page | MetaShop</title>
        <meta name="description" content="contact page description" />
      </Head>
      <BreadcrumbTwo />
      <Spaces />
      <ContactInfo data={contactData} />
      <Spaces />
      <ContactForm formhandleChange={formhandleChange} formhandleClick={formhandleClick} />
      <Spaces />
    </>
  );
};

export default ContactUs;
