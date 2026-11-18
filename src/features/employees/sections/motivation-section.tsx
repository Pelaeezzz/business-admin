import { AwardIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MotivationSectionProps {
  onCreateRecognition?: () => void;
}

export function MotivationSection({
  onCreateRecognition,
}: MotivationSectionProps) {
  return (
    <Card className="bg-primary/5 ring-primary/20">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SparklesIcon
              className="size-5"
              aria-hidden="true"
            />
          </span>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Motiva a tu equipo</p>
            <p className="text-sm text-muted-foreground">
              Reconoce el esfuerzo y celebra los logros. Un
              equipo motivado es un equipo exitoso.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={onCreateRecognition}
          className="shrink-0"
        >
          <AwardIcon />
          Crear reconocimiento
        </Button>
      </CardContent>
    </Card>
  );
}