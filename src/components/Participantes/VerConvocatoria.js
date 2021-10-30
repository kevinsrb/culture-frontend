import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../config/utils/constanst";
import { Modal, Button } from "semantic-ui-react";

import { documentosConvocatoria, idConvocatorias } from "../../store/actions/convocatoriaAction";
import { categoriasLineasConvocatoria, documentosAdministrativosCargados, documentosTecnicosCargados, fechasParticipantes, idConvocatoriaSelecionada, idPostulacion, nombreConvocatoria } from "../../store/actions/participantesAction";

export const VerConvocatoria = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();



  const [open, setOpen] = useState(false);
  const { idconvocatorias, numero_convocatoria, descripcion_corta, documentos, categoria_linea_convocatoria, fechas } = props.datos;
  const {  idParticipante } = useSelector((state) => state.participantes);

  const crearPostulacion = async () => {
    const fechaApertura = fechas.filter((fec) => fec.clave == 'Apertura');
    const postulante = {
      convocatoria_id: idconvocatorias,
      numero_documento_participante: idParticipante,
      nombre_convocatoria: numero_convocatoria,
      categoria_linea_convocatoria,
      fecha_apertura: fechaApertura[0].valormin,
      estado: 'Incompleto'
    }

    console.log(postulante)

    await axios
      .post(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/`, postulante)
      .then(({data}) => {
        dispatch(idPostulacion(data.data.id_postulacion))
      });   

  }

  const continuar = () => {
    dispatch(idConvocatorias(idconvocatorias))
    dispatch(documentosConvocatoria(documentos));
    dispatch(categoriasLineasConvocatoria(categoria_linea_convocatoria));
    dispatch(fechasParticipantes(fechas));
    dispatch(nombreConvocatoria(numero_convocatoria))
    dispatch(documentosAdministrativosCargados([]));
    dispatch(documentosTecnicosCargados([]));
    crearPostulacion();
    history.push("/Usuario/Seleccionarrol");
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<span className="ver_convocatoria no-margin">Ver convocatoria</span>}
    >
      <Modal.Header>{numero_convocatoria}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>{descripcion_corta}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)} className="btn btn-secondary">
          cerrar
        </Button>
        <Button onClick={() => setOpen(false)} className="btn btn-primary" onClick={continuar}>
          Postularme
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
