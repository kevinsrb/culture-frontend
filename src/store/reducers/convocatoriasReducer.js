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

export const edicionReducer = (state = {}, action) => {
    switch(action.type) {
        case types.edicion:
            return {
                ...state,
                editarConvocatoria: action.payload.editarConvocatoria
            };
        default:
            return state
    }
}