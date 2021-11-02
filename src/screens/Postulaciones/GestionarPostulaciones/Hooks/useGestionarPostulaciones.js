import { useState } from "react";
import PostulacionesApi from "../../../../api/postulacionesApi";

export const useGestionarPostulaciones = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const getPostulaciones = async () => {
    try {
      const { postulaciones } = await PostulacionesApi.getPostulaciones();
      console.log(postulaciones);
      let copy1 = postulaciones.map((postulacion) => {
        let url_participante = "";
        let estado = "SUBSANADO";
        // if (documento.documentoActualizado) estado = "POR SUBSANAR";
        let postulaciones = {
          nombre_convocatoria: "",
          categoria_linea_convocatoria: [],
          fechaApertura: [{ valormin: "" }],
        };
        if (postulacion.participante.documentos === null) postulacion.participante.documentos = [];
        return {
          id_postulacion: postulacion.id_postulacion,
          numero_documento: `PO-${postulacion.id_postulacion}`,
          id_participante: postulacion.numero_documento_participante,
          idconvocatoria: postulacion.convocatoria_id,
          tipo_persona: postulacion.tipo_participante,
          estado,
          barrio: postulacion.participante.barrio,
          comuna: postulacion.participante.comuna,
          telefono_fijo: postulacion.participante.telefono_fijo,
          telefono_celular: postulacion.participante.telefono_celular,
          pais_residencia: postulacion.participante.pais_residencia,
          nombre_particpante: `${postulacion.participante.primer_nombre} ${postulacion.participante.segundo_nombre} ${postulacion.participante.primer_apellido} ${postulacion.participante.segundo_apellido}`,
          nombre_convocatoria: postulacion.nombre_convocatoria,
          nombre_propuesta: postulacion.nombre_propuesta,
          categoria_linea_convocatoria: postulaciones.categoria_linea_convocatoria,
          fechainicio: postulacion.fecha_apertura,
          tipo_participante: parseInt(postulacion.tipo_participante),
          documentosTecnicos: postulacion.participante.documentos.filter((data) => data.tipo_documento_id === 1),
          documentosAdministrativos: postulacion.participante.documentos.filter((data) => data.tipo_documento_id === 0),
        };
      });
      return setPostulaciones(copy1);
    } catch (error) {
      console.log(error);
    }
  };

  const [openFilter, setOpenFilter] = useState(false);
  const handleChangeFilter = () => {
    setOpenFilter(!openFilter);
  };

  return {
    openFilter,
    handleChangeFilter,
    getPostulaciones,
    postulaciones,
  };
};
