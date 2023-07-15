"use client";
import Image from "next/image";
import * as React from "react";
import calendar from "@/assets/calendar.svg";
import RegisterForm from "@/components/Form";

const Home: React.FC = () => {
  return (
    <div className="flex flex-row h-screen items-center justify-between">
      <div className="w-full flex flex-row items-center justify-center">
        <Image
          src={calendar}
          alt="Mulher marcando datas em seu caléndario"
          className="w-6/12"
        />
      </div>
      <RegisterForm />
    </div>
  );
};

export default Home;
