import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { ObjNotificaciones } from '../../../config/utils/notificaciones.utils';
import {  Header, Divider, Segment, Container, Button, Radio } from "semantic-ui-react";

export const SeleccionarRoles = () => {


  const [principalState, setPrincipalState] = useState("persona_natural");

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    setPrincipalState({[name]: checked });
  };

  const  history = useHistory();

  const asociarRoles = () => {
    if(principalState == 'persona_natural'){
      history.push('/personaNatural')
    }else if(principalState == 'persona_juridica'){
      history.push('/personaJuridica')
    }else{
      history.push('/grupoConformado')
    }
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
          <Radio 
          label='Persona natural'
           name="rol"
           value={principalState}
           checked={principalState == "persona_natural"}
           onClick={() => {
            setPrincipalState("persona_natural");
           }}
          />

          <Radio 
            label='Perona juridica' 
            name="rol"  
            value={principalState}
            checked={principalState == "persona_juridica"}
            onClick={() => {
              setPrincipalState("persona_juridica");
            }}
         />

          <Radio 
            label='Grupo conformado' 
            name="rol"  
            value={principalState}
            checked={principalState == "grupo_conformador"}
            onClick={() => {
              setPrincipalState("grupo_conformador");
            }} 
          />

        </div>
      


        <Divider clearing />

        <Container textAlign="right">
          <Button className="btn btn-primary" content="Guardar y continuar" onClick={asociarRoles} ></Button>
        </Container>
      </Segment>
      </>
    )
}
