import { createSlice } from "@reduxjs/toolkit";
import { AllUserType } from "../../types/types";

export type AllUserReduxType = { users: AllUserType };

const initialState: AllUserReduxType = {
  users: [],
};

const userSlice = createSlice({
  name: "AllUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      const data = action.payload;
      state.users = data;
    },
    updateUserDetails: (state, action) => {
      const { email, name, contact, _id } = action.payload;
      state.users.forEach((user) => {
        if (user?._id === _id) {
          user.email = email;
          user.contact = contact;
          user.name = name;
        }
      });
    },
    updateDeletedUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user._id !== id);
    },
    setUserProfile: (state, action) => {
      const { url, id } = action.payload;
      state.users.forEach((user) => {
        if (user._id === id) {
          user.profile = url;
        }
      });
    },
  },
});

export const {
  setAllUsers,
  updateUserDetails,
  updateDeletedUser,
  setUserProfile,
} = userSlice.actions;

export default userSlice.reducer;
