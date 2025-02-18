import Column from "./Column";
import NewColumn from "./NewColumn";

function Columns({ columns, draggedTask }) {
  return (
    <div className="flex gap-3 p-4 grow overflow-auto group bg-center">
      {columns.map((column) => (
        <Column key={column.id} column={column} draggedTask={draggedTask} />
      ))}

      <NewColumn />
    </div>
  );
}

export default Columns;
