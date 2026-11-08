import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="hud-label justify-center">Error 404 · signal lost</p>
      <h1 className="mt-6 font-heading text-7xl font-extrabold md:text-9xl">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-4 font-heading text-2xl font-bold">This page drifted off the grid.</p>
      <p className="mt-3 max-w-md text-muted">
        The link may be old or mistyped. Here are the places most people are looking for:
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/solutions" className="btn-ghost">
          Automations
        </Link>
        <Link href="/templates" className="btn-ghost">
          Website templates
        </Link>
        <Link href="/about#contact" className="btn-ghost">
          Contact
        </Link>
      </div>
    </div>
  );
}
