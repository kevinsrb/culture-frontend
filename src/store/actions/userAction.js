import { types } from "../types/types";

export const user_token = (payload) => {
    return  {
        type: types.USER_TOKEN,
        payload,
    }
}