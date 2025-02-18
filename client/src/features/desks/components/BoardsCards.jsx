import BoardSkeletonCard from "@/features/board/components/BoardSkeletonCard";
import { NavLink } from "react-router-dom";

function BoardsCards({ boards, desk, loading }) {
  if (loading)
    return (
      <>
        {boards.map((board) => (
          <BoardSkeletonCard key={board.id} />
        ))}
      </>
    );

  return (
    <>
      {boards.map((board) => (
        <NavLink
          to={`/${desk.id}/${board.id}`}
          key={board.id}
          id="board"
          className="w-56 h-24 bg-card rounded-md"
        >
          <div id="inner-template-card" className="py-2 px-4">
            <h2 className="text-white">{board.name}</h2>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default BoardsCards;
