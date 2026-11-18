import { z } from "zod";
import { USER_ROLES } from "@/constants/user-roles";
import type { CreateUserDto, UpdateUserDto, User } from "@/types/user";

const userBaseSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  username: z
    .string()
    .trim()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .regex(/^[a-zA-Z0-9._-]+$/, "Solo letras, números, puntos, guiones y guiones bajos"),
  email: z.email("Introduce un email válido"),
  role: z.enum(USER_ROLES, { error: "Selecciona un rol" }),
});

const passwordsMatch = (data: { password_hash: string; confirmPassword: string }) =>
  data.password_hash === data.confirmPassword;

const passwordsMatchError = {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
};

export const createUserSchema = userBaseSchema
  .extend({
    password_hash: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la contraseña"),
  })
  .refine(passwordsMatch, passwordsMatchError);

export const updateUserSchema = userBaseSchema
  .extend({
    password_hash: z.string().refine((value) => value === "" || value.length >= 8, {
      error: "La contraseña debe tener al menos 8 caracteres",
    }),
    confirmPassword: z.string(),
  })
  .refine(passwordsMatch, passwordsMatchError);

export type UserFormValues = z.infer<typeof createUserSchema>;

export function toCreateUserDto(values: UserFormValues): CreateUserDto {
  return {
    name: values.name,
    username: values.username,
    email: values.email,
    password_hash: values.password_hash,
    role: values.role,
  };
}

export function toUpdateUserDto(values: UserFormValues): UpdateUserDto {
  const dto: UpdateUserDto = {
    name: values.name,
    username: values.username,
    email: values.email,
    role: values.role,
  };

  if (values.password_hash) {
    dto.password_hash = values.password_hash;
  }

  return dto;
}

export function toUserFormValues(user: User): UserFormValues {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    password_hash: "",
    confirmPassword: "",
  };
}
