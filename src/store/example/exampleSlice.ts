import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSplashImage } from "../../api";

const name = "todo";

export const fetchTodo = createAsyncThunk(
  `${name}/fetchTodo`, // 액션 이름을 정의해 주도록 합니다.
  async (todoId, thunkAPI) => {
    console.log(2);
    const response = await getSplashImage(1);
    console.log(response);
    return response.data;
  }
);

export const todoSlice = createSlice({
  name,
  initialState: {
    title: "",
    content: "",
    loading: false,
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

export default todoSlice.reducer;
