import { createSlice } from '@reduxjs/toolkit';

// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState: {
//         value: 0
//     },
//     reducers: {
//         increment: (state) => {
//             state.value += 1
//         },
//         decrement: (state) => {
//             state.value -= 1
//         }
//     }
// })s

// export const { increment, decrement } = counterSlice.actions
// export default counterSlice.reducer

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer