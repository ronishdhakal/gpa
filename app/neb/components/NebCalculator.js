"use client";

import { useMemo, useState } from "react";

const DEFAULT_SUBJECTS = [
  { id: 1, name: "English", theoryFull: 75, practicalFull: 25, creditHour: 5 },
  { id: 2, name: "Nepali", theoryFull: 75, practicalFull: 25, creditHour: 5 },
  { id: 3, name: "Mathematics", theoryFull: 75, practicalFull: 25, creditHour: 5 },
  { id: 4, name: "Physics", theoryFull: 75, practicalFull: 25, creditHour: 5 },
  { id: 5, name: "Chemistry", theoryFull: 75, practicalFull: 25, creditHour: 5 },
  { id: 6, name: "Computer Science", theoryFull: 50, practicalFull: 50, creditHour: 5 },
];

function createInitialRows() {
  return DEFAULT_SUBJECTS.map((subject) => ({
    ...subject,
    theoryObtained: "",
    practicalObtained: "",
  }));
}

function getGradePoint(percentage) {
  if (percentage >= 90) return { grade: "A+", point: 4.0 };
  if (percentage >= 80) return { grade: "A", point: 3.6 };
  if (percentage >= 70) return { grade: "B+", point: 3.2 };
  if (percentage >= 60) return { grade: "B", point: 2.8 };
  if (percentage >= 50) return { grade: "C+", point: 2.4 };
  if (percentage >= 40) return { grade: "C", point: 2.0 };
  if (percentage >= 35) return { grade: "D", point: 1.6 };
  return { grade: "NG", point: 0.0 };
}

export default function NebCalculator() {
  const [rows, setRows] = useState(createInitialRows());

  const handleInputChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddSubject = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        theoryFull: 75,
        practicalFull: 25,
        creditHour: 5,
        theoryObtained: "",
        practicalObtained: "",
      },
    ]);
  };

  const handleRemoveSubject = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleReset = () => {
    setRows(createInitialRows());
  };

  const result = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalCreditHours = 0;
    let completedSubjects = 0;
    let hasNG = false;

    const calculatedRows = rows.map((row) => {
      const theory = row.theoryObtained === "" ? null : Number(row.theoryObtained);
      const practical =
        row.practicalObtained === "" ? null : Number(row.practicalObtained);
      const theoryFull = Number(row.theoryFull);
      const practicalFull = Number(row.practicalFull);
      const creditHour = Number(row.creditHour);

      const theoryValid =
        theory === null || (theory >= 0 && theory <= theoryFull);
      const practicalValid =
        practical === null || (practical >= 0 && practical <= practicalFull);
      const fullMarksValid = theoryFull >= 0 && practicalFull >= 0;
      const creditValid = creditHour > 0;

      if (!theoryValid || !practicalValid || !fullMarksValid || !creditValid) {
        return {
          ...row,
          invalid: true,
          total: null,
          percentage: null,
          grade: "-",
          point: null,
        };
      }

      if (theory === null && practical === null) {
        return {
          ...row,
          invalid: false,
          total: null,
          percentage: null,
          grade: "-",
          point: null,
        };
      }

      const totalObtained = (theory ?? 0) + (practical ?? 0);
      const fullMarks = theoryFull + practicalFull;
      const percentage = fullMarks > 0 ? (totalObtained / fullMarks) * 100 : 0;
      const { grade, point } = getGradePoint(percentage);

      completedSubjects += 1;
      totalWeightedPoints += point * creditHour;
      totalCreditHours += creditHour;

      if (grade === "NG") {
        hasNG = true;
      }

      return {
        ...row,
        invalid: false,
        total: totalObtained,
        percentage,
        grade,
        point,
      };
    });

    const gpa =
      totalCreditHours > 0 ? totalWeightedPoints / totalCreditHours : null;

    return {
      rows: calculatedRows,
      gpa,
      totalCreditHours,
      completedSubjects,
      hasNG,
    };
  }, [rows]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Enter Your Marks
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Enter theory marks, practical marks, full marks, and credit hours for
          each subject to estimate your NEB GPA.
        </p>
        <p className="mt-2 text-xs text-amber-700 sm:text-sm">
          Disclaimer: This is only an estimated GPA based on your entered marks
          and credit hours, not your official result.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Subject Details
            </h3>

            <button
              type="button"
              onClick={handleAddSubject}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add Subject
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="bg-white">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-4 text-left font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Theory Marks
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Practical Marks
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Theory Full
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Practical Full
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Credit Hour
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Grade
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 align-top">
                    <td className="px-4 py-4">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) =>
                          handleInputChange(row.id, "name", e.target.value)
                        }
                        placeholder="Subject name"
                        className="w-40 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.theoryFull}
                        value={row.theoryObtained}
                        onChange={(e) =>
                          handleInputChange(row.id, "theoryObtained", e.target.value)
                        }
                        placeholder="Obtained"
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.practicalFull}
                        value={row.practicalObtained}
                        onChange={(e) =>
                          handleInputChange(row.id, "practicalObtained", e.target.value)
                        }
                        placeholder="Obtained"
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.theoryFull}
                        onChange={(e) =>
                          handleInputChange(row.id, "theoryFull", e.target.value)
                        }
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.practicalFull}
                        onChange={(e) =>
                          handleInputChange(row.id, "practicalFull", e.target.value)
                        }
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={row.creditHour}
                        onChange={(e) =>
                          handleInputChange(row.id, "creditHour", e.target.value)
                        }
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4 text-center font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.total !== null
                        ? `${row.total}/${Number(row.theoryFull) + Number(row.practicalFull)}`
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

                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(row.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
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
              {result.completedSubjects === 1 ? "" : "s"} and{" "}
              {result.totalCreditHours} credit hours.
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
              <div className="flex justify-between"><span>90–100</span><span>A+ / 4.0</span></div>
              <div className="flex justify-between"><span>80–89</span><span>A / 3.6</span></div>
              <div className="flex justify-between"><span>70–79</span><span>B+ / 3.2</span></div>
              <div className="flex justify-between"><span>60–69</span><span>B / 2.8</span></div>
              <div className="flex justify-between"><span>50–59</span><span>C+ / 2.4</span></div>
              <div className="flex justify-between"><span>40–49</span><span>C / 2.0</span></div>
              <div className="flex justify-between"><span>35–39</span><span>D / 1.6</span></div>
              <div className="flex justify-between"><span>Below 35</span><span>NG</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              How GPA is Calculated
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              GPA is calculated using weighted grade points. Each subject grade
              point is multiplied by its credit hour, then divided by the total
              credit hours.
            </p>
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
              GPA = Σ(Grade Point × Credit Hour) / Σ(Credit Hour)
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}