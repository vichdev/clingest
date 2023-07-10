import React from "react";
import calendario from "@/assets/calendario.svg";
import Image from "next/image";
import Input from "@/components/Input";
import * as Styles from "./styles";

const Home: React.FC = () => {
  return (
    <Styles.HomeWrapper>
      <h3>Agende sua consulta</h3>
      <Input />
      <Image priority alt="Calendário" src={calendario} />
    </Styles.HomeWrapper>
  );
};

export default Home;
