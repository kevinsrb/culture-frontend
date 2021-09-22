import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'

import { ObjConstanst } from '../../config/utils/constanst'
import { Form, Grid, Header, Divider, Segment, Icon, Button, Dropdown , Select} from "semantic-ui-react";
import { LineaEstrategicaOptions, CicloOptions, CoberturaOptions, ModalidadEstimuloOptions, EntidadOptions, AreaOptions, TipoEstimuloOptions } from '../../data/selectOption.data'

//datapickers
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

//Alertas y notificaciones
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

export default function InfoConvocatoria() {

  let objConvocatoria = { nombre: '',
  fecha_apertura: '',
  fecha_cierre: '', 
  entidad: '',
  categoria: false,
  diferentes_req: false,
  pseudonimos: false,
  grp_confor: false,
  per_jurdca: false,
  per_ntral: false,
  cobertura: '',
  ciclo: '',
  linea_estgica: '',
  area: '',
  convenido: false,
  modalidad: '',
  tipo_estimulo: '',
  descrip_corta: '',
  perfil_participante: '',
  no_participa: '',
};


  const history = useHistory();
  const [convocatoria, setConvocatoria] = useState(objConvocatoria)

  const handleCreateConvocatoria = async (e) => {
    e.preventDefault();
    formatearFechas()
    const response = await axios.post(`${ObjConstanst.IP_CULTURE}convocatorias`, convocatoria)
    .then((response) =>  {
      ObjNotificaciones.MSG_SUCCESS('success', response.data.mensaje)
      history.push("/CreateCategoria");
    })
    .catch(function (error) {
      ObjNotificaciones.MSG_ERROR('error', 'Oops...' ,error.data.mensaje)
    })
  };

   const  formatearFechas = () => {
      convocatoria.fecha_apertura =  moment(convocatoria.fecha_apertura, "YYYY/MM/DD").format('YYYY/MM/DD');
      convocatoria.fecha_cierre =  moment(convocatoria.fecha_apertura, "YYYY/MM/DD").format('YYYY/MM/DD')

   }
    

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handletoggleChange = (event, result) => {
    const { name , checked } = result || event.target;
    console.log(name, checked)
    setConvocatoria({ ...convocatoria, [name]: checked });
  }

  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  return (
    <React.Fragment>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Form size="large" onSubmit={ handleCreateConvocatoria } autoComplete="off">
            <Segment>
              <Header as="h4" floated="right">
                Codigo de convocatoria #: 1
              </Header>
              <Header as="h4" floated="left">
                Informacion general
              </Header>
              <Divider clearing />
              <Form.Group widths="equal">
                <Form.Input 
                  fluid 
                  label="Nombre de la convocatoria" 
                  name="nombre"
                  onChange={ handleInputChange }
                  autocomplete="off"
                />

                <SemanticDatepicker 
                  fluid
                  label="Fecha de apertura"
                  name="fecha_apertura"
                  onChange={handleInputChange} 
                  icon="calendar alternate outline" 
                  format="DD-MM-YYYY"
                  />

                  <SemanticDatepicker 
                    fluid
                    label="Fecha de cierre"
                    name="fecha_cierre"
                    onChange={handleInputChange} 
                    icon="calendar alternate outline" 
                    format="DD-MM-YYYY"
                  />

                  <Form.Select 
                    placeholder='Entidad' 
                    label="Entidad" 
                    options={EntidadOptions} 
                    name="entidad"
                    onChange={ handleInputChange }
                  />
              </Form.Group>
              
              
              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                  <label>¿Convocatoria tiene categoria?</label>
                    <Form.Checkbox 
                      toggle
                      value={convocatoria.categoria}
                      name="categoria"
                      checked={convocatoria.categoria}
                      onChange={ handletoggleChange }
                      />
                  </Grid.Column>
                  <Grid.Column>
                    <label>¿las categorias manejan diferentes requisitos y/o fechas?</label>
                    <Form.Checkbox 
                      toggle 
                      value={convocatoria.diferentes_req}
                      name="diferentes_req"
                      checked={convocatoria.diferentes_req}
                      onChange={ handletoggleChange }
                      />
                  </Grid.Column>
                  <Grid.Column>
                    <label>¿Convocatoria maneja pseudonimos?</label>
                    <Form.Checkbox 
                      toggle 
                      name="pseudonimos"
                      checked={convocatoria.pseudonimos}
                      onChange={ handletoggleChange }
                      />
                  </Grid.Column>
                  <Grid.Column>
                    <label>¿Quien puede participar?</label>
                    <Form.Checkbox 
                      label='Grupo conformado'
                      name="grp_confor"
                      value={convocatoria.grp_confor}
                      onChange={ handletoggleChange }
                      />
                    <Form.Checkbox 
                      label='Persona juridica'
                      name="per_jurdca"
                      value={convocatoria.per_jurdca}
                      onChange={ handletoggleChange }
                      />
                    <Form.Checkbox 
                      label='Persona natural' 
                      name="per_ntral" 
                      value={convocatoria.per_ntral}
                      onChange={ handletoggleChange }
                      />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
                
              <Divider clearing />   

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Cobertura"
                  placeholder='Seleccionar' 
                  fluid
                  selection 
                  options={CoberturaOptions} 
                  name="cobertura"
                  value={convocatoria.cobertura}
                  onChange={ handleInputChange }
                />        
                <Form.Dropdown
                  label="Ciclo"
                  placeholder='Seleccionar' 
                  fluid 
                  selection 
                  options={CicloOptions} 
                  name="ciclo"
                  value={convocatoria.ciclo}
                  onChange={ handleInputChange }
                />

                <Form.Dropdown 
                  label="Linea estrategica"
                  placeholder='Seleccionar' 
                  fluid
                  search 
                  selection 
                  name="linea_estgica"
                  value={convocatoria.linea_estgica}
                  options={LineaEstrategicaOptions}
                  onChange={ handleInputChange } 
                /> 

                <Form.Dropdown
                  label="Área"
                  placeholder='Seleccionar'
                  fluid
                  search
                  selection
                  name="area"
                  value={convocatoria.area}
                  options={AreaOptions}
                  onChange={ handleInputChange }
                />
             </Form.Group>

              <Divider clearing />   

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>  
                    <strong>¿Es convenio?</strong>
                    <Form.Checkbox 
                      toggle  
                      name="convenido"
                      checked={convocatoria.convenido}
                      onChange={ handletoggleChange }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>  

              <Divider clearing />   

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>  
                    <Form.Select 
                      placeholder='Seleccionar' 
                      size='large' 
                      label="Modalidad de estimulo" 
                      options={ModalidadEstimuloOptions} 
                      name="modalidad"
                      onChange={ handleInputChange }
                    />
                  </Grid.Column>
                  <Grid.Column>  
                    <Form.Select 
                      placeholder='Seleccionar' 
                      label="Tipo de estimulo" 
                      options={TipoEstimuloOptions} 
                      style={{ Width: "30%" }}
                      name="tipo_estimulo"
                      onChange={ handleInputChange }
                      />
                  </Grid.Column>
                </Grid.Row>
              </Grid>  

              <Divider clearing />   

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>  
                    <Form.TextArea 
                      label="Descripcion corta" 
                      name="descrip_corta" 
                      onChange={ handleInputChange }
                      />
                  </Grid.Column> 
                </Grid.Row>
              </Grid>  

              <Grid columns={2}>
                <Grid.Row>
                <Grid.Column>  
                    <Form.TextArea 
                      label="Perfil de participante" 
                      name="perfil_participante" 
                      onChange={ handleInputChange }
                    />
                  </Grid.Column>
                  <Grid.Column>  
                    <Form.TextArea 
                    label="¿Quien no puede participar?"
                     name="no_participa" 
                     onChange={ handleInputChange }
                     />
                  </Grid.Column>
                </Grid.Row>
              </Grid>    

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>  
                  <p align="right"> 
                    <Button type="submit">Guardar y continuar</Button> 
                  </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid> 
           </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}
