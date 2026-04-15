import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Simple GPA Tools for Nepal Students
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            GPA Calculator for Nepal Students
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Calculate your GPA easily with a clean, fast, and student-friendly
            tool. Designed to help students in Nepal quickly estimate their
            results and understand the grading system better.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/see"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Open SEE Calculator
            </Link>

            <Link
              href="#about"
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}