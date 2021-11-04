import { useState } from "react";
import apiConvocatorias from "../../../../api/api-convocatorias";

export const useEdicionConvocatoria = () => {

    const [convocatoria, setConvocatoria] = useState({
        idconvocatorias: 0,
        numero_convocatoria: 0,
        linea_convocatoria: 0,
        categoria_linea_convocatoria: [],
        pseudonimo: false,
        entidad: "SCC",
        cobertura: "",
        ciclo: "",
        linea_estrategica: "",
        area: [],
        modalidad: "",
        tipo_estimulo: "",
        descripcion_corta: "",
        perfil_participante: "",
        noparticipa: "",
        esconvenio: false, 
        tipo_participante: [],
        fecha_creacion: "",
        fecha_modificacion: "",
        usuario_creacion: "",
        usuario_modificacion: "",
        publico: "",
        documentos: "",
        propuestas: "",
        categorias: "",
        fechas: "",
        valor_total_entg: 0,
        bolsa_concursable: false,
        num_estimulos: 0,
        actividades: "",
        mayoredad: false,
        nombre_convocatoria: "hola"
    });

    const getConvocatoria = async (idConvocatoria, user) => {
        try {
            const { data } = await apiConvocatorias.getConvocatoriaById(idConvocatoria);
            console.log(data)
            return setConvocatoria(data)
        } catch (error) {
            console.log(error);
        }
    }

    return {
        convocatoria,
        getConvocatoria
    }
}
