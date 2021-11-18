import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ObjConstanst } from '../../../config/utils/constanst';
import { AreaOptions, QuienParticipaOptions } from "../../../data/selectOption.data";
import { Button, Container, Form, Segment, Header, Divider, Grid, Table } from 'semantic-ui-react'

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
 

  useEffect(() => {
    cargarSelectLineaConvocatoria()
  }, [])

  const [filtros, setfiltros] = useState(initialState)

  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState([]);
  const [tipoparticipanteseleccionado, setTipoparticipanteseleccionado] = useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState([]);
  const [lineaConvocatoriaOptions, setlineaConvocatoriaOptions] = useState();
  const [areaSeleccionada, setAreaSeleccionada] = useState([]);

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

  const capturarValoresOptionsMultiple = (event, result, stateActualizar) => {
    let posicion = result.value.length - 1;
    let option = result.options.filter((data) => data.value === result.value[posicion]);
    let array = [];

    if (stateActualizar === "categoria") {
      setTipocategoriasseleccionado(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arraycategorias = [];
        for (var i in filtros.categoria_linea_convocatoria) {
          for (var x in result.value) {
            if (filtros.categoria_linea_convocatoria[i].value === result.value[x])
              arraycategorias.push(filtros.categoria_linea_convocatoria[i]);
          }
        }
        return setfiltros({ ...filtros, categoria_linea_convocatoria: arraycategorias });
      }
      if (option.length === 0) return;
      let repetido = filtros.categoria_linea_convocatoria.filter(
        (data) => data.text.trim() === option[0].text.trim()
      );
      if (repetido.length > 0) return;
      array = [...filtros.categoria_linea_convocatoria, option[0]];
      return setfiltros({ ...filtros, categoria_linea_convocatoria: array });

    } else  if (stateActualizar === "tipo_participante" ){
      setTipoparticipanteseleccionado(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arrayparticipantes = [];
        for (var i in filtros.tipo_participante) {
          for (var x in result.value) {
            if (filtros.tipo_participante[i].value === result.value[x])
              arrayparticipantes.push(filtros.tipo_participante[i]);
          }
        }
        return setfiltros({ ...filtros, tipo_participante: arrayparticipantes });
      }
      if (option.length === 0) return;
      let repetido = filtros.tipo_participante.filter((data) => data.text.trim() === option[0].text.trim());
      if (repetido.length > 0) return;
      array = [...filtros.tipo_participante, option[0]];
      return setfiltros({ ...filtros, tipo_participante: array });
      
    }else if(stateActualizar === "area"){
      setAreaSeleccionada(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arrayAreas = [];
        for (var i in filtros.area) {
          for (var x in result.value) {
            if (filtros.area[i].value === result.value[x])
              arrayAreas.push(filtros.area[i]);
          }
        }
        return setfiltros({ ...filtros, area: arrayAreas });
      }
      if (option.length === 0) return;
      let repetido = filtros.area.filter((data) => data.text.trim() === option[0].text.trim());
      if (repetido.length > 0) return;
      array = [...filtros.area, option[0]];
      return setfiltros({ ...filtros, area: array });
    }
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

  const filtrarConvocatorias = () => {
    console.log(filtros)
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
                  label="Perfil"
                  placeholder="Seleccionar"
                  value={tipoparticipanteseleccionado}
                  fluid
                  multiple
                  selection
                  name="tipo_participante"
                  options={QuienParticipaOptions}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "tipo_participante")}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Dropdown
                  label="Área"
                  placeholder="Seleccionar"
                  fluid
                  search
                  selection
                  multiple
                  name="area"
                  value={areaSeleccionada}
                  options={AreaOptions}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "area")}
                />
              </Grid.Column>
              <Grid.Column>
              <Form.Select
                  placeholder="Seleccionar"
                  label="Línea convocatoria"
                  name="linea_convocatoria"
                  value={filtros.linea_convocatoria}
                  onChange={(handleInputChange, handleLineaConvocatoria)}
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
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "categoria")}
                />  
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider clearing />

          <Container textAlign='right'>
              <Button 
                content='Buscar convocatoria' 
                className="btn btn-primary"
                onClick={filtrarConvocatorias}  
               />
          </Container>
        </Segment>


        <Segment>
        <Grid.Row>
              <Grid.Column>
                <Table striped singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1} rowSpan="2">
                        No.
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2} rowSpan="2">
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

                      <Table.HeaderCell>Acciones</Table.HeaderCell>

                    </Table.Row>
                  </Table.Header>
                 
                </Table>
              </Grid.Column>
            </Grid.Row>
        </Segment>
    </Container>
    )
}
