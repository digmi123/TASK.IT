import BoardCard from "../board/BoardCard";
import Card from "../board/components/Card";
import plusIcon from "@/assets/add.svg";
import { useBoards } from "../board/hooks/useBoards";
import NewBoardDialog from "../board/components/newBoardDialog";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Boards() {
  const { deskId } = useParams();

  // Get user boards by hook/api call.
  const { boards, loading, addBoard } = useBoards(deskId);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      id="boards-wrapper"
      className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] h-fit p-4 gap-4 w-full"
    >
      {boards.map((board) => {
        return <BoardCard key={board.id} id={board.id} boardInfo={board} />;
      })}

      <Card>
        <div className="flex items-center justify-center flex-1">
          <img src={plusIcon} alt="plus" className="w-20 h-20" />
        </div>

        <NewBoardDialog addBoard={addBoard}>
          <Button className="m-4" variant="secondary">
            Add Board
          </Button>
        </NewBoardDialog>
      </Card>
    </div>
  );
}
