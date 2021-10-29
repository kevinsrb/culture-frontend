import React from "react";
import axios from "axios";

export const useBuscarConvocatoria = (initialState) => {
  const [formulario, setFormulario] = React.useState(initialState);
  const primeroDatostabla = async () => {
    try {
      let responselineas = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias`);
      let LineaConvocatoriaOptionsMap = responselineas.data.data.map((ds) => {
        return {
          key: ds.idlineaconvocatoria,
          value: ds.idlineaconvocatoria,
          text: ds.nombre,
        };
      });
      // console.log(LineaConvocatoriaOptionsMap, 'linea de convocatorias');
      let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/`);
      console.log(response);
      let copynombres = response.data.lineasconvocatorias.map((data) => data);
      for (var i in response.data.convocatorias) {
        let idlinea_data = response.data.convocatorias[i].numero_convocatoria;
        let nombreconvocatoria = copynombres.filter((data) => data.idlineaconvocatoria === idlinea_data);
        response.data.convocatorias[i].numero_convocatoria = nombreconvocatoria[0].nombre;
        response.data.convocatorias[i].idnumero_convocatoria = nombreconvocatoria[0].idlineaconvocatoria;
      }
      if (response.data.convocatorias.length > 0) {
        // setFormulario({
        //   ...formulario,
        //   datossinfiltro: response.data.convocatorias,
        //   numeroregistros: response.data.convocatorias.length,
        // });
        let copy = response.data.convocatorias.map((data) => data);
        let datos = copy.slice(0, formulario.cantidadPáginas);
        let x = response.data.convocatorias.length / formulario.cantidadPáginas;
        x = Math.ceil(x);
        return setFormulario({
          ...formulario,
          datosActuales: datos,
          paginacionTotal: x,
          datossinfiltro: response.data.convocatorias,
          numeroregistros: response.data.convocatorias.length,
          lineasconvocatorias: LineaConvocatoriaOptionsMap,
        });
      }
      return setFormulario({ ...formulario, lineasconvocatorias: LineaConvocatoriaOptionsMap });
    } catch (error) {
      console.error(error);
    }
  };
  const handleLineaConvocatoria = async (event, results) => {
    let { value } = results || event.target;
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${value[0].value}`
      );
      let categoriaslineasconvocatoriaMap;
      categoriaslineasconvocatoriaMap = response.data.data.map((ds) => {
        return {
          key: ds.idcategorialineaconvocatoria,
          value: ds.idcategorialineaconvocatoria,
          text: ds.nombre,
        };
      });
      return setFormulario({ ...formulario, categoriaslineasconvocatorias: categoriaslineasconvocatoriaMap });
    } catch (error) {
      console.error(error);
    }
  };
  const changePagination = (event, { activePage }) => {
    let copy = formulario.datosActuales.map((data) => data);
    let datos = copy.slice(
      formulario.cantidadPáginas * activePage - formulario.cantidadPáginas,
      formulario.cantidadPáginas * activePage
    );
    return setFormulario({ ...formulario, paginacionActual: activePage, datosActuales: datos });
  };
  const showConvocatorias = (event, value) => {
    let copy = formulario.datosActuales.map((data) => data);
    let datos = copy.slice(0, value);
    let x = formulario.datosActuales.length / value;
    x = Math.ceil(x);
    return setFormulario({ ...formulario, paginacionTotal: x, datosActuales: datos, cantidadPáginas: value });
  };
  const filtrarTablaMultiple = (e) => {
    let filtrado = [];
    let filtros = {
      ...formulario.filtros,
      [e.name]: e.value,
    };
    let copiaDatosActuales = [];
    if (formulario.datosActuales.length > 0) {
      copiaDatosActuales = formulario.datosActuales.map((data) => data);
    }
    if (e.value.length !== 0) {
      let objetos = Object.keys(filtros);
      for (var i in formulario.datosActuales) {
        for (var x in objetos) {
          for (var y in filtros[objetos[x]]) {
            if (typeof formulario.datosActuales[i][objetos[x]] === "object") {
              let existe = formulario.datosActuales[i][objetos[x]].filter(
                (data) => data.value === filtros[objetos[x]][y]
              );
              if (existe.length > 0) {
                let datorepetido = filtrado.filter(
                  (data) => data.idconvocatorias === formulario.datosActuales[i].idconvocatorias
                );
                if (datorepetido.length === 0) filtrado.push(formulario.datosActuales[i]);
              }
            } else {
              let existe = formulario.datosActuales[i][objetos[x]] === filtros[objetos[x]];
              if (existe) {
                let datorepetido = filtrado.filter(
                  (data) => data.idconvocatorias === formulario.datosActuales[i].idconvocatorias
                );
                if (datorepetido.length === 0) filtrado.push(formulario.datosActuales[i]);
              }
            }
          }
        }
      }
      return setFormulario({
        ...formulario,
        datosActuales: filtrado,
        filtros,
        datosfiltroanterior: copiaDatosActuales,
      });
    }
    return setFormulario({ ...formulario, filtros, datosActuales: formulario.datosfiltroanterior });
  };
  return [
    formulario,
    handleLineaConvocatoria,
    primeroDatostabla,
    changePagination,
    showConvocatorias,
    filtrarTablaMultiple,
  ];
};
