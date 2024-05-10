import axios from "../index";

export class AuthService {
  static login(email: string, password: string) {
    return axios.post("/auth/login", { email, password });
  }

  static registration(email: string, password: string, fullname: string) {
    return axios.post("/auth/register", { email, password, fullname });
  }
}
