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

export const categoriasLineasConvocatoria = (categoria_linea_convocatoria) => ({
    type: types.categoria_linea_convocatoria,
    payload:  {
        categoria_linea_convocatoria,
    }
})


export const fechasParticipantes = (fechas_participantes) => ({
    type: types.fechas_participantes,
    payload:  {
        fechas_participantes,
    }
})


export const nombreConvocatoria = (nombre_convocatoria) => ({
    type: types.nombre_convocatoria,
    payload:  {
        nombre_convocatoria,
    }
})

export const idConvocatoriaSelecionada = (idconvocatorias) => ({
    type: types.id_convocatoria_seleccionada,
    payload:  {
        idconvocatorias,
    }
})

export const tipoParticipante = (tipo_participante) => ({
    type: types.tipo_participante,
    payload:  {
        tipo_participante,
    }
  
})

