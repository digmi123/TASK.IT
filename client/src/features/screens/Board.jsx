import {
  DndContext,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Columns from "../columns/components/Columns";
import BoardBar from "../board/BoardBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchBoardThunk,
  updateTaskColumn as updateTaskColumnRedux,
} from "@/redux/slices/boardSlice";
import { useParams } from "react-router-dom";
import Task from "../tasks/components/Task";

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { boardData, loading } = useSelector((state) => state.board);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    if (boardData.background_image) {
      document.body.classList.add("bg-cover", "bg-center", "bg-no-repeat");
      document.body.style.backgroundImage = `url(${boardData.background_image})`;
    }
    return () => {
      document.body.classList.remove("bg-cover", "bg-center", "bg-no-repeat");
      document.body.style.backgroundImage = "";
    };
  }, [boardData.background_image]);

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

  const updateTaskColumn = (newColumnId, task) => {
    const { parent_column } = task.data.current;
    if (!parent_column) return;
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
    setDraggedTask(null);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggedTask(active.data.current);
  };

  return (
    <>
      <BoardBar boardName={boardData.name} />

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Columns columns={boardData.columns} draggedTask={draggedTask} />

        <DragOverlay>
          {draggedTask ? <Task task={draggedTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Board;
