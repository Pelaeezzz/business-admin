import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ActionCardProps {
  href: string;
  title: string;
  description?: string;
  /** Contenido a la izquierda (número, icono, avatar...) */
  leading?: ReactNode;
  /** Sustituye la flecha por defecto de la derecha */
  trailing?: ReactNode;
  className?: string;
}

export function ActionCard({
  href,
  title,
  description,
  leading,
  trailing,
  className,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <Card className="h-full transition-colors group-hover:bg-muted/40 group-hover:ring-foreground/20">
        <CardContent className="flex flex-row items-center gap-3">
          {leading ? <div className="shrink-0">{leading}</div> : null}

          <div className="min-w-0 flex-1">
            <p className="font-medium">{title}</p>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>

          <div className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5">
            {trailing ?? <ChevronRightIcon className="size-4" aria-hidden="true" />}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}