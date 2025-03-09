import { SelectProps } from "@/lib/types/ui/Select";

export default function Select({ labelText, selectData, name }: SelectProps) {
  return (
    <div>
      <label className="text-md block font-bold">{labelText}</label>
      <select
        className="w-full py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-0"
        name={name}
        required
      >
        {selectData.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
