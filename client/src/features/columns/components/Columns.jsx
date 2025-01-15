import Column from "./Column";
import NewColumn from "./NewColumn";

function Columns({ columns }) {
  return (
    <div className="flex gap-3 p-4 flex-1 overflow-x-auto">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}

      <NewColumn />
    </div>
  );
}

export default Columns;
