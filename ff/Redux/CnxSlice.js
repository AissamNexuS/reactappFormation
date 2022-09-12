import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const CnxSlice = createSlice({
  name: 'connected',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setConnected} = CnxSlice.actions;
export const selectConnected = state => state.connected.value;
export default CnxSlice.reducer;
