import { Card, CardBody, CardFooter, CardHeader, Heading } from "@chakra-ui/react";
import { BlogPost } from "types/models/blogPost";

const SinglePost = ({ post }: { post: BlogPost }) => {

  const content = `${post.body.slice(0, 40)}...`;

  return (
    <Card aria-label="single-post-card" data-testid="single-post">
      <CardHeader>
        <Heading as="h5" size="md">
          {post.title}
        </Heading>
      </CardHeader>
      <CardBody display="flex" alignItems="end">
        <p>{content}</p>
      </CardBody>
      <CardFooter>
        <p>{post.authorName}</p>
      </CardFooter>
    </Card>
  );
};

export default SinglePost;
