import axios from "../index";

export interface CreatePostData {
  text: string;
  title: string;
  imageUrl: string | undefined;
  tags: string[];
}
export class Posts {
  static getPosts() {
    return axios.get("/posts");
  }

  static getTags() {
    return axios.get("/tags");
  }
  static fetchImage(formData: FormData) {
    return axios.post("/upload", formData);
  }

  static createPost(postData: CreatePostData) {
    return axios.post("/posts", postData);
  }
}
