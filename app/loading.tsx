export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="h-10 w-72 animate-pulse rounded-2xl bg-white/10" />
        <div className="h-24 animate-pulse rounded-3xl bg-white/5" />
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-44 animate-pulse rounded-3xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
