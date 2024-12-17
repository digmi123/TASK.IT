import { cn } from "@/lib/utils";

const prioritiesStyle = {
  Low: "bg-teal-500",
  Medium: "bg-yellow-500",
  High: "bg-red-500",
};

export default function Tag({ priority }) {
  return (
    <div
      className={cn(
        prioritiesStyle[priority],
        "px-6 py-1 min-w-10 rounded-full text-sm text-white font-semibold"
      )}
    >
      {priority}
    </div>
  );
}
