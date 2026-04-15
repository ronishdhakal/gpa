const features = [
  {
    title: "Easy to Use",
    description:
      "Enter marks in a simple layout and estimate your GPA without confusion.",
  },
  {
    title: "Student Friendly",
    description:
      "Built for Nepal students with a clean design that works well on mobile and desktop.",
  },
  {
    title: "Fast Result Estimation",
    description:
      "Check your estimated GPA instantly without needing any signup or backend system.",
  },
];

export default function HomeFeatures() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Use Our GPA Calculator
          </h2>
          <p className="mt-4 text-gray-600">
            We focus on simplicity, speed, and useful educational tools that are
            easy for students and parents to use.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}