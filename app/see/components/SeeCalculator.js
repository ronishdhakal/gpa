"use client";

import { useMemo, useState } from "react";

const SUBJECTS = [
  { id: 1, name: "Nepali", theoryFull: 75, practicalFull: 25, creditHours: 5 },
  { id: 2, name: "English", theoryFull: 75, practicalFull: 25, creditHours: 5 },
  { id: 3, name: "Mathematics", theoryFull: 75, practicalFull: 25, creditHours: 5 },
  {
    id: 4,
    name: "Science and Technology",
    theoryFull: 75,
    practicalFull: 25,
    creditHours: 5,
  },
  {
    id: 5,
    name: "Social Studies",
    theoryFull: 75,
    practicalFull: 25,
    creditHours: 4,
  },
  {
    id: 6,
    name: "Optional First",
    theoryFull: 75,
    practicalFull: 25,
    creditHours: 4,
  },
  {
    id: 7,
    name: "Optional Second",
    theoryFull: 75,
    practicalFull: 25,
    creditHours: 4,
    optionalType: "",
  },
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

function getFinalGradeFromPoint(point) {
  if (point >= 3.6) return "A+";
  if (point >= 3.2) return "A";
  if (point >= 2.8) return "B+";
  if (point >= 2.4) return "B";
  if (point >= 2.0) return "C+";
  if (point >= 1.6) return "C";
  if (point >= 0.8) return "D";
  return "NG";
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
  if (row.name === "Optional Second" && row.optionalType === "computer") {
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

        if (row.name === "Optional Second" && field === "optionalType") {
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
    let totalWeightedGradePoints = 0;
    let totalCreditHours = 0;
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
          grade: "-",
          finalPoint: null,
          theoryCredit: null,
          practicalCredit: null,
          theoryPoint: null,
          practicalPoint: null,
          theoryGrade: "-",
          practicalGrade: "-",
          theoryWGP: null,
          practicalWGP: null,
          theoryFailed: false,
          invalid: true,
        };
      }

      if (theory === null && practical === null) {
        return {
          ...row,
          total: null,
          grade: "-",
          finalPoint: null,
          theoryCredit: null,
          practicalCredit: null,
          theoryPoint: null,
          practicalPoint: null,
          theoryGrade: "-",
          practicalGrade: "-",
          theoryWGP: null,
          practicalWGP: null,
          theoryFailed: false,
          invalid: false,
        };
      }

      const safeTheory = theory ?? 0;
      const safePractical = practical ?? 0;
      const total = safeTheory + safePractical;

      const fullMarks = row.theoryFull + row.practicalFull;

      const theoryCredit = (row.creditHours * row.theoryFull) / fullMarks;
      const practicalCredit = (row.creditHours * row.practicalFull) / fullMarks;

      const theoryPercentage = (safeTheory / row.theoryFull) * 100;
      const practicalPercentage = (safePractical / row.practicalFull) * 100;

      const theoryResult = getGradeFromPercentage(theoryPercentage);
      const practicalResult = getGradeFromPercentage(practicalPercentage);

      const theoryFailed = theoryPercentage < 40;

      let theoryPoint = theoryResult.point;
      let practicalPoint = practicalResult.point;
      let theoryGrade = theoryResult.grade;
      let practicalGrade = practicalResult.grade;

      let theoryWGP = theoryPoint * theoryCredit;
      let practicalWGP = practicalPoint * practicalCredit;

      let subjectWGP = theoryWGP + practicalWGP;
      let finalPoint = subjectWGP / row.creditHours;
      let finalGrade = getFinalGradeFromPoint(finalPoint);

      if (theoryFailed) {
        theoryPoint = 0;
        theoryGrade = "NG";
        theoryWGP = 0;
        subjectWGP = 0;
        finalPoint = 0;
        finalGrade = "NG";
      }

      completedSubjects += 1;
      totalWeightedGradePoints += subjectWGP;
      totalCreditHours += row.creditHours;

      if (theoryFailed || practicalGrade === "NG" || finalGrade === "NG") {
        hasNG = true;
      }

      return {
        ...row,
        total,
        grade: finalGrade,
        finalPoint,
        theoryCredit,
        practicalCredit,
        theoryPoint,
        practicalPoint,
        theoryGrade,
        practicalGrade,
        theoryWGP,
        practicalWGP,
        theoryFailed,
        invalid: false,
      };
    });

    const gpa =
      totalCreditHours > 0
        ? totalWeightedGradePoints / totalCreditHours
        : null;

    return {
      subjectResults,
      gpa,
      completedSubjects,
      hasNG,
      totalWeightedGradePoints,
      totalCreditHours,
    };
  }, [rows]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          SEE GPA Calculator
        </h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Enter theory and practical marks separately to estimate your GPA.
        </p>
        <p className="mt-2 text-xs text-amber-700 sm:text-sm">
          Disclaimer: This is only an estimated GPA based on your entered marks, not your official result.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.95fr] xl:gap-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              Subject Details
            </h3>
          </div>

          <div className="space-y-4 p-4 md:hidden">
            {result.subjectResults.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {row.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Full Marks: {row.theoryFull + row.practicalFull}
                    </p>
                  </div>

                  <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    Credit: {row.creditHours}
                  </div>
                </div>

                {row.name === "Optional Second" && (
                  <div className="mt-3">
                    <select
                      value={row.optionalType}
                      onChange={(e) =>
                        handleChange(row.id, "optionalType", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="">Select subject type</option>
                      <option value="computer">Computer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Theory
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={row.theoryFull}
                      value={row.theoryObtained}
                      onChange={(e) =>
                        handleChange(row.id, "theoryObtained", e.target.value)
                      }
                      placeholder={`0-${row.theoryFull}`}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      / {row.theoryFull}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Practical
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={row.practicalFull}
                      value={row.practicalObtained}
                      onChange={(e) =>
                        handleChange(row.id, "practicalObtained", e.target.value)
                      }
                      placeholder={`0-${row.practicalFull}`}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      / {row.practicalFull}
                    </div>
                  </div>
                </div>

                {row.theoryFailed && !row.invalid && (
                  <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                    Theory is below 40%, so this subject is NG.
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    <div className="text-xs text-gray-500">FGP</div>
                    <div className="mt-1 font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.finalPoint !== null
                        ? row.finalPoint.toFixed(2)
                        : "-"}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    <div className="text-xs text-gray-500">Grade</div>
                    <div className="mt-1">
                      {row.invalid ? (
                        <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          Invalid
                        </span>
                      ) : row.grade !== "-" ? (
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    TH Point:{" "}
                    {row.theoryPoint !== null ? row.theoryPoint.toFixed(1) : "-"}
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    IN Point:{" "}
                    {row.practicalPoint !== null
                      ? row.practicalPoint.toFixed(1)
                      : "-"}
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    TH WGP:{" "}
                    {row.theoryWGP !== null ? row.theoryWGP.toFixed(2) : "-"}
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    IN WGP:{" "}
                    {row.practicalWGP !== null
                      ? row.practicalWGP.toFixed(2)
                      : "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-white">
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-4 text-left font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    Theory
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    Practical
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    Credit
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    TH WGP
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    IN WGP
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    FGP
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-900">
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.subjectResults.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 align-top">
                    <td className="px-3 py-4">
                      <div className="font-medium text-gray-900">{row.name}</div>

                      {row.name === "Optional Second" && (
                        <div className="mt-2">
                          <select
                            value={row.optionalType}
                            onChange={(e) =>
                              handleChange(row.id, "optionalType", e.target.value)
                            }
                            className="w-full min-w-[150px] rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
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
                      {row.theoryFailed && !row.invalid && (
                        <div className="mt-2 text-xs font-medium text-red-600">
                          Theory below 40% → NG
                        </div>
                      )}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.theoryFull}
                        value={row.theoryObtained}
                        onChange={(e) =>
                          handleChange(row.id, "theoryObtained", e.target.value)
                        }
                        placeholder={`0-${row.theoryFull}`}
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm outline-none focus:border-blue-500"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        / {row.theoryFull}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={row.practicalFull}
                        value={row.practicalObtained}
                        onChange={(e) =>
                          handleChange(row.id, "practicalObtained", e.target.value)
                        }
                        placeholder={`0-${row.practicalFull}`}
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm outline-none focus:border-blue-500"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        / {row.practicalFull}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-center font-medium text-gray-700">
                      {row.creditHours}
                    </td>

                    <td className="px-3 py-4 text-center font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.theoryWGP !== null
                        ? row.theoryWGP.toFixed(2)
                        : "-"}
                    </td>

                    <td className="px-3 py-4 text-center font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.practicalWGP !== null
                        ? row.practicalWGP.toFixed(2)
                        : "-"}
                    </td>

                    <td className="px-3 py-4 text-center font-medium text-gray-800">
                      {row.invalid
                        ? "Invalid"
                        : row.finalPoint !== null
                        ? row.finalPoint.toFixed(2)
                        : "-"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      {row.invalid ? (
                        <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          Invalid
                        </span>
                      ) : row.grade !== "-" ? (
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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
              className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Reset
            </button>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
              Estimated GPA
            </p>

            <div className="mt-3 text-3xl font-bold text-blue-900 sm:text-4xl">
              {result.gpa !== null ? result.gpa.toFixed(2) : "--"}
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Based on {result.completedSubjects} completed subject
              {result.completedSubjects === 1 ? "" : "s"}.
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between gap-3">
                <span>Total Weighted Grade Points</span>
                <span className="font-medium">
                  {result.totalWeightedGradePoints.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Total Credit Hours</span>
                <span className="font-medium">{result.totalCreditHours}</span>
              </div>
            </div>

            {result.hasNG && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                One or more subjects are NG.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              How GPA is Calculated
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Step 1:</span> Theory
                and practical are graded separately.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Step 2:</span> Their
                credit share is calculated separately.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Step 3:</span> WGP is
                calculated separately for theory and practical.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Step 4:</span> If
                theory is below 40%, the subject becomes NG.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Step 5:</span> Final
                GPA = Total WGP / Total Credit Hours.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              Grade Scale
            </h3>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between gap-3">
                <span>90–100</span>
                <span>A+ / 4.0</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>80–89</span>
                <span>A / 3.6</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>70–79</span>
                <span>B+ / 3.2</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>60–69</span>
                <span>B / 2.8</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>50–59</span>
                <span>C+ / 2.4</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>40–49</span>
                <span>C / 2.0</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>35–39</span>
                <span>D / 1.6</span>
              </div>
              <div className="flex justify-between gap-3">
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