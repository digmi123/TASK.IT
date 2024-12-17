import TemplateIcon from "@/assets/template.svg?react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Add from "@/assets/add.svg?react";
import NewBoardDialog from "@/features/board/components/NewBoardDialog";
import { useBoards } from "@/features/board/hooks/useBoards";
import { deskSectionActions } from "../consts";
import Desk from "@/assets/desk.svg?react";
import { Fragment } from "react";

export default function DeskSection({ desk }) {
  const navigate = useNavigate();
  const { boards, addBoard } = useBoards(desk.id);

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
          {deskSectionActions.map((action) => (
            <Fragment key={`${desk.name}-${action.name}`}>
              <Button onClick={() => navigate(`/${desk.id}/members/workspace`)}>
                <TemplateIcon />
                Members
              </Button>

              {/* <Button onClick={() => navigate(`/${desk.id}/members/workspace`)}>
                <TemplateIcon />
                Boards
              </Button> */}

              <Button key={action.name}>
                <TemplateIcon />
                {action.name}
              </Button>
            </Fragment>
          ))}
        </div>
      </div>

      <div id="wrapper" className="flex gap-4">
        {boards.map((board) => (
          <NavLink
            to={`${desk.id}/${board.id}`}
            key={board.id}
            id="template"
            className="w-56 h-24 bg-card rounded-md"
          >
            <div id="inner-template-card" className="py-2 px-4">
              <h2 className="text-white">{board.name}</h2>
            </div>
          </NavLink>
        ))}

        <NewBoardDialog addBoard={addBoard}>
          <Button
            id="new-board"
            className="flex gap-3 items-center w-56 h-24 bg-card rounded-md p-0 justify-center"
          >
            <Add style={{ width: "4rem", height: "4rem" }} />
          </Button>
        </NewBoardDialog>
      </div>
    </div>
  );
}
