import { types } from "../types/types";

export const masterAction = (payload) => {
    return  {
        type: types.MASTER_DATA,
        payload,
    }
}