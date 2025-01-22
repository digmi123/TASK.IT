import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrioritySection from "../../tasks/components/PrioritySection";
import { useDispatch } from "react-redux";
import { addNewTaskThunk } from "@/redux/slices/boardSlice";

function NewTask({ columnId, setOpen }) {
  const dispatch = useDispatch();

  const handleNewTask = (e) => {
    e.preventDefault();
    const { task_name, task_description, priority } = e.target;

    //Optimistic update
    const newTask = {
      id: Math.random(),
      parent_column: columnId,
      title: task_name.value,
      description: task_description.value,
      priority: priority.value,
    };
    dispatch(addNewTaskThunk({ task: newTask, columnId }));
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
      {/* Priority tags */}
      <PrioritySection />
      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default NewTask;
