import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ObjConstanst } from '../../../config/utils/constanst';
import {
    Form,
    Grid,
    Header,
    Divider,
    Segment,
    Radio,
    Container,
    Button,
    Table,
    Input,
    Breadcrumb,
    Icon,
  } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export const AgregarLinks = () => {

  useEffect(() => {
    consultarLinks();
  }, [])

  const initialState = {
    link: '',
    linksAgregado: [],
    index: 0
  }

    const history = useHistory();

    const { idParticipante, nombre_convocatoria,   categoria_linea_convocatoria, fechas_participantes, tipo_participante } = useSelector((state) => state.participantes);
    const { idConvocatoria  } = useSelector((state) => state.convocatoria);
    const [principalState, setPrincipalState] = useState(initialState);


    const agregarLink = async () => {
      console.log(principalState.linksAgregado);
  
      let array = [];
      array = [
        ...principalState.linksAgregado,
        {
          index: principalState.linksAgregado.length,
          link: principalState.link,
        },
      ];
  
      return setPrincipalState({
        ...principalState,
        link: '',
        linksAgregado: array
      });
    };

    const guardarLinks = async() => {
      
      // await axios
      //   .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/guardarLinksParticipantes/${idParticipante}`, arrLinks)
      //   .then((res) => {
      //     console.log(res)
      //   });

        const fechaApertura = fechas_participantes.filter((fec) => fec.clave == 'Apertura');

      //  const postulaciones = [{
      //   idConvocatoria,
        
      //   tipo_participante,
      //   'postulacion': true
      //  }]

       

      // await axios
      //   .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/guardarPostulacionParticipantes/${idParticipante}`, postulaciones)
      //   .then((res) => {
      //     console.log(res)
      //   });  
        
        let arrLinks = principalState.linksAgregado;
       console.log(fechaApertura[0].valormin)

      const postulante = {
        convocatoria_id: idConvocatoria,
        numero_documento_participante: idParticipante,
        nombre_propuesta: 'PRUEBA',
        tipo_participante,
        links: arrLinks,
        nombre_convocatoria,
        categoria_linea_convocatoria,
        fecha_apertura: fechaApertura[0].valormin,
      }

      console.log(postulante)

      await axios
        .post(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/`, postulante)
        .then((res) => {
          console.log(res)
        });   
        
      history.push('/Administrador/Participantes')
    }    

    const consultarLinks = async () => {
      try {
        
        await axios
        .get(`${ObjConstanst.IP_PARTICIPANTES}participantes/consultarLinks/${idParticipante}`)
        .then(({data}) => {
          // console.log()
          return setPrincipalState({...principalState, linksAgregado : data.links[0].links})
        });
      } catch (error) {
        console.error(error);
        return false;
      }
      
    };

    const handleInputChange = (event, result) => {
      const { name, value } = result || event.target;
      console.log(value, name);
      //setErrores({...errores, [name]: false});
      return setPrincipalState({ ...principalState, [name]: value });
    };

   

    const eliminarlink = async ({ data }) => {
      const {  index } = data;
      let array = [];
      let copy = principalState.linksAgregado.map((data) => data);
      array = copy.filter((par) => par.index !== data.index);
      return setPrincipalState({ ...principalState, linksAgregado: array });
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
          
          <Grid className="no-margin">
            <Grid.Column className="no-padding-top">
              <Segment className="segment-shadow">
                  <Form size="large">
                  <Header className="font-family-Montserrat-Regular font-size-14px" floated="left">
                      ¿Desea añadir linsk?
                  </Header>

                  <Divider clearing />

                  <Grid className="no-margin">

                  <Form.Group >
                    <Form.Input
                      label='Links'
                      placeholder='First name'
                      name="link"
                      onChange={handleInputChange}
                    />

                  </Form.Group>
                  <Button content="Agregar" className="btn btn-primary" onClick={agregarLink} />
                  </Grid>

                  <Grid.Row>
                  <Grid.Column>
                    <Table striped singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={1} rowSpan="2">
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell width={3} rowSpan="2">
                            Link
                          </Table.HeaderCell>
                         
                          <Table.HeaderCell colSpan="2">Acciones</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Eliminar</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {principalState.linksAgregado.length > 0 ? (
                          principalState.linksAgregado.map((data, index) => (
                            <Table.Row key={index}>
                              <Table.Cell width={1}>{index + 1}</Table.Cell>
                              <Table.Cell width={3}>
                                <a href={data.link} target="_blank"> {data.link} </a>
                                
                              </Table.Cell>

                              <Table.Cell width={1}>
                                <Button
                                  className="botones-acciones boton-borrar-adminconvocatorias"
                                  icon="trash alternate outline"
                                  onClick={() => eliminarlink({ data, index })}
                                />
                              </Table.Cell>
                            </Table.Row>
                          ))
                        ) : (
                          <Table.Row>
                            <Table.Cell>No hay datos por mostrar</Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>

                  
                  <Divider clearing />

                      
          
                  <Container textAlign="right">
                      <Button content="Guardar y continuar" className="btn btn-primary" onClick={guardarLinks} />
                  </Container>
                  </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </React.Fragment>
    )
}
