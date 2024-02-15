import {createSlice} from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name:"carts",
    initialState: {
        cart:[],
    },
    reducers:{
        setCart:(state, action)=> {
            state.cart = action.payload;
        }
    }
})

export const {setCart}=cartSlice.actions;