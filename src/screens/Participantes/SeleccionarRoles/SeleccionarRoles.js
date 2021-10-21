import React, { useState } from "react";
import { useHistory } from "react-router";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { Header, Divider, Segment, Container, Button, Radio, Grid, Breadcrumb, Icon } from "semantic-ui-react";

export const SeleccionarRoles = () => {
  const [principalState, setPrincipalState] = useState("persona_natural");

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    setPrincipalState({ [name]: checked });
  };

  const history = useHistory();

  const asociarRoles = () => {
    if(principalState == 'persona_natural'){
      history.push('/Administrador/personaNatural')
    }else if(principalState == 'persona_juridica'){
      history.push('/Administrador/personaJuridica')
    }else{
      history.push('/Administrador/grupoConformado')
    }
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
          <Segment className="segment-shadow contenerdor_roles">
            <Header className="font-family-Montserrat-Regular font-size-14px" floated="left">
              Dirigido a
            </Header>

            <Divider clearing />

            <div className="check_roles">
              <Radio
                className="radio-buttons-seleccionarroles"
                label={<label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">Persona natural</label>}
                name="rol"
                value={principalState}
                checked={principalState === "persona_natural"}
                onClick={() => {
                  setPrincipalState("persona_natural");
                }}
              />

              <Radio
                className="radio-buttons-seleccionarroles"
                label={<label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">Perona jurídica</label>}
                name="rol"
                value={principalState}
                checked={principalState === "persona_juridica"}
                onClick={() => {
                  setPrincipalState("persona_juridica");
                }}
              />

              <Radio
                className="radio-buttons-seleccionarroles"
                label={<label className="font-color-000000CC font-size-14px font-family-Montserrat-Regular">Grupo conformado</label>}
                name="rol"
                value={principalState}
                checked={principalState === "grupo_conformador"}
                onClick={() => {
                  setPrincipalState("grupo_conformador");
                }}
              />
            </div>

            <Divider clearing />

            <Container textAlign="right" style={{ paddingRight: '2%' }}>
              <Button className="btn btn-primary" content="Continuar" onClick={asociarRoles}></Button>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
