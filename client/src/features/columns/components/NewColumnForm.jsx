import { Button } from "@/components/ui/button";
import { useBoard } from "@/shared/providers/BoardProvider";
import { useState } from "react";

function NewColumnForm({ setOpen }) {
  const [columnName, setColumnName] = useState("");
  const { handleAddColumn } = useBoard();

  const saveNewColumn = () => {
    handleAddColumn(columnName);

    //Reset
    setOpen(false);
    setColumnName("");
  };
  return (
    <div
      id="column-name-input"
      className="flex flex-col gap-3 p-4 h-fit shadow rounded-md"
    >
      <input
        type="text"
        placeholder="Column Name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        className="border p-2 rounded"
      />
      <Button onClick={saveNewColumn}>Save</Button>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  );
}

export default NewColumnForm;
