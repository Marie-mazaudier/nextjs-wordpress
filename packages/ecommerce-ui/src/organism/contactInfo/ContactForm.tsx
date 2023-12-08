import React from "react";
import { Button } from "../../atoms/button/Button";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { Heading2 } from "../../atoms/typography/headingText/Heading2";

interface ContactFormProps {
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  price?: number;
  formhandleChange?: (e: any) => any;
  formhandleClick?: (e: any) => any;
}

export const ContactForm = ({
  src = "/image/Map.png",
  imageWidth = 660,
  imageHeight = 510,
  formhandleChange,
  formhandleClick,
}: ContactFormProps) => {
  return (
    <section className="px-5 md:px-0">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">
        <div>
          <Heading2 intent="bold" className=" text-themeSecondary800">
            Send Message
          </Heading2>
          <form className="mt-7">
            <div className="flex items-center gap-5">
              <input
                className="w-full px-5 py-3 text-base outline-none bg-themeSecondary100 border rounded placeholder:text-themeSecondary400"
                placeholder="Name"
                type="text"
                name="name"
                onChange={formhandleChange}
              />
              <input
                className="w-full px-5 py-3 text-base outline-none bg-themeSecondary100 border rounded placeholder:text-themeSecondary400"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                type="email"
                name="email"
                onChange={formhandleChange}
              />
            </div>
            <input
              className="w-full px-5 py-3 text-base outline-none bg-themeSecondary100 border rounded placeholder:text-themeSecondary400 mt-5"
              placeholder="SubJect"
              type="text"
              name="subject"
              onChange={formhandleChange}
            />
            <textarea
              rows={8}
              cols={50}
              placeholder="Write your message..."
              name="message"
              className="w-full px-5 py-3 text-base outline-none bg-themeSecondary100 border rounded placeholder:text-themeSecondary400 mt-5"
              onChange={formhandleChange}
            />
            <div onClick={formhandleClick} className="w-fit h-auto mt-5">
              <Button size="xl">Send Message</Button>
            </div>
          </form>
        </div>
        <div>
          <Placeholder src={src} imageWidth={imageWidth} imageHeight={imageHeight} />
        </div>
      </div>
    </section>
  );
};
