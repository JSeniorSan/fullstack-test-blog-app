export interface UserData {
  fullname: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsInitialData {
  items: PostActionData[];
  status: Status;
}
export interface TagsInitialData {
  items: string[];
  status: Status;
}

export interface PostState {
  posts: PostsInitialData;
  tags: TagsInitialData;
}

export type Status = "loading" | "loaded" | "error";

export interface PostActionData {
  createdAt: string;
  imageUrl: string;
  tags: string[];
  text: string;
  title: string;
  updatedData: string;
  user: UserData;
  viewsCount: number;
  _id: string;
}
