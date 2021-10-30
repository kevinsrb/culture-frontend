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
        case types.documentos_administrativos_cargados:
            return {
                ...state,
                documentos_administrativos_cargados: action.payload.documentos_administrativos_cargados
            };
        case types.documentos_tecnico_cargados:
            return {
                ...state,
                documentos_tecnico_cargados: action.payload.documentos_tecnico_cargados
            };
        case types.fechas_participantes:
            return {
                ...state,
                fechas_participantes: action.payload.fechas_participantes
            };
        case types.categoria_linea_convocatoria:
            return {
                ...state,
                categoria_linea_convocatoria: action.payload.categoria_linea_convocatoria
            };
        case types.nombre_convocatoria:
            return {
                ...state,
                nombre_convocatoria: action.payload.nombre_convocatoria
            };
        case types.id_convocatoria_seleccionada:
            return {
                ...state,
                nombre_convocatoria: action.payload.id_convocatoria_seleccionada
            };
        case types.tipo_participante:
            return {
                ...state,
                tipo_participante: action.payload.tipo_participante
            };
        case types.id_postulacion:
            return {
                ...state,
                id_postulacion: action.payload.id_postulacion
            };
        default:
            return state
    }
}

