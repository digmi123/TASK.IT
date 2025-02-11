import TemplateIcon from "@/assets/template.svg?react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Add from "@/assets/add.svg?react";
import NewBoardDialog from "@/features/board/components/NewBoardDialog";
import { useBoards } from "@/features/board/hooks/useBoards";
import Desk from "@/assets/desk.svg?react";
import BoardsCards from "./BoardsCards";

export default function DeskSection({ desk }) {
  const navigate = useNavigate();
  const { boards, loading, addBoard } = useBoards(desk.id);

  if (desk.pending) return <div>Loading...</div>;

  return (
    <div id="desk-section" className="flex flex-col gap-4">
      <div id="upper" className="flex">
        <div id="desk-name" className="flex-1 flex items-center gap-4">
          <div id="desk-icon" className="bg-primary p-1 rounded-md">
            <Desk style={{ color: "white" }} />
          </div>
          <Link to={`/${desk.id}`}>
            <h2 className="text-xl">{desk.name}</h2>
          </Link>
        </div>

        <div id="desk-actions" className="flex items-center gap-4">
          <Button asChild>
            <Link to={`/${desk.id}/members/workspace`}>
              <TemplateIcon />
              Members
            </Link>
          </Button>

          <Button asChild>
            <Link to={`/${desk.id}`}>
              <TemplateIcon />
              Boards
            </Link>
          </Button>

          <Button asChild>
            <Link>
              <TemplateIcon />
              Settings
            </Link>
          </Button>
        </div>
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
