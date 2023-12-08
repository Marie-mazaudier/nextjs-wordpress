import React from "react";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

interface NewsletterProps {
  buttonText?: string;
  placeholder?: string;
  backgroundImage?: string;
  formSubmit?: (email: string) => Promise<any>; // Update formSubmit prop
  formLoading?: boolean;
}


export const Newsletter = ({
  buttonText,
  placeholder = "Your Email",
  backgroundImage = "/image/newslatter.png",
  formSubmit,
  formLoading = false,
}: NewsletterProps) => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  // Ajout d'une ref pour le formulaire
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Définissez loading à true lorsque le formulaire est soumis

    setSuccess(false);

    if (formSubmit) {
      try {
        await formSubmit(email); // Pass the email as a string
        setSuccess(true); // Définissez le succès sur true en cas de réussite
      } catch (error) {
        console.warn("Failed to add email to Brevo list:", error);
        setError("Failed to add email to the list."); // Définissez le message d'erreur
      } finally {
        setLoading(false); // Arrêtez le chargement, qu'il ait réussi ou échoué
      }
    } else {
      setTimeout(() => {
        console.warn("No formSubmit function provided, please provide formSubmit function to get data");
        setLoading(false);
      }, 1000);
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const showError = () => (
    <div className="flex items-center p-4 mb-4  rouge rounded-lg bg-transparent" role="alert" style={{ display: error ? '' : 'none' }}>
      <div>
        <span className="font-medium"> Votre email n'a pas pu être enregistré, merci de réessayer.</span>
      </div>
    </div >
  );

  const showSuccess = () => (

    <div className="flex items-center p-4 mb-4  vert rounded-lg bg-transparent" role="alert" style={{ display: success ? '' : 'none' }}>
      <div>
        <span className="font-medium">Votre email a bien été ajouté à notre Newsletter</span>
      </div>
    </div >

  );

  const showLoading = () => (
    <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
      Loading...
    </div>
  );

  return (
    <section
      className="relative px-5 h-[70vh] flex flex-col justify-center md:px-0 "
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black opacity-25 w-full h-full z-10"></div>
      <div className="flex items-center justify-center container mx-auto z-20">
        <div className="w-full lg:w-10/12 p-7 md:p-20 xl:pl-24">
          <Heading3 intent="medium" className="blanc text-center normal-case	italic ">
            Le domaine propose régulièrement à ses clients fidèles des offres privilégiées.<br />
            Inscrivez-vous pour en profiter!
          </Heading3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 md:mt-10 flex items-center justify-center lg:justify-center flex-col md:flex-row gap-2 md:gap-4"
          >
            <input
              placeholder={placeholder}
              onChange={handleChange}
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              className="w-full md:w-7/12 lg:w-5/12 text-base leading-7 px-6 py-3 outline-none border border-themeSecondary200 bg-white"
            />
            <button
              type="submit"
              disabled={loading || formLoading} // Utilisez loading au lieu de loader
              className={` leading-7 px-7 py-3 bg-principal text-white hover:bg-secondaire hover:text-white transition hover:duration-700 rounded-none ${loading || formLoading ? "loading" : "" // Utilisez loading au lieu de loader
                }`}
            >
              {loading || formLoading ? "Processing..." : buttonText} {/* Utilisez loading au lieu de loader */}
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center container mx-auto z-20">
        {showSuccess()}
        {showError()}
        {showLoading()}
      </div>

    </section>
  );
};
