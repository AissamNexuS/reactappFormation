import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setPath} = pathSlice.actions;

export const selectPath = state => state.path.value;

export default pathSlice.reducer;
