import React from "react";
import { useHistory } from "react-router-dom";
import {
  Segment,
  Modal,
  Button,
  Header,
  Grid,
  Form,
  Input,
  Checkbox,
  Table,
  Pagination,
  Divider,
  Select,
} from "semantic-ui-react";

// VARIABLES DE LA PAGINA

const cantidadRegistros = [
  { key: 1, value: 10, text: "10" },
  { key: 2, value: 20, text: "20" },
  { key: 3, value: 50, text: "50" },
  { key: 4, value: 100, text: "100" },
];

const coloresEstado = { Abierta: "#21BA45", "En proceso": "#EFC236", Cerrada: "#9F0505" };

export const AdminMaestras = () => {
  const State = {
    filtroAvanzado: false,
    cantidadPaginas: 10,
    arrayMaestras: [],
    paginacionTotal: 0,
    paginacionActual: 1,
  };
  const history = useHistory();

  const [principalState, setPrincipalState] = React.useState(State);

  React.useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    console.log("cargando datos");
  };

  const consultarMaestros = () => {
    console.log("consultando maestros");
  };

  const filtradodeinformacion = (event) => {
    console.log(event);
  };

  const mostrarMaestras = (data) => {
    console.log(data);
  };

  const aplicarFiltrosAvanzados = () => {
    console.log("aplicando filtros avanzados");
  };

  const cambioPaginación = () => {
      console.log('cambio de paginacion')
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
              onClick={consultarMaestros}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <Header style={{ paddingLeft: "2%" }}>Gestionar maestras</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="no-padding-rigth">
              <Input icon="search" placeholder="Codigo/Nombre" fluid onChange={filtradodeinformacion} />
            </Grid.Column>
            <Grid.Column>
              <Button
                icon="filter"
                className="button-filtro-adminconvocatorias"
                onClick={() => setPrincipalState({ ...principalState, filtroAvanzado: !principalState.filtroAvanzado })}
              />
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column className="registos-adminconvocatoria">
              <label style={{ flex: 0.6 }}>Registros por página</label>
              <Select
                fluid
                className="select-registros-adminconvocatoria"
                label="Registros por página"
                defaultValue={principalState.cantidadPaginas}
                options={cantidadRegistros}
                onChange={(e, { value }) => mostrarMaestras({ e, value })}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {principalState.filtroAvanzado ? (
          <Grid>
            <Grid.Row className="container-grid-filtros">
              <Grid.Column>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Select
                        placeholder="Perfil"
                        // options={tiposidentificacion}
                        onChange={(e, { value }) => console.log("aca")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Entidad"
                        // options={tiposidentificacion}
                        onChange={(e, { value }) => console.log("aca")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Linea estratégica"
                        // options={tiposidentificacion}
                        onChange={(e, { value }) => console.log("aca")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Select
                        placeholder="Área"
                        // options={tiposidentificacion}
                        onChange={(e, { value }) => console.log("aca")}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="container-pagination-adminconvocatorias">
                <Button color="blue" className="button-filtro-adminconvocatorias" onClick={aplicarFiltrosAvanzados}>
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
                  <Table.HeaderCell width={2}>Tipo Maestra</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {principalState.arrayMaestras.length > 0 ? (
                    principalState.arrayMaestras.map((datos) => (
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
                  <Table.HeaderCell width={1}>Fecha creación</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Nombre</Table.HeaderCell>
                  <Table.HeaderCell width={1}>¿Activo en la lista desplegable?</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {principalState.arrayMaestras.length > 0 ? (
                    principalState.arrayMaestras.map((datos) => (
                      <Table.Row key={datos.value}>
                        <Table.Cell width={1}>{datos.fecha_creacion}</Table.Cell>
                        <Table.Cell width={1}>{datos.nombre}</Table.Cell>
                        <Table.Cell width={1}>
                          <Checkbox
                            toggle
                            name="publicada"
                            checked={datos.publicada}
                            onChange={() => console.log('aca')}
                          />
                          <Checkbox
                            toggle
                            name="publicada"
                            checked={datos.publicada}
                            onChange={() => console.log('aca')}
                          />
                        </Table.Cell>
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
                  <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Borrar</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {principalState.arrayMaestras.length > 0 ? (
                    principalState.arrayMaestras.map((datos) => (
                      <Table.Row key={datos.value}>
                        <Table.Cell>
                          <Button className="botones-acciones" icon="pencil" onClick={(e) => console.log('aca')} />
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            className="botones-acciones boton-borrar-adminconvocatorias"
                            icon="trash alternate outline"
                            onClick={(e) => console.log('aca')}
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
              <Pagination totalPages={principalState.paginacionTotal} activePage={principalState.paginacionActual} onPageChange={cambioPaginación} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
