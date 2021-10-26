import { types } from "../types/types";

export const participantesReducer = (state = {}, action) => {
    switch(action.type) {
        case types.idParticipante:
            return {
                ...state,
                idParticipante: action.payload.idParticipante
            };
        case types.documentos_convocatoria:
            return {
                ...state,
                documentos_convocatoria: action.payload.documentos_convocatoria
            };
        case types.documentos_cargados:
            return {
                ...state,
                documentos_cargados: action.payload.documentos_cargados
            };
        default:
            return state
    }
}

