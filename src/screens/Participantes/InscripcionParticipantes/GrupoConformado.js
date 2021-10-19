import React, { useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { ObjConstanst } from '../../../config/utils/constanst';
import { id_Participante } from '../../../store/actions/participantesAction';
import { ObjNotificaciones, } from '../../../config/utils/notificaciones.utils';
import { TipoDocumentosOptions, SexoOptions, EstratoOptions } from '../../../data/selectOption.data';
import { Form, Grid, Header, Divider, Segment, Button, Container } from "semantic-ui-react";
import { useHistory } from 'react-router';

export const GrupoConformado = () => {

	const initialState = {
		nombre_grupo: '',
		correo_electronico_gc: '',
    documento: '',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    sexo: '',
    pais: '',
    municipio: '',
    direccion: '',
    comuna: '',
    barrio: '',
    estrato: '',
    telefono_fijo: '',
    telefono_celular: '',
    correo_electronico: '',
    tipo_participante: 3
  }

  const [principalState, setPrincipalState] = useState(initialState)
  const [startDate, setStartDate] = useState(new Date());

  const history = useHistory();
  const dispatch = useDispatch();

  const handleCrearGrupoConformado = async() => {
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
					<Form size="large" onSubmit={handleCrearGrupoConformado}>
						<Segment>
							
							<Header as="h4" floated="left">
								Grupo conformado - <span className="text_campo_obligatorios">Todos los campos son obligatorios</span>
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
                    type="number"
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
                    value={principalState.estrato}
                    options={EstratoOptions}
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    type="number"
                    label="Telefono fijo" 
                    name="telefono_fijo"
                    onChange={handleInputChange}
                  />

                  <Form.Input 
                    fluid 
                    type="number"
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
								<Button content="Guardar y continuar" className="btn btn-primary" onClick={handleCrearGrupoConformado} />
							</Container>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
      </Container>
		</>
    )
}
