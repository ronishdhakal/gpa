import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-600 px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Start Calculating Your GPA</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-100">
            Use our SEE GPA Calculator to estimate your result quickly in a
            clean and simple way.
          </p>

          <div className="mt-8">
            <Link
              href="/see"
              className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Go to SEE Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}