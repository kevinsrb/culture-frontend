import { types } from "../types/types";
// @ts-ignore
export const idConvocatorias = (idConvocatoria) => ({
    type: types.idConvocatoria,
    payload: {
        idConvocatoria,
    }
})
// @ts-ignore
export const edicionConvocatoria = (editarConvocatoria) => ({
    type: types.edicion,
    payload: {
        editarConvocatoria,
    }
})


