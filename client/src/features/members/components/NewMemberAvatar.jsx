import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const NewMemberAvatar = forwardRef(({ user, className }, ref) => {
  const firstLetter = user.email.toUpperCase()[0];

  return (
    <div className={cn("w-8 h-8 min-w-8 min-h-8", className)} ref={ref}>
      {user.picture ? (
        <img
          src={user.picture}
          alt="user-avatar"
          className="w-full h-full rounded-full"
        />
      ) : (
        <div
          id="avatar-wrapper"
          className="w-full h-full flex items-center justify-center text-center bg-sky-500 rounded-full aspect-square"
        >
          <p className="text-xl text-white">{firstLetter}</p>
        </div>
      )}
    </div>
  );
});

NewMemberAvatar.displayName = "NewMemberAvatar";
export default NewMemberAvatar;
