import { Component, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import * as Sentry from "@sentry/react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-nordic-bg p-4 text-nordic-text">
          <div className="nordic-card max-w-md p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="mb-2 text-xl font-bold">Something went wrong</h1>
            <p className="mb-4 text-sm text-nordic-text-secondary">
              We've encountered an unexpected error. Our systems have logged the incident.
            </p>
            <pre className="mb-6 max-h-32 overflow-auto rounded bg-black/50 p-4 text-left font-mono text-xs text-destructive/80">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="nordic-btn-primary w-full"
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
