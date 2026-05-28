import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-20">
      <div className="surface max-w-2xl p-8">
        <p className="kicker">404</p>
        <h1 className="hero-title mt-4">Guide not found</h1>
        <p className="mt-4 text-[17px] leading-7 text-silver-text">
          This Fatekeeper page is not in the library yet. Return to the guide hub or search the
          current launch, beginner, build, and database pages.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back to guide library
        </Link>
      </div>
    </main>
  );
}
