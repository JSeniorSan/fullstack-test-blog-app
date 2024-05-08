import { createSlice } from "@reduxjs/toolkit";
import { Items } from "../../../widgets/comments/comments";

export interface PostsInitialData {
  items: Items[];
  isLoading: boolean;
}
export interface TagsInitialData {
  items: string[];
  isLoading: boolean;
}

export interface Initial {
  posts: PostsInitialData;
  tags: TagsInitialData;
}

const initialState: Initial = {
  posts: {
    items: [],
    isLoading: false,
  },
  tags: {
    items: [],
    isLoading: false,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const postReduser = postSlice.reducer;
