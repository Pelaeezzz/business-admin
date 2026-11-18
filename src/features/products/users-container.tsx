"use client";

import { User } from "@/types/user";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "@/components/confirm-dialog/confirm-dialog";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import useServerPagination from "@/hooks/use-server-pagination";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import { routes } from "@/routes/routes";
import UsersFiltersContainer from "./filters/users-filters-container";
import { useDeleteUser } from "./hooks/use-delete-user";
import { useUsers } from "./hooks/use-users";
import useUsersFilters from "./filters/hooks/use-users-filters";
import UsersList from "./list/users-list";

export default function UsersContainer() {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const { filters } = useUsersFilters();
  const { pagination, serverHandleChangePage, serverHandlePageSizeChange } = useServerPagination({
    defaultPagination: DEFAULT_PAGINATION,
  });
  const { data, isPending, isPlaceholderData, error } = useUsers(filters, pagination);
  const deleteUser = useDeleteUser();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const totalPages = data?.meta.totalPages;

  useEffect(() => {
    if (totalPages === undefined || isPlaceholderData) return;

    const lastPage = Math.max(1, totalPages);
    if (pagination.page > lastPage) serverHandleChangePage(lastPage);
  }, [totalPages, isPlaceholderData, pagination.page, serverHandleChangePage]);

  const closeDeleteDialog = () => {
    setUserToDelete(null);
    deleteUser.reset();
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    deleteUser.mutate(userToDelete.id, { onSuccess: closeDeleteDialog });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
        <Link href={withSearchParams(routes.users.new)} className={buttonVariants()}>
          <Plus />
          Nuevo usuario
        </Link>
      </div>

      {error && (
        <AlertDestructive title="No se pudieron cargar los usuarios" description={error.message} />
      )}

      <UsersList
        users={data?.rows ?? []}
        isLoading={isPending}
        filters={<UsersFiltersContainer />}
        serverPagination={{
          currentPage: pagination.page,
          itemsPerPage: pagination.limit,
          totalItems: data?.meta.total ?? 0,
          totalPages: totalPages ?? 1,
          onPageChange: serverHandleChangePage,
          onItemsPerPageChange: serverHandlePageSizeChange,
        }}
        onEdit={(user) => router.push(withSearchParams(routes.users.edit(user.id)))}
        onDelete={setUserToDelete}
      />

      <ConfirmDialog
        open={userToDelete !== null}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        title="Eliminar usuario"
        description={`Se eliminará a ${userToDelete?.name ?? ""} (${userToDelete?.email ?? ""}). Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        isDestructive
        isLoading={deleteUser.isPending}
        error={deleteUser.error?.message}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
