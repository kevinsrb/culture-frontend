import { types } from "../types/types";

// @ts-ignore
export const user_token = (payload) => {
    return {
        type: types.USER_TOKEN,
        payload,
    }
}