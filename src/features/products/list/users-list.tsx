"use client";
import { DataTable, type ServerPagination } from "@/components/ui/data-table";
import { TableFeaturesConfig } from "@/components/ui/table-features";
import TableMenu from "@/components/ui/table-menu";
import { USER_ROLE_LABELS } from "@/constants/user-roles";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { type ReactNode } from "react";

interface Props {
  users: User[];
  isLoading?: boolean;
  filters?: ReactNode;
  serverPagination: ServerPagination;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UsersList({
  users,
  isLoading,
  filters,
  serverPagination,
  onEdit,
  onDelete,
}: Props) {
  const columns: ColumnDef<TableFeaturesConfig, User, unknown>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Usuario",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => USER_ROLE_LABELS[row.original.role],
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              actions={[
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  action: () => onEdit(row.original),
                },
                {
                  label: "Eliminar",
                  icon: <Trash2Icon />,
                  action: () => onDelete(row.original),
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable<User>
      columns={columns}
      data={users}
      isLoading={isLoading}
      filters={filters}
      serverPagination={serverPagination}
    />
  );
}
