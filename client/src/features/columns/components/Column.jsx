import { useDroppable } from "@dnd-kit/core";
import Task from "../../tasks/components/Task";
import Add from "@/assets/add.svg?react";
import { Button } from "@/components/ui/button";
import NewTaskDialog from "@/features/task/components/NewTaskDialog";

function Column({ column, draggedTask }) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  let showDragOverlay =
    isOver && draggedTask && draggedTask.parent_column !== column.id;

  return (
    <div
      id="column-wrapper"
      key={column.id}
      ref={setNodeRef}
      className="bg-slate-200 min-w-72 border shadow-sm rounded-md flex flex-col items-center gap-2 p-2 h-full"
    >
      <div className="w-full flex items-center gap-2 justify-around m-2">
        <h2 className="text-xl font-semibold">{column.name}</h2>
        <NewTaskDialog columnId={column.id}>
          <button>
            <Add />
          </button>
        </NewTaskDialog>
      </div>

      <div
        id="tasks-wrapper"
        className="flex flex-col gap-4 overflow-y-auto pe-2"
      >
        {showDragOverlay && (
          <Task
            task={draggedTask}
            draggedStyle={{ opacity: 0.5, transform: "scale(0.9)" }}
            demo={true}
          />
        )}

        {column.tasks.map((task) => {
          return (
            <div
              key={task.id}
              style={task.id === draggedTask?.id ? { opacity: 0 } : {}}
              className="overflow-hidden min-h-fit"
            >
              <Task task={task} />
            </div>
          );
        })}
      </div>

      <NewTaskDialog columnId={column.id}>
        <Button className="w-full" variant="secondary">
          Add Task
        </Button>
      </NewTaskDialog>
    </div>
  );
}

export default Column;
