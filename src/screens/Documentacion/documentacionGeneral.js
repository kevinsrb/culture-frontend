import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import SubirArchivo from "../../components/Archivos/SubirArchivos";
import { TipodocumentosOptions } from "../../data/selectOption.data";
import { ObjConstanst } from "../../config/utils/constanst";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Document, Page } from "react-pdf";

export const DocumentacionConvocatoria = () => {
  // STATE PRINCIPAL
  const State = {
    nombre: "",
    tipo_documento: "",
    descripcion: "",
    activo: false,
    url_documento: "",
    documentacion: [],
    editar: false,
    index: 0,
    file: "",
    filename: "",
    tipo_documento_file: "",
    pdf: "",
    namepdf: "",
    errors: {
      nombre: false,
      tipo_documento: false,
      descripcion: false,
    },
    openModalViewer: false,
  };

  

  const [principalState, setPrincipalState] = useState(State);
  const [files, setFiles] = useState();
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const history = useHistory();

  const fileInputRef = React.useRef();

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

  const subirArchivo = async (e) => {
    try {
      let data = new FormData();
      console.log(e.target.files[0]);
      data.append("pdf", e.target.files[0]);
      let response = await axios.post(`http://127.0.0.1:80/v1/docs/upload`, data);
      console.log(response);
    } catch (error) {
      return console.error(error);
    }
  };

  const CambiarValor = (event, result) => {
    const { name, value } = result || event.target;
    return setPrincipalState({ ...principalState, [name]: value });
  };
  const agregarFila = () => {
    if (principalState.nombre.trim() === "") {
      return setPrincipalState({ ...principalState, errors: { nombre: true } });
    }

    if (principalState.tipo_documento.trim() === "") {
      // errores = true;
      setPrincipalState({ ...principalState, errors: { tipo_documento: true } });
    }

    if (principalState.descripcion.trim() === "") {
      // errores = true;
      setPrincipalState({ ...principalState, errors: { descripcion: true } });
    }

    // if (errores) {
    //   return;
    // }
    let array = [];
    console.log(principalState.editar);
    array = [
      ...principalState.documentacion,
      {
        index: principalState.documentacion.length,
        nombre: principalState.nombre,
        tipo_documento: principalState.tipo_documento,
        descripcion: principalState.descripcion,
        url_documento: principalState.filename,
        activo: principalState.activo,
      },
    ];
    if (principalState.editar) {
      let todoJSON = JSON.parse(JSON.stringify(principalState.documentacion));
      todoJSON[principalState.index].nombre = principalState.nombre
      todoJSON[principalState.index].tipo_documento = principalState.tipo_documento
      todoJSON[principalState.index].descripcion = principalState.descripcion
      todoJSON[principalState.index].url_documento = principalState.filename
      todoJSON[principalState.index].activo = principalState.activo
      array = todoJSON;
    }

    return setPrincipalState({
      ...principalState,
      nombre: "",
      tipo_documento: "",
      descripcion: "",
      url_documento: "",
      filename: "",
      documentacion: array,
      editar: false,
    });
  };
  const cambiaChecktabla = (data) => {
    let array = JSON.parse(JSON.stringify(principalState.documentacion));
    array[data.index].activo = !array[data.index].activo;
    return setPrincipalState({ ...principalState, documentacion: array });
  };

  const Editardocumentacion = (data) => {
    console.log(data);
    return setPrincipalState({
      ...principalState,
      nombre: data.data.nombre,
      tipo_documento: data.data.tipo_documento,
      descripcion: data.data.descripcion,
      url_documento: data.data.url_documento,
      index: data.data.index,
      editar: true,
    });
  };

  const Eliminardocumentacion = async ({ data }) => {
    const { id_documentos_tecnico, index } = data;
    console.log(id_documentos_tecnico, index);

    const existeDocumento = await verificarExisteDocumento(id_documentos_tecnico, index + 1);
    console.log(existeDocumento);
    if (existeDocumento !== undefined && existeDocumento.length) {
      await axios.delete(
        `${ObjConstanst.IP_CULTURE}documentosConvocatoria/delete/${existeDocumento[0].id_documentos_tecnico}`
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
        let response = await axios.get(`${ObjConstanst.IP_CULTURE}documentosConvocatoria/${id_consultar}`);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  };

  let i = 0;
  const handelAsociarDocumentosGenerales = async () => {
    console.log(principalState);
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
      console.log(arrDocumentos[i].activo);
      try {
        await axios.post(`${ObjConstanst.IP_CULTURE}documentosConvocatoria/`, {
          nombre: arrDocumentos[i].nombre,
          activo: arrDocumentos[i].activo,
          descripcion: arrDocumentos[i].descripcion,
          tipo_documento: arrDocumentos[i].tipo_documento,
          url_documento: arrDocumentos[i].url_documento,
          convocatoria_id: idConvocatoria,
        });
        i++;
        return handelAsociarDocumentosGenerales();
      } catch (error) {
        return console.error(error);
      }
    }
    // subirArchivo()
    await ObjNotificaciones.MSG_SUCCESS("success", "Se Han asociado los documentos correctamente");
    return history.push("/publicarConvocatoria");
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
      {/* <SubirArchivo file={file => setPrincipalState({...principalState, file: file})} type={type => setPrincipalState({...principalState, tipo_documento_file: type})} /> */}
      <Segment>
        <Form>
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header>Documentación general convocatoria</Header>
              </Grid.Column>
              <Grid.Column>
                <Header floated="right">
                  <span className="codigo_convovcatoria">Codigo convocarotia #{idConvocatoria}</span>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label="Nombre"
                  name="nombre"
                  placeholder="Nombre"
                  className="select-registros-adminconvocatoria"
                  value={principalState.nombre}
                  onChange={CambiarValor}
                  error={principalState.errors.nombre}
                />
                {principalState.errors.nombre ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  fluid
                  className="select-registros-adminconvocatoria"
                  label="Tipo de documento"
                  placeholder="Seleccionar"
                  name="tipo_documento"
                  value={principalState.tipo_documento}
                  options={TipodocumentosOptions}
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
                  name="descripcion"
                  placeholder="Descripcion"
                  className="select-registros-adminconvocatoria"
                  value={principalState.descripcion}
                  onChange={CambiarValor}
                  error={principalState.errors.descripcion}
                >
                  {principalState.errors.descripcion ? <Label color="red">Campo requerido</Label> : null}
                </Form.TextArea>
              </Grid.Column>
              <Grid.Column>
                <Form.Field style={{ height: "74%" }}>
                  <label>Adjuntar archivo</label>
                  <div className="constiner_documentacion_general">
                    {principalState.filename == "" && (
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
                <Button className="botones-redondos" color="blue" onClick={handelAsociarDocumentosGenerales}>
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