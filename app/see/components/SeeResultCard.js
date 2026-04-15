export default function SeeResultCard({ gpa, totalSubjects, hasNG }) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
        Your Result
      </p>

      <h3 className="mt-3 text-4xl font-bold text-blue-900">
        {gpa !== null ? gpa.toFixed(2) : "--"}
      </h3>

      <p className="mt-2 text-sm text-gray-700">
        Calculated from {totalSubjects} subjects
      </p>

      <div className="mt-4 rounded-xl bg-white p-4 text-sm text-gray-700 shadow-sm">
        {hasNG ? (
          <p className="font-medium text-red-600">
            You have at least one NG grade. Please review the entered grades.
          </p>
        ) : (
          <p>
            This is your estimated SEE GPA based on the grades you selected.
          </p>
        )}
      </div>
    </div>
  );
}