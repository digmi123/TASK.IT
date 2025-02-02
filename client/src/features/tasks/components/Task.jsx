import { useDraggable } from "@dnd-kit/core";
import Avatar from "@/assets/user.svg?react";
import CheckMark from "@/assets/checkmark.svg?react";
import CommentsIcon from "@/assets/comments.svg?react";
import taskBg from "@/assets/task-bg.jpg";
import Tag from "./Tag";
import TaskDialog from "@/features/task/components/TaskDialog";

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <TaskDialog task={task}>
      <div
        className="bg-white p-4 rounded-md max-w-60 shadow flex flex-col items-start gap-4"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <img src={taskBg} alt="bg" className="rounded-md" />
        <div className="flex gap-2">
          <CheckMark style={{ width: "24px", height: "24px" }} />
          <h1 className="">{task.title}</h1>
        </div>
        <Tag priority={task.priority} />

        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            {task.user?.picture ? (
              <img
                src={task.user.picture}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Avatar />
            )}
            {/* <p>{task.createdAt}</p> */}
            <p className="text-foreground">Apr 11-18</p>
          </div>
          <CommentsIcon />
        </div>
        {/* Add Likes and comments icons on the bottom-right side of the card */}
      </div>
    </TaskDialog>
  );
}

export default Task;
