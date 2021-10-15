import { types } from "../types/types";

export const userReducer = (state = '', action) => {
    switch(action.type) {
        case types.USER_TOKEN:
            return action.payload;
        default:
            return state
    }
}