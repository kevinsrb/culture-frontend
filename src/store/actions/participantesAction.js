import { types } from "../types/types";

export const id_Participante = (idParticipante) => ({
    type: types.idParticipante,
    payload:  {
        idParticipante,
    }
})


export const documentosCargados = (documentos_cargados) => ({
    type: types.documentos_cargados,
    payload:  {
        documentos_cargados,
    }
})
