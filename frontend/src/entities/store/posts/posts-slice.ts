import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostActionData, PostState } from "./types";
import { Posts } from "../../services/posts";

export const getPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await Posts.getPosts();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const getTags = createAsyncThunk("posts/fetchTags", async () => {
  try {
    const response = await Posts.getTags();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState: PostState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<PostActionData[]>) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      }
    );
    builder.addCase(getPosts.rejected, (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    });
    // -------------------------------------------------
    builder.addCase(getTags.pending, (state) => {
      state.tags.status = "loading";
      state.tags.items = [];
    });
    builder.addCase(
      getTags.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      }
    );
    builder.addCase(getTags.rejected, (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    });
  },
});

export const postReduser = postSlice.reducer;
