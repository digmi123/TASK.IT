import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/add.svg?react";
import ZeroDeskMembers from "./ZeroDeskMembers";
import WorkspaceMembers from "./WorkspaceMembers";
import Divider from "@/shared/components/Divider";
import { useOutletContext } from "react-router-dom";

export default function CollabMain() {
  const { members } = useOutletContext();
  if (members.length === 0) return <ZeroDeskMembers />;

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

      <Divider />
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

      <Divider />
      <WorkspaceMembers members={members} />
    </div>
  );
}
