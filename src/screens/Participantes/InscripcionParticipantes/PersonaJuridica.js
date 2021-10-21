import React, { useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ObjConstanst } from '../../../config/utils/constanst';
import { ObjNotificaciones, } from '../../../config/utils/notificaciones.utils';
import { TipoDocumentosOptions, EstratoOptions, SexoOptions } from '../../../data/selectOption.data';
import { Form, Grid, Header, Divider, Segment, Button, Container } from "semantic-ui-react";

export const PersonaJuridica = () => {

	const stateEmpresa = {
		razon_social: '',
		nit: '',
		direccion_empresa: '',
		telefono_fijo_empresa: '',
    telefono_celular_empresa: '',
    tipo_enfoque_empresa: '',
		objeto_social_empresa: '',
		fecha_constitucion_empresa: '',
		correo_electronico_empresa: '',
    municipio_residencia_empresa: '',
    barrio_empresa: '',
		comuna_empresa: '',
		direccion_empresa: ''
  }

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
    tipo_participante: 2
  }

  const [empresa, setEmpresa] = useState(stateEmpresa)
	const [principalState, setPrincipalState] = useState(initialState)
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

	const handleCrearPersonaJuridica = ()=> {
    ObjNotificaciones.MSG_SUCCESS("success", "El participante se creo correctamente");
		history.push("/Administrador/agregarParticipantes"); 
	}
    return (
			<>
			<Container>
			<Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
				<Grid.Column style={{ maxWidth: "100%" }}>
					<Form size="large" onSubmit={handleCrearPersonaJuridica}>
						<Segment>
							
							<Header as="h4" floated="left">
								Información Entidad <span className="text_campo_obligatorios">Todos los campos son obligatorios</span>
							</Header>
							<Divider clearing />
							<Form.Group widths="equal">
								<Form.Input 
									fluid 
									label="Razon social" 
									name="razon_social"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="NIT" 
									name="nit"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Direccion empresa" 
									name="direccion_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Telefono fijo" 
									name="telefono_fijo_empresa"
									onChange={handleInputChangeEmpresa}
								/>
								
							</Form.Group>

							<Form.Group widths="equal">

								<Form.Input 
									fluid 
									label="Telefono celular" 
									name="telefono_celular_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Tipo de enfoque" 
									name="tipo_enfoque_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Objeto social" 
									name="objeto_social_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Fecha de constitucion"
									name="fecha_constitucion_empresa"
									onChange={handleInputChangeEmpresa}
								/>

              </Form.Group>

							<Form.Group widths="equal">
								<Form.Input 
									fluid 
									label="Correo electronico" 
									name="correo_electronico_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Municipio de residencia" 
									name="municipio_residencia_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Barrio de residencia" 
									name="barrio_empresa"
									onChange={handleInputChangeEmpresa}
								/>

								<Form.Input 
									fluid 
									label="Comuna de residencia" 
									name="comuna_empresa"
									onChange={handleInputChangeEmpresa}
								/>
							</Form.Group>

							<Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
										<Form.Input 
											fluid 
											label="Direccion" 
											name="direccion_empresa"
											onChange={handleInputChangeEmpresa}
										/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

							<Divider clearing />

							<Header as="h4" floated="left">
								Datos del representante legal 
							</Header>

							<Divider clearing />

							<Form.Group widths="equal">
                  <Form.Select 
                    fluid 
                    label="Tipo documento" 
                    name="tipo_identificacion"
                    options={TipoDocumentosOptions}
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Numero documento" 
                    name="numero_documento"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    label="Primer nombre" 
                    name="primer_nombre"
                    onChange={handleInputChange}
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
                    />
                  </Form.Field>

                  <Form.Select 
                    fluid 
                    label="Sexo" 
                    name="sexo"
                    options={SexoOptions}
                    onChange={handleInputChange}
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
								<Button content="Guardar y continuar" className="btn btn-primary" />
							</Container>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
			</Container>
		</>
    )
}
