import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showSignUpModal: false,
  showCloseMouse: false,
  showHeaderModal: false,
};

export const commonAppSlice = createSlice({
  name: "commonApp",
  initialState,
  reducers: {
    loginModal: (state, action) => {
      state.showLoginModal = action?.payload;
    },
    signUpModal: (state, action) => {
      state.showSignUpModal = action?.payload;
    },
    customMouse: (state, action) => {
      state.showCloseMouse = action?.payload;
    },
    headerModal: (state, action) => {
      state.showHeaderModal = action?.payload;
    },
  },
});

// Action creators
export const { loginModal, signUpModal, customMouse, headerModal } = commonAppSlice.actions;

// export reducer
export default commonAppSlice.reducer;
