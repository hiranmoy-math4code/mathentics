"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import toast from "react-hot-toast";

// Global error handler for queries
function handleQueryError(error: unknown) {
  const message = error instanceof Error ? error.message : "An unexpected error occurred";
  console.error("Query Error:", error);
  toast.error(message);
}

// Global error handler for mutations
function handleMutationError(error: any) {
  let message = "Operation failed";
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error !== null) {
    message = error.message || error.error_description || error.details || JSON.stringify(error);
  }

  console.error("Mutation Error Detailed:", {
    error,
    message,
    type: typeof error
  });
  toast.error(message);
}

export function ReactQueryProviders({ children }: { children: React.ReactNode }) {
  // Create QueryClient once with production-ready configuration
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
            gcTime: 1000 * 60 * 30, // 30 minutes - extended garbage collection for better cache hits
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error instanceof Error && "status" in error) {
                const status = (error as any).status;
                if (status >= 400 && status < 500) return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            refetchOnWindowFocus: false, // Prevent unnecessary refetches
            refetchOnReconnect: true, // Refetch on network reconnect
            refetchOnMount: false, // Use cached data on mount for instant navigation
          },
          mutations: {
            retry: 1,
            onError: handleMutationError,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* DevTools only in development */}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

