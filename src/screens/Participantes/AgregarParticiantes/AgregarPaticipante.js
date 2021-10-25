import React, { useEffect, useState } from "react";
import axios from "axios";
import { ObjConstanst } from "../../../config/utils/constanst";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
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
  Checkbox,
  Breadcrumb,
  Icon,
} from "semantic-ui-react";
import {
  TipoDocumentosOptions,
  EtniaOptions,
  IdentidadGeneroOptions,
  OrientacionSexualoOptions,
} from "../../../data/selectOption.data";
import { useHistory } from "react-router";

export const AgregarPaticipante = () => {
  const initialState = {
    mayor_edad: 0,
    tipo_identificacion: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rango_edad: 0,
    rol: "",
    grupo_etnico: "",
    orientacion_sexual: "",
    identidad: "",
    participante_id: 1,
    participantesAgregados: [],
    index: 0,
    editar: false,
    toprelative: "-59%",
  };

  useEffect(() => {
    cargarParticipantes();
    //consultarIdUltimoParticipante()
  }, []);

  const history = useHistory();

  const consultarIdUltimoParticipante = async () => {
    await axios
      .get(`${ObjConstanst.IP_PARTICIPANTES}participantes/obtenerParticipante/`)
      .then((data) => {
        console.log(data);
        // ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
        // history.push("/adminconvocatorias");
        // dispatch(edicionConvocatoria());
      })
      .catch(function (error) {
        console.log(error);
        //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
      });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setPrincipalState({ ...principalState, [name]: value });
  };

  const handleChange = (e, { value }) => setPrincipalState({ mayorEdad: value });

  const handleCreateParicipante = async () => {
    console.log(principalState.participantesAgregados);

    let array = [];
    array = [
      ...principalState.participantesAgregados,
      {
        index: principalState.participantesAgregados.length,
        mayor_edad: principalState.mayor_edad,
        tipo_identificacion: principalState.tipo_identificacion,
        numero_documento: principalState.numero_documento,
        primer_nombre: principalState.primer_nombre,
        segundo_nombre: principalState.segundo_nombre,
        primer_apellido: principalState.primer_apellido,
        segundo_apellido: principalState.segundo_apellido,
        rango_edad: principalState.rango_edad,
        rol: principalState.rol,
        grupo_etnico: principalState.grupo_etnico,
        orientacion_sexual: principalState.orientacion_sexual,
        identidad: principalState.identidad,
      },
    ];
    if (principalState.editar) {
      let todoJSON = JSON.parse(JSON.stringify(principalState.participantesAgregados));
      todoJSON[principalState.index].nombre = principalState.tipo_identificacion;
      todoJSON[principalState.index].tipo_documento = principalState.numero_documento;
      todoJSON[principalState.index].descripcion = principalState.primer_nombre;
      todoJSON[principalState.index].url_documento = principalState.primer_apellido;
      array = todoJSON;
    }

    return setPrincipalState({
      ...principalState,
      tipo_identificacion: "",
      numero_documento: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      rango_edad: 0,
      rol: "",
      grupo_etnico: "",
      participantesAgregados: array,
      editar: false,
    });
  };

  let i = 0;
  const guardarParticipantes = async () => {
    // if(mostrar.selected == 'show'){
    //   let arrParticipantes = principalState.participantesAgregados;
    //   let participante = 0;
    //   let ArrayFilter = arrParticipantes.map((data) => data);
    //   for (participante in arrParticipantes) {
    //     if (arrParticipantes[participante]) {
    //       let participanteExiste = await verificarExisteDocumento(arrParticipantes[participante].id_participantes);
    //       if (participanteExiste) {
    //         ArrayFilter = ArrayFilter.filter(
    //           (element) => element.id_participantes !== participanteExiste[0].id_participantes
    //         );
    //         console.log(ArrayFilter);
    //       }
    //     }
    //   }

    //   arrParticipantes = ArrayFilter;

    //   if (arrParticipantes.length === 0) return;
    //   if (arrParticipantes[i]) {
    //     console.log(arrParticipantes[i].activo);
    //     try {
    //       await axios.post(`${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/`, {
    //         mayor_edad : arrParticipantes[i].mayor_edad,
    //         tipo_identificacion: arrParticipantes[i].tipo_identificacion,
    //         numero_documento: arrParticipantes[i].numero_documento,
    //         primer_nombre: arrParticipantes[i].primer_nombre,
    //         segundo_nombre: arrParticipantes[i].segundo_nombre,
    //         primer_apellido: arrParticipantes[i].primer_apellido,
    //         segundo_apellido: arrParticipantes[i].segundo_apellido,
    //         rango_edad:arrParticipantes[i].rango_edad,
    //         rol: arrParticipantes[i].rol,
    //         grupo_etnico: arrParticipantes[i].grupo_etnico,
    //         orientacion_sexual: arrParticipantes[i].orientacion_sexual,
    //         identidad: arrParticipantes[i].identidad,
    //         participante_id: 1,
    //       });
    //       i++;
    //       return guardarParticipantes();
    //     } catch (error) {
    //       return console.error(error);
    //     }
    //   }

    await ObjNotificaciones.MSG_SUCCESS("success", "Se guardaron correctamente todos los participantes");
    history.push("/Administrador/cargarDocumentos");
    // }else{
    //   await ObjNotificaciones.MSG_SUCCESS("success", "Se guardaron correctamente los cambios");
    //   //return history.push("/publicarConvocatoria");
    // }
  };

  const verificarExisteDocumento = async (id_participante, index) => {
    const id_consultar = id_participante != undefined ? id_participante : index;
    if (id_consultar) {
      try {
        let response = await axios.get(`${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/${id_consultar}`);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  };

  const cargarParticipantes = async () => {
    await axios
      .get(`${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/`)
      .then((data) => {
        console.log(data);
        // ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
        //history.push("/homeParticipantes");
        // dispatch(edicionConvocatoria());
      })
      .catch(function (error) {
        console.log(error);
        //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
      });
  };

  const eliminarParticipante = async ({ data }) => {
    const { id_participantes, index } = data;
    console.log(id_participantes, index);

    const existeParticipante = await verificarExisteDocumento(id_participantes, index + 1);
    console.log(existeParticipante);
    if (existeParticipante && existeParticipante !== undefined && existeParticipante.length) {
      await axios.delete(
        `${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/${existeParticipante[0].id_participantes}`
      );
    }

    let array = [];
    let copy = principalState.participantesAgregados.map((data) => data);
    array = copy.filter((par) => par.index !== data.index);
    return setPrincipalState({ ...principalState, participantesAgregados: array });
  };

  const [principalState, setPrincipalState] = useState(initialState);
  const [mostrar, setMostrar] = useState({ show: "hide", selected: "hide" });

  const handleSioNoChange = (e) => {
    if (e.target.value === "show") {
      setMostrar({
        show: "show",
        selected: e.target.value,
      });
      return setPrincipalState({ ...principalState, toprelative: "-14%" });
    } else {
      setMostrar({
        show: "hide",
        selected: e.target.value,
      });
      return setPrincipalState({ ...principalState, toprelative: "-59%" });
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
        <Grid.Column className="no-padding-top">
          <Segment className="segment-shadow" style={{ width: "100%", top: principalState.toprelative }}>
            <Form size="large">
              <Header className="font-family-Montserrat-Regular font-size-14px" floated="left">
                ¿Desea añadir participantes?
              </Header>

              <Divider clearing />

              <Grid className="no-margin">
                <Grid.Column>
                  <Radio
                    value="show"
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">Si</label>
                    }
                    name="Si"
                    id="show"
                    onClick={handleSioNoChange}
                    checked={mostrar.selected === "show"}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Radio
                    value="hide"
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">No</label>
                    }
                    name="No"
                    id="hide"
                    onClick={handleSioNoChange}
                    checked={mostrar.selected === "hide"}
                  />
                </Grid.Column>
              </Grid>

              <div style={{ maxWidth: "100%", paddingTop: "2%" }} className={mostrar.show}>
                <Header className="font-family-Montserrat-Regular font-size-12px" floated="left">
                  Añadir participantes
                </Header>

                <Divider clearing />
                <Grid columns={4} className="no-margin">
                  <Grid.Column className="no-padding-left">
                    <Radio
                      label={
                        <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                          Mayor de edad
                        </label>
                      }
                      name="radioGroup"
                      value="1"
                      checked={principalState.mayor_edad == "1"}
                      onChange={handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column className="no-padding-left">
                    <Radio
                      label={
                        <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                          Menor de edad
                        </label>
                      }
                      name="radioGroup"
                      value="0"
                      checked={principalState.mayor_edad == "0"}
                      onChange={handleChange}
                    />
                  </Grid.Column>
                </Grid>

                <Grid columns={4} className="no-margin">
                  <Grid.Column className="no-padding-left">
                    <Form.Select
                      fluid
                      label={
                        <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                          Tipo documento
                        </label>
                      }
                      name="tipo_identificacion"
                      value={principalState.tipo_identificacion}
                      options={TipoDocumentosOptions}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                  <Grid.Column className="no-padding-left">
                    <Form.Input
                      fluid
                      label={
                        <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                          Número documento
                        </label>
                      }
                      name="numero_documento"
                      type="number"
                      value={principalState.numero_documento}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                </Grid>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Primer nombre
                      </label>
                    }
                    name="primer_nombre"
                    value={principalState.primer_nombre}
                    onChange={handleInputChange}
                  />

                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Segundo nombre
                      </label>
                    }
                    name="segundo_nombre"
                    value={principalState.segundo_nombre}
                    onChange={handleInputChange}
                  />

                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Primer apellido
                      </label>
                    }
                    name="primer_apellido"
                    value={principalState.primer_apellido}
                    onChange={handleInputChange}
                  />

                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Segundo apellido
                      </label>
                    }
                    name="segundo_apellido"
                    value={principalState.segundo_apellido}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Rango de edad
                      </label>
                    }
                    name="rango_edad"
                    value={principalState.rango_edad}
                    onChange={handleInputChange}
                  />

                  <Form.Input
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Rol que desempeña
                      </label>
                    }
                    name="rol"
                    value={principalState.rol}
                    onChange={handleInputChange}
                  />

                  <Form.Select
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Grupo étnico
                      </label>
                    }
                    name="grupo_etnico"
                    value={principalState.grupo_etnico}
                    options={EtniaOptions}
                    onChange={handleInputChange}
                  />

                  <Form.Select
                    fluid
                    label={
                      <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                        Orientación sexual
                      </label>
                    }
                    name="orientacion_sexual"
                    value={principalState.orientacion_sexual}
                    options={OrientacionSexualoOptions}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Grid columns={4} className="no-margin">
                  <Grid.Column className="no-padding-left">
                    <Form.Select
                      fluid
                      label={
                        <label className="font-color-000000CC font-size-12px font-family-Montserrat-Regular">
                          Identidad de genero
                        </label>
                      }
                      name="identidad"
                      value={principalState.identidad}
                      options={IdentidadGeneroOptions}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                </Grid>

                <Container textAlign="right">
                  <Button content="Añadir participante" className="btn btn-primary" onClick={handleCreateParicipante} />
                </Container>

                <Grid.Row>
                  <Grid.Column>
                    <Table striped singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={1} rowSpan="2">
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell width={1} rowSpan="2">
                            Tipo documento
                          </Table.HeaderCell>
                          <Table.HeaderCell width={2} rowSpan="2">
                            Numero documento
                          </Table.HeaderCell>
                          <Table.HeaderCell width={3} rowSpan="2">
                            Nombre
                          </Table.HeaderCell>
                          <Table.HeaderCell width={3} rowSpan="2">
                            Apellido
                          </Table.HeaderCell>
                          {/* <Table.HeaderCell width={1} rowSpan="2">
                          Correo electronico
                        </Table.HeaderCell> */}
                          <Table.HeaderCell colSpan="2">Acciones</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Editar</Table.HeaderCell>
                          <Table.HeaderCell>Eliminar</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {principalState.participantesAgregados.length > 0 ? (
                          principalState.participantesAgregados.map((data, index) => (
                            <Table.Row key={index}>
                              <Table.Cell width={1}>{index + 1}</Table.Cell>
                              <Table.Cell width={1}>{data.tipo_identificacion}</Table.Cell>
                              <Table.Cell width={1}>{data.numero_documento}</Table.Cell>
                              <Table.Cell width={3}>{data.primer_nombre}</Table.Cell>
                              <Table.Cell width={3}>{data.primer_apellido}</Table.Cell>
                              {/* <Table.Cell width={5}>{data.correo_electronico}</Table.Cell> */}
                              <Table.Cell width={1}>
                                <Button
                                  className="botones-acciones"
                                  icon="pencil"
                                  // onClick={() => Editardocumentacion({ data, index })}
                                />
                              </Table.Cell>
                              <Table.Cell width={1}>
                                <Button
                                  className="botones-acciones boton-borrar-adminconvocatorias"
                                  icon="trash alternate outline"
                                  onClick={() => eliminarParticipante({ data, index })}
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
              </div>
              <Container textAlign="right">
                <Button content="Guardar y continuar" className="btn btn-primary" onClick={guardarParticipantes} />
              </Container>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
