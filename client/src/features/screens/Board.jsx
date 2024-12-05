import { DndContext } from "@dnd-kit/core";
import Columns from "../columns/components/Columns";
import BoardBar from "../board/BoardBar";
import { updateTaskParent } from "../tasks/api";
import { useBoard } from "@/shared/providers/BoardProvider";

function Board() {
  const { boardData, setBoardData, loading, handleAddColumn } = useBoard();

  if (loading) return <h1>Loading...</h1>;

  const removeTask = (task) => {
    const { parent_column, id } = task.data.current;

    setBoardData((board) => {
      const column = board.columns.find(
        (column) => column.id === parent_column
      );

      const taskIndex = column.tasks.findIndex((task) => task.id === id);
      column.tasks.splice(taskIndex, 1);
      return board;
    });
  };

  const addTask = (columnId, task) => {
    const { id, title, description, createdTime } = task.data.current;
    const addedTask = {
      id,
      parent_column: columnId,
      title,
      description,
      createdTime,
    };

    setBoardData((board) => {
      board?.columns
        .filter((column) => column.id === columnId)[0]
        .tasks.push(addedTask);

      return board;
    });
  };

  const updateTaskColumn = async (newColumnId, task) => {
    const { id } = task.data.current;
    // Optimistic update to task parent.
    addTask(newColumnId, task);
    removeTask(task);

    await updateTaskParent({ id, new_parent: newColumnId });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    updateTaskColumn(over.id, active);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <BoardBar boardName={boardData.name} />

      <DndContext onDragEnd={handleDragEnd}>
        <Columns columns={boardData.columns} addColumn={handleAddColumn} />
      </DndContext>
    </div>
  );
}

export default Board;
