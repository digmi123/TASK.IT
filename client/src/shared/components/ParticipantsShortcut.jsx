import plus from "@/assets/plus.svg";
import avatar from "@/assets/user.svg";
function ParticipantsShortcut({ participants }) {
  const visibleParticipants = participants.slice(0, 3);
  const offset = 20;
  return (
    <div
      id="participants-wrapper"
      className="w-[120px] flex items-center justify-end"
    >
      {visibleParticipants.map((participant, index) => {
        return (
          <img
            key={index}
            id="participant-icon"
            src={participant.picture || avatar}
            alt=""
            className="rounded-full border w-8 h-8 ml-[-10px]"
            style={{
              left: `${index * offset}px`,
              zIndex: index,
            }}
          />
        );
      })}
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
