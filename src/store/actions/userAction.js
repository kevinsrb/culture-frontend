import { USER_TOKEN } from "../types";

export const user_token = (payload) => {
    return  {
        type: USER_TOKEN,
        payload,
    }
}