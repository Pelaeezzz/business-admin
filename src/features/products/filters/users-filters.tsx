import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isUserRole, USER_ROLE_OPTIONS } from "@/constants/user-roles";
import type { UsersFilters } from "@/types/user";

const ALL_ROLES = "all";

const ROLE_FILTER_OPTIONS = [{ value: ALL_ROLES, label: "Todos" }, ...USER_ROLE_OPTIONS];

interface Props {
  filters: UsersFilters;
  onApply: (filters: UsersFilters) => void;
}

/**
 * Edita un borrador local y solo actualiza la URL al pulsar "Aplicar",
 * para no lanzar una petición por cada tecla.
 */
export default function UsersFiltersForm({ filters, onApply }: Props) {
  const [draft, setDraft] = useState<UsersFilters>(filters);

  const updateDraft = (changes: Partial<UsersFilters>) =>
    setDraft((prev) => ({ ...prev, ...changes }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      username: draft.username?.trim() || undefined,
      email: draft.email?.trim() || undefined,
      name: draft.name?.trim() || undefined,
      role: draft.role,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-username">Usuario</Label>
        <Input
          id="filter-username"
          placeholder="Filtrar por usuario..."
          value={draft.username ?? ""}
          onChange={(event) => updateDraft({ username: event.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-email">Email</Label>
        <Input
          id="filter-email"
          placeholder="Filtrar por email..."
          value={draft.email ?? ""}
          onChange={(event) => updateDraft({ email: event.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-name">Nombre</Label>
        <Input
          id="filter-name"
          placeholder="Filtrar por nombre..."
          value={draft.name ?? ""}
          onChange={(event) => updateDraft({ name: event.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-role">Rol</Label>
        <Select
          items={ROLE_FILTER_OPTIONS}
          value={draft.role ?? ALL_ROLES}
          onValueChange={(value) => updateDraft({ role: isUserRole(value) ? value : undefined })}
        >
          <SelectTrigger id="filter-role" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLE_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setDraft({})}>
          Vaciar
        </Button>
        <Button type="submit">Aplicar</Button>
      </div>
    </form>
  );
}
