import { types } from "../types/types";

export const id_Participante = (idParticipante) => ({
    type: types.idParticipante,
    payload:  {
        idParticipante,
    }
})

