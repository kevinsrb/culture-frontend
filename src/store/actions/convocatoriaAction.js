import { types } from "../types/types";

export const idConvocatorias = (idConvocatoria) => ({
    type: types.idConvocatoria,
    payload:  {
        idConvocatoria,
    }
})

export const edicionConvocatoria = (editarConvocatoria) => ({
    type: types.edicion,
    payload:  {
        editarConvocatoria,
    }
})



