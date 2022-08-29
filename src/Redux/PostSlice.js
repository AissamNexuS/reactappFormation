import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
    initial: (state, action) => {
      state.value = action.payload;
    },
    initializeList: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const {setPosts, initializeList, initial} = PostSlice.actions;
export const selectPosts = state => state.posts.value;
export default PostSlice.reducer;
