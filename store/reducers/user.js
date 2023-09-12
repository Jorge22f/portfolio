import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  name: '',
  username: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAll: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.image = action.payload.image;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const {
  setAll,
  updateName,
  updateUsername
} = userSlice.actions;

export default userSlice.reducer;
