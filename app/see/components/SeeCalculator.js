"use client";

import { useMemo, useState } from "react";

const SUBJECTS = [
  { id: 1, name: "English", theoryFull: 75, practicalFull: 25 },
  { id: 2, name: "Nepali", theoryFull: 75, practicalFull: 25 },
  { id: 3, name: "Mathematics", theoryFull: 75, practicalFull: 25 },
  { id: 4, name: "Science", theoryFull: 75, practicalFull: 25 },
  { id: 5, name: "Social Studies", theoryFull: 75, practicalFull: 25 },
  { id: 6, name: "Optional I", theoryFull: 75, practicalFull: 25, optionalType: "" },
  { id: 7, name: "Optional II", theoryFull: 75, practicalFull: 25 },
];

function getGradeFromPercentage(percentage) {
  if (percentage >= 90) return { grade: "A+", point: 4.0 };
  if (percentage >= 80) return { grade: "A", point: 3.6 };
  if (percentage >= 70) return { grade: "B+", point: 3.2 };
  if (percentage >= 60) return { grade: "B", point: 2.8 };
  if (percentage >= 50) return { grade: "C+", point: 2.4 };
  if (percentage >= 40) return { grade: "C", point: 2.0 };
  if (percentage >= 35) return { grade: "D", point: 1.6 };
  return { grade: "NG", point: 0 };
}

function createInitialState() {
  return SUBJECTS.map((subject) => ({
    ...subject,
    theoryObtained: "",
    practicalObtained: "",
    optionalType: subject.optionalType || "",
  }));
}

function getAdjustedRow(row) {
  if (row.name === "Optional I" && row.optionalType === "computer") {
    return {
      ...row,
      theoryFull: 50,
      practicalFull: 50,
    };
  }

  return row;
}

export default function SeeCalculator() {
  const [rows, setRows] = useState(createInitialState());

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const updatedRow = {
          ...row,
          [field]: value,
        };

        if (row.name === "Optional I" && field === "optionalType") {
          return {
            ...updatedRow,
            theoryObtained: "",
            practicalObtained: "",
          };
        }

        return updatedRow;
      })
    );
  };

  const handleReset = () => {
    setRows(createInitialState());
  };

  const result = useMemo(() => {
    let completedSubjects = 0;
    let totalGradePoints = 0;
    let hasNG = false;

    const subjectResults = rows.map((originalRow) => {
      const row = getAdjustedRow(originalRow);

      const theory =
        row.theoryObtained === "" ? null : Number(row.theoryObtained);
      const practical =
        row.practicalObtained === "" ? null : Number(row.practicalObtained);

      const theoryValid =
        theory === null || (theory >= 0 && theory <= row.theoryFull);
      const practicalValid =
        practical === null || (practical >= 0 && practical <= row.practicalFull);

      if (!theoryValid || !practicalValid) {
        return {
          ...row,
          total: null,
          percentage: null,
          grade: "-",
          point: null,
          invalid: true,
        };
      }

      if (theory === null && practical === null) {
        return {
          ...row,
          total: null,
          percentage: null,
          grade: "-",
          point: null,
          invalid: false,
        };
      }

      const safeTheory = theory ?? 0;
      const safePractical = practical ?? 0;
      const total = safeTheory + safePractical;
      const fullMarks = row.theoryFull + row.practicalFull;
      const percentage = (total / fullMarks) * 100;
      const { grade, point } = getGradeFromPercentage(percentage);

      completedSubjects += 1;
      totalGradePoints += point;
      if (grade === "NG") hasNG = true;

      return {
        ...row,
        total,
        percentage,
        grade,
        point,
        invalid: false,
      };
    });

    const gpa =
      completedSubjects > 0 ? totalGradePoints / completedSubjects : null;

    return {
      subjectResults,
      gpa,
      completedSubjects,
      hasNG,
    };
  }, [rows]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          SEE GPA Calculator
        </h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Enter your theory and practical marks for each subject to estimate your GPA.
        </p>
        <p className="mt-2 text-xs text-amber-700 sm:text-sm">
          Disclaimer: This is only an estimated GPA based on your entered marks, not your official result.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-gray-900">Subject Details</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-4 text-left font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Theory
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Practical
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.subjectResults.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 align-top">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{row.name}</div>

                      {row.name === "Optional I" && (
                        <div className="mt-2">
                          <select
                            value={row.optionalType}
                            onChange={(e) =>
                              handleChange(row.id, "optionalType", e.target.value)
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                          >
                            <option value="">Select subject type</option>
                            <option value="computer">Computer</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      )}

                      <div className="mt-1 text-xs text-gray-500">
                        Full Marks: {row.theoryFull + row.practicalFull}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.theoryFull}
                        value={row.theoryObtained}
                        onChange={(e) =>
                          handleChange(row.id, "theoryObtained", e.target.value)
                        }
                        placeholder={`0-${row.theoryFull}`}
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        / {row.theoryFull}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.practicalFull}
                        value={row.practicalObtained}
                        onChange={(e) =>
                          handleChange(row.id, "practicalObtained", e.target.value)
                        }
                        placeholder={`0-${row.practicalFull}`}
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        / {row.practicalFull}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.total !== null
                        ? `${row.total}/${row.theoryFull + row.practicalFull}`
                        : "-"}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {row.invalid ? (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          Invalid
                        </span>
                      ) : row.grade !== "-" ? (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            row.grade === "NG"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {row.grade}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Estimated GPA
            </p>

            <div className="mt-3 text-4xl font-bold text-blue-900">
              {result.gpa !== null ? result.gpa.toFixed(2) : "--"}
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Based on {result.completedSubjects} completed subject
              {result.completedSubjects === 1 ? "" : "s"}.
            </p>

            {result.hasNG && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                One or more subjects are NG.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Grade Scale</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>90–100</span>
                <span>A+ / 4.0</span>
              </div>
              <div className="flex justify-between">
                <span>80–89</span>
                <span>A / 3.6</span>
              </div>
              <div className="flex justify-between">
                <span>70–79</span>
                <span>B+ / 3.2</span>
              </div>
              <div className="flex justify-between">
                <span>60–69</span>
                <span>B / 2.8</span>
              </div>
              <div className="flex justify-between">
                <span>50–59</span>
                <span>C+ / 2.4</span>
              </div>
              <div className="flex justify-between">
                <span>40–49</span>
                <span>C / 2.0</span>
              </div>
              <div className="flex justify-between">
                <span>35–39</span>
                <span>D / 1.6</span>
              </div>
              <div className="flex justify-between">
                <span>Below 35</span>
                <span>NG</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}