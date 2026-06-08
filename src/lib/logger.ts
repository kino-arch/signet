import * as Sentry from "@sentry/react"

export const logger = {
  error: (message: string, error?: unknown) => {
    console.error(message, error)
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: { message } })
    } else {
      Sentry.captureException(new Error(message), { extra: { originalError: error } })
    }
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(message, context)
    Sentry.captureMessage(message, { level: "warning", extra: context })
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(message, context)
    Sentry.addBreadcrumb({
      category: "log",
      message,
      level: "info",
      data: context,
    })
  },
}
