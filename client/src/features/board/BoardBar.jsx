import reactLogo from "../../assets/react.svg";
export default function BoardBar({ boardName }) {
  return (
    <div
      id="upper-bar"
      className="rounded-md shadow-sm p-4 flex justify-between items-center"
    >
      <div id="left-side" className="flex gap-4 items-center">
        <h3 className="text-xl font-bold">{boardName}</h3>
        <img src={reactLogo} alt="star" className="w-6 h-6" />
      </div>
    </div>
  );
}
