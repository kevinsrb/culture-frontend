import { types } from "../types/types";



export const convocatoriasReducer = (state = {}, action) => {
    switch(action.type) {
        case types.idConvocatoria:
            return {
                ...state,
                idConvocatoria: action.payload.idConvocatoria
            };
        default:
            return state
    }
}