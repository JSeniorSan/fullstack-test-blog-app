import axios from "../index";

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
}
