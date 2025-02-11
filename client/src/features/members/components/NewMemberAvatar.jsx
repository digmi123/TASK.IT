import { cn } from "@/lib/utils";

function NewMemberAvatar({ email, className }) {
  const firstLetter = email.toUpperCase()[0];

  return (
    <div
      id="avatar-wrapper"
      className={cn(
        "w-[48px] h-[48px] flex items-center justify-center text-center bg-sky-500 rounded-full",
        className
      )}
    >
      <p className="text-xl text-white">{firstLetter}</p>
    </div>
  );
}

export default NewMemberAvatar;
