import React, { useState, useEffect } from "react";
import { BodyText, Placeholder } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});

interface NavbarBottomProps {
}
export const NavbarBottom = ({ }: NavbarBottomProps) => {
  const [open, SetOpen] = useState(false);
  const [LoginmodalOn, setLoginModalOn] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section>
      <nav className={`bg-transparent flex items-center justify-between py-5 `}>
        <div className="container mx-auto flex justify-center ">
          <Link href="/" className="">
            <Image
              src={"/image/logos/logo_francine.png"}
              alt="Logo"
              width={226}
              height={60}
              className={`logo ${isSticky ? "opaciteIn" : "opaciteOut"}`}
            />
          </Link>
        </div>
      </nav>
    </section >
  );
};
