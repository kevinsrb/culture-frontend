import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'

import { ObjConstanst } from '../../config/utils/constanst'
import { Form, Grid, Header, Divider, Segment, Input, Button, Dropdown , Select} from "semantic-ui-react";
import { LineaEstrategicaOptions, CicloOptions, CoberturaOptions, ModalidadEstimuloOptions, EntidadOptions, AreaOptions, TipoEstimuloOptions, NumeroConvocatoiriaOptions, QuienParticipaOptions} from '../../data/selectOption.data'


//Alertas y notificaciones
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

export function InfoConvocatoria() {

  const objConvocatoria = { 
    numero_convocatoria: '',
    linea_convocatoria: '',
    categoria_linea_convocatoria: '', 
    entidad: '',
    pseudonimos: false,
    tipo_participante: [],
    ciclo: '',
    linea_estgica: '',
    area: '',
    cobertura: '',
    convenido: false,
    modalidad: '',
    tipo_estimulo: '',
    bolsa_concursable: false,
    num_estimulos: '',
    descrip_corta: '',
    perfil_participante: '',
    no_participa: '',
  };


  let LineaConvocatoriaOptionsMap = {};

  const history = useHistory();
  const [convocatoria, setConvocatoria] = useState(objConvocatoria);
  const [lineaConvocatoriaOptions, setlineaConvocatoriaOptions] =  useState();
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState();

  useEffect(() => {
    cargarSelectLineaConvocatoria()
  }, []);


  const cargarSelectLineaConvocatoria = async() =>{
    const response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias`)
    .then(({data}) =>  { 
      console.log(data.data)

      LineaConvocatoriaOptionsMap = data.data.map(ds => {
        return {
          key: ds.idlineaconvocatoria,
          value: ds.idlineaconvocatoria,
          text: ds.nombre
        }
      })
      setlineaConvocatoriaOptions(LineaConvocatoriaOptionsMap)
    })
    .catch(function (error) {
      console.log(error)
    })
  }


  const handleCreateConvocatoria = async (e) => {  
    e.preventDefault();
    console.log(convocatoria)
    // const response = await axios.post(`${ObjConstanst.IP_CULTURE}convocatorias`, convocatoria)
    // .then((response) =>  {
    //   console.log(response)
    //   //ObjNotificaciones.MSG_SUCCESS('success', response.data.mensaje)
    //   history.push("/CreateCategoria");
    // })
    // .catch(function (error) {
    //   console.error(error);
    //   //ObjNotificaciones.MSG_ERROR('error', 'Oops...' ,error.data.mensaje)
    // })
    //ObjNotificaciones.MSG_SUCCESS('success', "Convocatoria creada correctamente")
    //history.push("/cronogramaActividades");
  };

    

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  let categoriaslineasconvocatoriaMap;

  const handleLineaConvocatoria = async (event, results) => {
    const { name, value } = results || event.target;
    setConvocatoria({ ...convocatoria, [name]: value });
    const response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias/${value}`)
    .then(({data}) =>  {
      console.log(data)
      categoriaslineasconvocatoriaMap = data.data.map(ds => {
        return {
          key: ds.idcategorialineaconvocatoria,
          value: ds.idcategorialineaconvocatoria,
          text: ds.nombre
        }
      })
      setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
    })
    .catch(function (error) {
      
    })
  }

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
                Informacion general - <span className="text_campo_obligatorios">Todos los campos son obligatorios</span>
              </Header>
              <Divider clearing />
              <Form.Group widths="equal">
                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Número de la convocatoria" 
                  options={NumeroConvocatoiriaOptions} 
                  name="numero_convocatoria"
                  onChange={ handleInputChange }
                />

                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Línea convocatoria" 
                  name="linea_convocatoria"
                  onChange={ handleInputChange, handleLineaConvocatoria } 
                  options={ lineaConvocatoriaOptions }
                />

                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Categorías línea convocatoria" 
                  name="categoria_linea_convocatoria"
                  onChange={ handleInputChange }
                  options={ categoriasLineaconvocatoria }

                />

                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Entidad" 
                  options={EntidadOptions} 
                  name="entidad"
                  onChange={ handleInputChange }
                />
              </Form.Group>
              
              
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Dropdown 
                      label="¿Quien puede participar?"
                      placeholder='Seleccionar' 
                      fluid 
                      multiple 
                      selection 
                      name="tipo_participante"
                      options={QuienParticipaOptions} 
                      onChange={ handleInputChange }
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
                  
                </Grid.Row>
              </Grid>
                
              <Divider clearing />   

              <Form.Group widths="equal">
                       
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

              <Grid columns={4}>
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
                </Grid.Row>
              </Grid> 

             

              <Form.Group widths="equal">
                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Tipo de estimulo" 
                  options={TipoEstimuloOptions} 
                  name="tipo_estimulo"
                  onChange={ handleInputChange }
                />

              

                { convocatoria.tipo_estimulo == 'economico' && 
                  <>
                    <Form.Input 
                      fluid 
                      placeholder='Search...'
                      label="Valor total de recursos que entregará la convocatoria"
                      name="valor_total_entg_convocatoria"
                    />

                    <Form.Field>
                      <label>bolsa concursable</label>
                      <Form.Checkbox 
                        toggle 
                        name="bolsa_concursable"
                        checked={convocatoria.bolsa_concursable}
                        onChange={ handletoggleChange }
                      />
                    </Form.Field>

                    <Form.Input 
                      fluid 
                      placeholder='Seleccionar'
                      label="Numero de estimulos"
                      name="num_estimulos"
                      onChange={ handleInputChange }
                    />
                  </>
                }
              </Form.Group>
               
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
