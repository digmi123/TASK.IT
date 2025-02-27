import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "@/features/board/api";
import { addColumn as addColumnApi } from "@/features/columns/api";
import {
  updateTaskParent,
  addTask as addNewTaskApi,
  deleteTask as deleteTaskApi,
} from "@/features/tasks/api";

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
    console.log("im hereeeeeeeeeeeeeee dispatch");

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

// Slice definition
const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardData: { columns: [{ tasks: [] }] },
    loading: true,
    columnLoading: false,
  },
  reducers: {
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
        ...task.data.current,
        parent_column: columnId,
      };
      column.tasks.push(updatedTask);
    },
    removeTask: (state, action) => {
      const { parentColumn, id } = action.payload;
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

export const { addColumn, removeTask, addTask, addNewTask, addTaskComment } =
  boardSlice.actions;
export default boardSlice.reducer;
