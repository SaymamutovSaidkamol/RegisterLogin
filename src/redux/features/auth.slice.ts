import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string;
  token: string;
}
const initialState: AuthState = JSON.parse(
  sessionStorage.getItem("auth-data") || "{}"
) || {
  email: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      sessionStorage.setItem("auth-data", JSON.stringify(state));
    },
    clearAuth: (state) => {
      state.email = "";
      state.token = "";
      sessionStorage.removeItem("auth-data");
    },
  },
});

export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
