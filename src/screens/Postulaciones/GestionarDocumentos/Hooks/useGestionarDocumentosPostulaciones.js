import React from "react";
import axios from "axios";

export const useGestionarDocumentosPostulaciones = (initialState) => {
  const [formulario, setFormulario] = React.useState(initialState);
  const handleChange = (e) => {
    if (e.target.name === "filtro") {
      setFormulario({ ...formulario, filtro: !formulario.filtro });
    } else {
      setFormulario({ ...formulario, [e.target.name]: e.target.value });
    }
  };
  const getDataInitial = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER_PART}participantes/`);
    console.log(response);
    let copy1 = response.data.participantes.map((participante) =>
      participante.documentos.map((documento) => {
        let url_participante = "";
        let estado = "SUBSANADO";
        if (documento.url_participante) url_participante = documento.url_participante;
        if (documento.documentoActualizado) estado = "POR SUBSANAR";
        let postulaciones = {
          nombre_convocatoria: "",
          categoria_linea_convocatoria: [],
          fechaApertura: [{ valormin: "" }],
        };
        if (participante.postulaciones[0]) postulaciones = participante.postulaciones[0];
        console.log(postulaciones.categoria_linea_convocatoria, "estas son las categorias");
        return {
          numero_documento: participante.usuario_id,
          id_participante: participante.id_participante,
          descripcion: documento.descripcion,
          documentoActualizado: documento.documentoActualizado,
          fecha_creacion: documento.fecha_creacion,
          id: documento.id,
          idconvocatoria: documento.idconvocatoria,
          obligatorio: documento.obligatorio,
          subsanable: documento.subsanable,
          tipo_documento: documento.tipo_documento,
          tipo_documento_id: documento.tipo_documento_id,
          tipo_persona: documento.tipo_persona,
          url_documento: documento.url_documento,
          url_participante,
          estado,
          barrio: participante.barrio,
          comuna: participante.comuna,
          telefono_fijo: participante.telefono_fijo,
          telefono_celular: participante.telefono_celular,
          pais_residencia: participante.pais_residencia,
          nombre_particpante: `${participante.primer_nombre} ${participante.segundo_nombre} ${participante.primer_apellido} ${participante.segundo_apellido}`,
          postulaciones,
          nombre_convocatoria: participante.postulaciones[0].nombre_convocatoria,
          categoria_linea_convocatoria: postulaciones.categoria_linea_convocatoria,
          fechainicio: postulaciones.fechaApertura[0],
          tipo_participante: participante.tipo_participante,
          documentosTecnicos: participante.documentos.filter((data) => data.tipo_documento_id === 1),
          documentosAdministrativos: participante.documentos.filter((data) => data.tipo_documento_id === 0),
        };
      })
    );
    console.log(copy1[0], "este si es el map");
    let documentossubsanables = copy1[0].filter((data) => data.subsanable);
    console.log(documentossubsanables);
    // let copy = response.data.participantes[0].documentos.map((data) => {
    //   let url_participante = "";
    //   let estado = "SUBSANADO";
    //   if (data.url_participante) url_participante = data.url_participante;
    //   if (data.documentoActualizado) estado = "POR SUBSANAR";
    //   let postulaciones = { nombre_convocatoria: "", categoria_linea_convocatoria: [], fechaApertura: "" };
    //   if (response.data.participantes[0].postulaciones[0])
    //     postulaciones = response.data.participantes[0].postulaciones[0];
    //   console.log(postulaciones.categoria_linea_convocatoria, "estas son las categorias");
    //   return {
    //     numero_documento: response.data.participantes[0].usuario_id,
    //     id_participante: response.data.participantes[0].id_participante,
    //     descripcion: data.descripcion,
    //     documentoActualizado: data.documentoActualizado,
    //     fecha_creacion: data.fecha_creacion,
    //     id: data.id,
    //     idconvocatoria: data.idconvocatoria,
    //     obligatorio: data.obligatorio,
    //     subsanable: data.subsanable,
    //     tipo_documento: data.tipo_documento,
    //     tipo_documento_id: data.tipo_documento_id,
    //     tipo_persona: data.tipo_persona,
    //     url_documento: data.url_documento,
    //     url_participante,
    //     estado,
    //     barrio: response.data.participantes[0].barrio,
    //     comuna: response.data.participantes[0].comuna,
    //     telefono_fijo: response.data.participantes[0].telefono_fijo,
    //     telefono_celular: response.data.participantes[0].telefono_celular,
    //     pais_residencia: response.data.participantes[0].pais_residencia,
    //     nombre_particpante: `${response.data.participantes[0].primer_nombre} ${response.data.participantes[0].segundo_nombre} ${response.data.participantes[0].primer_apellido} ${response.data.participantes[0].segundo_apellido}`,
    //     postulaciones,
    //     nombre_convocatoria: response.data.participantes[0].postulaciones[0].nombre_convocatoria,
    //     categoria_linea_convocatoria: postulaciones.categoria_linea_convocatoria,
    //     tipo_participante: response.data.participantes[0].tipo_participante,
    //     documentosTecnicos: response.data.participantes[0].documentos.filter((data) => data.tipo_documento_id === 1),
    //     documentosAdministrativos: response.data.participantes[0].documentos.filter(
    //       (data) => data.tipo_documento_id === 0
    //     ),
    //   };
    // });
    // console.log(copy);
    setFormulario({
      ...formulario,
      datosActuales: copy1[0],
      datossinfiltro: response.data.participantes,
      datosanteriorfiltro: [],
      filtros: [],
    });
  };
  const mostrarConvocatorias = (value) => {
    console.log(value, "mostrar convocatorias");
    let copy = formulario.datosActuales.map((data) => data);
    let datos = copy.slice(0, value);
    setFormulario({ ...formulario, cantidadPáginas: value, datosActuales: datos });
  };
  const filtrarTablaMultiple = (e) => {
    let filtrado = [];
    let filtros = {
      ...formulario.filtros,
      [e.name]: e.value,
    };
    if (e.value.length !== 0) {
      let objetos = Object.keys(filtros);
      for (var i in formulario.datossinfiltro) {
        for (var x in objetos) {
          for (var y in filtros[objetos[x]]) {
            if (formulario.datossinfiltro[i][objetos[x]] === "object") {
              let existe = formulario.datossinfiltro[i][objetos[x]].filter((data) => data === filtros[objetos[x]][y]);
              if (existe.length > 0) {
                filtrado.push(formulario.datossinfiltro[i]);
              }
            } else {
              if (formulario.datossinfiltro[i][objetos[x]] === filtros[objetos[x]][y])
                filtrado.push(formulario.datossinfiltro[i]);
            }
          }
        }
      }
      setFormulario({ ...formulario, datosActuales: filtrado });
    }
  };
  const mostrarModal = (datos) => {
    console.log("aca");
    setFormulario({ ...formulario, openModal: !formulario.openModal, documentocambiar: datos });
  };
  const mostrarmodalPostulacion = (datos) => {
    setFormulario({
      ...formulario,
      openModalPostulacion: !formulario.openModalPostulacion,
      informacionPostulacion: datos,
    });
  };
  const changeStateDocument = async () => {
    console.log(formulario.documentocambiar, "estos son los datos para enviar a cambiar el estado");
    console.log("aca");
    console.log("aca", formulario.documentocambiar);
    let url = `${process.env.REACT_APP_SERVER_PART}participantes/actualizarEstadoSubsanacionDocumento/${formulario.documentocambiar.numero_documento}`;
    let data = {
      idDocumento: formulario.documentocambiar.id,
      estado: false,
    };
    let response = await axios.put(url, data);
    console.log(response);
    setFormulario({ ...formulario, openModal: !formulario.openModal });
  };
  const savedocumentotoChange = async () => {
    console.log("aca", formulario.documentocambiar);
    let url = `${process.env.REACT_APP_SERVER_PART}participantes/actualizarEstadoSubsanacionDocumento/${formulario.documentocambiar.numero_documento}`;
    let data = {
      idDocumento: formulario.documentocambiar.id,
      estado: false,
    };
    let response = await axios.put(url, data);
    console.log(response);
  };
  const handleChangeCheckbox = (e, r) => {};

  return [
    formulario,
    handleChange,
    getDataInitial,
    mostrarConvocatorias,
    filtrarTablaMultiple,
    mostrarModal,
    mostrarmodalPostulacion,
    handleChangeCheckbox,
    changeStateDocument,
    savedocumentotoChange,
  ];
};
