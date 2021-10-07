import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { edicionConvocatoria } from "../../store/actions/convocatoriaAction";
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
} from "semantic-ui-react";

const cantidadRegistros = [
  { key: 1, value: 10, text: "10" },
  { key: 2, value: 20, text: "20" },
  { key: 3, value: 50, text: "50" },
  { key: 4, value: 100, text: "100" },
];

const coloresEstado = { Abierta: "#21BA45", "En proceso": "#EFC236", Cerrada: "#9F0505" };

const tiposidentificacion = [
  { key: "CC", value: "CC", text: "CEDULA DE CIUDADANIA" },
  { key: "TI", value: "TI", text: "TARJETA IDENTIDAD" },
  { key: "CE", value: "CE", text: "CEDULA EXTRANJERIA" },
  { key: "TE", value: "TE", text: "TARJETA EXTRANGERIA" },
  { key: "NI", value: "NI", text: "NIT" },
  { key: "PA", value: "PA", text: "PASAPORTE" },
  { key: "TDE", value: "TDE", text: "TIPO DE DOCUMENTO EXTRANJERO" },
  { key: "RG", value: "RG", text: "REGISTRO CIVIL" },
  { key: "SIN", value: "SIN", text: "SIN IDENTIFICACION" },
];

export const AdminConvocatorias = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //  DATOS QUE VAN HACER MOSTRADOS EN LA TABLA
  React.useEffect(() => {
    primeroDatostabla();
  }, []);

  const [datosActuales, setDatosActuales] = React.useState([]);
  const [paginacionActual, setPaginacionActual] = React.useState(1);
  const [paginacionTotal, setPaginacionTotal] = React.useState(0);
  const [cantidadPáginas, setCantidadPáginas] = React.useState(10);
  const [filtroAvanzado, setFiltroAvanzado] = React.useState(false);
  const [filtroperfil, setFiltroPerfil] = React.useState("");
  const [filtroentidad, setFiltroEntidad] = React.useState("");
  const [filtrolineaestrategica, setFiltroLineaestrategica] = React.useState("");
  const [filtroarea, setFiltroArea] = React.useState("");
  const [openModalBorrar, setOpenModalBorrar] = React.useState(false);
  const [nombreBorrar, setNombreBorrrar] = React.useState("");
  const [idBorrar, setIdBorrrar] = React.useState("");

  async function primeroDatostabla() {
    try {
      let response = await axios.get(`${process.env.REACT_APP_PAGE_HOST}api/convocatorias/`);
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
      let x = 1;
      x = Math.ceil(x);
      return setPaginacionTotal(x);
    } catch (error) {
      console.error(error);
    }
  }

  function handletoggleChange(data) {
    let datosActualesDiff = JSON.parse(JSON.stringify(datosActuales));
    datosActualesDiff[data.key - 1].publicada = !datosActualesDiff[data.key - 1].publicada;
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
    console.log(idBorrar, nombreBorrar);
    try {
      await axios.delete(`${process.env.REACT_APP_PAGE_HOST}api/convocatorias/delete/${idBorrar}`);
      let copy = datosActuales.map((data) => data);
      let eliminar = copy.filter((data) => data.idconvocatorias !== idBorrar);
      setDatosActuales(eliminar);
      return setOpenModalBorrar(!openModalBorrar);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  function abrirEditar(e, datos) {
    console.log("dicspatch");
    dispatch(edicionConvocatoria(datos));
    return history.push("/infoconvocatorias");
  }

  
  
  return (
    <div style={{ padding: "2%" }}>
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column className="container-pagination-adminconvocatorias">
            <Button
              style={{ fontSize: "14px" }}
              icon="plus circle"
              content="Crear"
              labelPosition="right"
              className="button-filtro-adminconvocatorias"
              onClick={() => history.push("/infoconvocatorias")}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <Header style={{ paddingLeft: "2%" }}>Gestionar convocatorias</Header>
            </Grid.Column>
          </Grid.Row>
          <Divider className="divider-admin-convocatorias" />
          <Grid.Row>
            <Grid.Column className="no-padding-rigth">
              <Input icon="search" placeholder="Codigo/Nombre" fluid onChange={filtradodeinformacion} />
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
              <label style={{ flex: 0.6 }}>Registros por página</label>
              <Select
                fluid
                className="select-registros-adminconvocatoria"
                label="Registros por página"
                defaultValue={cantidadPáginas}
                options={cantidadRegistros}
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
                      <Select
                        placeholder="Perfil"
                        options={tiposidentificacion}
                        onChange={(e, { value }) => setFiltroPerfil(value.toString())}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Entidad"
                        options={tiposidentificacion}
                        onChange={(e, { value }) => setFiltroEntidad(value.toString())}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Linea estratégica"
                        options={tiposidentificacion}
                        onChange={(e, { value }) => setFiltroLineaestrategica(value.toString())}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Área"
                        options={tiposidentificacion}
                        onChange={(e, { value }) => setFiltroArea(value.toString())}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="container-pagination-adminconvocatorias">
                <Button
                  color="blue"
                  className="button-filtro-adminconvocatorias"
                  onClick={() => console.log("aplicando filtros")}
                >
                  Aplicar filtros
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null}
        <Grid>
          <Grid.Row className="container-scrollable-adminconvocatorias">
            <Grid.Column width={5} className="no-padding-left no-padding-rigth">
              <Table className="table-adminconvocatorias-fixed" striped singleLine>
                <Table.Header>
                  <Table.HeaderCell width={1}>No.</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Nombre</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {datosActuales.length > 0 ? (
                    datosActuales.map((datos) => (
                      <Table.Row key={datos.idconvocatorias}>
                        <Table.Cell width={1}>{datos.idconvocatorias}</Table.Cell>
                        <Table.Cell width={2}>{datos.numero_convocatoria}</Table.Cell>
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
              <Table className="table-adminconvocatorias-scrollable" striped singleLine>
                <Table.Header>
                  <Table.HeaderCell width={1}>Codigo</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Fecha</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Estado</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Publicada</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Entidad</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Linea estratégica</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Area</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Creado por</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {datosActuales.length > 0 ? (
                    datosActuales.map((datos) => (
                      <Table.Row key={datos.value}>
                        <Table.Cell width={1}>{datos.codigo}</Table.Cell>
                        <Table.Cell width={1}>{datos.fecha_creacion}</Table.Cell>
                        <Table.Cell width={1} style={{ color: coloresEstado[datos.estado] }}>
                          {datos.estado}
                        </Table.Cell>
                        <Table.Cell width={1}>
                          <Checkbox
                            toggle
                            name="publicada"
                            checked={datos.publicada}
                            onChange={() => handletoggleChange(datos)}
                          />
                        </Table.Cell>
                        <Table.Cell width={1}>{datos.entidad}</Table.Cell>
                        <Table.Cell width={2}>{datos.linea_estrategica}</Table.Cell>
                        <Table.Cell width={2}>{datos.area}</Table.Cell>
                        <Table.Cell width={1}>{datos.creadopor}</Table.Cell>
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
              <Table className="table-adminconvocatorias-fixed" striped singleLine>
                <Table.Header>
                  <Table.HeaderCell width={1}>Ver</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Borrar</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {datosActuales.length > 0 ? (
                    datosActuales.map((datos) => (
                      <Table.Row key={datos.value}>
                        <Table.Cell>
                          <Button className="botones-acciones" icon="eye" />
                        </Table.Cell>
                        <Table.Cell>
                          <Button className="botones-acciones" icon="pencil" onClick={(e) => abrirEditar(e, datos)} />
                        </Table.Cell>
                        <Table.Cell>
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
              <Pagination totalPages={paginacionTotal} activePage={paginacionActual} onPageChange={cambioPaginación} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
