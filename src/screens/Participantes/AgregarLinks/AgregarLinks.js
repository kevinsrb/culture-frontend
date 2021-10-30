import React, { useEffect, useState } from "react";
import axios from "axios";
import { ObjConstanst } from "../../../config/utils/constanst";
import { Table } from "antd";
import {
  Form,
  Grid,
  Header,
  Divider,
  Segment,
  Radio,
  Container,
  Button,
  Input,
  Breadcrumb,
  Icon,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export const AgregarLinks = () => {
  const columns = [
    {
      width: 100,
      title: "No.",
      dataIndex: `index`,
      key: "index",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      width: 140,
      title: "Eliminar",
      render: (data, index) => (
        <Button
          className="botones-acciones boton-borrar-adminconvocatorias"
          icon="trash alternate outline"
          onClick={() => eliminarlink({ data })}
        />
      ),
    },
  ];

  useEffect(() => {
    consultarLinks();
  }, []);

  const initialState = {
    link: "",
    linksAgregado: [],
    index: 0,
  };

  const history = useHistory();

  const { idParticipante, id_postulacion  } = useSelector((state) => state.participantes);
  const [principalState, setPrincipalState] = useState(initialState);
  const [nombrePropuesta, setnombrePropuesta] = useState();

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
      link: "",
      linksAgregado: array,
    });
  };

  const guardarLinks = async () => {
    await axios
    .put(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/guardarLinksPostulacion/${id_postulacion}`, principalState.linksAgregado )
    .then((res) => {
      console.log(res)
    })

    await axios
    .put(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/actualizarNombrePropuesta`, {id_postulacion, nombrePropuesta})
    .then((res) => {
      console.log(res)
    })

    await axios
    .put(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/cambiarEstadoPostulacion/`, {id_postulacion, estado: 'Completado'})
    .then((res) => {
      console.log(res)
    })
  
    history.push('/Administrador/homeParticipantes')
  }


  const consultarLinks = async () => {
    try {
      await axios
        .get(`${ObjConstanst.IP_PARTICIPANTES}participantes/consultarLinks/${idParticipante}`)
        .then(({ data }) => {
          // console.log()
          if (data.links[0].links !== null) {
            return setPrincipalState({ ...principalState, linksAgregado: data.links[0].links });
          }
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
    const { index } = data;
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

      <Grid className="no-margin" style={{ padding: "2%" }}>
        <Grid.Column className="no-padding-top">
          <Segment className="segment-shadow">
            <Grid style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <Form.Input
                label="Nombre propuesta"
                value={nombrePropuesta}
                onChange={(e) => setnombrePropuesta(e.target.value)}
              />
            </Grid>
            <Form size="large">
              <Header className="font-family-Montserrat-Regular font-size-14px" floated="left">
                ¿Desea añadir linsk?
              </Header>

              <Divider clearing />

              <Grid className="no-margin">
                <Form.Group>
                  <Form.Input label="Links" placeholder="First name" name="link" onChange={handleInputChange} />
                  <Container>
                    <Button
                      content="Agregar"
                      className="btn btn-primary"
                      style={{ marginTop: "30px" }}
                      onClick={agregarLink}
                    />
                  </Container>
                </Form.Group>
              </Grid>

              <Grid.Row>
                <Table dataSource={principalState.linksAgregado} columns={columns} size="middle" />
                {/* <Grid.Column>
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
                    </Table.Header>
                    <Table.Body>
                      {principalState.linksAgregado.length > 0 ? (
                        principalState.linksAgregado.map((data, index) => (
                          <Table.Row key={index}>
                            <Table.Cell width={1}>{index + 1}</Table.Cell>
                            <Table.Cell width={3}>
                              <a href={data.link} target="_blank"> {data.link} </a>

                            </Table.Cell>

                            <Table.Cell width={1} content>
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
                </Grid.Column> */}
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
  );
};
