import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Modal, Button, Header, Image } from "semantic-ui-react";
import { documentosConvocatoria, idConvocatorias } from "../../store/actions/convocatoriaAction";
import { categoriasLineasConvocatoria, fechasParticipantes, idConvocatoriaSelecionada, nombreConvocatoria } from "../../store/actions/participantesAction";

export const VerConvocatoria = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const { idconvocatorias, numero_convocatoria, descripcion_corta, documentos, categoria_linea_convocatoria, fechas } = props.datos;



  const continuar = () => {
    dispatch(idConvocatorias(idconvocatorias))
    dispatch(documentosConvocatoria(documentos));
    dispatch(categoriasLineasConvocatoria(categoria_linea_convocatoria));
    dispatch(fechasParticipantes(fechas));
    dispatch(nombreConvocatoria(numero_convocatoria))

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
