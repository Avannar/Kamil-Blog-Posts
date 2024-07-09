import nock from "nock";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "ErroBoundary";
import BlogPosts from "./BlogPosts";
import { mockedFilteredPosts, mockedPosts } from "../../../mocks/posts";
import { mockedUsers } from "../../../mocks/users";

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
const WrappedPosts = () => (
  <QueryClientProvider client={createQueryClient()}>
    <ErrorBoundary>
      <BlogPosts />
    </ErrorBoundary>
  </QueryClientProvider>
);

describe("Blog posts", () => {
  beforeEach(() =>
    nock("https://jsonplaceholder.typicode.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/posts?userId=1")
      .reply(200, mockedFilteredPosts)
      .get("/posts")
      .reply(200, mockedPosts)
      .get("/users")
      .reply(200, mockedUsers)
  );

  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  afterEach(() => nock.cleanAll);

  it("should display loader while fetching data", async () => {
    render(<WrappedPosts />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("displays posts on successful fetch", async () => {
    render(<WrappedPosts />);
    const allPosts = await screen.findAllByTestId("single-post");
    expect(allPosts).toHaveLength(4);
    const firstPost = within(allPosts[0]);
    expect(firstPost.getByText(/post1/i)).toBeInTheDocument();
    expect(firstPost.getByText(/post body 1/i)).toBeInTheDocument();
    expect(firstPost.getByText(/user 1/i)).toBeInTheDocument();
  });
  it("should filter posts", async () => {
    const user = userEvent.setup();
    render(<WrappedPosts />);
    const postsSettings = await screen.findByTestId("posts-settings");
    const activePanel = within(postsSettings);
    expect(activePanel.getAllByRole("option")).toHaveLength(4);
    expect(screen.getAllByTestId("single-post")).toHaveLength(4);

    await user.selectOptions(activePanel.getByRole("combobox"), "user 1");

    await screen.findByText(/loading\.\.\./i);
    const filteredPosts = await screen.findAllByTestId("single-post");
    expect(filteredPosts).toHaveLength(2);

    const clearFiltersButton = screen.getByRole("button", { name: /clear filters/i });

    user.click(clearFiltersButton);

    await screen.findByText(/post3/i);

    const allPosts = screen.getAllByTestId("single-post");
    expect(allPosts).toHaveLength(4);
  });
  it("should display error if fetching fails", async () => {
    nock.cleanAll();
    nock("https://jsonplaceholder.typicode.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/posts?userId=1")
      .reply(200, mockedFilteredPosts)
      .get("/posts")
      .reply(500, {})
      .get("/users")
      .reply(500, {});

    render(<WrappedPosts />);
    expect(await screen.findByText(/there was an error/i)).toBeInTheDocument();
  });
});
