import { Button } from "@/components/ui/button";
import Add from "@/assets/add.svg?react";
import Desk from "@/assets/desk.svg?react";
import NewBoardDialog from "@/features/board/components/NewBoardDialog";
import { useBoards } from "@/features/board/hooks/useBoards";
import BoardsCards from "./BoardsCards";
import NavigationActions from "./NavigationActions";
import { Link } from "react-router-dom";

export default function DeskSection({ desk }) {
  const { boards, loading, addBoard } = useBoards(desk.id);
  if (desk.pending) return <div>Loading...</div>;

  return (
    <div id="desk-section" className="flex flex-col gap-4">
      <div
        id="top-desk-section"
        className="flex items-center justify-between gap-4"
      >
        <div id="top-left-side" className="flex gap-4 items-center">
          <div id="desk-name" className="flex-1 flex items-center gap-4">
            <div id="desk-icon" className="bg-primary p-1 rounded-md">
              <Desk style={{ color: "white" }} />
            </div>
            <Link to={`/${desk.id}`}>
              <h2 className="text-xl">{desk.name}</h2>
            </Link>
          </div>
        </div>

        <NavigationActions desk={desk} />
      </div>

      <div id="wrapper" className="flex gap-4">
        <BoardsCards boards={boards} desk={desk} loading={loading} />

        <NewBoardDialog addBoard={addBoard}>
          <Button
            id="new-board"
            className="flex gap-3 items-center w-56 h-24 bg-card rounded-md p-0 justify-center transition-all duration-500 hover:bg-primary"
          >
            <Add style={{ width: "4rem", height: "4rem" }} />
          </Button>
        </NewBoardDialog>
      </div>
    </div>
  );
}
