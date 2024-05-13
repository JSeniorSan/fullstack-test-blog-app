import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth";
import { AsyncThunkConfig, AuthInitialState, AuthResponse } from "./types";
import { RootState } from "..";

export const fetchLogin = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  AsyncThunkConfig
>("auth/fetchLogin", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const fetchRegister = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; fullname: string },
  AsyncThunkConfig
>(
  "auth/fetchRegister",
  async ({ email, password, fullname }, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(
        email,
        password,
        fullname
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMe = createAsyncThunk<AuthResponse>(
  "auth/fetchMe",
  async () => {
    try {
      const response = await AuthService.fetchMe();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return console.log(error.message);
      }
    }
  }
);

const initialState: AuthInitialState = {
  data: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.data = action.payload;
        state.status = "loaded";
      }
    );
    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
    // -------------------------------------------------
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.data = action.payload;
        state.status = "loaded";
      }
    );
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
    // --------------------------------------------------
    builder.addCase(fetchMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(
      fetchMe.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.data = action.payload;
        state.status = "loaded";
      }
    );
    builder.addCase(fetchMe.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export const checkAuth = (state: RootState) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
