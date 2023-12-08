'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("FROM ERROR PAGE 1442412341", error.message);
  }, [error]);

  return (
      <main className="flex h-full flex-col items-center justify-center">
          <h2 className="text-center">Something went wrong! {error.message}</h2>
          <button
              className="mt-4 bg-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600"
              onClick={
                  // Attempt to recover by trying to re-render the invoices route
                  () => reset()
              }
          >
              Try again
          </button>
      </main>
  );
}
