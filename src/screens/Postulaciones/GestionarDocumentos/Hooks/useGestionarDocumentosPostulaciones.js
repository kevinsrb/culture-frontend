import React from "react";
import axios from "axios";
var conteoGrabar;

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
    let response = await axios.get(`${process.env.REACT_APP_SERVER_PART}postulaciones/`);
    console.log(response, "esta es la informacion principal");
    let copy1 = response.data.postulaciones.map((postulacion) => {
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
    console.log(copy1, "este es el array de las postulaciones");
    let todosJSON = JSON.parse(JSON.stringify(copy1));
    console.log(todosJSON);
    for (var i in todosJSON) {
      for (var x in todosJSON[i].documentosTecnicos) {
        console.log(todosJSON[i].documentosTecnicos[x])
        if (todosJSON[i].documentosTecnicos[x].checkaceptar) todosJSON[i].documentosTecnicos[x].checkaceptar = true;
        else todosJSON[i].documentosTecnicos[x].checkaceptar = false;
        if (todosJSON[i].documentosTecnicos[x].checksubsanable) todosJSON[i].documentosTecnicos[x].checksubsanable = true;
        else todosJSON[i].documentosTecnicos[x].checksubsanable = false;
        if (todosJSON[i].documentosTecnicos[x].checkcancelar) todosJSON[i].documentosTecnicos[x].checkcancelar = true;
        else todosJSON[i].documentosTecnicos[x].checkcancelar = false;
      }
      for (var y in todosJSON[i].documentosAdministrativos) {
        if (todosJSON[i].documentosAdministrativos[y].checkaceptar) todosJSON[i].documentosAdministrativos[y].checkaceptar = true;
        else todosJSON[i].documentosAdministrativos[y].checkaceptar = false;
        if (todosJSON[i].documentosAdministrativos[y].checksubsanable) todosJSON[i].documentosAdministrativos[y].checksubsanable = true;
        else todosJSON[i].documentosAdministrativos[y].checksubsanable = false;
        if (todosJSON[i].documentosAdministrativos[y].checkcancelar) todosJSON[i].documentosAdministrativos[y].checkcancelar = true;
        else todosJSON[i].documentosAdministrativos[y].checkcancelar = false;
      }
    }
    console.log(todosJSON);
    setFormulario({
      ...formulario,
      datosActuales: copy1,
      // datossinfiltro: response.data.participantes,
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
  // const mostrarModal = (datos) => {
  //   console.log("aca");
  //   setFormulario({ ...formulario, openModal: !formulario.openModal, documentocambiar: datos });
  // };
  const mostrarmodalPostulacion = (datos) => {
    console.log(datos, "modal postualcion");
    setFormulario({
      ...formulario,
      openModalPostulacion: !formulario.openModalPostulacion,
      informacionPostulacion: datos,
    });
  };
  // const changeStateDocument = async () => {
  //   console.log(formulario.documentocambiar, "estos son los datos para enviar a cambiar el estado");
  //   console.log("aca");
  //   console.log("aca", formulario.documentocambiar);
  //   let url = `${process.env.REACT_APP_SERVER_PART}participantes/actualizarEstadoSubsanacionDocumento/${formulario.documentocambiar.numero_documento}`;
  //   let data = {
  //     idDocumento: formulario.documentocambiar.id,
  //     estado: false,
  //   };
  //   let response = await axios.put(url, data);
  //   console.log(response);
  //   setFormulario({ ...formulario, openModal: !formulario.openModal });
  // };
  // const savedocumentotoChange = async () => {
  //   console.log("aca", formulario.documentocambiar);
  //   let url = `${process.env.REACT_APP_SERVER_PART}participantes/actualizarEstadoSubsanacionDocumento/${formulario.documentocambiar.numero_documento}`;
  //   let data = {
  //     idDocumento: formulario.documentocambiar.id,
  //     estado: false,
  //   };
  //   let response = await axios.put(url, data);
  //   console.log(response);
  // };
  const handlechangechecksustentable = (datos, index) => {
    console.log(datos, index, "accion principal subsanable");
    let todosJSON = JSON.parse(JSON.stringify(formulario.datosActuales));
    console.log(todosJSON);
    for (var i in todosJSON) {
      if (todosJSON[i].id_postulacion === formulario.informacionPostulacion.id_postulacion) {
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].checksubsanable);
        todosJSON[i].documentosAdministrativos[index].checksubsanable =
          !todosJSON[i].documentosAdministrativos[index].checksubsanable;
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].checksubsanable);
      }
    }
    return setFormulario({ ...formulario, datosActuales: todosJSON });
  };
  const handlechangecheckaceptar = (datos, index) => {
    console.log(datos, index, "accion principal aceptar");
    let todosJSON = JSON.parse(JSON.stringify(formulario.datosActuales));
    for (var i in todosJSON) {
      if (todosJSON[i].id_postulacion === formulario.informacionPostulacion.id_postulacion) {
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].checkaceptar);
        todosJSON[i].documentosAdministrativos[index].checkaceptar =
          !todosJSON[i].documentosAdministrativos[index].checkaceptar;
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].checkaceptar);
      }
    }
    console.log(todosJSON[i], "este es el nuevo informacionpostulacion");
    return setFormulario({ ...formulario, datosActuales: todosJSON });
  };
  const handlechangecheckcancelar = (datos, index) => {
    console.log(datos, index, "accion principal cancelar");
    let todosJSON = JSON.parse(JSON.stringify(formulario.datosActuales));
    for (var i in todosJSON) {
      if (todosJSON[i].id_postulacion === formulario.informacionPostulacion.id_postulacion) {
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].handlechangecheckcancelar);
        todosJSON[i].documentosAdministrativos[index].handlechangecheckcancelar =
          !todosJSON[i].documentosAdministrativos[index].handlechangecheckcancelar;
        console.log("son iguales", todosJSON[i].documentosAdministrativos[index].handlechangecheckcancelar);
      }
    }
    console.log(todosJSON[i], "este es el nuevo informacionpostulacion");
    return setFormulario({ ...formulario, datosActuales: todosJSON });
  };

  const modificarDocumentos = async () => {
    console.log(formulario.datosActuales);
    let documentos = [];
    for (let i in formulario.datosActuales) {
      if (formulario.datosActuales[i].id_postulacion === formulario.informacionPostulacion.id_postulacion) {
        for (let x in formulario.datosActuales[i].documentosAdministrativos) {
          documentos.push(formulario.datosActuales[i].documentosAdministrativos[x]);
        }
        for (let y in formulario.datosActuales[i].documentosTecnicos) {
          documentos.push(formulario.datosActuales[i].documentosAdministrativos[y]);
        }
      }
    }
    await axios
      .put(
        `${process.env.REACT_APP_SERVER_PART}participantes/documentos/${formulario.informacionPostulacion.id_participante}`,
        documentos
      )
      .then(({ data }) => {
        console.log(data);
        return setFormulario({ ...formulario, openModalPostulacion: !formulario.openModalPostulacion });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const salirModal = () => {
    console.log("salir modal postualcion");
    setFormulario({
      ...formulario,
      openModalPostulacion: !formulario.openModalPostulacion,
    });
  }

  const mostrarModalAceptarPropuesta = () => {
    setFormulario({
      ...formulario,
      openModalAceptarPropuesta: !formulario.openModalAceptarPropuesta,
    });
  }

  return [
    formulario,
    handleChange,
    getDataInitial,
    mostrarConvocatorias,
    filtrarTablaMultiple,
    mostrarmodalPostulacion,
    handlechangechecksustentable,
    handlechangecheckaceptar,
    handlechangecheckcancelar,
    modificarDocumentos,
    salirModal,
    mostrarModalAceptarPropuesta
  ];
};
