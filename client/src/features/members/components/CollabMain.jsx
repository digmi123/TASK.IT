import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/add.svg?react";
import { useDeskMembers } from "../hooks/useDeskMembers";
import Member from "./Member";

export default function CollabMain() {
  const { members } = useDeskMembers();

  return (
    <div className="flex flex-col gap-4">
      <div id="first-content">
        <h2 className="font-semibold text-xl">
          Desk Members <span>{members.length}</span>
        </h2>
        <p>
          Desk members can view and join all Desk visible boards and create new
          boards in the Desk.
        </p>
      </div>

      <hr
        id="divider"
        className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
      />

      <div id="second-content">
        <h2 className="font-semibold text-xl">Invite members to join you</h2>
        <div className="flex items-start gap-4">
          <p>
            Anyone with an invite link can join this free Desk. You can also
            disable and create a new invite link for this Desk at any time.
            Pending invitations count toward the 10 collaborator limit.
          </p>
          <Button>
            <AddIcon />
            Invite With Link
          </Button>
        </div>
      </div>

      <hr
        id="divider"
        className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
      />

      <div id="third-content">
        {members.map((member) => (
          <div
            id="members-table"
            key={member.id}
            className="flex flex-col gap-4"
          >
            <Member member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
