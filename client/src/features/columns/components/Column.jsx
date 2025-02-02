import { useDroppable } from "@dnd-kit/core";
import Task from "../../tasks/components/Task";
import Add from "@/assets/add.svg?react";
import { Button } from "@/components/ui/button";
import NewTaskDialog from "@/features/task/components/NewTaskDialog";

function Column({ column }) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <div
      id="column-wrapper"
      key={column.id}
      ref={setNodeRef}
      className="bg-slate-200 min-w-60 border shadow rounded-md flex flex-col items-center gap-2 p-2 h-full"
      style={style}
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
        className="flex flex-col gap-4 overflow-auto pe-2"
      >
        {column.tasks.map((task, index) => {
          return <Task key={`${task.name}-${index}`} task={task} />;
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
