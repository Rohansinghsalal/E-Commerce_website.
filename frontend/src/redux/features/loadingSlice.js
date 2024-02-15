import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loads",
    initialState: {
        load: false,
    },
    reducers: {
        loadingTrue: (state) => {
            state.load = true;
        },
        loadingFalse: (state) => {
            state.load = false;
        },
    },
});

export const {loadingTrue, loadingFalse}=loadingSlice.actions;