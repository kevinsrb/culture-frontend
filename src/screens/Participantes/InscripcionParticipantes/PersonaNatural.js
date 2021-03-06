import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ObjConstanst } from "../../../config/utils/constanst";
import { id_Participante } from "../../../store/actions/participantesAction";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { TipoDocumentosOptions, SexoOptions, EstratoOptions } from "../../../data/selectOption.data";
import { Form, Grid, Header, Divider, Segment, Button, Container, Breadcrumb, Icon } from "semantic-ui-react";

export const PersonaNatural = () => {
  const initialState = {
    tipo_identificacion: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: new Date(),
    sexo: '',
    pais_nacimiento: '',
    pais_residencia: '',
    departamento: '',
    municipio: '',
    comuna: '',
    barrio: '',
    estrato: '',
    telefono_fijo: '',
    telefono_celular: '',
    correo_electronico: '',
    tipo_participante: 1,
    usuario_id: ''
  }

  const stateErrores = {
    tipo_identificacion: false,
    numero_documento: false,
    primer_nombre: false,
    primer_apellido: false,
    fecha_nacimiento: false,
    sexo: false,
    pais_residencia: false,
    telefono_fijo: false,
    telefono_celular: false,
  };

  const [principalState, setPrincipalState] = useState(initialState);
  const [errores, setErrores] = useState(stateErrores);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { idParticipante } = useSelector((state) => state.participantes);

  useEffect(() => {
    cargarInformacionParticipante();
  }, [])

  const handleCrearPersonaNatural = async () => {

    let arrayErrores = stateErrores;
    let error = false;

    if (principalState.tipo_identificacion == 0) {
      arrayErrores = {
        ...arrayErrores,
        tipo_identificacion: true,
      }
      error = true
    }
    if (principalState.numero_documento == '') {
      arrayErrores = {
        ...arrayErrores,
        numero_documento: true,
      }
      error = true
    }
    if (principalState.primer_nombre == '') {
      arrayErrores = {
        ...arrayErrores,
        primer_nombre: true,
      }
      error = true
    }

    if (principalState.primer_apellido == '') {
      arrayErrores = {
        ...arrayErrores,
        primer_apellido: true,
      }
      error = true
    }

    if (principalState.fecha_nacimiento == '') {
      arrayErrores = {
        ...arrayErrores,
        fecha_nacimiento: true,
      }
      error = true
    }
    if (principalState.sexo.length == 0) {
      arrayErrores = {
        ...arrayErrores,
        sexo: true,
      }
      error = true
    }

    if (principalState.pais_residencia == '') {
      arrayErrores = {
        ...arrayErrores,
        pais_residencia: true,
      }
      error = true
    }

    if (principalState.telefono_fijo == '') {
      arrayErrores = {
        ...arrayErrores,
        telefono_fijo: true,
      }
      error = true
    }
    if (principalState.telefono_celular == '') {
      arrayErrores = {
        ...arrayErrores,
        telefono_celular: true,
      }
      error = true
    }

    if (error) {
      return setErrores(arrayErrores);
    } else {  
      // debugger 
      if (idParticipante !== undefined) {

        const existeParticipante = await consularExisteParticipante();
        if (!Array.isArray(existeParticipante)) {

          await axios
            .put(`${process.env.REACT_APP_SERVER_PARTI}participantes/${idParticipante}`, principalState)
            .then(({ data }) => {
              ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
            })
            .catch(function (error) {
              console.log(error)
              // ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
            });

          const { primer_nombre: nombres, primer_apellido: apellidos, correo_electronico: email, telefono: telefono_celular, tipo_identificacion } = principalState;
          const stateUsuario = { nombres, apellidos, telefono_celular, tipo_identificacion, idusuario: idParticipante }

          await axios
            .put(`${process.env.REACT_APP_SERVER_USER}usuarios/${idParticipante}`, stateUsuario)
            .then(({ data }) => {
              ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
            })
            .catch(function (error) {
              console.log(error)
              // ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
            });

        } else {

          await axios
            .post(`${process.env.REACT_APP_SERVER_PARTI}participantes/`, principalState)
            .then(({ data }) => {
              ObjNotificaciones.MSG_SUCCESS("success", "El participante se creo correctamente");
              //history.push("/Administrador/agregarParticipantes"); 
            })
            .catch(function (error) {
              console.log(error)
            });

          const { primer_nombre: nombres, primer_apellido: apellidos, correo_electronico: email, telefono: telefono_celular, tipo_identificacion } = principalState;
          const stateUsuario = { nombres, apellidos, telefono_celular, tipo_identificacion, idusuario: idParticipante }

          await axios
            .put(`${process.env.REACT_APP_SERVER_USER}usuarios/${idParticipante}`, stateUsuario)
            .then(({ data }) => {
              ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
            })
            .catch(function (error) {
              console.log(error)
            });
        }

        history.push('/Usuario/Cargardocumentos')
      }
    }

  }

  const consularExisteParticipante = async () => {
    return await axios
      .get(`${process.env.REACT_APP_SERVER_PARTI}participantes/${idParticipante}`)
      .then(({ data }) => {
        return data.data
      })
      .catch(function (error) { });
  };

  const cargarInformacionParticipante = async () => {

    if (idParticipante != undefined) {

      const existeParticipante = await consularExisteParticipante();
      console.log(existeParticipante)

      if (!Array.isArray(existeParticipante)) {
        return setPrincipalState(existeParticipante)
      } else {
        await axios
          .get(`${process.env.REACT_APP_SERVER_USER}usuarios/${idParticipante}`,)
          .then(({ data }) => {

            console.log(data.data)
            const { nombres, apellidos, direccion, email, telefono, tipo_identificacion, idusuario } = data.data;

            const objUsuario = {
              tipo_identificacion: tipo_identificacion,
              numero_documento: idusuario,
              primer_nombre: nombres,
              primer_apellido: apellidos,
              telefono_celular: telefono,
              correo_electronico: email,
              tipo_participante: 1,
              usuario_id: idParticipante
            }

            console.log(objUsuario)

            return setPrincipalState(objUsuario)

          })
          .catch(function (error) {
            console.log(error)
            //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
          });
      }
    }
  }

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    return setPrincipalState({ ...principalState, [name]: value });

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
              Nombre convocatoria
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin">
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large">
            <Segment className="segment-shadow">
              <Header as="h4" floated="left">
                Datos persona natural -{" "}
                <span className="font-color-9F0505 font-size-10px no-margin">Todos los campos son obligatorios</span>
              </Header>

              <Divider clearing />
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tipo documento</label>}
                  name="tipo_identificacion"
                  value={principalState.tipo_identificacion}
                  options={TipoDocumentosOptions}
                  onChange={handleInputChange}
                  error={errores.tipo_identificacion}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Numero documento</label>}
                  name="numero_documento"
                  type="number"
                  value={principalState.numero_documento}
                  onChange={handleInputChange}
                  error={errores.numero_documento}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Primer nombre</label>}
                  name="primer_nombre"
                  value={principalState.primer_nombre}
                  onChange={handleInputChange}
                  error={errores.primer_nombre}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Segundo nombre</label>}
                  name="segundo_nombre"
                  value={principalState.segundo_nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Primer apellido</label>}
                  name="primer_apellido"
                  value={principalState.primer_apellido}
                  onChange={handleInputChange}
                  error={errores.primer_apellido}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Segundo apellido</label>}
                  name="segundo_apellido"
                  value={principalState.segundo_apellido}
                  onChange={handleInputChange}
                />

                <Form.Field>
                  <label className="font-color-4B4B4B font-size-12px">fecha nacimiento</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setPrincipalState({ ...principalState, fecha_nacimiento: date })}
                    error={errores.fecha_nacimiento}
                  />
                </Form.Field>

                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Sexo</label>}
                  name="sexo"
                  value={principalState.sexo}
                  options={SexoOptions}
                  onChange={handleInputChange}
                  error={errores.sexo}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Pa??s de nacimiento</label>}
                  name="pais_nacimiento"
                  value={principalState.pais_nacimiento}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Pa??s de residencia</label>}
                  name="pais_residencia"
                  value={principalState.pais_residencia}
                  onChange={handleInputChange}
                  error={errores.pais_residencia}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Departamento</label>}
                  name="departamento"
                  value={principalState.departamento}
                  onChange={handleInputChange}

                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Municipio de residencia</label>}
                  name="municipio"
                  value={principalState.municipio}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Comuna de residencia</label>}
                  name="comuna"
                  value={principalState.comuna}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Barrio de residencia</label>}
                  name="barrio"
                  value={principalState.barrio}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Estrato</label>}
                  name="estrato"
                  value={principalState.estrato}
                  options={EstratoOptions}
                  onChange={handleInputChange}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tel??fono fijo</label>}
                  name="telefono_fijo"
                  value={principalState.telefono_fijo}
                  onChange={handleInputChange}
                  error={errores.telefono_fijo}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tel??fono celular</label>}
                  name="telefono_celular"
                  value={principalState.telefono_celular}
                  onChange={handleInputChange}
                  error={errores.telefono_celular}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Correo electr??nico</label>}
                  name="correo_electronico"
                  value={principalState.correo_electronico}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Divider clearing />

              <Container textAlign="right">
                <Button content="Guardar y continuar" className="btn btn-primary" onClick={handleCrearPersonaNatural} />
              </Container>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
