"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import { routes } from "@/routes/routes";
import UserForm from "../form/user-form";
import { useCreateUser } from "../hooks/use-create-user";
import { toCreateUserDto, type UserFormValues } from "../schemas/user-form-schema";

export default function UsersCreateContainer() {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const listUrl = withSearchParams(routes.users.list);
  const createUser = useCreateUser();

  const handleSubmit = (values: UserFormValues) => {
    createUser.mutate(toCreateUserDto(values), {
      onSuccess: () => router.push(listUrl),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo usuario</h1>
        <p className="text-muted-foreground">Completa los datos para dar de alta un usuario.</p>
      </div>

      <Card>
        <CardContent>
          <UserForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={() => router.push(listUrl)}
            isSubmitting={createUser.isPending}
            errorMessage={createUser.error?.message}
            submitLabel="Crear usuario"
          />
        </CardContent>
      </Card>
    </div>
  );
}
