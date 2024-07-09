import { Center } from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //some logger here
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center color="tomato">
          <p>There was an error</p>
        </Center>
      );
    }
    return this.props.children;
  }
}
