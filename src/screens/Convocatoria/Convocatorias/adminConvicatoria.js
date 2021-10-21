import React from "react";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";
import {
  Segment,
  Modal,
  Button,
  Header,
  Grid,
  Form,
  Input,
  Checkbox,
  Icon,
  Table,
  Pagination,
  Divider,
  Select,
  Dropdown,
  Breadcrumb,
} from "semantic-ui-react";
import { AreaOptions, EntidadOptions, LineaEstrategicaOptions } from "../../../data/selectOption.data";

const cantidadRegistros = [
  { key: 1, value: 10, text: "10" },
  { key: 2, value: 20, text: "20" },
  { key: 3, value: 50, text: "50" },
  { key: 4, value: 100, text: "100" },
];

const coloresEstado = { Abierta: "#21BA45", "En proceso": "#EFC236", Cerrada: "#9F0505" };

const tiposidentificacion = [
  { key: 3, value: 3, text: "Persona natural" },
  { key: 2, value: 2, text: "Persona juridica" },
  { key: 1, value: 1, text: "Grupo conformado" },
];

export const AdminConvocatorias = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state);
  //  DATOS QUE VAN HACER MOSTRADOS EN LA TABLA
  React.useEffect(() => {
    primeroDatostabla();
  }, []);

  const initialState = {
    datossinfiltro: [],
  };

  const [datosActuales, setDatosActuales] = React.useState([]);
  const [principalState, setPrincipalState] = React.useState(initialState);
  const [paginacionActual, setPaginacionActual] = React.useState(1);
  const [paginacionTotal, setPaginacionTotal] = React.useState(0);
  const [cantidadPáginas, setCantidadPáginas] = React.useState(10);
  const [filtroAvanzado, setFiltroAvanzado] = React.useState(false);
  const [openModalBorrar, setOpenModalBorrar] = React.useState(false);
  const [nombreBorrar, setNombreBorrrar] = React.useState("");
  const [idBorrar, setIdBorrrar] = React.useState("");

  const primeroDatostabla = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/`);
      let copynombres = response.data.lineasconvocatorias.map((data) => data);
      let fechaactual = moment().format("YYYY-MM-DD");
      for (var i in response.data.convocatorias) {
        let nomconvo = response.data.convocatorias[i].numero_convocatoria;
        let nombreconvocatoria = copynombres.filter((data) => data.idlineaconvocatoria === nomconvo);
        response.data.convocatorias[i].numero_convocatoria = nombreconvocatoria[0].nombre;
        response.data.convocatorias[i].idnumero_convocatoria = nombreconvocatoria[0].idlineaconvocatoria;
        for (var y in response.data.convocatorias[i].fechas) {
          if (
            response.data.convocatorias[i].fechas[y].clave === "Apertura" &&
            moment(fechaactual).isSameOrBefore(response.data.convocatorias[i].fechas[y].valormin)
          ) {
            response.data.convocatorias[i].publicosi = false;
            response.data.convocatorias[i].publicono = true;
            response.data.convocatorias[i].estado = "No publicada";
          }
          if (
            response.data.convocatorias[i].fechas[y].clave === "Apertura" &&
            moment(fechaactual).isSameOrAfter(response.data.convocatorias[i].fechas[y].valormin)
          ) {
            response.data.convocatorias[i].publicosi = true;
            response.data.convocatorias[i].publicono = false;
            response.data.convocatorias[i].estado = "Abierta";
          }
          if (
            response.data.convocatorias[i].fechas[y].clave === "Cierre" &&
            moment(fechaactual).isSameOrAfter(response.data.convocatorias[i].fechas[y].valormin)
          ) {
            response.data.convocatorias[i].publicosi = true;
            response.data.convocatorias[i].publicono = false;
            response.data.convocatorias[i].estado = "En proceso";
          }
          if (
            response.data.convocatorias[i].fechas[y].clave === "Resolución de otorgamiento" &&
            moment(fechaactual).isSameOrAfter(response.data.convocatorias[i].fechas[y].valormin)
          ) {
            response.data.convocatorias[i].publicosi = false;
            response.data.convocatorias[i].publicono = true;
            response.data.convocatorias[i].estado = "Cerrada";
          }
        }
      }
      if (response.data.convocatorias.length > 0) {
        setPrincipalState({ datossinfiltro: response.data.convocatorias });
        let copy = response.data.convocatorias.map((data) => data);
        let datos = copy.slice(0, cantidadPáginas);
        setDatosActuales(datos);
        let x = response.data.convocatorias.length / cantidadPáginas;
        x = Math.ceil(x);
        return setPaginacionTotal(x);
      }

      let datos = [];
      setDatosActuales(datos);
      setPrincipalState({ datossinfiltro: datos });
      let x = 1;
      x = Math.ceil(x);
      return setPaginacionTotal(x);
    } catch (error) {
      return console.error(error);
    }
  };

  function handletoggleChange(data, index, e, r) {
    console.log(e.target, r);
    let datosActualesDiff = JSON.parse(JSON.stringify(datosActuales));
    if (r.name === 'publicosi') {
      datosActualesDiff[index].publicosi = true;
      datosActualesDiff[index].publicono = false;
      datosActualesDiff[index].publico = true;
    }
    if (r.name === 'publicono') {
      datosActualesDiff[index].publicosi = false;
      datosActualesDiff[index].publicono = true;
      datosActualesDiff[index].publico = false;
    }
    setDatosActuales(datosActualesDiff);
  }

  function cambioPaginación(event, { activePage }) {
    let copy = datosActuales.map((data) => data);
    let datos = copy.slice(cantidadPáginas * activePage - cantidadPáginas, cantidadPáginas * activePage);
    setDatosActuales(datos);
    return setPaginacionActual(activePage);
  }

  function mostrarConvocatorias(event, value) {
    let copy = datosActuales.map((data) => data);
    let datos = copy.slice(0, value);
    setDatosActuales(datos);
    let x = datosActuales.length / value;
    x = Math.ceil(x);
    setPaginacionTotal(x);
    return setCantidadPáginas(value);
  }

  function filtradodeinformacion(e) {
    let filtrado = datosActuales.filter((data) => data.nombre.indexOf(e.target.value) >= 0);
    let datos = filtrado.slice(0, 10);
    setDatosActuales(datos);
    let x = datos.length / 10;
    x = Math.ceil(x);
    setPaginacionTotal(x);
    return setCantidadPáginas(10);
  }

  function abrirmodalEliminar(e, value) {
    setNombreBorrrar(value.numero_convocatoria);
    setIdBorrrar(value.idconvocatorias);
    return setOpenModalBorrar(!openModalBorrar);
  }

  async function borrarConvocatoria() {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_CONV}api/convocatorias/delete/${idBorrar}`);
      let copy = datosActuales.map((data) => data);
      let eliminar = copy.filter((data) => data.idconvocatorias !== idBorrar);
      setDatosActuales(eliminar);
      return setOpenModalBorrar(!openModalBorrar);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  function abrirEditar(route, datos) {
    dispatch(edicionConvocatoria(true));
    dispatch(idConvocatorias(datos.idconvocatorias));
    return history.push(`/Administrador/${route}`);
  }

  const consultarconvocatioria = async () => {
    return await axios
      .get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/numero`)
      .then(({ data }) => {
        dispatch(idConvocatorias(data.data));
        dispatch(edicionConvocatoria(undefined));
        history.push("/Administrador/infoconvocatorias");
      })
      .catch(function (error) {});
  };

  const filtrarTablaMultiple = (data) => {
    let filtrado = [];
    if (data.value.length === 0) {
      let copy = principalState.datossinfiltro.map((data) => data);
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
          if (datosActuales[i][data.input] === data.value[y2]) filtrado.push(datosActuales[i]);
        }
      }
    }
    let copy = filtrado.map((data) => data);
    let datos = copy.slice(0, cantidadPáginas);
    setDatosActuales(datos);
    let z = filtrado.length / cantidadPáginas;
    z = Math.ceil(z);
    return setPaginacionTotal(z);
  };

  return (
    <div>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin" style={{ paddingTop: "0.5%" }}>
        <Grid.Row className="no-padding-bottom">
          <Grid.Column className="container-pagination-adminconvocatorias" floated="right">
            <Button
              className="button-filtro-adminconvocatorias font-family-Montserrat-Medium font-size-12px"
              onClick={consultarconvocatioria}
            >
              Crear
              <Icon style={{ paddingLeft: "25%" }} size="large" name="plus circle" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="no-margin" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Segment className="segment-shadow">
          <Grid columns={4}>
            <Grid.Row style={{ paddingBottom: "0.8%" }}>
              <Grid.Column>
                <Header
                  className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold"
                  style={{ paddingLeft: "2%" }}
                >
                  Gestionar convocatorias
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row>
              <Grid.Column className="no-padding-rigth">
                <Input
                  icon="search"
                  placeholder="Buscar Nombre/Código"
                  className="font-family-Work-Sans font-size-14px"
                  fluid
                  onChange={filtradodeinformacion}
                />
              </Grid.Column>
              <Grid.Column>
                <Button
                  icon="filter"
                  className="button-filtro-adminconvocatorias"
                  onClick={() => setFiltroAvanzado(!filtroAvanzado)}
                />
              </Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column className="registos-adminconvocatoria">
                <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E" style={{ flex: 0.5 }}>
                  Registros por página
                </label>
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
          {filtroAvanzado ? (
            <Grid>
              <Grid.Row className="container-grid-filtros">
                <Grid.Column>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field>
                        <label className="font-color-4B4B4B font-size-12px">Perfil</label>
                        <Select
                          multiple
                          className="font-family-Work-Sans"
                          icon={<Icon style={{ float: "right" }} className="font-color-1FAEEF" name="angle down" />}
                          placeholder="Seleccionar..."
                          options={tiposidentificacion}
                          onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "tipo_participante" })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label className="font-color-4B4B4B font-size-12px">Entidad</label>
                        <Select
                          className="font-family-Work-Sans"
                          multiple
                          icon={<Icon style={{ float: "right" }} className="font-color-1FAEEF" name="angle down" />}
                          placeholder="Seleccionar..."
                          options={EntidadOptions}
                          onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "entidad" })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label className="font-color-4B4B4B font-size-12px">Línea estratégica</label>
                        <Select
                          className="font-family-Work-Sans"
                          multiple
                          icon={<Icon style={{ float: "right" }} className="font-color-1FAEEF" name="angle down" />}
                          placeholder="Seleccionar..."
                          options={LineaEstrategicaOptions}
                          onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "linea_estrategica" })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label className="font-color-4B4B4B font-size-12px">Área</label>
                        <Select
                          className="font-family-Work-Sans"
                          multiple
                          icon={<Icon style={{ float: "right" }} className="font-color-1FAEEF" name="angle down" />}
                          placeholder="Seleccionar..."
                          options={AreaOptions}
                          label={<label className="font-color-4B4B4B">Área</label>}
                          onChange={(e, { value }) => filtrarTablaMultiple({ e, value, input: "area" })}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : null}
          <Grid>
            <Grid.Row className="container-scrollable-adminconvocatorias">
              <Grid.Column
                width={5}
                className="no-padding-left no-padding-rigth container-primeratabla-adminconvocatorias"
              >
                <Table striped singleLine className="table-adminconvocatorias-fixed table-header-tabla font-size-12px">
                  <Table.Header>
                    <Table.HeaderCell rowSpan="2" className="table-header-tabla">
                      No.
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      rowSpan="2"
                      style={{ width: "300px", lineHeight: "30px" }}
                      className="table-header-tabla"
                    >
                      Nombre
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    {datosActuales.length > 0 ? (
                      datosActuales.map((datos, index) => (
                        <Table.Row>
                          <Table.Cell className="font-family-Work-Sans">{datos.idconvocatorias}</Table.Cell>
                          <Table.Cell
                            style={{
                              maxWidth: "250px",
                              lineHeight: "20px",
                            }}
                            className="font-family-Work-Sans"
                          >
                            {datos.numero_convocatoria}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell>No hay datos por mostrar</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column className="container-scroll no-padding-left no-padding-rigth" width={8}>
                <Table
                  className="table-adminconvocatorias-scrollable table-header-tabla font-size-12px"
                  striped
                  singleLine
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{ "line-height": "30px" }} className="table-header-tabla">
                        Codigo
                      </Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Fecha inicio</Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Estado</Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Publicada</Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Entidad</Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Linea estratégica</Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla">Creado por</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {datosActuales.length > 0 ? (
                      datosActuales.map((datos, index) => (
                        <Table.Row>
                          <Table.Cell style={{ lineHeight: "20px" }} className="font-family-Work-Sans no-padding-top" width={1}>
                            {datos.codigo}
                          </Table.Cell>
                          <Table.Cell style={{ lineHeight: "20px" }} className="font-family-Work-Sans no-padding-top" width={1}>
                            {datos.fecha_creacion}
                          </Table.Cell>
                          <Table.Cell
                            className="font-family-Work-Sans no-padding-top"
                            width={1}
                            style={{ color: coloresEstado[datos.estado], lineHeight: "20px" }}
                          >
                            {datos.estado}
                          </Table.Cell>
                          <Table.Cell style={{ display: "flex", width: "140px", lineHeight: "20px" }} className="no-padding-top">
                            <Grid className="no-margin">
                              <Grid.Column width={8} style={{ paddingTop: "0", paddingLeft: '0' }}>
                                <Form.Checkbox
                                  className="font-color-4B4B4B"
                                  radio
                                  label="Si"
                                  name="publicosi"
                                  value={datos.publicosi}
                                  checked={datos.publicosi}
                                  onChange={(e,r) => handletoggleChange(datos, index, e, r)}
                                />
                              </Grid.Column>
                              <Grid.Column width={8} style={{ paddingTop: "0", paddingLeft: "0" }}>
                                <Form.Checkbox
                                  className="font-color-4B4B4B"
                                  radio
                                  label="No"
                                  name="publicono"
                                  value={datos.publicono}
                                  checked={datos.publicono}
                                  onChange={(e, r) => handletoggleChange(datos, index, e, r)}
                                />
                              </Grid.Column>
                            </Grid>
                            {/* <Checkbox
                              toggle
                              name="publico"
                              checked={datos.publico}
                              onChange={() => handletoggleChange(datos, index)}
                            /> */}
                          </Table.Cell>
                          <Table.Cell style={{ lineHeight: "20px" }} className="font-family-Work-Sans no-padding-top" width={1}>
                            {datos.entidad}
                          </Table.Cell>
                          <Table.Cell style={{ lineHeight: "20px" }} className="font-family-Work-Sans no-padding-top" width={2}>
                            {datos.linea_estrategica}
                          </Table.Cell>
                          <Table.Cell style={{ lineHeight: "20px" }} className="font-family-Work-Sans no-padding-top" width={1}>
                            {datos.usuario_creacion}
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
              <Grid.Column width={3} className="no-padding-left no-padding-rigth">
                <Table
                  className="table-adminconvocatorias-fixed table-header-tabla table-header-tabla font-size-12px"
                  striped
                  singleLine
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        style={{ lineHeight: "0px" }}
                        className="table-header-tabla"
                        textAlign="center"
                        colSpan="3"
                      >
                        Acciones
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070" textAlign="center">
                      Ver
                    </Table.HeaderCell>
                    <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070" textAlign="center">
                      Editar
                    </Table.HeaderCell>
                    <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070" textAlign="center">
                      Borrar
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    {datosActuales.length > 0 ? (
                      datosActuales.map((datos) => (
                        <Table.Row key={datos.idconvocatorias}>
                          <Table.Cell textAlign="center">
                            <Button className="botones-acciones" icon="eye" />
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {/* <Dropdown icon={{ name:'remove', onClick: (e) => abrirEditar(e, datos)}}  options={} /> */}
                            <Dropdown icon="pencil">
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => abrirEditar("infoconvocatorias", datos)}>
                                  Información General
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => abrirEditar("cronograma", datos)}>
                                  Cronograma
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => abrirEditar("documentos", datos)}>
                                  Doc. Administrativos
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => abrirEditar("documentacionTecnica", datos)}>
                                  Doc. Técnicos
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => abrirEditar("documentacionConvocatoria", datos)}>
                                  Doc. General
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => abrirEditar("publicarConvocatoria", datos)}>
                                  Públicación
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* <Button className="botones-acciones" icon="pencil" onClick={(e) => abrirEditar(e, datos)} /> */}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <Button
                              className="botones-acciones boton-borrar-adminconvocatorias"
                              icon="trash alternate outline"
                              onClick={(e) => abrirmodalEliminar(e, datos)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell>No hay datos por mostrar</Table.Cell>
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
      </Grid>
      <Modal open={openModalBorrar} size="small">
        <Modal.Description>
          <div className="container-titulos-modal-actividades">
            <Header className="containar-header-eliminar-adminconvocatoria">¿Desea eliminar la convocatoria?</Header>
            <Header className="container-subheader-eliminar-adminconvocatoria">
              Haz clic en aceptar, si estas seguro de borrar
            </Header>
            <Header className="container-convocatoria-eliminar-adminconvocatoria">{nombreBorrar}</Header>
          </div>
        </Modal.Description>
        <Modal.Actions>
          <Grid className="contenido-acciones-modal-actividades" centered>
            <Button
              className="botones-redondos"
              basic
              color="blue"
              onClick={() => setOpenModalBorrar(!openModalBorrar)}
            >
              Cancelar
            </Button>
            <Button className="botones-redondos" color="blue" onClick={borrarConvocatoria}>
              Aceptar
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
