import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ObjConstanst } from '../../../config/utils/constanst';
import { ObjNotificaciones } from '../../../config/utils/notificaciones.utils'; 
import { Form, Grid, Header, Divider, Segment, Radio, Container, Button, Table, Checkbox } from "semantic-ui-react";
import { TipoDocumentosOptions, EtniaOptions, IdentidadGeneroOptions, OrientacionSexualoOptions } from '../../../data/selectOption.data';

export const AgregarPaticipante = () => {

  const initialState = {
    mayor_edad : 0,
    tipo_identificacion: '',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    rango_edad: 0,
    rol: '',
    grupo_etnico: '',
    orientacion_sexual: '',
    identidad: '',
    participante_id: 1,
    participantesAgregados: [],
    index: 0,
    editar: false
  }

  useEffect(() => {   
    cargarParticipantes()
    //consultarIdUltimoParticipante()
  }, [])

  const consultarIdUltimoParticipante = async() => {
    await axios
    .get(`${ObjConstanst.IP_PARTICIPANTES}participantes/obtenerParticipante/`)
    .then((data) => {
      console.log(data);
      // ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
      // history.push("/adminconvocatorias");
      // dispatch(edicionConvocatoria());
    })
    .catch(function (error) {
      console.log(error)
      //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
    });
  }

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setPrincipalState({ ...principalState, [name]: value });
  };

  const handleChange = (e, { value }) => setPrincipalState({ mayorEdad : value} );

  const handleCreateParicipante = async() => {
    console.log(principalState.participantesAgregados)

    let array = [];
    array = [
      ...principalState.participantesAgregados,
      {
        index: principalState.participantesAgregados.length,
        mayor_edad : principalState.mayor_edad,
        tipo_identificacion: principalState.tipo_identificacion,
        numero_documento: principalState.numero_documento,
        primer_nombre: principalState.primer_nombre,
        segundo_nombre: principalState.segundo_nombre,
        primer_apellido: principalState.primer_apellido,
        segundo_apellido: principalState.segundo_apellido,
        rango_edad:principalState.rango_edad,
        rol: principalState.rol,
        grupo_etnico: principalState.grupo_etnico,
        orientacion_sexual: principalState.orientacion_sexual,
        identidad: principalState.identidad,
      },
    ];
    if (principalState.editar) {
      let todoJSON = JSON.parse(JSON.stringify(principalState.participantesAgregados));
      todoJSON[principalState.index].nombre = principalState.tipo_identificacion
      todoJSON[principalState.index].tipo_documento = principalState.numero_documento
      todoJSON[principalState.index].descripcion = principalState.primer_nombre
      todoJSON[principalState.index].url_documento = principalState.primer_apellido
      array = todoJSON;
    }

    return setPrincipalState({
      ...principalState,
      tipo_identificacion: '',
      numero_documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      rango_edad: 0,
      rol: '',
      grupo_etnico: '',
      participantesAgregados: array,
      editar: false,
    });
  }

  let i = 0;
  const guardarParticipantes = async() => {
    console.log(principalState);
    let arrParticipantes = principalState.participantesAgregados;
    let participante = 0;
    let ArrayFilter = arrParticipantes.map((data) => data);
    for (participante in arrParticipantes) {
      if (arrParticipantes[participante]) {
        let participanteExiste = await verificarExisteDocumento(arrParticipantes[participante].id_participantes);
        if (participanteExiste) {
          ArrayFilter = ArrayFilter.filter(
            (element) => element.id_participantes !== participanteExiste[0].id_participantes
          );
          console.log(ArrayFilter);
        }
      }
    }

    arrParticipantes = ArrayFilter;

    if (arrParticipantes.length === 0) return;
    if (arrParticipantes[i]) {
      console.log(arrParticipantes[i].activo);
      try {
        await axios.post(`${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/`, {
          mayor_edad : arrParticipantes[i].mayor_edad,
          tipo_identificacion: arrParticipantes[i].tipo_identificacion,
          numero_documento: arrParticipantes[i].numero_documento,
          primer_nombre: arrParticipantes[i].primer_nombre,
          segundo_nombre: arrParticipantes[i].segundo_nombre,
          primer_apellido: arrParticipantes[i].primer_apellido,
          segundo_apellido: arrParticipantes[i].segundo_apellido,
          rango_edad:arrParticipantes[i].rango_edad,
          rol: arrParticipantes[i].rol,
          grupo_etnico: arrParticipantes[i].grupo_etnico,
          orientacion_sexual: arrParticipantes[i].orientacion_sexual,
          identidad: arrParticipantes[i].identidad,
          participante_id: 1,
        });
        i++;
        return guardarParticipantes();
      } catch (error) {
        return console.error(error);
      }
    }

    await ObjNotificaciones.MSG_SUCCESS("success", "Se guardaron correctamente todos los participantes");
    //return history.push("/publicarConvocatoria");
  }

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

  const cargarParticipantes = async() => {
    await axios
    .get(`${ObjConstanst.IP_PARTICIPANTES}partipantesAgregados/`)
    .then((data) => {
      console.log(data);
      // ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
      // history.push("/adminconvocatorias");
      // dispatch(edicionConvocatoria());
    })
    .catch(function (error) {
      console.log(error)
      //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
    });
  }

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
  }

  const [principalState, setPrincipalState] = useState(initialState)

    return (
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Form size="large">
          <Segment>
            <Header as="h4" floated="left">
              Añadir participantes
            </Header>

            <Divider clearing />
            <Grid.Column width={2}>
              <Radio 
                label='Mayor de edad'
                name='radioGroup'
                value='1'
                checked={principalState.mayor_edad === '1'}
                onChange={handleChange}
              />
              <Radio 
                label='Menor de edad'
                name='radioGroup'
                value='0'
                checked={principalState.mayor_edad === '0'}
                onChange={handleChange}
              />
            </Grid.Column>

            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Select 
                    fluid 
                    label="Tipo documento" 
                    name="tipo_identificacion"
                    value={principalState.tipo_identificacion}
                    options={TipoDocumentosOptions}
                    onChange={handleInputChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input 
                    fluid 
                    label="Numero documento" 
                    name="numero_documento"
                    type="number"
                    value={principalState.numero_documento}
                    onChange={handleInputChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Form.Group widths="equal">
              <Form.Input 
                fluid 
                label="Primer nombre" 
                name="primer_nombre"
                value={principalState.primer_nombre}
                onChange={handleInputChange}
              />

              <Form.Input 
                fluid 
                label="Segundo nombre"
                name="segundo_nombre"
                value={principalState.segundo_nombre}
                onChange={handleInputChange}
              />

              <Form.Input 
                fluid 
                label="Primer apellido" 
                name="primer_apellido"
                value={principalState.primer_apellido}
                onChange={handleInputChange}
              />

              <Form.Input 
                fluid 
                label="segundo apellido" 
                name="segundo_apellido"
                value={principalState.segundo_apellido}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input 
                fluid 
                label="Rango de edad" 
                name="rango_edad"
                value={principalState.rango_edad}
                onChange={handleInputChange}
              />

              <Form.Input 
                fluid 
                label="Rol que desempeña"
                name="rol"
                value={principalState.rol}
                onChange={handleInputChange}
              />

              <Form.Select 
                fluid 
                label="Grupo étnico" 
                name="grupo_etnico"
                value={principalState.grupo_etnico}
                options={ EtniaOptions }
                onChange={handleInputChange}
              />

              <Form.Select 
                fluid 
                label="Orientación sexual" 
                name="orientacion_sexual"
                value={principalState.orientacion_sexual}
                options={ OrientacionSexualoOptions }
                onChange={handleInputChange}
              />
            </Form.Group>

            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Select 
                    fluid 
                    label="Identidad de genero" 
                    name="identidad"
                    value={principalState.identidad}
                    options={ IdentidadGeneroOptions }
                    onChange={handleInputChange}
                  />
                </Grid.Column>
              </Grid.Row>
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

            <Container textAlign="right">
              <Button content="Guardar y continuar" className="btn btn-primary" onClick={guardarParticipantes}  />
            </Container>

          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    )
}
