import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { ObjNotificaciones } from '../../../config/utils/notificaciones.utils';
import { Form, Grid, Header, Divider, Segment, Checkbox, Container, Button } from "semantic-ui-react";

export const SeleccionarRoles = () => {

  const initialState = {
    persona_natural: 0,
    persona_juridica: 0,
    grupo_conformado: 0
  }

  const [principalState, setPrincipalState] = useState(initialState);

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    setPrincipalState({ ...principalState, [name]: checked });
  };

  const  history = useHistory();

  const asociarRoles = () => {
    ObjNotificaciones.MSG_SUCCESS("success", "Rol seleccionado");
    history.push('/Inscripcion')
  }

    return (
      <>
      <Container fluid className="contenedor_pricipal">
        <div className="conteiner_titulos"> 
          <div className="textos">
            <p className="titulo">
              Bienvenido a convocatorias de fomento y estímulos para el arte y la cultura
            </p>
            <span className="sub_titulo">Selecciona los roles con lo que vas a participar en las diferentes convocatorias.</span>
          </div>
        </div>
      </Container>
      <Segment className="contenerdor_roles">
        <Header as="h4" floated="left">
          Seleccionar roles
        </Header>

        <Divider clearing />

        <div className="check_roles">
          <Checkbox label='Persona natural' name="persona_natural"  onChange={handletoggleChange} />
          <Checkbox label='Perona juridica' name="persona_juridica" onChange={handletoggleChange} />
          <Checkbox label='Grupo conformado' name="grupo_conformado" onChange={handletoggleChange} />
        </div>
      


        <Divider clearing />

        <Container textAlign="right">
          <Button className="btn btn-primary" content="Guardar y continuar" onClick={asociarRoles} ></Button>
        </Container>
      </Segment>
      </>
    )
}
