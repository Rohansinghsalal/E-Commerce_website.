import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auths",
    initialState: {
        auth: false,
    },
    reducers: {
        isAuthTrue: (state) => {
            state.auth = true;
        },
        isAuthFalse: (state) => {
            state.auth = false;
        },
    },
});

export const { isAuthTrue, isAuthFalse } = authSlice.actions;
