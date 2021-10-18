import React, { useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ObjConstanst } from '../../../config/utils/constanst';
import { ObjNotificaciones } from '../../../config/utils/notificaciones.utils';
import { TipoDocumentosOptions, SexoOptions, EstratoOptions } from '../../../data/selectOption.data';
import { Form, Grid, Header, Divider, Segment, Button, Container } from "semantic-ui-react";


export const PersonaNatural = () => {

  const initialState = {
    tipo_identificacion: '',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
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
    tipo_participante: 1
  }

  const stateErrores = {
    tipo_identificacion: false,
    numero_documento: false,
    primer_nombre: false,
    primer_apellido: false,
    fecha_nacimiento: false,
    sexo: false,
    pais_residencia: false,
    telefono_fijo: '',
    telefono_celular: false
  }

  const [principalState, setPrincipalState] = useState(initialState)
  const [errores, setErrores] = useState(stateErrores);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const history = useHistory();


  const handleCrearPersonaNatural = async() => {

    validarFormulario()

    // console.log(principalState)
    // await axios
    // .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/`, principalState)
    // .then((data) => {
    //   console.log(data);
    //   ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
    //   history.push("/agregarParticipantes");
    //   // dispatch(edicionConvocatoria());
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
    // });
  }

  const validarFormulario = () => {
    let arrayErrores = stateErrores;
    let error = false;

    for (let property in arrayErrores) {
      console.log(property , arrayErrores[property]);

      if (principalState.property === "") {
        arrayErrores = {
          ...arrayErrores,
          property: true,
        };
        error = true;
      }

    }

    console.log(arrayErrores)
  }
 
  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    //setErrores({...errores, [name]: false});
    return setPrincipalState({ ...principalState, [name]: value });
  };

    return (
        <>
        <Container>
        <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
          <Grid.Column style={{ maxWidth: "100%" }}>
            <Form size="large">
              <Segment>
                
                <Header as="h4" floated="left">
                  Datos persona natural - <span className="text_campo_obligatorios">Todos los campos son obligatorios</span>
                </Header>

                <Divider clearing />
                <Form.Group widths="equal">
                  <Form.Select 
                    fluid 
                    label="Tipo documento" 
                    name="tipo_identificacion"
                    options={TipoDocumentosOptions}
                    onChange={handleInputChange}
                    error={errores.tipo_identificacion}
                  />

                  <Form.Input 
                    fluid 
                    label="Numero documento" 
                    name="numero_documento"
                    onChange={handleInputChange}
                    error={errores.numero_documento}
                  />

                  <Form.Input 
                    fluid 
                    label="Primer nombre" 
                    name="primer_nombre"
                    onChange={handleInputChange}
                    error={errores.primer_nombre}
                  />

                  <Form.Input 
                    fluid 
                    label="Segundo nombre"
                    name="segundo_nombre"
                    onChange={handleInputChange}
                   />

                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input 
                    fluid 
                    label="Primer apellido" 
                    name="primer_apellido"
                    onChange={handleInputChange}
                    error={errores.primer_apellido}
                  />

                  <Form.Input 
                    fluid 
                    label="segundo apellido" 
                    name="segundo_apellido"
                    onChange={handleInputChange}
                  />

                  <Form.Field>
                    <label>fecha nacimiento</label>
                    <DatePicker 
                      selected={startDate} 
                      onChange={(date) => setPrincipalState({...principalState, fecha_nacimiento: date})} 
                      error={errores.fecha_nacimiento}
                    />
                  </Form.Field>

                  <Form.Select 
                    fluid 
                    label="Sexo" 
                    name="sexo"
                    options={SexoOptions}
                    onChange={handleInputChange}
                    error={errores.sexo}
                  />
                </Form.Group>
                

                <Form.Group widths="equal">
                  <Form.Input 
                    fluid 
                    label="Pais de nacimiento" 
                    name="pais_nacimiento"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Pais de residencia" 
                    name="pais_residencia"
                    onChange={handleInputChange}
                    error={errores.pais_residencia}
                  />

                  <Form.Input 
                    fluid 
                    label="Departamento" 
                    name="departamento"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Municipio de residencia" 
                    name="municipio"
                    onChange={handleInputChange}
                  />
                 
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input 
                    fluid 
                    label="Comuna de residencia" 
                    name="comuna"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Barrio de residencia" 
                    name="barrio"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Select 
                    fluid 
                    label="Estrato" 
                    name="estrato"
                    options={EstratoOptions}
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Telefono fijo" 
                    name="telefono_fijo"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Telefono celular" 
                    name="telefono_celular"
                    onChange={handleInputChange}
                    error={errores.telefono_celular}
                  />

                  <Form.Input 
                    fluid 
                    label="Correo electronico" 
                    name="correo_electronico"
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
        </Container>
      </>
    )
}
