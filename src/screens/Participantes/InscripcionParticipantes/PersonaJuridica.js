import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { ObjConstanst } from "../../../config/utils/constanst";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { TipoDocumentosOptions, EstratoOptions, SexoOptions } from "../../../data/selectOption.data";
import { Form, Grid, Header, Divider, Segment, Button, Container, Breadcrumb, Icon } from "semantic-ui-react";

export const PersonaJuridica = () => {
  const stateEmpresa = {
    razon_social: "",
    nit: "",
    direccion_empresa: "",
    telefono_fijo_empresa: "",
    telefono_celular_empresa: "",
    tipo_enfoque_empresa: "",
    objeto_social_empresa: "",
    fecha_constitucion_empresa: "",
    correo_electronico_empresa: "",
    municipio_residencia_empresa: "",
    barrio_empresa: "",
    comuna_empresa: "",
    direccion_empresa: "",
  };

  const initialState = {
    tipo_identificacion: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: new Date(),
    sexo: "",
    pais_nacimiento: "",
    pais_residencia: "",
    departamento: "",
    municipio: "",
    comuna: "",
    barrio: "",
    estrato: "",
    telefono_fijo: "",
    telefono_celular: "",
    correo_electronico: "",
    datos_empresa: [],
    tipo_participante: 2,
  };

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
    razon_social: false,
    nit: false,
    direccion_empresa: false,
    telefono_fijo_empresa: false,
    telefono_celular_empresa: false,
    tipo_enfoque_empresa: false,
    objeto_social_empresa: false,
    fecha_constitucion_empresa: false,
    correo_electronico_empresa: false,
    municipio_residencia_empresa: false,
  };

  const [empresa, setEmpresa] = useState(stateEmpresa);
  const [principalState, setPrincipalState] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());
  const [errores, setErrores] = useState(stateErrores);

  const history = useHistory();

  const { idParticipante } = useSelector((state) => state.participantes);

  useEffect(() => {
    cargarInformacionParticipante();
  }, [])

  const handleInputChangeEmpresa = (event, result) => {
    const { name, value } = result || event.target;
    // console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setEmpresa({ ...empresa, [name]: value });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    // console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setPrincipalState({ ...principalState, [name]: value });
  };

  const handleCrearPersonaJuridica = async() => {
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

    if(empresa.razon_social == ''){
      arrayErrores = {
        ...arrayErrores,
        razon_social: true,
      }
      error = true;
    }
    if(empresa.nit == ''){
      arrayErrores = {
        ...arrayErrores,
        nit: true,
      }
      error = true;
    }
    if(empresa.direccion_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        direccion_empresa: true,
      }
      error = true;
    }
    if(empresa.telefono_fijo_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        telefono_fijo_empresa: true,
      }
      error = true;
    }
    if(empresa.telefono_celular_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        telefono_celular_empresa: true,
      }
      error = true;
    }
    if(empresa.tipo_enfoque_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        tipo_enfoque_empresa: true,
      }
      error = true;
    }
    if(empresa.objeto_social_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        objeto_social_empresa: true,
      }
      error = true;
    }
    if(empresa.fecha_constitucion_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        fecha_constitucion_empresa: true,
      }
      error = true;
    }
    if(empresa.correo_electronico_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        correo_electronico_empresa: true,
      }
      error = true;
    }
    if(empresa.municipio_residencia_empresa == ''){
      arrayErrores = {
        ...arrayErrores,
        municipio_residencia_empresa: true,
      }
      error = true;
    }

    if (error) {
      return setErrores(arrayErrores);
    } else {
      if (idParticipante !== undefined) {

      
    

        console.log(empresa)
        setPrincipalState({...principalState, datos_empresa: empresa})

        console.log(principalState)

        const existeParticipante = await consularExisteParticipante();

        // if (!Array.isArray(existeParticipante)) {

        //   await axios
        //     .put(`${ObjConstanst.IP_PARTICIPANTES}participantes/${idParticipante}`, principalState)
        //     .then(({ data }) => {
        //       ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        //     })
        //     .catch(function (error) {
        //       console.log(error)
        //       // ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
        //     });

        //   const { primer_nombre: nombres, primer_apellido: apellidos, correo_electronico: email, telefono: telefono_celular, tipo_identificacion } = principalState;
        //   const stateUsuario = { nombres, apellidos, telefono_celular, tipo_identificacion, idusuario: idParticipante }

        //   await axios
        //     .put(`${ObjConstanst.IP_USUARIOS}usuarios/${idParticipante}`, stateUsuario)
        //     .then(({ data }) => {
        //       ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        //     })
        //     .catch(function (error) {
        //       console.log(error)
        //       // ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
        //     });

        // } else {

        //   await axios
        //     .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/`, principalState)
        //     .then(({ data }) => {
        //       ObjNotificaciones.MSG_SUCCESS("success", "El participante se creo correctamente");
        //       //history.push("/Administrador/agregarParticipantes"); 
        //     })
        //     .catch(function (error) {
        //       console.log(error)
        //     });

        //   const { primer_nombre: nombres, primer_apellido: apellidos, correo_electronico: email, telefono: telefono_celular, tipo_identificacion } = principalState;
        //   const stateUsuario = { nombres, apellidos, telefono_celular, tipo_identificacion, idusuario: idParticipante }

        //   await axios
        //     .put(`${ObjConstanst.IP_USUARIOS}usuarios/${idParticipante}`, stateUsuario)
        //     .then(({ data }) => {
        //       ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        //     })
        //     .catch(function (error) {
        //       console.log(error)
        //     });
        // }

        // history.push('/Administrador/agregarParticipantes')
      }
    }
  };

  const cargarInformacionParticipante = async () => {

    if (idParticipante != undefined) {

      const existeParticipante = await consularExisteParticipante();

      if (!Array.isArray(existeParticipante)) {
        return setPrincipalState(existeParticipante)
      } else {
        await axios
          .get(`${ObjConstanst.IP_USUARIOS}usuarios/${idParticipante}`,)
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
              tipo_participante: 2,
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

  const consularExisteParticipante = async () => {
    return await axios
      .get(`${ObjConstanst.IP_PARTICIPANTES}participantes/${idParticipante}`)
      .then(({ data }) => {
        return data.data
      })
      .catch(function (error) { });
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
      <Grid style={{ marginBottom: "4%", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large" onSubmit={handleCrearPersonaJuridica}>
            <Segment className="segment-shadow" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
              <Header as="h4" floated="left">
                Persona jurídica -
                <span className="font-color-9F0505 font-size-10px no-margin"> Todos los campos son obligatorios</span>
              </Header>
              <Divider clearing style={{ marginTop: "0", marginBottom: "2.4%" }} />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Razón social</label>}
                  name="razon_social"
                  onChange={handleInputChangeEmpresa}
                  error={errores.razon_social}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">NIT</label>}
                  name="nit"
                  onChange={handleInputChangeEmpresa}
                  error={errores.nit}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Dirección empresa</label>}
                  name="direccion_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.direccion_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono fijo</label>}
                  name="telefono_fijo_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.telefono_fijo_empresa}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono celular</label>}
                  name="telefono_celular_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.telefono_celular_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tipo de enfoque</label>}
                  name="tipo_enfoque_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.tipo_enfoque_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Objeto social</label>}
                  name="objeto_social_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.objeto_social_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Fecha de constitución</label>}
                  name="fecha_constitucion_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.fecha_constitucion_empresa}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Correo electrónico</label>}
                  name="correo_electronico_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.correo_electronico_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Municipio de residencia</label>}
                  name="municipio_residencia_empresa"
                  onChange={handleInputChangeEmpresa}
                  error={errores.municipio_residencia_empresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Barrio de residencia</label>}
                  name="barrio_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Comuna de residencia</label>}
                  name="comuna_empresa"
                  onChange={handleInputChangeEmpresa}
                />
              </Form.Group>

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Input
                      fluid
                      label={<label className="font-color-4B4B4B font-size-12px">Dirección</label>}
                      name="direccion_empresa"
                      onChange={handleInputChangeEmpresa}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header className="font-color-1B1C1D font-size-14px" as="h4" floated="left" style={{ paddingTop: "3%" }}>
                Datos del representante legal
              </Header>

              <Divider clearing />

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tipo documento</label>}
                  name="tipo_identificacion"
                  options={TipoDocumentosOptions}
                  value={principalState.tipo_identificacion}
                  onChange={handleInputChange}
                  error={errores.tipo_identificacion}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Numero documento</label>}
                  name="numero_documento"
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
                  error={errores.primer_apellido}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Segundo apellido</label>}
                  name="segundo_apellido"
                  value={principalState.segundo_apellido}
                  onChange={handleInputChange}
                />

                <Form.Field>
                  <label>fecha nacimiento</label>
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
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                  error={errores.sexo}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">País de nacimiento</label>}
                  name="pais_nacimiento"
                  value={principalState.pais_nacimiento}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">País de residencia</label>}
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
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono fijo</label>}
                  name="telefono_fijo"
                  value={principalState.telefono_fijo}
                  onChange={handleInputChange}
                  error={errores.telefono_fijo}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono celular</label>}
                  name="telefono_celular"
                  value={principalState.telefono_celular}
                  onChange={handleInputChange}
                  error={errores.telefono_celular}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Correo electrónico</label>}
                  name="correo_electronico"
                  value={principalState.correo_electronico}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Divider clearing />

              <Container textAlign="right">
                <Button content="Guardar y continuar" className="btn btn-primary" />
              </Container>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
