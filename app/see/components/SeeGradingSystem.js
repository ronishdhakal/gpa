const gradingRows = [
  { grade: "A+", range: "90 – 100", gpa: "4.0" },
  { grade: "A", range: "80 – 89", gpa: "3.6" },
  { grade: "B+", range: "70 – 79", gpa: "3.2" },
  { grade: "B", range: "60 – 69", gpa: "2.8" },
  { grade: "C+", range: "50 – 59", gpa: "2.4" },
  { grade: "C", range: "40 – 49", gpa: "2.0" },
  { grade: "D", range: "35 – 39", gpa: "1.6" },
  { grade: "NG", range: "Below 35", gpa: "0.0" },
];

export default function SeeGradingSystem() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            SEE Grading System
          </h2>
          <p className="mt-3 text-gray-600">
            The table below shows a simple grade-to-GPA reference for SEE
            students.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-900">Grade</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">
                    Marks Range
                  </th>
                  <th className="px-5 py-4 font-semibold text-gray-900">GPA</th>
                </tr>
              </thead>
              <tbody>
                {gradingRows.map((row) => (
                  <tr key={row.grade} className="border-t border-gray-200">
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {row.grade}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{row.range}</td>
                    <td className="px-5 py-4 text-gray-600">{row.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}