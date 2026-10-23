import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div className="w-full p-8 text-center bg-neutral-900 text-white rounded-2xl m-4 border border-rose-900/40">
          <h2 className="text-xl font-bold mb-2">Display Notice</h2>
          <p className="text-sm text-neutral-400 mb-4">
            An issue occurred while rendering this interface: {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-mono rounded-lg transition-colors cursor-pointer"
          >
            Retry Renderer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
