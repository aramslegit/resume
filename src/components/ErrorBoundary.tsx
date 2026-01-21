import React, { Component, type ReactNode } from "react";
import { useI18n } from "@/i18n";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error: Error | null }) {
  const { copy } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">⚠️</h1>
        <h2 className="mb-2 text-2xl font-semibold">
          {copy.errorBoundary?.title ?? "Something went wrong"}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {copy.errorBoundary?.message ??
            "An unexpected error occurred. Please try refreshing the page."}
        </p>
        {import.meta.env.DEV && error && (
          <details className="mb-4 rounded-md bg-destructive/10 p-4 text-left text-sm">
            <summary className="cursor-pointer font-medium">Error details (dev only)</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs">{error.toString()}</pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {copy.errorBoundary?.reload ?? "Reload Page"}
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
