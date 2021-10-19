import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import SubirArchivo from "../../components/Archivos/SubirArchivos";
import { TipodocumentosOptions, RequisitosOptions } from "../../../data/selectOption.data";
import { ObjConstanst } from "../../../config/utils/constanst";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Modal, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page } from "react-pdf";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";

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
    conteodescripcion: "0/250",
    errors: {
      nombre: false,
      tipo_documento: false,
      descripcion: false,
    },
    openModalViewer: false,
  };

  const stateErrores = {
    nombre: false,
    tipo_documento: false,
    descripcion: false,
    filename: false,
  };

  const [principalState, setPrincipalState] = useState(State);
  const [principalErrores, setPrincipalErrores] = useState(stateErrores);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    cargarDocumentosGenerales();
  }, []);

  const cargarDocumentosGenerales = async () => {
    let response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`);
    if (response.data.data.documentos === null) return;
    console.log(response.data.data);
    let array = [];
    if (editarConvocatoria !== undefined) {
      for (var i in response.data.data.documentos) {
        if (response.data.data.documentos[i].tipo_documento_id === 2) {
          array.push(response.data.data.documentos[i]);
        }
      }
      return setPrincipalState({ ...principalState, documentacion: array });
    }
  };

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
    setPrincipalErrores({ ...principalErrores, [name]: false });
    return setPrincipalState({ ...principalState, [name]: value });
  };
  const agregarFila = () => {
    let arrayErrores = stateErrores;
    let error = false;
    if (principalState.nombre.trim() === "") {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        nombre: true,
      };
    }

    if (principalState.tipo_documento.trim() === "") {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        tipo_documento: true,
      };
    }

    if (principalState.descripcion.trim() === "") {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        descripcion: true,
      };
    }

    if (error) {
      return setPrincipalErrores(arrayErrores);
    }

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
      todoJSON[principalState.index].nombre = principalState.nombre;
      todoJSON[principalState.index].tipo_documento = principalState.tipo_documento;
      todoJSON[principalState.index].descripcion = principalState.descripcion;
      todoJSON[principalState.index].url_documento = principalState.filename;
      todoJSON[principalState.index].activo = principalState.activo;
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

  let conteoDocumentosGeneral = 0;
  const handelAsociarDocumentosGenerales = async () => {
    if (principalState.documentacion.length === 0) {
      return console.error("NO PUEDO GUARDAR");
    }
    if (principalState.documentacion[conteoDocumentosGeneral]) {
      try {
        let tipo_documento_id = 2;
        if (editarConvocatoria !== undefined) {
          await axios.post(`${ObjConstanst.IP_CULTURE}documentos/documentosConvocatorias/editar`, {
            nombre: principalState.documentacion[conteoDocumentosGeneral].nombre,
            activo: principalState.documentacion[conteoDocumentosGeneral].activo,
            descripcion: principalState.documentacion[conteoDocumentosGeneral].descripcion,
            tipo_documento: principalState.documentacion[conteoDocumentosGeneral].tipo_documento,
            tipo_documento_id,
            url_documento: principalState.documentacion[conteoDocumentosGeneral].url_documento,
            idconvocatoria: idConvocatoria,
          });
        } else {
          await axios.post(`${ObjConstanst.IP_CULTURE}documentos/documentosConvocatorias`, {
            nombre: principalState.documentacion[conteoDocumentosGeneral].nombre,
            activo: principalState.documentacion[conteoDocumentosGeneral].activo,
            descripcion: principalState.documentacion[conteoDocumentosGeneral].descripcion,
            tipo_documento: principalState.documentacion[conteoDocumentosGeneral].tipo_documento,
            tipo_documento_id,
            url_documento: principalState.documentacion[conteoDocumentosGeneral].url_documento,
            idconvocatoria: idConvocatoria,
          });
        }
        conteoDocumentosGeneral++;
        return handelAsociarDocumentosGenerales();
      } catch (error) {
        return console.error(error);
      }
    }

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

  const conteoCaracteres = (event) => {
    if (event.target.name === "descripcion") {
      if (
        event.keyCode === 27 ||
        event.keyCode === 112 ||
        event.keyCode === 113 ||
        event.keyCode === 114 ||
        event.keyCode === 115 ||
        event.keyCode === 116 ||
        event.keyCode === 117 ||
        event.keyCode === 118 ||
        event.keyCode === 119 ||
        event.keyCode === 120 ||
        event.keyCode === 121 ||
        event.keyCode === 122 ||
        event.keyCode === 123 ||
        event.keyCode === 9 ||
        event.keyCode === 13 ||
        event.keyCode === 20 ||
        event.keyCode === 16 ||
        event.keyCode === 17 ||
        event.keyCode === 91 ||
        event.keyCode === 93 ||
        event.keyCode === 17 ||
        event.keyCode === 45 ||
        event.keyCode === 33 ||
        event.keyCode === 36 ||
        event.keyCode === 46 ||
        event.keyCode === 35 ||
        event.keyCode === 34 ||
        event.keyCode === 37 ||
        event.keyCode === 38 ||
        event.keyCode === 39 ||
        event.keyCode === 40
      ) {
        return;
      }
      let numero = principalState[event.target.name].length + 1;
      if (event.keyCode === 8) numero = principalState[event.target.name].length - 1;
      if (numero === -1) numero = 0;
      return setPrincipalState({ ...principalState, [`conteo${event.target.name}`]: `${numero}/250` });
    }
  };

  const backComponente = () => {
    dispatch(edicionConvocatoria(true));
    dispatch(idConvocatorias(idConvocatoria));
    return history.push("/documentacionTecnica");
  };

  return (
    <div style={{ padding: "2%" }}>
      {/* <SubirArchivo file={file => setPrincipalState({...principalState, file: file})} type={type => setPrincipalState({...principalState, tipo_documento_file: type})} /> */}
      <Segment className="segment-shadow">
        <Form>
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={2} style={{ paddingBottom: "0.5%" }}>
              <Grid.Column>
                <Header style={{ marginBottom: "0" }} className="font-size-14px font-family-Montserrat-SemiBold">
                  Documentación general convocatoria
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header floated="right">
                  <span
                    style={{ marginBottom: "0" }}
                    className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px"
                  >
                    Codigo convocarotia {idConvocatoria}
                  </span>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label={<label className="font-color-4B4B4B">Nombre</label>}
                  name="nombre"
                  placeholder="Nombre"
                  className="select-registros-adminconvocatoria"
                  value={principalState.nombre}
                  onChange={CambiarValor}
                  error={principalErrores.nombre}
                />
                {principalErrores.nombre ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  fluid
                  className="select-registros-adminconvocatoria"
                  label="Tipo de documento"
                  placeholder="Seleccionar"
                  name="tipo_documento"
                  value={principalState.tipo_documento}
                  options={RequisitosOptions}
                  onChange={CambiarValor}
                  error={principalErrores.tipo_documento}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
                {principalErrores.tipo_documento ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.TextArea
                  label={<label className="font-color-4B4B4B">Descripcion</label>}
                  name="descripcion"
                  placeholder="Descripcion"
                  className="select-registros-adminconvocatoria"
                  maxLength="250"
                  onKeyDown={conteoCaracteres}
                  value={principalState.descripcion}
                  onChange={CambiarValor}
                  error={principalErrores.descripcion}
                />
                <label style={{ float: "right" }} className="no-margin no-padding font-color-F28C02 font-size-10px">
                  {principalState.conteodescripcion}
                </label>
                {principalErrores.descripcion ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
              <Grid.Column>
                <Form.Field style={{ height: "74%" }}>
                  <label className="font-color-4B4B4B">Adjuntar archivo</label>
                  <div className="constiner_documentacion_general">
                    {principalState.filename.trim() === "" && (
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
            <Grid.Row>
              <Grid.Column className="container-pagination-adminconvocatorias">
                <Button className="botones-redondos" color="blue" onClick={agregarFila}>
                  Agregar
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header className="font-family-Montserrat-Regular font-size-14px font-color-1B1C1D">
                  Documentación generales asociados
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: "0.2%" }}>
              <Grid.Column>
                <Table className="table-header-tabla" striped singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="table-header-tabla" width={1} rowSpan="2">
                        No.
                      </Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla" width={4} rowSpan="2">
                        Tipo documento
                      </Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla" width={5} rowSpan="2">
                        Descripción
                      </Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla" width={1} rowSpan="2">
                        ¿Activo?
                      </Table.HeaderCell>
                      <Table.HeaderCell className="table-header-tabla" textAlign="center" colSpan="3">
                        Acciones
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell
                        className="table-header-tabla font-size-9px font-color-707070"
                        textAlign="center"
                      >
                        Ver
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        className="table-header-tabla font-size-9px font-color-707070"
                        textAlign="center"
                      >
                        Editar
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        className="table-header-tabla font-size-9px font-color-707070"
                        textAlign="center"
                      >
                        Eliminar
                      </Table.HeaderCell>
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
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button basic color="blue" className="font-size-12px button-back" onClick={backComponente}>
            Atras
          </Button>
        </Grid.Row>
      </Grid>
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
