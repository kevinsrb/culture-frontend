import React from "react";
import { Grid, Form, Header, Divider, Table, Button } from "semantic-ui-react";

export const CategoriaConvocatoria = ({
  nombre,
  onChangenombre,
  activosi,
  onChangeActivoSi,
  activono,
  onChangeActivoNo,
  arrayNumerosConvocatoria,
  LineasConvocatorias,
}) => {
  return (
    <Form style={{ padding: "2%" }}>
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Form.Select
              required
              placeholder="Seleccionar"
              label="Asociar linea convocatoria"
              options={LineasConvocatorias}
              value={nombre}
              onChange={(e) => onChangenombre(e.target.value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Form.Input label="Nombre" onChange={(e) => onChangenombre(e.target.value)} maxLength="50" value={nombre} />
          </Grid.Column>
          <Grid.Column>
            <Form.Checkbox value={activosi} onChange={onChangeActivoSi} />
            <Form.Checkbox value={activono} onChange={onChangeActivoNo} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header>Resumen</Header>
          </Grid.Column>
        </Grid.Row>
        <Divider clearing />
        <Grid.Row columns={1}>
          <Grid.Column>
            <Table className="table-adminconvocatorias-fixed" striped singleLine>
              <Table.Header>
                <Table.HeaderCell width={1}>Maestra</Table.HeaderCell>
                <Table.HeaderCell width={1}>Nombre</Table.HeaderCell>
                <Table.HeaderCell width={1}>Asociado a</Table.HeaderCell>
                <Table.HeaderCell width={2}>Descripción corta</Table.HeaderCell>
                <Table.HeaderCell width={1}>¿Activo?</Table.HeaderCell>
                <Table.HeaderCell width={1}>Acción</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {arrayNumerosConvocatoria.length > 0 ? (
                  arrayNumerosConvocatoria.map((datos) => (
                    <Table.Row key={datos.value}>
                      <Table.Cell width={1}>{datos.maestra}</Table.Cell>
                      <Table.Cell width={1}>{datos.nombre}</Table.Cell>
                      <Table.Cell width={1}>{datos.asociadoa}</Table.Cell>
                      <Table.Cell width={2}>{datos.descripcion_corta}</Table.Cell>
                      <Table.Cell width={1}>{datos.activo}</Table.Cell>
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
        <Grid.Row className="container-pagination-adminconvocatorias">
          <Grid.Column>
            <Button className="button-filtro-adminconvocatorias">Limpiar campos</Button>
            <Button color="blue" className="botones-redondos">
              Crear
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};
