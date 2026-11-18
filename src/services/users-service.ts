import { api } from "@/lib/api";
import type { PaginatedResponse, Pagination } from "@/types/pagination";
import type { CreateUserDto, UpdateUserDto, User, UsersFilters } from "@/types/user";

function buildQuery(filters: UsersFilters, pagination: Pagination): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, String(value));
  }

  params.set("page", String(pagination.page));
  params.set("limit", String(pagination.limit));

  return params.toString();
}

export const usersService = {
  getPage(filters: UsersFilters, pagination: Pagination) {
    return api.get<PaginatedResponse<User>>(`/users?${buildQuery(filters, pagination)}`);
  },

  getById(id: string) {
    return api.get<User>(`/users/${id}`);
  },

  create(data: CreateUserDto) {
    return api.post<User>("/users", data);
  },

  update(id: string, data: UpdateUserDto) {
    return api.put<User>(`/users/${id}`, data);
  },

  remove(id: string) {
    return api.delete<void>(`/users/${id}`);
  },
};
