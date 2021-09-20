import React, { useMemo, useState } from "react";
import { LineaEstrategicaOptions, CicloOptions, CoberturaOptions, ModalidadEstimuloOptions, EntidadOptions, AreaOptions, TipoEstimuloOptions } from '../../data/selectOption.data'
import axios from 'axios'
import { useForm } from "../../hooks/useForm";
import { ObjConstanst } from '../../config/constanst'
import { Form, Grid, Header, Divider, Segment, Icon, Button, Dropdown , Select} from "semantic-ui-react";
//datapickers
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


export default function InfoConvocatoria() {

  let objConvocatoria = { nombre: '',
  fecha_apertura: '',
  fecha_cierre: '', 
  entidad: '',
  categoria: false,
  diferentes_req: false,
  pseudonimos: false,
  grp_confor: '',
  per_jurdca: '',
  per_ntral: '',
  cobertura: '',
  ciclo: '',
  linea_estgica: '',
  area: '',
  convenido: false,
  modalidad: '',
  tipo_estimulo: '',
  descrip_corta: '',
  perfil_asp: '',
  no_participa: '',
};


const [convocatoria, setConvocatoria] = useState(objConvocatoria)


  const [msg, setMsg] = useState({
    message: "",
    color: "",
    visible: "no",
  });

  const handleCreateConvocatoria = async (e) => {
    e.preventDefault();
    // const response = await fetch(`${ObjConstanst.IP_CULTURE}/convocatorias/createConvocatoria`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    //   body: JSON.stringify(convocatoria),
    // });

    console.log(convocatoria)

    const response = await axios({
      method: 'post',
      url: `${ObjConstanst.IP_CULTURE}/convocatorias`,
      data: {
        convocatoria
      }
    });

    const content = await response.json();
    setMsg(
      content.msg === 1
        ? {
            message: "Se ha creado la convocatoria correctamente",
            color: "success",
            visible: "si",
          }
        : {
            message: "No se ha podido crear la convocatoria",
            color: "danger",
            visible: "si",
          }
    );

    
  };

//   const handleInputChange = (e, result) => {
//      console.log(e.target.name)
//      console.log(e.target.value)
//      console.log(e)
//     setConvocatoria({
//         ...convocatoria,
//         [e.target.name] : e.target.value
//     })
// }


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
          <Form size="large" onSubmit={ handleCreateConvocatoria }>
            <Segment>
              <Header as="h4" floated="right">
                Codigo de convocatoria #: 1
              </Header>
              <Header as="h4" floated="left">
                Informacion general
              </Header>
              <Divider clearing />
              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Input 
                      fluid 
                      label="Nombre de la convocatoria" 
                      name="nombre"
                      onChange={ handleInputChange }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Fecha de apertura</label>  
                    <SemanticDatepicker 
                      fluid
                      name="fecha_apertura"
                      onChange={handleInputChange} 
                      icon="calendar alternate outline" 
                      format="DD-MM-YYYY"
                      />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Fecha de cierre</label>
                    <SemanticDatepicker 
                      fluid
                      name="fecha_cierre"
                      onChange={handleInputChange} 
                      icon="calendar alternate outline" 
                      format="DD-MM-YYYY"
                      />
                      {/* <Icon name="calendar alternate outline"></Icon> */}
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Select 
                      placeholder='Entidad' 
                      label="Entidad" 
                      options={EntidadOptions} 
                      name="entidad"
                      onChange={ handleInputChange }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              
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
                    ¿Quien puede participar?
                    <Form.Checkbox 
                      label='Grupo conformado'
                      name="grp_confor"
                      onChange={ handleInputChange }
                      />
                    <Form.Checkbox 
                      label='Persona juridica'
                      name="per_jurdca"
                      onChange={ handleInputChange }
                      />
                    <Form.Checkbox 
                      label='Persona natural' 
                      name="per_ntral" 
                      onChange={ handleInputChange }
                      />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
                
              <Divider clearing />   

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
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
                  </Grid.Column>
                  <Grid.Column>         
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
                  </Grid.Column>
                  <Grid.Column>         
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
                  </Grid.Column>
                  <Grid.Column> 
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>   

              <Divider clearing />   

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>  
                    <strong>¿Es convenio?</strong>
                    <Form.Checkbox 
                      toggle  
                      name="convenido"
                      checked={convocatoria.convenido}
                      onChange={ handleInputChange }
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
                      name="perfil_asp" 
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
