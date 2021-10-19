import { types } from "../types/types";

export const participantesReducer = (state = {}, action) => {
    switch(action.type) {
        case types.idParticipante:
            return {
                ...state,
                idParticipante: action.payload.idParticipante
            };   
        default:
            return state
    }
}

