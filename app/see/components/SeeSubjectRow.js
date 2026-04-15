export default function SeeSubjectRow({
  subject,
  value,
  onChange,
  options,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 sm:grid-cols-2 sm:items-center">
      <label className="text-sm font-medium text-gray-800">{subject}</label>

      <select
        value={value}
        onChange={(e) => onChange(subject, e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.label} value={option.point}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}