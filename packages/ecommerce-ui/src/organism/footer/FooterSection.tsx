import Link from "next/link";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";

interface FooterSectionProps {
  title: string;
  data: any;
}

export const FooterSection = ({ title, data }: FooterSectionProps) => {
  return (
    <div className="mt-1.5">
      <BodyText size="lg" intent="bold" className="text-white">
        {title}
      </BodyText>
      <div className="flex flex-col gap-2.5 mt-4 w-fit">
        {data.map((singleData: any, index: number) => (
          <div key={index}>
            <Link href={singleData.link} >
              <BodyText
                size="sm"
                className=" w-fit text-themeSecondary300 whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700"
              >
                {singleData.name}
              </BodyText>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
