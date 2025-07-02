import {
  closestCorners,
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
  moveTask,
  updateColumnsIndexes,
  updateTaskColumn as updateTaskColumnRedux,
} from "@/redux/slices/boardSlice";
import { useParams } from "react-router-dom";
import Task from "../tasks/components/Task";
import Column from "../columns/components/Column";

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { boardData, loading } = useSelector((state) => state.board);

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedColumn, setDraggedColumn] = useState(null);

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

  const defaultAnnouncements = {
    onDragStart(id) {
      console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was moved over droppable area ${overId}.`
        );
        return;
      }

      console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was dropped over droppable area ${overId}`
        );
        return;
      }

      console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
      console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    },
  };

  const handleDragEnd = (event) => {
    setDraggedTask(null);
    setDraggedColumn(null);
    const { active, over } = event;
    if (!over) return;
    const isActicveAColumn = active.data.current?.type === "Column";
    const isOverAColumn = over.data.current?.type === "Column";
    if (!isActicveAColumn || !isOverAColumn) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    dispatch(updateColumnsIndexes({ activeColumnId, overColumnId }));
  };

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActicveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActicveATask) return;
    // Two Scenarions:
    // 1. Dragging a task over a task.
    if (isActicveATask && isOverATask) {
      console.log("first if");
      if (
        active.data.current.task.parent_column !==
        over.data.current.task.parent_column
      ) {
        console.log("Different column");
        dispatch(
          updateTaskColumnRedux({
            parentColumn: active.data.current.task.parent_column,
            targetColumn: over.data.current.task.parent_column,
            task: active.data.current.task,
          })
        );
      } else {
        console.log("Same column");
        dispatch(
          moveTask({
            activeTask: active.data.current.task,
            targetTask: over.data.current.task,
          })
        );
      }
    }

    // 2. Dragging a task over a column.
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActicveATask && isOverAColumn) {
      console.log("second If");
      dispatch(
        updateTaskColumnRedux({
          parentColumn: active.data.current.task.parent_column,
          targetColumn: over.id,
          task: active.data.current.task,
        })
      );
    }
  }

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.type === "Column")
      return setDraggedColumn(active.data.current.column);

    if (active.data.current.type === "Task")
      return setDraggedTask(active.data.current.task);
  };

  return (
    <>
      <BoardBar boardName={boardData.name} />

      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
        announcements={defaultAnnouncements}
      >
        <Columns columns={boardData.columns} draggedTask={draggedTask} />

        <DragOverlay>
          {draggedTask ? <Task task={draggedTask} /> : null}
          {draggedColumn ? <Column column={draggedColumn} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Board;
