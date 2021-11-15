import { types } from "../types/types";

export const id_Participante = (idParticipante) => ({
    type: types.idParticipante,
    payload:  {
        idParticipante,
    }
})


export const documentosGeneralesConvocatoria = (documentos_generales) => ({
    type: types.documentos_generales,
    payload:  {
        documentos_generales,
    }
})

export const documentosTecnicosConvocatoria = (documentos_tecnicos) => ({
    type: types.documentos_tecnicos,
    payload:  {
        documentos_tecnicos,
    }
})

export const documentosAdministrativosConvocatoria = (documentos_administrativos) => ({
    type: types.documentos_administrativos,
    payload:  {
        documentos_administrativos,
    }
})

export const documentosTecnicosCargados = (documentos_tecnico_cargados) => ({
    type: types.documentos_tecnico_cargados,
    payload:  {
        documentos_tecnico_cargados,
    }
})

export const documentosAdministrativosCargados = (documentos_administrativos_cargados) => ({
    type: types.documentos_administrativos_cargados,
    payload:  {
        documentos_administrativos_cargados,
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

export const idPostulacion = (id_postulacion) => ({
    type: types.id_postulacion,
    payload:  {
        id_postulacion,
    }
  
})




