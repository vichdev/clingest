"use client";
import Image from "next/image";
import * as React from "react";
import calendar from "@/assets/calendar.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Home: React.FC = () => {
  const [locationOptions, setLocationOptions] = React.useState<
    Array<{ value: string }>
  >([
    {
      value: "Clínica Integrar",
    },
    {
      value: "Clínica Eu Psicologia",
    },
    {
      value: "Online",
    },
  ]);

  const formSchema = zod.object({
    nome: zod.string().min(3, {
      message: "O nome deve ter pelo menos 3 caracteres",
    }),
    contato: zod.number({
      required_error: "Contato é obrigatório",
      invalid_type_error: "Insira um número válido",
    }),
  });

  return (
    <div className="flex flex-row h-screen items-center justify-between">
      <div className="w-full flex flex-row items-center justify-center">
        <Image
          src={calendar}
          alt="Mulher marcando datas em seu caléndario"
          className="w-6/12"
        />
      </div>
      <div className="shadow-lg h-full w-full max-w-xl flex flex-col p-5">
        <Card>
          <CardHeader>
            <CardTitle>Agendar</CardTitle>
            <CardDescription>
              Agende sua consulta com Tâmara Saade
            </CardDescription>
          </CardHeader>
          <Form control={}>
            <CardContent className="space-y-5">
              <div>
                <Label>Nome</Label>
                <Input placeholder="Nome completo" type="text" />
              </div>

              <div>
                <Label>Contato</Label>
                <Input placeholder="Telefone para contato" type="tel" />
              </div>
              <div>
                <Label>Local de atendimento</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Localizações</SelectLabel>
                      {locationOptions.length > 0 &&
                        locationOptions.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item.value}>
                              {item.value}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Agendar</Button>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Home;
