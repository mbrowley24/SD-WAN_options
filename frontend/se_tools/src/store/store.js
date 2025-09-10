import { configureStore } from "@reduxjs/toolkit";
import mxDataReducer from "./mxStore"

const store = configureStore({
    reducer:{
        mxData: mxDataReducer
    }
});

export default store