import { Box, Button, Center, Flex, Select, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { FilterOptions } from "types/models/filterOptions";
import { useGetPostsWithAuthors } from "hooks/useGetPosts";
import SinglePost from "./SinglePost";
import { useGetAuthors } from "hooks/useGetAuthors";

const BlogPosts = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const { isPending: isUserLoading, data: userData } = useGetAuthors();
  const { isPending: isPostsLoading, data: postsData } = useGetPostsWithAuthors(filterOptions);

  if (isPostsLoading || isUserLoading || !userData || !postsData) {
    return (
      <Center h="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex
        p="1rem"
        border="2px"
        borderColor="gray.200"
        borderRadius="base"
        gap="1rem"
        alignItems="center"
        data-testid="posts-settings"
      >
        <Box>Filter by Author</Box>
        <Select
          placeholder="Select author"
          w="auto"
          value={filterOptions.userId || ""}
          onChange={(e) => setFilterOptions({ userId: e.target.value })}
        >
          {userData.map((user, index) => (
            <option key={index} value={user.id}>
              {user.username}
            </option>
          ))}
        </Select>
        <Button onClick={() => setFilterOptions({})}>Clear filters</Button>
      </Flex>
      <Box mt="1rem">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {postsData.map((post) => (
            <SinglePost key={post.id} post={post} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default BlogPosts;
