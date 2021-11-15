import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { Header, Divider, Segment, Container, Button, Radio, Grid, Breadcrumb, Icon, Checkbox } from "semantic-ui-react";
import { tipoParticipante } from "../../../store/actions/participantesAction";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../../config/utils/constanst";

export const SeleccionarRoles = () => {
  const initialState = {
    top: "-59%",
    checkgestor: false,
    checkcreador: false,
  };
  
  const [principalState, setPrincipalState] = useState(1);
  const [state, setState] = useState(initialState);

  const { id_postulacion  } = useSelector((state) => state.participantes);

  const history = useHistory();
  const dispatch = useDispatch();

  const asociarRoles = async() => {

    console.log(id_postulacion)

    await axios
      .put(`${process.env.REACT_APP_SERVER_PARTI}postulaciones/cambiarTipoParticipantePostulacion`, {
        id_postulacion: id_postulacion,
        tipo_participante: principalState
      })
      .then((res) => {
        dispatch(tipoParticipante(principalState));
      });

    if (principalState === 1) {
      history.push("/Usuario/Personanatural");
    } else if (principalState === 2) {
      history.push("/Usuario/Personajuridica");
    } else {
      history.push("/Usuario/Grupoconformado");
    }

  };

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    setPrincipalState({ [name]: checked });
  };

  return (
    <React.Fragment>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Crear convocatoria
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Apoyos Concertados Para el Arte y la Cultura - Línea 1
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="contenedor_pricipal background-color-6DA3FC-opacity-025 no-margin">
        <Grid.Column style={{ flexDirection: "column", alignItems: "center", display: "flex", paddingTop: "3%" }}>
          <p className="font-family-Montserrat-Regular font-size-14px">
            Selecciona el perfil con el cual vas a participar en
          </p>
          <p className="font-family-Montserrat-SemiBold font-size-18px font-weight-600">
            Apoyos Concertados Para el Arte y la Cultura - Línea
          </p>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin">
        <Grid.Column>
          <Segment className="segment-shadow contenerdor_roles" style={{ top: state.top }}>
            <Header className="font-family-Montserrat-Regular font-size-14px" floated="left">
              Dirigido a
            </Header>

            <Divider clearing />

            <div className="check_roles">
              <Radio
                className="radio-buttons-seleccionarroles"
                label={
                  <label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">
                    Persona natural
                  </label>
                }
                name="rol"
                value={principalState}
                checked={principalState === 1}
                onClick={() => {
                  setState({ ...state, top: "-45%" });
                  setPrincipalState(1);
                }}
              />

              <Radio
                className="radio-buttons-seleccionarroles"
                label={
                  <label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">
                    Persona jurídica
                  </label>
                }
                name="rol"
                value={principalState}
                checked={principalState === 2}
                onClick={() => {
                  setState({ ...state, top: "-59%" });
                  setPrincipalState(2);
                }}
              />

              <Radio
                className="radio-buttons-seleccionarroles"
                label={
                  <label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">
                    Grupo conformado
                  </label>
                }
                name="rol"
                value={principalState}
                checked={principalState === 3}
                onClick={() => {
                  setState({ ...state, top: "-59%" });
                  setPrincipalState(3);
                }}
              />
            </div>
            {principalState === 1 ? (
              <div className="check_roles">
                <Checkbox
                  className="radio-buttons-seleccionarroles"
                  label={
                    <label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">Gestor</label>
                  }
                  name="tiponatural"
                  value={state.checkgestor}
                  checked={state.checkgestor}
                  onClick={() => {
                    setState({...state, checkgestor: !state.checkgestor});
                  }}
                />

                <Checkbox
                  className="radio-buttons-seleccionarroles"
                  label={
                    <label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">Creador</label>
                  }
                  name="tiponatural"
                  value={state.checkcreador}
                  checked={state.checkcreador}
                  onClick={() => {
                    setState({ ...state, checkcreador: !state.checkcreador })
                  }}
                />
              </div>
            ) : null}

            <Divider clearing />

            <Container textAlign="right" style={{ paddingRight: "2%" }}>
              <Button className="btn btn-primary" content="Continuar" onClick={asociarRoles}></Button>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
