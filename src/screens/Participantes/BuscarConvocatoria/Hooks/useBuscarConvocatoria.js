import React from "react";
import axios from "axios";

export const useBuscarConvocatoria = (initialState) => {
  const [formulario, setFormulario] = React.useState(initialState);
  const getLineaConvocatoria = async () => {
    try {
      let LineaConvocatoriaOptionsMap;
      let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias`);
      LineaConvocatoriaOptionsMap = response.data.data.map((ds) => {
        return {
          key: ds.idlineaconvocatoria,
          value: ds.idlineaconvocatoria,
          text: ds.nombre,
        };
      });
      console.log(LineaConvocatoriaOptionsMap, 'linea de convocatorias');
      setFormulario({ ...formulario, lineasconvocatorias: LineaConvocatoriaOptionsMap });
    } catch (error) {
      console.error(error);
    }
  };
  const handleLineaConvocatoria = async (event, results) => {
    let { name, value } = results || event.target;
    setFormulario({ ...formulario, [name]: value });
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${value}`);
      let categoriaslineasconvocatoriaMap;
      categoriaslineasconvocatoriaMap = response.data.data.map((ds) => {
        return {
          key: ds.idcategorialineaconvocatoria,
          value: ds.idcategorialineaconvocatoria,
          text: ds.nombre,
        };
      });
      setFormulario({ ...formulario, categoriaslineasconvocatorias: categoriaslineasconvocatoriaMap });
    } catch (error) {
      console.error(error);
    }
  };
  const primeroDatostabla = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/`);
    let copynombres = response.data.lineasconvocatorias.map((data) => data);
    for (var i in response.data.convocatorias) {
      let idlinea_data = response.data.convocatorias[i].numero_convocatoria;
      let nombreconvocatoria = copynombres.filter((data) => data.idlineaconvocatoria === idlinea_data);
      response.data.convocatorias[i].numero_convocatoria = nombreconvocatoria[0].nombre;
      response.data.convocatorias[i].idnumero_convocatoria = nombreconvocatoria[0].idlineaconvocatoria;
      if (response.data.convocatorias.length > 0) {
        setFormulario({
          ...formulario,
          datossinfiltro: response.data.convocatorias,
          numeroregistros: response.data.convocatorias.length,
        });
        let copy = response.data.convocatorias.map((data) => data);
        let datos = copy.slice(0, formulario.cantidadPáginas);
        let x = response.data.convocatorias.length / formulario.cantidadPáginas;
        x = Math.ceil(x);
        setFormulario({ ...formulario, datosActuales: datos, paginacionTotal: x });
      }
    }
  };
  return [formulario, getLineaConvocatoria, handleLineaConvocatoria, primeroDatostabla];
};
