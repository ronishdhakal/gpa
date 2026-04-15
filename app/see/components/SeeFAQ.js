const faqs = [
  {
    question: "How is SEE GPA calculated?",
    answer:
      "SEE GPA is estimated by converting each subject grade into grade points and averaging them.",
  },
  {
    question: "Can I use this calculator before the official result?",
    answer:
      "Yes. You can use it to estimate your GPA based on expected or obtained grades.",
  },
  {
    question: "What does NG mean in SEE?",
    answer:
      "NG means Not Graded. It usually indicates the student did not meet the minimum required standard in that subject.",
  },
  {
    question: "Is this SEE GPA Calculator free?",
    answer:
      "Yes. This calculator is fully free to use for all students.",
  },
];

export default function SeeFAQ() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}