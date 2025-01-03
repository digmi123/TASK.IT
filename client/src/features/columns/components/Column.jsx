import { useDroppable } from "@dnd-kit/core";
import Task from "../../tasks/components/Task";
import Add from "@/assets/add.svg?react";
import { Button } from "@/components/ui/button";
import NewTaskDialog from "@/features/tasks/components/NewTaskDialog";

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
      className="bg-slate-200 h-full min-w-48 border shadow rounded-md"
    >
      <div className="flex flex-col items-center gap-2 p-2 h-fit" style={style}>
        <div className="w-full flex items-center gap-2 justify-around m-2">
          <h2 className="text-xl font-semibold">{column.name}</h2>
          <NewTaskDialog columnId={column.id}>
            <button>
              <Add />
            </button>
          </NewTaskDialog>
        </div>

        <div id="tasks-wrapper" className="flex flex-col gap-4">
          {column.tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>

        <NewTaskDialog columnId={column.id}>
          <Button className="w-full" variant="secondary">
            Add Task
          </Button>
        </NewTaskDialog>
      </div>
    </div>
  );
}

export default Column;
