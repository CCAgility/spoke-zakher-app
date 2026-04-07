'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("APP ROUTER ERROR CAUGHT:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-black bg-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <div className="bg-red-50 text-red-800 p-6 rounded-lg w-full max-w-2xl border border-red-200">
        <p className="font-mono text-sm break-words whitespace-pre-wrap">{error.message}</p>
        {error.stack && (
          <details className="mt-4">
            <summary className="cursor-pointer font-bold text-xs uppercase opacity-70">Stack Trace</summary>
            <pre className="mt-2 text-xs overflow-auto bg-black/10 p-4 rounded">{error.stack}</pre>
          </details>
        )}
      </div>
      <button
        className="mt-8 bg-black text-white px-6 py-2 rounded"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
