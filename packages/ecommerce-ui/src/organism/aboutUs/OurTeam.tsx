import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading1 } from "../../atoms/typography/headingText/heading1";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

interface OurTeamProps {
  src?: string;
}
export const OurTeam = ({ src = "/image/team1.png" }: OurTeamProps) => {
  return (
    <section className=" bg-[#F1F5F9] py-28">
      <div className=" container mx-auto">
        <div className="flex items-center justify-center">
          <div className=" md:w-9/12 lg:w-6/12 xl:w-5/12">
            <Heading1 intent="semibold" className=" text-themeSecondary800 text-center">
              Our Expert Team
            </Heading1>
            <BodyText size="lg" className=" text-themeSecondary600 mt-5 text-center">
              Learn more about our story and the hard-working people behind the pink envelope.
            </BodyText>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 justify-items-center px-4 sm:px-0">
          {employeeData.map((singleEmployee: any, index: number) => (
            <div key={index}>
              <Placeholder src={singleEmployee.src} imageWidth={315} imageHeight={360} />
              <Heading3 intent="medium" className=" text-themeSecondary900">
                {singleEmployee.name}
              </Heading3>
              <BodyText size="md" className=" text-themeSecondary900">
                {singleEmployee.title}
              </BodyText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const employeeData = [
  {
    src: "/image/team1.png",
    name: "Linh Nguyen",
    title: "Owner & Founder",
  },
  {
    src: "/image/team2.png",
    name: "Linh Nguyen",
    title: "Owner & Founder",
  },
  {
    src: "/image/team3.png",
    name: "Linh Nguyen",
    title: "Owner & Founder",
  },
  {
    src: "/image/team4.png",
    name: "Linh Nguyen",
    title: "Owner & Founder",
  },
];
