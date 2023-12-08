import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoWithTextProps {
  img?: any;
  className?: string;
}

export const LogoWithText = ({ img = "/logo.png", className }: LogoWithTextProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <Image src={img} alt="Logo" width={158} height={32} />
      </Link>
    </div>
  );
};
