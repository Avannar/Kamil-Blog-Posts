import { useQuery } from "@tanstack/react-query";
import { User } from "types/dto/user";
import { getUsers } from "api/users";

export const useGetAuthors = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: getUsers,
  throwOnError: true,
});