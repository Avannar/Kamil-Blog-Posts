import { Post } from "../types/dto/post";
import { baseUrl } from "./consts";

export const getPosts = async ({ userId }: { userId?: string }): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/posts${userId ? `?userId=${userId}` : ""}`);
  return response.json();
};
