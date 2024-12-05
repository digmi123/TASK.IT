import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTask } from "../api";
import { useBoard } from "@/shared/providers/BoardProvider";

function NewTask({ columnId, setOpen }) {
  const { setBoardData } = useBoard();

  const handleNewTask = (e) => {
    e.preventDefault();
    const { task_name, task_description } = e.target;

    //Optimistic update
    const newTask = {
      id: Math.random(),
      parent_column: columnId,
      title: task_name.value,
      description: task_description.value,
    };

    setBoardData((board) => {
      const updatedBoard = {
        ...board,
        columns: board.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            };
          }
          return column;
        }),
      };

      return updatedBoard;
    });

    //Api call
    addTask({
      columnId,
      task: {
        title: task_name.value,
        description: task_description.value,
      },
    });

    setOpen(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleNewTask}>
      <Input type="text" placeholder="Task name" name="task_name" />
      <Input
        type="text"
        placeholder="Task description"
        name="task_description"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default NewTask;
