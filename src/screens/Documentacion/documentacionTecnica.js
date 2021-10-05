import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label } from "semantic-ui-react";

const RequisitosOptions = [
  { key: 1, value: "Anexo", text: "Anexo" },
  { key: 2, value: "Hoja de vida", text: "Hoja de vida" },
  { key: 3, value: "Propuesta", text: "Propuesta" },
  { key: 4, value: "Presupuesto", text: "Presupuesto" },
];

export const DocumentacionTecnica = () => {
  // STATE PRINCIPAL
  const State = {
    requisito: "",
    descripcion: "",
    activo: false,
    documentacion: [],
    editar: false,
    index: 0,
    errors: {
      requisito: false,
      descripcion: false,
    },
  };
  const [principalState, setPrincipalState] = React.useState(State);

  const CambiarValor = (event, result) => {
    console.log(principalState);
    const { name, value } = result || event.target;
    return setPrincipalState({ ...principalState, [name]: value });
  };
  const agregarFila = () => {
    if (principalState.descripcion.trim() === "")
      setPrincipalState({ ...principalState, errors: { requisito: false, descripcion: true } });
    if (principalState.requisito.trim() === "")
      return setPrincipalState({ ...principalState, errors: { requisito: true, descripcion: false } });
    let array = [];
    array = [
      ...principalState.documentacion,
      {
        index: principalState.documentacion.length,
        tipo_documento: principalState.requisito,
        descripcion: principalState.descripcion,
        activo: principalState.activo,
      },
    ];
    if (principalState.editar) {
      array = [
        ...principalState.documentacion,
        {
          index: principalState.index,
          tipo_documento: "Anexo",
          descripcion: principalState.descripcion,
          activo: principalState.activo,
        },
      ];
    }
    return setPrincipalState({ ...principalState, requisito: "", descripcion: "", documentacion: array });
  };
  const cambiaChecktabla = (data) => {
    let array = JSON.parse(JSON.stringify(principalState.documentacion));
    array[data.index].activo = !array[data.index].activo;
    return setPrincipalState({ ...principalState, documentacion: array });
  };
  const Editardocumentacion = (data) => {
    console.log(data);
  };
  const Eliminardocumentacion = (data) => {
    let array = [];
    let copy = principalState.documentacion.map((data) => data);
    console.log(copy);
    array = copy.filter((doc) => doc.index !== data.index);
    console.log(array);
    return setPrincipalState({ ...principalState, documentacion: array });
  };
  return (
    <div style={{ padding: "2%" }}>
      <Segment>
        <Form>
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header>Asociar documentación técnica</Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row columns={4}>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <label>Requisito</label>
                <Form.Select
                  required
                  fluid
                  className="select-registros-adminconvocatoria"
                  placeholder="Seleccionar"
                  value={principalState.requisito}
                  name="requisito"
                  options={RequisitosOptions}
                  onChange={CambiarValor}
                  error={principalState.errors.requisito}
                />
                {principalState.errors.requisito ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Form.TextArea
                  required
                  label="Descripción"
                  name="descripcion"
                  onChange={CambiarValor}
                  value={principalState.descripcion}
                ></Form.TextArea>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4}>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column className="container-pagination-adminconvocatorias">
                <Button className="botones-redondos" color="blue" onClick={agregarFila}>
                  Agregar
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header>Documentación técinca asociada</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Table striped singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1} rowSpan="2">
                        No.
                      </Table.HeaderCell>
                      <Table.HeaderCell width={4} rowSpan="2">
                        Tipo documento
                      </Table.HeaderCell>
                      <Table.HeaderCell width={5} rowSpan="2">
                        Descripción
                      </Table.HeaderCell>
                      <Table.HeaderCell width={1} rowSpan="2">
                        ¿Activo?
                      </Table.HeaderCell>
                      <Table.HeaderCell colSpan="3">Acciones</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>Ver</Table.HeaderCell>
                      <Table.HeaderCell>Editar</Table.HeaderCell>
                      <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {principalState.documentacion.length > 0 ? (
                      principalState.documentacion.map((data, index) => (
                        <Table.Row key={index}>
                          <Table.Cell width={1}>{index + 1}</Table.Cell>
                          <Table.Cell width={4}>{data.tipo_documento}</Table.Cell>
                          <Table.Cell width={5}>{data.descripcion}</Table.Cell>
                          <Table.Cell width={1}>
                            <Checkbox checked={data.activo} onChange={() => cambiaChecktabla(data)} />
                          </Table.Cell>
                          <Table.Cell width={1}>
                            <Button className="botones-acciones" icon="eye" />
                          </Table.Cell>
                          <Table.Cell width={1}>
                            <Button
                              className="botones-acciones"
                              icon="pencil"
                              onClick={() => Editardocumentacion({ data, index })}
                            />
                          </Table.Cell>
                          <Table.Cell width={1}>
                            <Button
                              className="botones-acciones boton-borrar-adminconvocatorias"
                              icon="trash alternate outline"
                              onClick={() => Eliminardocumentacion({ data, index })}
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
            <Grid.Row columns={4}>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column className="container-pagination-adminconvocatorias">
                <Button className="botones-redondos" color="blue" onClick={() => console.log("aplicando filtros")}>
                  Guardar y continuar
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </div>
  );
};
