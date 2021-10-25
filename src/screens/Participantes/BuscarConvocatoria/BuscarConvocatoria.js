import React, { useEffect, useState } from "react";
import axios from "axios";
import { ObjConstanst } from "../../../config/utils/constanst";
import { AreaOptions, QuienParticipaOptions } from "../../../data/selectOption.data";
import {
  Button,
  Container,
  Form,
  Segment,
  Header,
  Divider,
  Grid,
  Table,
  Select,
  Breadcrumb,
  Icon,
  Dropdown,
  Pagination,
} from "semantic-ui-react";
import { useHistory } from "react-router";
import { VerConvocatoria } from "../../../components/Participantes/VerConvocatoria";

const cantidadRegistros = [
  { key: 1, value: 10, text: "10" },
  { key: 2, value: 20, text: "20" },
  { key: 3, value: 50, text: "50" },
  { key: 4, value: 100, text: "100" },
];

export const BuscarConvocatoria = () => {
  const initialState = {
    area: [],
    linea_convocatoria: [],
    tipo_participante: [],
    categoria_linea_convocatoria: [],
  };
  
  const initialStateFiltros = {
    datossinfiltro: [],
    numeroregistros: 0,
  };

  //variables
  let LineaConvocatoriaOptionsMap = {};
  let categoriaslineasconvocatoriaMap;

  const history = useHistory();

  const [datosActuales, setDatosActuales] = useState([]);
  const [filtros, setfiltros] = useState(initialState);
  const [principalState, setPrincipalState] = useState(initialStateFiltros);
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState([]);
  const [tipoparticipanteseleccionado, setTipoparticipanteseleccionado] = useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState([]);
  const [lineaConvocatoriaOptions, setlineaConvocatoriaOptions] = useState();
  const [areaSeleccionada, setAreaSeleccionada] = useState([]);

  const [cantidadPáginas, setCantidadPáginas] = React.useState(10);
  const [paginacionTotal, setPaginacionTotal] = React.useState(0);
  const [paginacionActual, setPaginacionActual] = React.useState(1);

  useEffect(() => {
    cargarSelectLineaConvocatoria();
    primeroDatostabla();
  }, []);

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
        setPrincipalState({ datossinfiltro: response.data.convocatorias, numeroregistros: response.data.convocatorias.length });
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

  const filtrarTablaMultiple = async (data) => {
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

    console.log(datosActuales, "actuales");
    for (var i in datosActuales) {
      if (typeof datosActuales[i][data.input] === "object") {
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

    console.log(data, "data que llega");
    console.log(data.e.target.textContent);

    if (data.input == "numero_convocatoria") {
      let filtroNombres = datosActuales.filter((datos) => datos.numero_convocatoria == data.e.target.textContent);
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
    console.log(datos);
  };

  function mostrarConvocatorias(event, value) {
    let copy = datosActuales.map((data) => data);
    let datos = copy.slice(0, value);
    setDatosActuales(datos);
    let x = datosActuales.length / value;
    x = Math.ceil(x);
    setPaginacionTotal(x);
    return setCantidadPáginas(value);
  }

  function cambioPaginación(event, { activePage }) {
    let copy = datosActuales.map((data) => data);
    let datos = copy.slice(cantidadPáginas * activePage - cantidadPáginas, cantidadPáginas * activePage);
    setDatosActuales(datos);
    return setPaginacionActual(activePage);
  }

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
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid style={{ marginBottom: "8%", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large">
            <Segment className="segment-shadow">
              <Header as="h4" floated="left" className="font-size-14px font-family-Montserrat-SemiBold">
                Buscar Convocatorias
              </Header>

              <Divider clearing style={{ marginTop: "0", marginBottom: "2%" }} />

              <Form.Group widths="equal">
                <Form.Dropdown
                  multiple
                  label={<label className="font-color-4B4B4B font-size-12px">Perfil</label>}
                  fluid
                  search
                  selection
                  className="font-family-Work-Sans"
                  icon={<Icon style={{ float: "right", paddingTop: '4%' }} color="blue" name="angle down" />}
                  placeholder="Seleccionar..."
                  options={QuienParticipaOptions}
                  onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "tipo_participante" })}
                />
                <Form.Field>
                  <label className="font-color-4B4B4B font-size-12px">Área</label>
                  <Select
                    multiple
                    search
                    icon={<Icon style={{ float: "right", paddingTop: '4%' }} color="blue" name="angle down" />}
                    placeholder="Seleccionar..."
                    options={AreaOptions}
                    onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "area" })}
                  />
                </Form.Field>
                <Form.Dropdown
                  label={<label className="font-color-4B4B4B font-size-12px">Línea convocatoria</label>}
                  placeholder="Seleccionar"
                  name="linea_convocatoria"
                  selection
                  fluid
                  onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "numero_convocatoria" })}
                  options={lineaConvocatoriaOptions}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
                <Form.Dropdown
                  label={<label className="font-color-4B4B4B font-size-12px">Categorías convocatoria</label>}
                  value={tipocategoriasseleccionado}
                  placeholder="Seleccionar"
                  fluid
                  multiple
                  selection
                  name="categoria_linea_convocatoria"
                  options={categoriasLineaconvocatoria}
                  icon={<Icon style={{ float: "right", paddingTop: '4%' }} color="blue" name="angle down" />}
                  // onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "categoria")}
                />
              </Form.Group>

              <Divider clearing />

              <Container textAlign="right">
                <Button
                  content="Buscar convocatoria"
                  className="btn btn-primary background-color-1FAEEF"
                  // onClick={filtrarConvocatorias}
                />
              </Container>
            </Segment>

            <Segment className="segment-shadow">
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column width={8}>
                    <Header as="h4" floated="left" className="font-size-14px font-family-Montserrat-Regular">
                      Resultados de busqueda
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={5} className="justify-content-flex-end no-padding-right">
                    <span
                      className="font-color-1B1C1D font-family-Montserrat-Regular font-size-12px"
                      style={{ width: "45%" }}
                    >
                      Total de resultados:
                      <span
                        className="font-color-F28C02 font-family-Montserrat-Regular font-size-12px"
                        style={{ marginLeft: "1%" }}
                      >
                        {principalState.numeroregistros}
                      </span>
                    </span>
                  </Grid.Column>
                  <Grid.Column width={3} className="no-padding-left">
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column width={10} className="justify-content-flex-end">
                          <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E">
                            Registros por página
                          </label>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Dropdown
                            fluid
                            className="select-registros-adminconvocatoria no-margin"
                            defaultValue={cantidadPáginas}
                            options={cantidadRegistros}
                            icon={<Icon className="font-color-1FAEEF" name="angle down" />}
                            onChange={(e, { value }) => mostrarConvocatorias(e, value)}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid className="no-margin" style={{ paddingTop: "1%" }}>
                <Grid.Row className="no-padding-top no-padding-left no-padding-bottom">
                  <Grid.Column className="no-padding-left no-padding-right no-padding-bottom">
                    <Table columns={8} className="border-right-left-none border-bottom-none">
                      <Table.Header>
                        <Table.Row className="display-flex">
                          <Table.HeaderCell
                            style={{ width: "5%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Linea convocatoria
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Perfil
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "10%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Fecha inicio
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "10%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Fecha cierre
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Area
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Entidad
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Acciones
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="no-padding-top no-padding-left">
                  <Grid.Column
                    style={{ height: "360px", overflowY: "auto" }}
                    className="no-padding-left no-padding-right"
                  >
                    <Table columns={8} className="border-right-left-none border-top-none">
                      <Table.Body>
                        {datosActuales.length > 0 ? (
                          datosActuales.map((datos, index) => (
                            <Table.Row className="display-flex">
                              <Table.Cell
                                style={{ width: "5%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.numero_convocatoria}
                              </Table.Cell>
                              {/* <Table.Cell width={2}>{datos.fechas[0]}</Table.Cell> */}

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={2}
                              >
                                {datos.tipo_participante.map((parti, index) => (
                                  <p className="font-size-12px font-family-Work-Sans"> {parti.text}</p>
                                ))}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "10%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.fechas[0].valormin}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "10%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.fechas[1].valormin}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={2}
                              >
                                {datos.area.map((area, index) => (
                                  <p className="font-size-12px font-family-Work-Sans"> {area.text}</p>
                                ))}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.entidad}
                              </Table.Cell>
                              <Table.Cell style={{ width: "15%" }} className="font-size-12px font-family-Work-Sans">
                                {/* <Button className="botones-acciones" icon="eye "onClick={(e) => abrirModal(e, datos)} /> */}
                                <VerConvocatoria datos={datos} />
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
                <Grid.Row>
                  <Grid.Column className="container-pagination-adminconvocatorias">
                    <Pagination
                      totalPages={paginacionTotal}
                      activePage={paginacionActual}
                      onPageChange={cambioPaginación}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
