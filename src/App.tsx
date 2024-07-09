import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import BlogPosts from "./pages/BlogPosts/BlogPosts";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import ErrorBoundary from "./ErroBoundary";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <Heading as="h1" className="app-header">
            Kamil Blog posts
          </Heading>
          <section className="page-container">
            <ErrorBoundary>
              <BlogPosts></BlogPosts>
            </ErrorBoundary>
          </section>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
