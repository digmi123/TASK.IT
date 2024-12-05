import { useDroppable } from "@dnd-kit/core";
import Task from "../../tasks/components/Task";
import TaskDialog from "@/features/tasks/components/TaskDialog";

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
        <h2 className="text-xl font-semibold">{column.name}</h2>

        <div id="tasks-wrapper" className="flex flex-col gap-4">
          {column.tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>

        <TaskDialog columnId={column.id} />
      </div>
    </div>
  );
}

export default Column;
