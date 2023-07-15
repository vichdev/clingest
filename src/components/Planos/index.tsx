import Image from "next/image";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import camed from "@/assets/camed.png";
import brasdesco from "@/assets/brasdesco.png";
import fusex from "@/assets/fusex.png";
import { planos } from "@/components/Planos/resources/planos";

const Planos: React.FC = () => {
  const getImageByPath = (path: string) => {
    return require(`@/assets/${path}.png`);
  };

  return (
    <Card className="border-none p-6 shadow-none">
      <CardHeader className="p-0 mb-2">
        <CardTitle>Planos</CardTitle>
      </CardHeader>
      <div className="flex flex-row space-x-5">
        {planos.length > 0 &&
          planos.map((plano) => {
            return (
              <div className="w-20 h-20 object-fill flex items-center">
                <Image
                  src={getImageByPath(plano.name)}
                  alt={`Logo do plano ${plano.name}`}
                />
              </div>
            );
          })}
      </div>
    </Card>
  );
};

export default Planos;
