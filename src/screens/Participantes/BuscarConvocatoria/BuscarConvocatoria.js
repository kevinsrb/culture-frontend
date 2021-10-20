import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ObjConstanst } from '../../../config/utils/constanst';
import { AreaOptions, QuienParticipaOptions } from "../../../data/selectOption.data";
import { Button, Container, Form, Segment, Header, Divider, Grid, Table, Select } from 'semantic-ui-react'
import { useHistory } from 'react-router';
import { VerConvocatoria } from '../../../components/Participantes/VerConvocatoria';

export const BuscarConvocatoria = () => {

  const initialState = {
    area: [],
    linea_convocatoria: [],
    tipo_participante: [],
    categoria_linea_convocatoria: []
  }

   //variables
   let LineaConvocatoriaOptionsMap = {};
   let categoriaslineasconvocatoriaMap;

   const history = useHistory();
 

  useEffect(() => {
    cargarSelectLineaConvocatoria();
    primeroDatostabla();
  }, [])

  const initialStateFiltros = {
    datossinfiltro: [],
  };

  const [datosActuales, setDatosActuales] = useState([]);
  const [filtros, setfiltros] = useState(initialState)
  const [principalState, setPrincipalState] = useState(initialStateFiltros);
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState([]);
  const [tipoparticipanteseleccionado, setTipoparticipanteseleccionado] = useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState([]);
  const [lineaConvocatoriaOptions, setlineaConvocatoriaOptions] = useState();
  const [areaSeleccionada, setAreaSeleccionada] = useState([]);
  
  const [cantidadPáginas, setCantidadPáginas] = React.useState(10);
  const [paginacionTotal, setPaginacionTotal] = React.useState(0);

  const cargarSelectLineaConvocatoria = async () => {
    const response = await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias`)
      .then(({ data }) => {
        LineaConvocatoriaOptionsMap = data.data.map((ds) => {
          return {
            key: ds.idlineaconvocatoria,
            value: ds.idlineaconvocatoria,
            text: ds.nombre,
          };
        });
        setlineaConvocatoriaOptions(LineaConvocatoriaOptionsMap);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    return setfiltros({ ...filtros, [name]: value });
  };

  const handleLineaConvocatoria = async (event, results) => {
    const { name, value } = results || event.target;
    setfiltros({ ...filtros, [name]: value });
    const response = await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias/${value}`)
      .then(({ data }) => {
        console.log(data);
        categoriaslineasconvocatoriaMap = data.data.map((ds) => {
          return {
            key: ds.idcategorialineaconvocatoria,
            value: ds.idcategorialineaconvocatoria,
            text: ds.nombre,
          };
        });
        setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
      })
      .catch(function (error) {});
  };

  async function primeroDatostabla() {
    try {
      let response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/`);
      console.log(response);
      let copynombres = response.data.lineasconvocatorias.map((data) => data);
      console.log(copynombres);
      for (var i in response.data.convocatorias) {
        let nombreconvocatoria = copynombres.filter(
          (data) => data.idlineaconvocatoria === response.data.convocatorias[i].numero_convocatoria
        );
        response.data.convocatorias[i].numero_convocatoria = nombreconvocatoria[0].nombre;
        response.data.convocatorias[i].idnumero_convocatoria = nombreconvocatoria[0].idlineaconvocatoria;
      }
      if (response.data.convocatorias.length > 0) {
        setPrincipalState({ datossinfiltro: response.data.convocatorias });
        let copy = response.data.convocatorias.map((data) => data);
        console.log(copy);
        let datos = copy.slice(0, cantidadPáginas);
        setDatosActuales(datos);
        let x = response.data.convocatorias.length / cantidadPáginas;
        x = Math.ceil(x);
        return setPaginacionTotal(x);
      }

      let datos = [];
      setDatosActuales(datos);
      console.log(datos, "datos cargados");
      setPrincipalState({ datossinfiltro: datos });
      let x = 1;
      x = Math.ceil(x);
      return setPaginacionTotal(x);
    } catch (error) {
      console.error(error);
    }
  }


  const filtrarTablaMultiple = async(data) => {



    console.log(data, data.value.length, principalState.datossinfiltro);
    
    let filtrado = [];
    if (data.value.length === 0) {
      let copy = principalState.datossinfiltro.map((data) => data);
      console.log(copy);
      let datos = copy.slice(0, cantidadPáginas);
      setDatosActuales(datos);
      let x = principalState.datossinfiltro.length / cantidadPáginas;
      x = Math.ceil(x);
      return setPaginacionTotal(x);
    }

    console.log(datosActuales, 'actuales')
    for (var i in datosActuales) {
      if (typeof datosActuales[i][data.input] === 'object') {
        if (datosActuales[i][data.input]) {
          for (var x in datosActuales[i][data.input]) {
            for (var y in data.value) {
              if (datosActuales[i][data.input][x].value === data.value[y]) filtrado.push(datosActuales[i]);
            }
          }
        }
      } else {
        for (var y2 in data.value) {
          console.log(datosActuales[i][data.input]);
          if (datosActuales[i][data.input] === data.value[y2]) filtrado.push(datosActuales[i]);
        }
      }
    }

    console.log(data, 'data que llega')
    console.log(data.e.target.textContent )

    if(data.input == 'numero_convocatoria'){
      let filtroNombres = datosActuales.filter( (datos) =>  datos.numero_convocatoria == data.e.target.textContent )
      return setDatosActuales(filtroNombres);
    }

    let copy = filtrado.map((data) => data);
      console.log(copy);
      let datos = copy.slice(0, cantidadPáginas);
      setDatosActuales(datos);
      let z = filtrado.length / cantidadPáginas;
      z = Math.ceil(z);
      return setPaginacionTotal(z);
  };

 

  const abrirModal = (e, datos) => {

    console.log(datos)
  }

  return (
    <Container>
        <Segment>
          <Header as="h4" floated="left">
            Buscar Convocatorias
          </Header>

          <Divider clearing />

          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
              <Form.Dropdown
                multiple
                label="perfil"
                fluid
                search
                selection
                className="font-family-Work-Sans"
                label={<label className="font-color-4B4B4B">Perfil</label>}
                placeholder="Seleccionar..."
                options={QuienParticipaOptions}
                onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "tipo_participante" })}
              />
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                <label className="font-color-4B4B4B">Área</label>
                <Select
                  multiple
                  search
                  placeholder="Seleccionar..."
                  options={AreaOptions}
                  onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "area" })}
                />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
              <Form.Dropdown
                  placeholder="Seleccionar"
                  label="Línea convocatoria"
                  name="linea_convocatoria"
                  selection
                  fluid
                  onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "numero_convocatoria" })}
                  options={lineaConvocatoriaOptions}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Dropdown
                  label="Categorías convocatoria"
                  value={tipocategoriasseleccionado}
                  placeholder="Seleccionar"
                  fluid
                  multiple
                  selection
                  name="categoria_linea_convocatoria"
                  options={categoriasLineaconvocatoria}
                  // onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "categoria")}
                />  
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider clearing />

          <Container textAlign='right'>
              <Button 
                content='Buscar convocatoria' 
                className="btn btn-primary"
                // onClick={filtrarConvocatorias}  
               />
          </Container>
        </Segment>


        <Segment>
        <Grid.Row>
              <Grid.Column style={{height: "auto", overflowY: "auto"}}>
                <Table striped singleLine  columns={8}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1} rowSpan="2">
                        No.
                      </Table.HeaderCell>
                      <Table.HeaderCell width={1} rowSpan="2">
                        Linea convocatoria
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                        Perfil
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                        Fecha inicia
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                        Fecha cierre
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                        Area
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                       Entidad
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
                        Ver
                      </Table.HeaderCell>

                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {datosActuales.length > 0 ? (
                    datosActuales.map((datos, index) => (
                      <Table.Row>
                        <Table.Cell width={1}>{index + 1}</Table.Cell>
                        <Table.Cell width={1} className="nombre_convocatoria">{datos.numero_convocatoria}</Table.Cell>
                        {/* <Table.Cell width={2}>{datos.fechas[0]}</Table.Cell> */}

                        
                          <Table.Cell width={2}>
                          {datos.tipo_participante.map((parti, index) => (
                            <p> {parti.text}</p>
                           ))}
                          </Table.Cell> 
                        
                        
                        <Table.Cell width={1}>{datos.fechas[0].valormin}</Table.Cell>
                        <Table.Cell width={1}>{datos.fechas[1].valormin}</Table.Cell>

                        <Table.Cell width={2}>
                          {datos.area.map((area, index) => (
                          <p> {area.text}</p>
                          ))}
                        </Table.Cell> 

                        <Table.Cell width={1}>{datos.entidad}</Table.Cell>
                        <Table.Cell>
                          {/* <Button className="botones-acciones" icon="eye "onClick={(e) => abrirModal(e, datos)} /> */}
                          <VerConvocatoria datos={datos}/>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell style={{ "line-height": "26px" }}>No hay datos por mostrar</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>

        </Segment>
    </Container>
    )
}
