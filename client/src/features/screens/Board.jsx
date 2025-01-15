import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import Columns from "../columns/components/Columns";
import BoardBar from "../board/BoardBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchBoardThunk,
  updateTaskColumn as updateTaskColumnRedux,
} from "@/redux/slices/boardSlice";
import { useParams } from "react-router-dom";

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { boardData, loading } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(fetchBoardThunk(boardId));
  }, [boardId, dispatch]);

  // Add custom sensor to prevent dragging swallows the click event on task.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  if (loading) return <h1>Loading...</h1>;

  const updateTaskColumn = async (newColumnId, task) => {
    const { parent_column } = task.data.current;
    //State update.
    dispatch(
      updateTaskColumnRedux({
        parentColumn: parent_column,
        targetColumn: newColumnId,
        task,
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    updateTaskColumn(over.id, active);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <BoardBar boardName={boardData.name} />

      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Columns columns={boardData.columns} />
      </DndContext>
    </div>
  );
}

export default Board;
