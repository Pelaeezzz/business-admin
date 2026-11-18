"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormSelect } from "@/components/form";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";
import { USER_ROLE_OPTIONS } from "@/constants/user-roles";
import {
  createUserSchema,
  updateUserSchema,
  type UserFormValues,
} from "../schemas/user-form-schema";

interface Props {
  mode: "create" | "edit";
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
  submitLabel?: string;
}

export default function UserForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  errorMessage,
  submitLabel = "Guardar",
}: Props) {
  const isEdit = mode === "edit";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password_hash: "",
      confirmPassword: "",
      ...defaultValues,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {errorMessage && (
          <AlertDestructive title="No se pudo guardar el usuario" description={errorMessage} />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<UserFormValues> name="name" label="Nombre" autoComplete="name" />
          <FormInput<UserFormValues> name="username" label="Usuario" autoComplete="username" />
          <FormInput<UserFormValues> name="email" label="Email" type="email" autoComplete="email" />
          <FormSelect<UserFormValues>
            name="role"
            label="Rol"
            options={USER_ROLE_OPTIONS}
            placeholder="Selecciona un rol"
          />
          <FormInput<UserFormValues>
            name="password_hash"
            label={isEdit ? "Nueva contraseña" : "Contraseña"}
            type="password"
            autoComplete="new-password"
            description={
              isEdit ? "Déjala vacía para mantener la contraseña actual" : "Mínimo 8 caracteres"
            }
          />
          <FormInput<UserFormValues>
            name="confirmPassword"
            label={isEdit ? "Confirmar nueva contraseña" : "Confirmar contraseña"}
            type="password"
            autoComplete="new-password"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
