import { User } from "types/dto/user";
import { baseUrl } from "./consts";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${baseUrl}/users`);
  return response.json();
};
