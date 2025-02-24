import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TemplateIcon from "@/assets/template.svg?react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import trash from "@/assets/trash.svg";
import { useState } from "react";
import { deleteDeskThunk } from "@/redux/slices/desksSlice";
import { useDispatch } from "react-redux";

function NavigationActions({ desk }) {
  const dispatch = useDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button asChild>
            <Link>
              <TemplateIcon />
              Options
            </Link>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Manage Participants</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="flex items-center text-center text-destructive"
          >
            <img src={trash} alt="trash" className="w-5" />
            <p>Delete desk</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        innerText="Are you sure you want to delete this desk?"
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Delete Desk"
        onConfirm={() => dispatch(deleteDeskThunk({ deskId: desk.id }))}
        icon={trash}
      />
    </div>
  );
}

export default NavigationActions;
