import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSplashImage } from "api";
import { RootState } from "../index";

const name = "kkkk";

export const fetchTodo = createAsyncThunk(
  `${name}/fetchTodo`, // 액션 이름을 정의해 주도록 합니다.
  async ({ test1, test2 }: { test1: number; test2: number }, thunkAPI) => {
    const response = await getSplashImage(1);
    return response;
  }
);

type stateType = {
  title: { zxc: string; content: number };
  content: string;
  loading: boolean;
  lists: any;
};

const initialState: stateType = {
  title: { zxc: "ttttt", content: 0 },
  content: "",
  loading: false,
  lists: []
};

export const todoSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTitle: (
      state,
      action: PayloadAction<{ zxc: string; content: number }>
    ) => {
      state.title.zxc = action.payload.zxc;
    }
  },
  extraReducers: {
    [fetchTodo.pending.type]: (state, action) => {
      // 호출 전
      state.loading = true;
      console.log(567, action);
    },
    [fetchTodo.fulfilled.type]: (state, action) => {
      // 성공
      state.loading = true;
      state.lists = action.payload;
      console.log(123, action);
    },
    [fetchTodo.rejected.type]: (state, action) => {
      // 실패
      state.loading = true;
      state.content = "";
    }
  }
});

export const { setTitle } = todoSlice.actions;

export const lists = (state: RootState) => state.todoSlice.lists;
export const titles = (state: RootState) => state.todoSlice.title;

export default todoSlice.reducer;
