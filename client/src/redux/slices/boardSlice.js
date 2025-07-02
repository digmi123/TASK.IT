import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "@/features/board/api";
import { addColumn as addColumnApi } from "@/features/columns/api";
import {
  updateTaskParent,
  addTask as addNewTaskApi,
  deleteTask as deleteTaskApi,
} from "@/features/tasks/api";
import { arrayMove } from "@dnd-kit/sortable";

// Async thunk for fetching desks
export const fetchBoardThunk = createAsyncThunk(
  "desks/fetchBoard",
  async (boardId) => {
    const boardData = await getBoard(boardId);
    return boardData.data;
  }
);

export const addColumnThunk = createAsyncThunk(
  "board/addColumn",
  async ({ boardId, columnName }) => {
    const newColumn = await addColumnApi({ boardId, columnName });
    return newColumn;
  }
);

export const addNewTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async ({ task, columnId }, { dispatch, getState }) => {
    const state = getState();
    const { user } = state.user;

    dispatch(addNewTask({ columnId, task, user }));
    addNewTaskApi({ columnId, task }).catch((error) => {
      // Handle error: Rollback the optimistic update
      console.error("Failed to update the backend:", error);
      // Rollback state to maintain consistency
      // dispatch(removeTask({ parentColumn: targetColumn, id: task.id }));
    });
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (task, { dispatch }) => {
    // Optimistically update state
    dispatch(removeTask({ parentColumn: task.parent_column, id: task.id }));
    // Backend update
    deleteTaskApi(task).catch((error) => {
      // Handle error: Rollback the optimistic update
      console.error("Failed to update the backend:", error);
      // Rollback state to maintain consistency
      // dispatch(addTask({ columnId: task.parentColumn, task }));
    });
  }
);

export const updateColumnsIndexesThunk = createAsyncThunk(
  "board/updateColumnsIndexes",
  async ({ activeColumnId, overColumnId }, { dispatch }) => {
    dispatch(updateColumnsIndexes({ activeColumnId, overColumnId }));
    // TODO: Backend update
  }
);

export const updateTaskColumn = createAsyncThunk(
  "board/updateTaskColumn",
  async ({ parentColumn, targetColumn, task }, { dispatch }) => {
    // Optimistically update state
    dispatch(removeTask({ parentColumn, id: task.id }));
    dispatch(addTask({ columnId: targetColumn, task }));

    // Backend update
    updateTaskParent({ id: task.id, new_parent: targetColumn }).catch(
      (error) => {
        // Handle error: Rollback the optimistic update
        console.error("Failed to update the backend:", error);
        // Rollback state to maintain consistency
        dispatch(removeTask({ parentColumn: targetColumn, id: task.id }));
        dispatch(addTask({ columnId: parentColumn, task }));
      }
    );
  }
);

export const moveTask = createAsyncThunk(
  "board/moveTask",
  async ({ activeTask, targetTask }, { dispatch }) => {
    // Optimistically update state
    dispatch(updateTasksIndexes({ activeTask, targetTask }));
    // Backend update
  }
);

// Slice definition
const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardData: { columns: [{ tasks: [] }] },
    loading: true,
    columnLoading: false,
  },
  reducers: {
    findParentColumn: (state, action) => {
      const { task } = action.payload;
      const column = state.boardData.columns.find(
        (column) => column.id === task.parent_column
      );
      return column;
    },

    addNewTask: (state, action) => {
      const { columnId, task, user } = action.payload;
      const column = state.boardData.columns.find(
        (column) => column.id === columnId
      );
      task.Comments = [];
      task.user = user;
      column.tasks.push(task);
    },

    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const column = state.boardData.columns.find(
        (column) => column.id === columnId
      );
      const updatedTask = {
        ...task,
        parent_column: columnId,
      };
      column.tasks.push(updatedTask);
    },
    removeTask: (state, action) => {
      const { parentColumn, id } = action.payload;
      console.log({ parentColumn, taskId: id });
      const column = state.boardData.columns.find(
        (column) => column.id === parentColumn
      );
      if (column) column.tasks = column.tasks.filter((task) => task.id !== id);
    },
    addTaskComment: (state, action) => {
      const { taskId, parentColumn, comment, user } = action.payload;
      const task = state.boardData.columns
        .find((column) => column.id === parentColumn)
        .tasks.find((task) => task.id === taskId);
      task.Comments.push({ ...comment, user });
    },

    updateColumnsIndexes: (state, action) => {
      const { activeColumnId, overColumnId } = action.payload;
      const activeColumnIndex = state.boardData.columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = state.boardData.columns.findIndex(
        (column) => column.id === overColumnId
      );
      const newColumnsArray = arrayMove(
        state.boardData.columns,
        activeColumnIndex,
        overColumnIndex
      );
      state.boardData.columns = newColumnsArray;
    },

    updateTasksIndexes(state, action) {
      const { activeTask, targetTask } = action.payload;

      const activeTaskParentColumn = state.boardData.columns.find(
        (column) => column.id === activeTask.parent_column
      );
      const activeTaskIndex = activeTaskParentColumn.tasks.findIndex(
        (task) => task.id === activeTask.id
      );
      const overTaskParentColumn = state.boardData.columns.find(
        (column) => column.id === targetTask.parent_column
      );
      const overTaskIndex = overTaskParentColumn.tasks.findIndex(
        (task) => task.id === targetTask.id
      );

      const newTasksArray = arrayMove(
        overTaskParentColumn.tasks,
        activeTaskIndex,
        overTaskIndex
      );

      state.boardData.columns.find(
        (column) => column.id === activeTask.parent_column
      ).tasks = newTasksArray;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardThunk.fulfilled, (state, action) => {
        state.boardData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoardThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(addColumnThunk.pending, (state) => {
        state.columnLoading = true;
      })

      .addCase(addColumnThunk.fulfilled, (state, action) => {
        // Add the new column to the columns array immutably
        state.boardData = {
          ...state.boardData,
          columns: [...state.boardData.columns, action.payload],
        };
        state.columnLoading = false;
      })
      .addCase(addColumnThunk.rejected, (state) => {
        state.columnLoading = false;
      });
  },
});

export const {
  addColumn,
  removeTask,
  addTask,
  addNewTask,
  addTaskComment,
  updateColumnsIndexes,
  findParentColumn,
  updateTasksIndexes,
} = boardSlice.actions;
export default boardSlice.reducer;
