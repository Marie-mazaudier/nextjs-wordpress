import React from "react";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";


export const SocialShare = () => {
  const router = useRouter();

  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  return (
    <div className="flex gap-7">
      <BodyText intent="medium" size="md" className="text-themeSecondary900">
        Share On
      </BodyText>
      <div className="flex gap-2">
        <FacebookShareButton url={fullUrl}>
          <FacebookIcon size={26} round />
        </FacebookShareButton>
        <TwitterShareButton url={fullUrl}>
          <TwitterIcon size={26} round />
        </TwitterShareButton>
        <LinkedinShareButton url={fullUrl}>
          <LinkedinIcon size={26} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={fullUrl}>
          <WhatsappIcon size={26} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
