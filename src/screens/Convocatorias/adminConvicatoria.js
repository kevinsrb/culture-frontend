import React from "react";
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
import { TableHeader } from "../../components/Convocatorias/TableHeader";

const options = [
  {
    key: 1,
    value: 1,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: false,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 2,
    value: 2,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: false,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 3,
    value: 3,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: false,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 4,
    value: 4,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "En proceso",
    publicada: false,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 5,
    value: 5,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Cerrada",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 6,
    value: 6,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 7,
    value: 7,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Cerrada",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 8,
    value: 8,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 9,
    value: 9,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 10,
    value: 10,
    nombre: "Nombre convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "Abierta",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
  {
    key: 11,
    value: 11,
    nombre: "Este convocatoria",
    codigo: "43001",
    fecha: "2021-09-10",
    estado: "En proceso",
    publicada: true,
    entidad: "OE",
    linea_estrategica: "Arte",
    area: "Arte",
    creadopor: "CamiloFr",
  },
];
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

  function primeroDatostabla() {
    let copy = options.map((data) => data);
    let datos = copy.slice(0, cantidadPáginas);
    setDatosActuales(datos);
    let x = options.length / cantidadPáginas;
    x = Math.ceil(x);
    setPaginacionTotal(x);
  }
  function handletoggleChange(data) {
    let datosActualesDiff = JSON.parse(JSON.stringify(datosActuales));
    datosActualesDiff[data.key - 1].publicada = !datosActualesDiff[data.key - 1].publicada;
    setDatosActuales(datosActualesDiff);
  }
  function cambioPaginación(event, { activePage }) {
    let copy = options.map((data) => data);
    let datos = copy.slice(cantidadPáginas * activePage - cantidadPáginas, cantidadPáginas * activePage);
    setDatosActuales(datos);
    setPaginacionActual(activePage);
  }
  function mostrarConvocatorias(event, value) {
    let copy = options.map((data) => data);
    let datos = copy.slice(0, value);
    setDatosActuales(datos);
    let x = options.length / value;
    x = Math.ceil(x);
    setPaginacionTotal(x);
    setCantidadPáginas(value);
  }
  function filtradodeinformacion(e) {
    let filtrado = options.filter((data) => data.nombre.indexOf(e.target.value) >= 0);
    let datos = filtrado.slice(0, 10);
    setDatosActuales(datos);
    let x = datos.length / 10;
    x = Math.ceil(x);
    setPaginacionTotal(x);
    setCantidadPáginas(10);
  }
  return (
    <div style={{ padding: "2%" }}>
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
                      <Table.Row key={datos.value}>
                        <Table.Cell width={1}>{datos.value}</Table.Cell>
                        <Table.Cell width={2}>{datos.nombre}</Table.Cell>
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
                        <Table.Cell width={1}>{datos.fecha}</Table.Cell>
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
                      <Table.Cell>No hay datos por mostrar</Table.Cell>
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
                          <Button className="botones-acciones" icon="pencil" />
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            className="botones-acciones boton-borrar-adminconvocatorias"
                            icon="trash alternate outline"
                            onClick={() => setOpenModalBorrar(!openModalBorrar)}
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
            <Header className="container-convocatoria-eliminar-adminconvocatoria">Nombre convocatoria</Header>
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
            <Button className="botones-redondos" color="blue" onClick={() => setOpenModalBorrar(!openModalBorrar)}>
              Aceptar
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
