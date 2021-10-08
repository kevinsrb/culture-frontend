import React, { useEffect, useState } from 'react'
import { ObjConstanst } from "../../config/utils/constanst";
import axios from 'axios'
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Container, Radio } from "semantic-ui-react";
import { useSelector } from 'react-redux';

export const PublicarConvocatoria = () => {

  const {idConvocatoria} = useSelector(state => state.convocatoria)


  useEffect(() => {
    consultarConvocatoria();
  }, [idConvocatoria])

  const inicialState = {
    numeroLinea: 0,
    nombre: ''
  }

  const [lineaConvocatoriaState, setLineaConvocatoriaState] = useState(inicialState)
  const [publicada, setPublicada] = useState({value: 0});


  const consultarConvocatoria = async() => {
    let numero = 0;
    if(idConvocatoria !== undefined){
      await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`)
      .then(({ data }) => {
        numero = data.data.linea_convocatoria; 
      })
      .catch(function (error) {
        console.error(error);
      })
  
      console.log(lineaConvocatoriaState)
  
    if(lineaConvocatoriaState.numeroLinea !== undefined){
      console.log(numero)
      await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatoria/${numero}`)
        .then(({ data }) => {
          console.log(data.data)
          const { nombre } = data.data;
          setLineaConvocatoriaState({...lineaConvocatoriaState, nombre: nombre  }) 
        })
        .catch(function (error) {
          console.error(error);
        })
      }
    }
    
  }

  const handleChange = (e, { value }) => setPublicada({ value });

  return (
    <Container>
      <Segment>
        <Header as="h4" floated="right">
        <span className="codigo_convovcatoria"> Codigo de convocatoria #: {idConvocatoria} </span>
          </Header>
        <Header as="h4" floated="left">
          Publicar convocatoria
        </Header>
        <Divider clearing />
        <Grid>
          <Grid.Row className="container_publicar">
            <Grid.Column width={11}>
              <strong>{lineaConvocatoriaState.nombre}</strong>
            </Grid.Column>
            <Grid.Column width={2}>
              <label>Previsualizar</label>
              <Button className="botones-acciones" icon="eye" />
            </Grid.Column>
            <Grid.Column width={2}>
              <label>Publicada</label>
              <Radio 
                label='Si'
                name='radioGroup'
                value='1'
                checked={publicada.value === '1'}
                onChange={handleChange}
              />
              <Radio 
                label='No'
                name='radioGroup'
                value='0'
                checked={publicada.value === '0'}
                onChange={handleChange}
              />
              </Grid.Column>
          </Grid.Row>
          <Divider clearing />
          <Container textAlign='right'>
              <Button content='Guardar y continuar' className="btn btn-primary" />
          </Container>
        </Grid>
      </Segment>
      
    </Container>
  )
}
