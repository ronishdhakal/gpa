const steps = [
  {
    title: "Select your grades",
    description:
      "Choose the grade obtained in each SEE subject from the dropdown list.",
  },
  {
    title: "Check instant GPA",
    description:
      "The calculator instantly estimates your GPA based on the selected grades.",
  },
  {
    title: "Understand your performance",
    description:
      "Use the grading table and FAQ below to better understand your SEE result.",
  },
];

export default function SeeHowItWorks() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Use the SEE GPA Calculator
          </h2>
          <p className="mt-3 text-gray-600">
            This calculator is built to be simple for students, parents, and
            teachers who want to estimate SEE GPA quickly.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}