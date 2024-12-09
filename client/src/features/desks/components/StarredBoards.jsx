import StarIcon from "@/assets/star.svg?react";

export default function StarredBoards() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <StarIcon />
        <h2 className="text-2xl font-semibold">Starred Boards</h2>
      </div>

      <div id="boards-wrapper" className="flex gap-4 py-4">
        <div id="template" className="w-56 h-24 bg-slate-600 rounded-md">
          <div id="inner-board-card" className="py-2 px-4">
            <h2 className="text-white">Board Name</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
