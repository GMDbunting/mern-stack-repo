import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: {}
}

const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    defineUser: (state, action) => {
      state.userDetails = action.payload
    }
  }
})

export const { defineUser } = userSlice.actions
export default userSlice.reducer