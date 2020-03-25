// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

interface State {
  hasError: boolean;
  redirect: boolean;
}

interface Props {}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          Woops, an error occurred. You we redirect to home in five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
