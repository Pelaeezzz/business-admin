import type { UserRole } from "@/constants/user-roles";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface UsersFilters {
  username?: string;
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password_hash: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name: string;
  username: string;
  email: string;
  role: UserRole;
  password_hash?: string;
}
