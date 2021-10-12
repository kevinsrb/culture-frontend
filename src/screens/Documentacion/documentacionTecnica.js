import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequisitosOptions } from "../../data/selectOption.data";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { ObjConstanst } from "../../config/utils/constanst";
import { useHistory } from "react-router";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

export const DocumentacionTecnica = () => {
  // STATE PRINCIPAL
  const State = {
    tipo_documento: "",
    descripcion: "",
    activo: false,
    documentacion: [],
    existedocumentos: [],
    editar: false,
    filename: "",
    file: "",
    url_documento: "",
    tipo_documento_file: "",
    openModalViewer: "",
    index: 0,
    errors: {
      tipo_documento: false,
      descripcion: false,
    },
  };

  useEffect(() => {
    cargarDocumentosTecnicos();
  }, []);

  const fileInputRef = React.useRef();
  const [principalState, setPrincipalState] = useState(State);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const history = useHistory();

  const cargarDocumentosTecnicos = async () => {
    await axios
      .get(`${ObjConstanst.IP_CULTURE}documentosTecnicos/${idConvocatoria}`)
      .then(({ data }) => {
        console.log(data.data);
        setPrincipalState({ ...principalState, documentacion: data.data });
        //setlineaConvocatoriaOptions(LineaConvocatoriaOptionsMap);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  const CambiarValor = (event, result) => {
    const { name, value } = result || event.target;
    return setPrincipalState({ ...principalState, [name]: value });
  };

  // const eliminarErrores = (event, result) => {
  //   const { name, value } = result || event.target;
  //    return setPrincipalState({ ...principalState, errors:{ requisito: false } });
  // };

  const agregarFila = () => {
    if (principalState.tipo_documento.trim() === "") {
      return setPrincipalState({ ...principalState, errors: { tipo_documento: true } });
    }

    if (principalState.descripcion.trim() === "") {
      return setPrincipalState({ ...principalState, errors: { descripcion: true } });
    }

    let array = [];
    array = [
      ...principalState.documentacion,
      {
        index: principalState.documentacion.length,
        url_documento: principalState.url_documento,
        tipo_documento: principalState.tipo_documento,
        descripcion: principalState.descripcion,
        activo: principalState.activo,
      },
    ];
    if (principalState.editar) {
      array = [
        ...principalState.documentacion,
        {
          index: principalState.index,
          url_documento: principalState.url_documento,
          tipo_documento: principalState.tipo_documento,
          descripcion: principalState.descripcion,
          activo: principalState.activo,
        },
      ];
    }

    return setPrincipalState({ ...principalState, tipo_documento: "", descripcion: "", documentacion: array, filename:"" });
  };

  const cambiaChecktabla = (data) => {
    let array = JSON.parse(JSON.stringify(principalState.documentacion));
    array[data.index].activo = !array[data.index].activo;
    return setPrincipalState({ ...principalState, documentacion: array });
  };

  const Editardocumentacion = (data) => {
    console.log(data);
    const { descripcion, tipo_documento } = data;
    return setPrincipalState({ ...principalState, descripcion: descripcion, tipo_documento: tipo_documento });
  };

  const Eliminardocumentacion = async ({ data }) => {
    const { id_documentos_tecnico, index } = data;
    console.log(id_documentos_tecnico, index);

    const existeDocumento = await verificarExisteDocumento(id_documentos_tecnico, index + 1);
    console.log(existeDocumento);
    if (existeDocumento !== undefined && existeDocumento.length) {
      await axios.delete(
        `${ObjConstanst.IP_CULTURE}documentosTecnicos/delete/${existeDocumento[0].id_documentos_tecnico}`
      );
    }

    let array = [];
    let copy = principalState.documentacion.map((data) => data);
    console.log(copy);
    array = copy.filter((doc) => doc.index !== data.index);
    return setPrincipalState({ ...principalState, documentacion: array });
  };

  const verificarExisteDocumento = async (id_documento_tecnico, index) => {
    const id_consultar = id_documento_tecnico != undefined ? id_documento_tecnico : index;
    if (id_consultar) {
      try {
        let response = await axios.get(`${ObjConstanst.IP_CULTURE}documentosTecnicos/${id_consultar}`);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  };

  let i = 0;
  const handelAsociarDocumentosTecnicos = async () => {
    let arrDocumentos = principalState.documentacion;
    let documento = 0;
    let ArrayFilter = arrDocumentos.map((data) => data);
    for (documento in arrDocumentos) {
      if (arrDocumentos[documento]) {
        let documentosExiste = await verificarExisteDocumento(arrDocumentos[documento].id_documentos_tecnico);
        if (documentosExiste) {
          ArrayFilter = ArrayFilter.filter(
            (element) => element.id_documentos_tecnico !== documentosExiste[0].id_documentos_tecnico
          );
          console.log(ArrayFilter);
        }
      }
    }

    arrDocumentos = ArrayFilter;

    if (arrDocumentos.length === 0) return;
    if (arrDocumentos[i]) {
      try {
        await axios.post(`${ObjConstanst.IP_CULTURE}documentosTecnicos`, {
          activo: arrDocumentos[i].activo,
          descripcion: arrDocumentos[i].descripcion,
          tipo_documento: arrDocumentos[i].tipo_documento,
          convocatoria_id: idConvocatoria,
        });
        i++;
        return handelAsociarDocumentosTecnicos();
      } catch (error) {
        return console.error(error);
      }
    }

    await ObjNotificaciones.MSG_SUCCESS("success", "Se Han asociado los documentos correctamente");
    history.push("/documentacionConvocatoria");
  };

  const saveFile = async (e) => {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("archivo", file);
    await axios
      .post(`${ObjConstanst.IP_CULTURE}documentosConvocatoria/guardarArchivo`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((data) => {
        console.log(data);
        //ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
        //history.push("/cronogramaActividades");
      })
      .catch(function (error) {
        console.log(error);
      });
    return setPrincipalState({
      ...principalState,
      url_documento: e.target.files[0].name,
      file: e.target.files[0],
      filename: e.target.files[0].name,
      tipo_documento_file: e.target.files[0].type,
    });
  };

  const Verdocumentacion = async (data) => {
    console.log(data);
    await axios
      .get(`${ObjConstanst.IP_CULTURE}documentosConvocatoria/consultarArchivos/${data.url_documento}`, {
        responseType: "blob",
      })
      .then((response) => {
        var file = new Blob([response.data], {
          type: "application/pdf",
        });
        const fileURL = URL.createObjectURL(file);
        return setPrincipalState({
          ...principalState,
          pdf: fileURL,
          namepdf: data.url_documento,
          openModalViewer: !principalState.openModalViewer,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ padding: "2%" }}>
      <Segment>
        <Form autoComplete="off">
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header>Asociar documentación técnica</Header>
              </Grid.Column>
              <Grid.Column>
                <Header floated="right">
                  <span className="codigo_convovcatoria">Codigo convocarotia #{idConvocatoria}</span>
                </Header>
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
                  value={principalState.tipo_documento}
                  name="tipo_documento"
                  options={RequisitosOptions}
                  onChange={CambiarValor}
                  error={principalState.errors.tipo_documento}
                />
                {principalState.errors.tipo_documento ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.TextArea
                  label="Descripción"
                  className="select-registros-adminconvocatoria"
                  name="descripcion"
                  onChange={CambiarValor}
                  value={principalState.descripcion}
                  error={principalState.errors.descripcion}
                ></Form.TextArea>
                {principalState.errors.descripcion ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
              <Grid.Column>
                <Form.Field style={{ height: "74%" }}>
                  <label>Adjuntar archivo</label>
                  <div className="constiner_documentacion_general">
                    {principalState.filename === "" && (
                      <Button
                        content="Seleccionar archivo"
                        className="btn button_archivo"
                        onClick={() => fileInputRef.current.click()}
                      />
                    )}
                    <span className="nombreArchivo">{principalState.filename}</span>
                    <input ref={fileInputRef} type="file" hidden onChange={saveFile} />
                  </div>
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
                            <Button className="botones-acciones" icon="eye" onClick={() => Verdocumentacion(data)} />
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
                <Button className="botones-redondos" color="blue" onClick={handelAsociarDocumentosTecnicos}>
                  Guardar y continuar
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
      <Modal
        onClose={() => setPrincipalState({ ...principalState, openModalViewer: !principalState.openModalViewer })}
        closeIcon
        open={principalState.openModalViewer}
      >
        <Modal.Header>Previsualización: {principalState.namepdf}</Modal.Header>
        <Modal.Content>
          {principalState.pdf && <iframe src={principalState.pdf} style={{ width: "100%", height: "500px" }} />}
        </Modal.Content>
      </Modal>
    </div>
  );
};
