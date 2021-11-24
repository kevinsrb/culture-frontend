import { types } from "../types/types";
// @ts-ignore
export const masterAction = (payload) => {
    return {
        type: types.MASTER_DATA,
        payload,
    }
}