import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../atoms/button/Button";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading1 } from "../../atoms/typography/headingText/heading1";
interface CountDownProps {
  sectionTitle?: string;
  startingDate?: string;
  buttonText?: string;
  buttonLink?: string;
}
export const CountDown = ({
  sectionTitle = " Our Best Selling Products",
  startingDate = "Jan 21, 2023 00:00:00",
  buttonText = "  View All Deals",
  buttonLink = "/shop",
}: CountDownProps) => {
  const [month, setMonths]: any = useState("00");
  const [day, setDays]: any = useState("00");
  const [hour, setHous]: any = useState("00");
  const [minute, setMinutes]: any = useState("00");
  const [second, setsecond]: any = useState("00");
  let interval: any = useRef();
  const startTimer = () => {
    const countDownDate = new Date(`${startingDate}`).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setMonths(months);
        setDays(days);
        setHous(hours);
        setMinutes(minutes);
        setsecond(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div className="flex flex-col items-center gap-7 md:flex-row justify-between">
      <Heading1 intent="bold" className=" text-themeSecondary800">
        {sectionTitle}
      </Heading1>
      <Link href={`${buttonLink}`}>
        <Button size="xl" type="pill">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};
