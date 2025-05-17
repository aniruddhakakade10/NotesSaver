import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
}

export const pasteSlice = createSlice({
    name: "pastes",
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            //add a check to check if paste already exists
            state.pastes.push(paste);
            localStorage.setItem("pastes",
                JSON.stringify(state.pastes));
            toast.success("Paste created successfully");
        },

        updateToPastes: (state, action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) =>
                item._id === paste._id)

            if (index >= 0) {
                state.pastes[index] = paste;

                localStorage.setItem("pastes", JSON.stringify
                    (state.pastes));

                toast.success("Paste Updated")
            }
        },

        resetAllPastes: (state, action) => {
            state.pastes = [];

            localStorage.removeItem("pastes");
        },

        removeAllPastes: (state, action) => {
            const pasteId = action.payload;

            console.log(pasteId);
            const index = state.pastes.findIndex((item) =>
                item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);

                localStorage.setItem("pastes", JSON.stringify
                    (state.pastes));

                toast.success("Paste deleted");
            }

        }
    },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeAllPastes } = pasteSlice.actions;

export default pasteSlice.reducer;