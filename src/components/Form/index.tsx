import * as React from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { AiTwotoneCalendar as CalendarIcon } from "react-icons/ai";
import ptBR from "date-fns/locale/pt-BR";
import { AiFillHeart } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Planos from "../Planos";

const RegisterForm: React.FC = () => {
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
  const [hour, setHour] = React.useState<string>("");
  const hours = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];

  const dateFooter = (
    <Select
      onValueChange={(newValue) => setHour(newValue)}
      required={true}
      value={hour ? hour : undefined}
    >
      <SelectTrigger className="w-full mt-5">
        <SelectValue placeholder="Selecione um horário" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {hours.length > 0 &&
            hours.map((item, index) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  const formSchema = zod.object({
    nome: zod.string({ required_error: "Required" }).min(3, {
      message: "O nome deve ter pelo menos 3 caracteres",
    }),
    contato: zod
      .string({
        required_error: "Contato é obrigatório",
        invalid_type_error: "Insira um número válido",
      })
      .min(11, {
        message: "Insira um número válido",
      }),

    local: zod.string().optional(),
    data: zod.date({ required_error: "Campo obrigatório" }),
    hour: zod.string(),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      contato: "",
      local: undefined,
      data: undefined,
      hour: hour,
    },
  });

  function onSubmit(formValue: zod.infer<typeof formSchema>) {
    const date = format(formValue.data, "PPP", {
      locale: ptBR,
    });
    const link = `https://wa.me/5579999056646?text=Ol%C3%A1%20me%20chamo%20${formValue.nome}!%20Meu%20contato%20%C3%A9%20*${formValue.contato}*%20e%20gostaria%20de%20agendar%20uma%20consulta%20em%20${formValue.local},%20%C3%A0s%20${hour}%20de%20${date}.`;
    window.open(link);
  }

  return (
    <Card className="xxl:shadow-lg xxl:border-2 h-full w-full xxl:max-w-xl flex flex-col p-5 justify-between m-auto max-w-[600px] shadow-none border-none">
      <CardContent>
        <CardHeader className="p-0 mb-5">
          <CardTitle>Agendar</CardTitle>
          <CardDescription>Agende sua consulta!</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col"
          >
            <FormField
              control={form.control}
              name="nome"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <Input
                    placeholder="Nome completo"
                    type="text"
                    required={true}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contato"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato *</FormLabel>
                  <Input
                    placeholder="Contato"
                    type="tel"
                    maxLength={11}
                    required={true}
                    {...field}
                  />
                  <FormDescription>Ex: 79998153040</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 xs:flex-row">
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="w-full xs:w-auto">
                    <FormLabel>Local de atendimento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className=" w-full xs:w-[180px]">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="data"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data e hora</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="w-full">
                        <Button variant={"outline"}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value && hour ? (
                            `${format(field.value, "PPP", {
                              locale: ptBR,
                            })}, ${hour}`
                          ) : (
                            <span>Escolha uma data e hora</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          weekStartsOn={6}
                          initialFocus
                          selected={field.value}
                          onSelect={field.onChange}
                          footer={dateFooter}
                          disabled={[
                            { dayOfWeek: [0] },
                            { before: new Date() },
                          ]}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full " type="submit">
              Agendar
            </Button>
          </form>
        </Form>
      </CardContent>
      <Planos />
      <footer className="self-center flex flex-row items-center font-normal text-muted-foreground">
        Criado com <AiFillHeart className="mx-1 text-main_blue" /> por{" "}
        <a href="https://www.linkedin.com/in/vichdev/" className="mx-1">
          Victor Hugo
        </a>
      </footer>
    </Card>
  );
};

export default RegisterForm;
