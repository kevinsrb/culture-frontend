import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
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
    tipo_participante: 2,
  };

  const [empresa, setEmpresa] = useState(stateEmpresa);
  const [principalState, setPrincipalState] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());

  const history = useHistory();

  const handleInputChangeEmpresa = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setEmpresa({ ...empresa, [name]: value });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setPrincipalState({ ...principalState, [name]: value });
  };

  const handleCrearPersonaJuridica = () => {
    ObjNotificaciones.MSG_SUCCESS("success", "El participante se creo correctamente");
    history.push("/agregarParticipantes");
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
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">NIT</label>}
                  name="nit"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Dirección empresa</label>}
                  name="direccion_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono fijo</label>}
                  name="telefono_fijo_empresa"
                  onChange={handleInputChangeEmpresa}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono celular</label>}
                  name="telefono_celular_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tipo de enfoque</label>}
                  name="tipo_enfoque_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Objeto social</label>}
                  name="objeto_social_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Fecha de constitución</label>}
                  name="fecha_constitucion_empresa"
                  onChange={handleInputChangeEmpresa}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Correo electrónico</label>}
                  name="correo_electronico_empresa"
                  onChange={handleInputChangeEmpresa}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Municipio de residencia</label>}
                  name="municipio_residencia_empresa"
                  onChange={handleInputChangeEmpresa}
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
                  onChange={handleInputChange}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Numero documento</label>}
                  name="numero_documento"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Primer nombre</label>}
                  name="primer_nombre"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Segundo nombre</label>}
                  name="segundo_nombre"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Primer apellido</label>}
                  name="primer_apellido"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Segundo apellido</label>}
                  name="segundo_apellido"
                  onChange={handleInputChange}
                />

                <Form.Field>
                  <label>fecha nacimiento</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setPrincipalState({ ...principalState, fecha_nacimiento: date })}
                  />
                </Form.Field>

                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Sexo</label>}
                  name="sexo"
                  options={SexoOptions}
                  onChange={handleInputChange}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">País de nacimiento</label>}
                  name="pais_nacimiento"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">País de residencia</label>}
                  name="pais_residencia"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Departamento</label>}
                  name="departamento"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Municipio de residencia</label>}
                  name="municipio"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Comuna de residencia</label>}
                  name="comuna"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Barrio de residencia</label>}
                  name="barrio"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Estrato</label>}
                  name="estrato"
                  options={EstratoOptions}
                  onChange={handleInputChange}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono fijo</label>}
                  name="telefono_fijo"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono celular</label>}
                  name="telefono_celular"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Correo electrónico</label>}
                  name="correo_electronico"
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
