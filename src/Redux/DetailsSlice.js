import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const DetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function

export const {setDetails} = DetailsSlice.actions;
export const selectPosts = state => state.details.value;
export default DetailsSlice.reducer;
