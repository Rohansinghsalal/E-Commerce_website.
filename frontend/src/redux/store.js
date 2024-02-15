import {configureStore} from "@reduxjs/toolkit"
import { authSlice } from "./features/authSlice"
import { userSlice } from "./features/userSlice"
import { loadingSlice } from "./features/loadingSlice"
import { searchSlice } from "./features/searchSlice"
import { cartSlice } from "./features/cartSlice"

export default configureStore({
    reducer:{
        auths:authSlice.reducer,
        users:userSlice.reducer,
        loads:loadingSlice.reducer,
        searchs:searchSlice.reducer,
        carts:cartSlice.reducer,
    }
})