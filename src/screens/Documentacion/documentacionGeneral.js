import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox } from "semantic-ui-react";
import SubirArchivo from "../../components/Archivos/SubirArchivos";

const TipodocumentosOptions = [
  { key: 1, value: "Anexo", text: "Anexo" },
  { key: 2, value: "Hoja de vida", text: "Hoja de vida" },
];

export const DocumentacionConvocatoria = () => {
  // STATE PRINCIPAL
  const State = {
    nombre: "",
    tipo_documento: "",
    descripcion: "",
    url: "",
    documentacion: [],
    editar: false,
    index: 0,
    file: '',
    tipo_documento_file: '',
  };
  const [principalState, setPrincipalState] = React.useState(State);

  const fileInputRef = React.createRef();

  const subirArchivo = (e) => {
    console.log(e);
  };

  const CambiarValor = (event, result) => {
    const { name, value } = result || event.target;
    return setPrincipalState({ ...principalState, [name]: value });
  };
  const agregarFila = () => {
    let array = [];
    array = [
      ...principalState.documentacion,
      {
        index: principalState.documentacion.length,
        tipo_documento: "Anexo",
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
    return setPrincipalState({ ...principalState, documentacion: array });
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
    array = copy.filter((doc) => doc.index !== data.index);
    return setPrincipalState({ ...principalState, documentacion: array });
  };
  return (
    <div style={{ padding: "2%" }}>
      {/* <SubirArchivo file={file => setPrincipalState({...principalState, file: file})} type={type => setPrincipalState({...principalState, tipo_documento_file: type})} /> */}
      <Segment>
        <Form>
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header>Documentación general convocatoria</Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input label="Nombre" />
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  fluid
                  className="select-registros-adminconvocatoria"
                  label="Tipo de documento"
                  placeholder="Seleccionar"
                  value={principalState.tipo_documento}
                  name="tipo_documentacion"
                  options={TipodocumentosOptions}
                  onChange={CambiarValor}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.TextArea label="Descripción" name="descripcion" onChange={CambiarValor}></Form.TextArea>
              </Grid.Column>
              <Grid.Column>
                <Form.Field style={{ height: "74%" }}>
                  <label>Adjuntar archivo</label>
                  <Button
                    content="Seleccionar archivo"
                    className="button-filtro-documentacion-general"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <input ref={fileInputRef} type="file" hidden onChange={subirArchivo} />
                </Form.Field>
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
                <Header>Documentación generales asociados</Header>
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
