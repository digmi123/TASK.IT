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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, draggedStyle, draggedTask, demo }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setDeleteDialogOpen(true);
  };

  if (isDragging && draggedTask)
    return (
      <div
        id="box-test"
        className="bg-white p-4 border-2 border-rose-500 opacity-40 rounded-md w-60 max-w-60 shadow-sm flex flex-col items-start gap-4 relative"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <Delete
          className="absolute top-0 right-0 bottom-0 w-fit"
          onClick={(event) => handleDelete(event, task)}
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
          </div>
          <CommentsIcon />
        </div>
      </div>
    );

  return (
    // <div
    //   id="box-test"
    //   className="bg-white border-black border-2 p-4 rounded-md w-60 max-w-60 shadow-sm flex flex-col items-start gap-4 relative"
    //   ref={setNodeRef}
    //   style={style}
    //   {...listeners}
    //   {...attributes}
    // >
    //   {task.id}-{task.title}
    // </div>

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
          </div>
          <CommentsIcon />
        </div>
      </div>
    </TaskDialog>
  );
}

export default Task;
