import { Button } from "@/components/ui/button";
import NewColumnForm from "./NewColumnForm";
import { useState } from "react";
import { useSelector } from "react-redux";

function NewColumn() {
  const [askColumnName, setAskColumnName] = useState(false);
  const { columnLoading } = useSelector((state) => state.board);

  if (columnLoading) return <div>Loading...</div>;

  if (askColumnName) return <NewColumnForm setOpen={setAskColumnName} />;
  return <Button onClick={() => setAskColumnName(true)}>Add Column</Button>;
}

export default NewColumn;
