import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "@/features/board/api";
import { addColumn as addColumnApi } from "@/features/columns/api";
import { updateTaskParent } from "@/features/tasks/api";
import { addTask as addNewTaskApi } from "@/features/tasks/api";

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
  async ({ task, columnId }, { dispatch }) => {
    console.log({ task, columnId });

    dispatch(addNewTask({ columnId, task }));
    addNewTaskApi({ columnId, task }).catch((error) => {
      // Handle error: Rollback the optimistic update
      console.error("Failed to update the backend:", error);
      // Rollback state to maintain consistency
      // dispatch(removeTask({ parentColumn: targetColumn, id: task.id }));
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
      const { columnId, task } = action.payload;
      console.log({ columnId, task });

      const column = state.boardData.columns.find(
        (column) => column.id === columnId
      );
      task.Comments = [];
      console.log({ addedTask: task });

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

export const { addColumn, removeTask, addTask, addNewTask } =
  boardSlice.actions;
export default boardSlice.reducer;
