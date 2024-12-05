export default function Guests() {
  return (
    <div className="flex flex-col gap-4">
      <div id="first-content">
        <h2 className="font-semibold text-xl">Guests</h2>
        <p>
          Guests can only view and edit the boards to which they've been added.
        </p>
      </div>

      <hr
        id="divider"
        className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
      />

      <div id="first-content">
        <h2 className="font-semibold text-xl">Single-board guests (1)</h2>
        <p>Single-board guests are members of only one Workspace board.</p>
      </div>

      {/* <div id="third-content">
        {members.map((member) => (
          <div
            id="members-table"
            key={member.id}
            className="flex flex-col gap-4"
          >
            <Member member={member} />
            <Member key={member.id} member={member} />
            <Member key={member.id} member={member} />
          </div>
        ))}
      </div> */}
    </div>
  );
}
