import { useDraggable } from "@dnd-kit/core";
import CheckMark from "@/assets/checkmark.svg?react";
import CommentsIcon from "@/assets/comments.svg?react";
import taskBg from "@/assets/task-bg.jpg";
import Tag from "./Tag";
import TaskDialog from "@/features/task/components/TaskDialog";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";
import { formatDate } from "@/shared/utils";
import Delete from "@/assets/close-x.svg?react";
import { deleteTaskThunk } from "@/redux/slices/boardSlice";
import { useDispatch } from "react-redux";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import trash from "@/assets/trash.svg";
import { useState } from "react";

function Task({ task, draggedStyle, demo }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: demo ? -1 : task.id,
    data: task,
  });

  let style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  style = { ...style, ...draggedStyle };

  const handleDelete = (event) => {
    event.stopPropagation();
    setDeleteDialogOpen(true);
  };

  return (
    <TaskDialog task={task}>
      <div
        className="bg-white p-4 rounded-md w-60 max-w-60 shadow-sm flex flex-col items-start gap-4 relative"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <Delete
          className="absolute top-0 right-0 bottom-0 w-fit"
          onClick={(event) => handleDelete(event, task)}
        />

        <ConfirmDialog
          innerText="Are you sure you want to delete this task?"
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Delete Task"
          onConfirm={() => dispatch(deleteTaskThunk(task))}
          icon={trash}
        />

        <img src={taskBg} alt="bg" className="rounded-md" />
        <div className="flex gap-2">
          <CheckMark style={{ width: "24px", height: "24px" }} />
          <h1 className="">{task.title}</h1>
        </div>
        <Tag priority={task.priority} />

        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <NewMemberAvatar user={task.user} />
            <p className="text-sm text-slate-400">
              {formatDate(task.createdAt, "short")}
            </p>
            {/* <p className="text-sm text-slate-400">11 April</p> */}
          </div>
          <CommentsIcon />
        </div>
        {/* Add Likes and comments icons on the bottom-right side of the card */}
      </div>
    </TaskDialog>
  );
}

export default Task;
