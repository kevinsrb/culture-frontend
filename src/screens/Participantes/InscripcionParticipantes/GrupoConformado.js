import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../../config/utils/constanst";
import { id_Participante } from "../../../store/actions/participantesAction";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { TipoDocumentosOptions, SexoOptions, EstratoOptions } from "../../../data/selectOption.data";
import { Form, Grid, Header, Divider, Segment, Button, Container, Breadcrumb, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";

export const GrupoConformado = () => {
  const initialState = {
    nombre_grupo: "",
    correo_electronico_gc: "",
    documento: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    sexo: "",
    pais: "",
    municipio: "",
    direccion: "",
    comuna: "",
    barrio: "",
    estrato: "",
    telefono_fijo: "",
    telefono_celular: "",
    correo_electronico: "",
    tipo_participante: 3,
  };

  const [principalState, setPrincipalState] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());

  const history = useHistory();
  const dispatch = useDispatch();

  const handleCrearGrupoConformado = async () => {
    // await axios
    // .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/`, principalState)
    // .then((data) => {
    //   console.log(data);
    //   ObjNotificaciones.MSG_SUCCESS("success", "se ha creado correctamente el grupo conformado");
    //   history.push("/homeParticipantes");
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
    // });
    ObjNotificaciones.MSG_SUCCESS("success", "se ha creado correctamente el grupo conformado");
    history.push("/homeParticipantes");
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
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
      <Grid style={{ marginBottom: "4%", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large" onSubmit={handleCrearGrupoConformado}>
            <Segment className="segment-shadow" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
              <Header as="h4" floated="left" className="no-margin" style={{ paddingBottom: '0.5%' }}>
                Grupo conformado - <span className="font-color-9F0505 font-size-10px no-margin">Todos los campos son obligatorios</span>
              </Header>
              <Divider clearing style={{ marginTop: "0", marginBottom: "2.4%" }} />

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Tipo documento</label>}
                  name="tipo_identificacion"
                  options={TipoDocumentosOptions}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  type="number"
                  label={<label className="font-color-4B4B4B font-size-12px">Numero documento</label>}
                  name="numero_documento"
                  onChange={handleInputChange}
                />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Primer nombre</label>} name="primer_nombre" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Segundo nombre</label>} name="segundo_nombre" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Primer apellido</label>} name="primer_apellido" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Segundo apellido</label>} name="segundo_apellido" onChange={handleInputChange} />

                <Form.Field>
                  <label className="font-color-4B4B4B font-size-12px">Fecha nacimiento</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setPrincipalState({ ...principalState, fecha_nacimiento: date })}
                  />
                </Form.Field>

                <Form.Select fluid label={<label className="font-color-4B4B4B font-size-12px">Sexo</label>} name="sexo" options={SexoOptions} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">País de nacimiento</label>} name="pais_nacimiento" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">País de residencia</label>} name="pais_residencia" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Departamento</label>} name="departamento" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Municipio de residencia</label>} name="municipio" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Comuna de residencia</label>} name="comuna" onChange={handleInputChange} />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Barrio de residencia</label>} name="barrio" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<label className="font-color-4B4B4B font-size-12px">Estrato</label>}
                  name="estrato"
                  value={principalState.estrato}
                  options={EstratoOptions}
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  type="number"
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono fijo</label>}
                  name="telefono_fijo"
                  onChange={handleInputChange}
                />

                <Form.Input
                  fluid
                  type="number"
                  label={<label className="font-color-4B4B4B font-size-12px">Teléfono celular</label>}
                  name="telefono_celular"
                  onChange={handleInputChange}
                />

                <Form.Input fluid label={<label className="font-color-4B4B4B font-size-12px">Correo electrónico</label>} name="correo_electronico" onChange={handleInputChange} />
              </Form.Group>

              <Divider clearing />

              <Grid className="no-margin">
                <Grid.Column className="justify-content-flex-end">
                  <Button
                    content="Guardar y continuar"
                    className="btn btn-primary"
                    onClick={handleCrearGrupoConformado}
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
