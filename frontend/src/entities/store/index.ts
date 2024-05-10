import { configureStore } from "@reduxjs/toolkit";
import { postReduser } from "./posts/posts-slice";
import { authReducer } from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    posts: postReduser,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
