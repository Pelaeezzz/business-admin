"use client";

import { useRouter } from "next/navigation";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import { routes } from "@/routes/routes";
import UserForm from "../form/user-form";
import { useUpdateUser } from "../hooks/use-update-user";
import { useUser } from "../hooks/use-user";
import {
  toUpdateUserDto,
  toUserFormValues,
  type UserFormValues,
} from "../schemas/user-form-schema";

interface Props {
  id: string;
}

export default function UsersEditContainer({ id }: Props) {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const listUrl = withSearchParams(routes.users.list);
  const { data: user, isPending, error } = useUser(id);
  const updateUser = useUpdateUser();

  const handleSubmit = (values: UserFormValues) => {
    updateUser.mutate(
      { id, data: toUpdateUserDto(values) },
      { onSuccess: () => router.push(listUrl) },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar usuario</h1>
        <p className="text-muted-foreground">Modifica los datos del usuario.</p>
      </div>

      <Card>
        <CardContent>
          {isPending ? (
            <Skeleton className="h-80 w-full" />
          ) : error ? (
            <AlertDestructive title="No se pudo cargar el usuario" description={error.message} />
          ) : (
            <UserForm
              mode="edit"
              defaultValues={toUserFormValues(user)}
              onSubmit={handleSubmit}
              onCancel={() => router.push(listUrl)}
              isSubmitting={updateUser.isPending}
              errorMessage={updateUser.error?.message}
              submitLabel="Guardar cambios"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
