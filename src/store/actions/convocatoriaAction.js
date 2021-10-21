import { types } from "../types/types";

export const idConvocatorias = (idConvocatoria) => ({
    type: types.idConvocatoria,
    payload:  {
        idConvocatoria,
    }
})

export const documentosConvocatoria = (documentos_convocatoria) => ({
    type: types.documentos_convocatoria,
    payload:  {
        documentos_convocatoria,
    }
})

export const edicionConvocatoria = (editarConvocatoria) => ({
    type: types.edicion,
    payload:  {
        editarConvocatoria,
    }
})


