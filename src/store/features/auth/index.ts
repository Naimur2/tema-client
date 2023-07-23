import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "./types";
import { RootState } from "store";

const initialState: IAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: {
                payload: {
                    user: IUser;
                    token: string;
                    refreshToken?: string;
                };
            }
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        updateValidation: (state, action) => {
            if (state.user) state.user.hasVerifiedEmail = action.payload;
        },
        updateToken: (
            state,
            action: {
                payload: {
                    token: string | null;
                    refreshToken?: string | null;
                };
            }
        ) => {
            if (action.payload.token) state.token = action.payload.token;
            if (action.payload.refreshToken)
                state.refreshToken = action.payload.refreshToken;
        },
        updateName: (state, action: { payload: { name: string | null } }) => {
            // @ts-ignore
            if (state.user?.name) state.user.name = action.payload.name;
        },
    },
});

export const { login, logout, updateValidation, updateToken, updateName } =
    authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
