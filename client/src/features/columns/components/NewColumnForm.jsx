import { Button } from "@/components/ui/button";
import { addColumnThunk } from "@/redux/slices/boardSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewColumnForm({ setOpen }) {
  const [columnName, setColumnName] = useState("");
  const { boardData } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const saveNewColumn = () => {
    dispatch(addColumnThunk({ boardId: boardData.id, columnName }));

    //Reset
    setOpen(false);
    setColumnName("");
  };
  return (
    <div
      id="column-name-input"
      className="flex flex-col gap-3 p-4 h-fit shadow-sm rounded-md"
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
