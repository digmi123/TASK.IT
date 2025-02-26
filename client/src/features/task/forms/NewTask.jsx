import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrioritySection from "../../tasks/components/PrioritySection";
import { useDispatch } from "react-redux";
import { addNewTaskThunk } from "@/redux/slices/boardSlice";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    task_name: yup.string().required("Task Name is required"),
    task_description: yup.string().required("Task Description is required"),
    priority: yup.string().required("Task Priority is required"),
  })
  .required();

function NewTask({ columnId, setOpen }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const handleNewTask = (data) => {
    //Optimistic update
    const newTask = {
      id: Math.random(),
      parent_column: columnId,
      title: data.task_name,
      description: data.task_description,
      priority: data.priority,
      createdAt: new Date().toISOString(),
    };
    dispatch(addNewTaskThunk({ task: newTask, columnId }));
    setOpen(false);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleNewTask)}
    >
      <div id="field-wrapper" className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Task name (required)"
          {...register("task_name")}
          aria-invalid={errors.task_name ? "true" : "false"}
          className={errors.task_name ? "border-red-500" : ""}
        />
        <p className="invalid">{errors.task_name?.message}</p>
      </div>

      <div id="field-wrapper" className="flex flex-col gap-2">
        <Textarea
          placeholder="Task description (required)"
          {...register("task_description")}
          aria-invalid={errors.task_description ? "true" : "false"}
          className={errors.task_description ? "border-red-500" : ""}
        />
        <p className="invalid">{errors.task_description?.message}</p>
      </div>

      {/* Priority tags */}
      <PrioritySection register={register} errors={errors} />

      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default NewTask;
