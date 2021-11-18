import { types } from "../types/types";

export const masterReducer = (state = '', action) => {
    switch(action.type) {
        case types.MASTER_DATA:
            return action.payload;
        default:
            return state
    }
}