import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loaders",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            console.log("Loading started");
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;