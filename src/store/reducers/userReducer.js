import { USER_TOKEN } from "../types";

const initialState = {
    token: ''
}

export default function (state = initialState, action) {
    switch(action.type) {
        case USER_TOKEN:
            return action.payload;
        default:
            return state
    }
}