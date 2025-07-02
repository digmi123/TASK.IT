import Task from "../../tasks/components/Task";
// import Add from "@/assets/add.svg?react";
import grip from "@/assets/grip-drag.svg";
import trash from "@/assets/trash.svg";
import x from "@/assets/x.svg";
import { Button } from "@/components/ui/button";
import NewTaskDialog from "@/features/task/components/NewTaskDialog";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function Column({ column, draggedTask }) {
  const [deleteColumnDialogOpen, setDeleteColumnDialogOpen] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        id="column-wrapper"
        key={column.id}
        ref={setNodeRef}
        style={style}
        className="bg-slate-200 min-w-72 border opacity-40 border-rose-500 shadow-sm rounded-md flex flex-col items-center gap-2 p-2 h-full"
      />
    );

  return (
    <SortableContext items={column.tasks}>
      <div
        id="column-wrapper"
        key={column.id}
        ref={setNodeRef}
        style={style}
        className="bg-slate-200 min-w-72 border shadow-sm rounded-md flex flex-col items-center gap-2 p-2 h-full group"
      >
        <div
          className="w-full flex items-center gap-2 justify-around m-2"
          {...attributes}
        >
          <h2 className="text-xl font-semibold">{column.name}</h2>
          <div id="column-actions" className="flex gap-1 items-center">
            <div
              onClick={() => setDeleteColumnDialogOpen(true)}
              className="p-1 hover:bg-gray-300 rounded-md"
            >
              <img
                src={x}
                alt="x"
                className="opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>

            <div
              className="p-1 hover:bg-gray-300 rounded-md hover:cursor-grab"
              {...listeners}
            >
              <img src={grip} alt="grip-drag" />
            </div>
          </div>

          <ConfirmDialog
            innerText="Are you sure you want to delete this desk?"
            open={deleteColumnDialogOpen}
            setOpen={setDeleteColumnDialogOpen}
            title="Delete Column"
            // onConfirm={() => dispatch(deleteDeskThunk({ deskId: desk.id }))}
            icon={trash}
          />
          {/* <NewTaskDialog columnId={column.id}>
            <button>
              <Add />
            </button>
          </NewTaskDialog> */}
        </div>

        <div
          id="tasks-wrapper"
          className="flex flex-col gap-4 overflow-y-auto pe-2"
        >
          {column.tasks.map((task) => {
            return <Task key={task.id} task={task} draggedTask={draggedTask} />;
          })}
        </div>

        <NewTaskDialog columnId={column.id}>
          <Button className="w-full" variant="secondary">
            Add Task
          </Button>
        </NewTaskDialog>
      </div>
    </SortableContext>
  );
}

export default Column;
