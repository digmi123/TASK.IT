import plus from "@/assets/plus.svg";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";
function ParticipantsShortcut({ participants }) {
  const visibleParticipants = participants.slice(0, 3);
  const offset = 20;
  return (
    <div
      id="participants-wrapper"
      className="w-[150px] flex items-center justify-between"
    >
      {participants.length === 0 ? (
        <p className="text-gray-500 text-sm">No participants</p>
      ) : (
        <div className="flex items-center">
          {visibleParticipants.map((participant, index) => (
            <NewMemberAvatar
              user={participant}
              key={participant.id}
              style={{
                left: `${index * offset}px`,
                zIndex: visibleParticipants.length - index,
              }}
            />
          ))}
        </div>
      )}

      <img
        src={plus}
        alt=""
        className="w-8 h-8 rounded-full border bg-red-500"
        style={{
          left: `${visibleParticipants.length * offset}px`,
          zIndex: visibleParticipants.length,
        }}
      />
    </div>
  );
}

export default ParticipantsShortcut;
