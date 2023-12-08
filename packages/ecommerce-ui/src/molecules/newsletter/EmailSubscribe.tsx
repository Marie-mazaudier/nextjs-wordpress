import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";

interface EmailSubscribeProps {
  placeholder: string;
  description?: string;
  buttonText?: string;
  formSubmit?: (data: string) => void;
  formLoading?: boolean;
}

export const EmailSubscribe = ({
  buttonText,
  placeholder = "Subscribe",
  description,
  formSubmit,
  formLoading = false,
}: EmailSubscribeProps) => {
  const [email, setEmail] = React.useState<string>("");
  const [loader, setLoader] = React.useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const data = {
      email,
    } as unknown as string;

    if (formSubmit) {
      formSubmit(data);
    } else {
      setTimeout(() => {
        console.warn("No formSubmit function provided, please provide formSubmit function to get data");
        setLoader(false);
      }, 1000);
    }
    e.currentTarget.reset();
  };

  return (
    <div>
      <BodyText size="lg" intent="bold" className="text-white mb-6">
        Newsletter
      </BodyText>
      <BodyText size="sm" className=" text-themeSecondary300 mb-4">
        {description}
      </BodyText>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
          className=" w-full xl:w-fit text-white text-sm leading-5 px-4 py-2.5 outline-none bg-themeSecondary800 placeholder:text-themeSecondary500 rounded-l-full"
          placeholder={placeholder}
        />
        <button
          type="submit"
          disabled={loader || formLoading}
          className={`text-base leading-6 px-6 py-2.5 bg-themePrimary600 text-white hover:bg-themeSecondary800 transition hover:duration-700 rounded-r-full ${loader || formLoading ? "loading" : ""
            }`}
        >
          <BodyText size="sm" intent="semibold" className=" py-[2px]">
            {loader || formLoading ? "Processing..." : buttonText}
          </BodyText>
        </button>
      </form>
    </div>
  );
};
