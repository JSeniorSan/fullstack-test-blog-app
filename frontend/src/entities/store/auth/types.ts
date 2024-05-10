import { Status } from "../types";

export interface UserData {
  fullname: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse extends UserData {
  token: string;
}

export interface AsyncThunkConfig {
  state: unknown;
  rejectValue: string;
}

export interface AuthInitialState {
  data: AuthResponse | null;
  status: Status;
}
