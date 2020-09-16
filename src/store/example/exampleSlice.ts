import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSplashImage } from "../../api";
import { RootState } from "../index";

const name = "todo";

export const fetchTodo = createAsyncThunk(
  `${name}/fetchTodo`, // 액션 이름을 정의해 주도록 합니다.
  async ({ test1, test2 }: { test1: number; test2: number }, thunkAPI) => {
    const response = await getSplashImage(1);
    return response;
  }
);

export const todoSlice = createSlice({
  name,
  initialState: {
    title: "",
    content: "",
    loading: false,
    lists: [],
  },
  reducers: {},
  extraReducers: {
    [fetchTodo.pending.type]: (state, action) => {
      // 호출 전
      state.loading = true;
      console.log(567, action);
    },
    [fetchTodo.fulfilled.type]: (state, action) => {
      // 성공
      state.loading = true;
      state.title = action.title;
      state.content = action.content;
      state.lists = action.payload;
      console.log(123, action);
    },
    [fetchTodo.rejected.type]: (state, action) => {
      // 실패
      state.loading = true;
      state.title = "";
      state.content = "";
      console.log(56, action);
    },
  },
});

export const lists = (state: RootState) => state.todoSlice.lists;

export default todoSlice.reducer;
