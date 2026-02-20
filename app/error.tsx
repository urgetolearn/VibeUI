"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-3xl border border-red-400/30 bg-red-500/10 p-6">
        <h2 className="text-2xl font-semibold text-red-200">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-100/80">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-xl border border-red-200/40 px-4 py-2 text-sm text-red-100"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
