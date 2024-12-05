import { Button } from "@/components/ui/button";
import Column from "./Column";
import { useState } from "react";
import NewColumnForm from "./NewColumnForm";

function Columns({ columns }) {
  const [askColumnName, setAskColumnName] = useState(false);

  return (
    <div className="flex gap-3 p-4 flex-1 overflow-x-auto">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}

      {askColumnName ? (
        <NewColumnForm setOpen={setAskColumnName} />
      ) : (
        <Button onClick={() => setAskColumnName(true)}>Add Column</Button>
      )}
    </div>
  );
}

export default Columns;
