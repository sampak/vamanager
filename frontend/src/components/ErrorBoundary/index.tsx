import ErrorScreen from 'components/ErrorScreen';
import React, { Component } from 'react';
import { Props } from './typings';

class ErrorBoundary extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return <ErrorScreen onClick={() => this.setState({ hasError: false })} />;
    }
    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
