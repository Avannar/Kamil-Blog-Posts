import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "types/models/blogPost";
import { FilterOptions } from "types/models/filterOptions";
import { Post } from "types/dto/post";
import { useGetAuthors } from "./useGetAuthors";
import { getPosts } from "api/posts";

export const useGetPosts = ({ userId }: FilterOptions) =>
  useQuery<Post[]>({
    queryKey: ["getPosts", userId],
    queryFn: () => getPosts({ userId }),
    throwOnError: true,
  });

export const useGetPostsWithAuthors = (
  filterOptions: FilterOptions
): { isPending: boolean; data?: BlogPost[] } => {
  const { isPending: isPostsPending, data: postsData } = useGetPosts(filterOptions);
  const { isPending: isUsersPending, data: usersData } = useGetAuthors();

  if (isPostsPending || isUsersPending || !postsData || !usersData) {
    return { isPending: true };
  }

  const posts: BlogPost[] = postsData.map((post) => {
    const author = usersData.find((user) => user.id === post.userId);
    return {
      ...post,
      authorName: author?.username,
    };
  });
  return {
    isPending: false,
    data: posts,
  };
};
