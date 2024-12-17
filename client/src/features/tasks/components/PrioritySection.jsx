import { cn } from "@/lib/utils";

export default function PrioritySection() {
  const priorities = [
    { label: "Low", priorityStyle: "bg-teal-500" },
    { label: "Medium", priorityStyle: "bg-yellow-500" },
    { label: "High", priorityStyle: "bg-red-500" },
  ];

  return (
    <div id="priority-section" className="flex flex-col gap-2">
      <h2>Priority</h2>
      <div className="flex gap-4 items-center">
        {priorities.map(({ label, priorityStyle }) => (
          <label key={label}>
            <input
              type="radio"
              name="priority"
              value={label}
              className="peer hidden"
            />
            <div
              key={label}
              className={cn(
                priorityStyle,
                "flex items-center gap-2 cursor-pointer px-6 py-1 min-w-10 rounded-full text-sm text-white font-semibold transition peer-checked:border-2 peer-checked:border-primary"
              )}
            >
              {label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
