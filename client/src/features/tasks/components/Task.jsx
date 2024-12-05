import { useDraggable } from "@dnd-kit/core";

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
    <div
      className="bg-slate-600 p-4 rounded-md w-48"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h1 className="font-bold text-lg">{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}

export default Task;
