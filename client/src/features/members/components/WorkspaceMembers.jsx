import Member from "./Member";

function WorkspaceMembers({ members }) {
  return (
    <div id="third-content">
      {members.map((member) => (
        <div id="members-table" key={member.id} className="flex flex-col gap-4">
          <Member member={member} />
        </div>
      ))}
    </div>
  );
}

export default WorkspaceMembers;
