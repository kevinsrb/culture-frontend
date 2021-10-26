import React, { useState } from 'react'
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

export const AgregarLinks = () => {

  const initialState = {
    link: '',
    linksAgregado: [],
    index: 0
  }

    const {  idParticipante } = useSelector((state) => state.participantes);
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
  
      let arrLinks = principalState.linksAgregado;
      const linksExistentes = await consultarLinks();
      let ArrayFilter = [];
      if(linksExistentes !== undefined){
         ArrayFilter = arrLinks.map((data) => data.index !== linksExistentes.index);
      }else{
        console.log(arrLinks)
        await axios
        .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/guardarLinksParticipantes/${1000000001}`, arrLinks)
        .then((res) => {
          console.log(res)
        });
      }


      

      


      // let i = 0;
      // let ArrayFilter = arrLinks.map((data) => data);


      
      // for (i in arrLinks) {
      //   if (arrLinks[i]) {
      //     let linkExiste = await verificarExisteLink(arrLinks[i].index);
      //     console.log(linkExiste)
      //     if (linkExiste) {
      //       ArrayFilter = ArrayFilter.filter(
      //         (element) => element.index !== linkExiste[i].index
      //       );
      //       console.log(ArrayFilter);
      //     }
      //   }
      // }

      // arrLinks = ArrayFilter;

      // if (arrLinks.length === 0) return;
      
        // try {
        //   await axios.post(`${ObjConstanst.IP_PARTICIPANTES}participantes/guardarLinksParticipantes/${1000000001}`, {
        //     index: arrLinks[i].index,
        //     link: arrLinks[i].link,
        //   });
        //   i++;
        //   return guardarLinks();
        // } catch (error) {
        //   return console.error(error);
        // }
      

    
    }

    const consultarLinks = async () => {
      try {
        let response = await axios.get(`${ObjConstanst.IP_PARTICIPANTES}participantes/consultarLinks/${1000000001}`);
        return response.data.data;
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
      console.log( index);
  
      // const existeParticipante = await verificarExisteDocumento(id_participantes, index + 1);
      // console.log(existeParticipante);
      // if (existeParticipante && existeParticipante !== undefined && existeParticipante.length) {
      //   await axios.delete(
      //     `${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/${existeParticipante[0].id_participantes}`
      //   );
      // }
  
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
