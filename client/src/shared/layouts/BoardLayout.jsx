import { Outlet, useParams } from "react-router-dom";
import BoardProvider from "../providers/BoardProvider";

function BoardLayout() {
  const { boardId } = useParams();

  return (
    <BoardProvider boardId={boardId}>
      <Outlet />
    </BoardProvider>
  );
}

export default BoardLayout;
