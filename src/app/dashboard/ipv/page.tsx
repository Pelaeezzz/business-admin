import { StepCards, type StepItem } from "@/components/step-cards/step-cards";
import { routes } from "@/routes/routes";

const ipvSteps: StepItem[] = [
  {
    number: 1,
    title: "Entrada de productos",
    description: "Registra productos que ingresan",
    href: routes.ipvEntrada,
  },
  {
    number: 2,
    title: "Salida de productos",
    description: "Registra productos que salen",
    href: routes.ipvSalida,
  },
  {
    number: 3,
    title: "Final",
    description: "Revisa y finaliza tu IPV",
    href: routes.ipvFinal,
  },
];

export default function IpvPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">IPV</h1>
        <p className="text-sm text-muted-foreground">
          Selecciona el paso que quieres realizar.
        </p>
      </header>

      <StepCards steps={ipvSteps} label="Pasos del IPV" />
    </div>
  );
}