import React from 'react'
import { ObjConstanst } from "../../config/utils/constanst";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Container, Radio } from "semantic-ui-react";
import { useSelector } from 'react-redux';

export const PublicarConvocatoria = () => {

  const {idConvocatoria} = useSelector(state => state.convocatoria)

  return (
    <Container>
      <Segment>
        <Header as="h4" floated="right">
          Codigo de convocatoria #: {idConvocatoria}
          </Header>
        <Header as="h4" floated="left">
          Publicar convocatoria
        </Header>
        <Divider clearing />
        <Grid>
          <Grid.Row className="container_publicar">
            <Grid.Column width={11}>
              Nombre de la convocatoria
            </Grid.Column>
            <Grid.Column width={2}>
              <label>Previsualizar</label>
              <Button className="botones-acciones" icon="eye" />
            </Grid.Column>
            <Grid.Column width={2}>
              <label>Publicada</label>
              <Radio label='Si' />
              <Radio label='No' />
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
