import { types } from "../types/types";

const initialState = {
    token: ''
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USER_TOKEN:
            return action.payload;
        default:
            return state
    }
}