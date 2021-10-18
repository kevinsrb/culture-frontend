import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequisitosOptions } from "../../data/selectOption.data";
import { Grid, Segment, Header, Form, Button, Table, Divider, Checkbox, Label, Modal, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../config/utils/constanst";
import { useHistory } from "react-router";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";
import { edicionConvocatoria, idConvocatorias } from "../../store/actions/convocatoriaAction";

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
    conteodescripcion: "0/250",
    index: 0,
  };

  const StateErrores = {
    tipo_documento: false,
    descripcion: false,
  };

  useEffect(() => {
    cargarDocumentosTecnicos();
  }, []);

  const fileInputRef = React.useRef();
  const [principalState, setPrincipalState] = useState(State);
  const [principalError, setPrincipalError] = useState(StateErrores);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const history = useHistory();
  const dispatch = useDispatch();

  const cargarDocumentosTecnicos = async () => {
    let response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`);
    console.log(response.data.data);
    if (response.data.data.documentos === null) return;
    let array = [];
    if (editarConvocatoria !== undefined) {
      for (var i in response.data.data.documentos) {
        if (response.data.data.documentos[i].tipo_documento_id === 1) {
          array.push(response.data.data.documentos[i]);
        }
      }
      console.log(array);
      return setPrincipalState({ ...principalState, documentacion: array });
    }
  };

  const CambiarValor = (event, result) => {
    const { name, value } = result || event.target;
    setPrincipalError({ ...principalError, [name]: false });
    return setPrincipalState({ ...principalState, [name]: value });
  };

  const agregarFila = () => {
    let arrayErrores = StateErrores;
    let error = false;

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
      return setPrincipalError(arrayErrores);
    }

    let array = [];
    if (!principalState.editar) {
      console.log("esta agregando");
      array = [
        ...principalState.documentacion,
        {
          index: principalState.documentacion.length,
          tipo_documento: principalState.tipo_documento,
          url_documento: principalState.url_documento,
          descripcion: principalState.descripcion,
          activo: principalState.activo,
        },
      ];
      return setPrincipalState({
        ...principalState,
        tipo_documento: "",
        descripcion: "",
        documentacion: array,
        filename: "",
        url_documento: "",
        editar: false,
      });
    }
    console.log("esta editando");
    let documentacionJSON = JSON.parse(JSON.stringify(principalState.documentacion));
    documentacionJSON[principalState.index].tipo_documento = principalState.tipo_documento;
    documentacionJSON[principalState.index].url_documento = principalState.url_documento;
    documentacionJSON[principalState.index].descripcion = principalState.descripcion;
    documentacionJSON[principalState.index].activo = principalState.activo;

    return setPrincipalState({
      ...principalState,
      tipo_documento: "",
      descripcion: "",
      documentacion: documentacionJSON,
      filename: "",
      url_documento: "",
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
      index: data.index,
      descripcion: data.data.descripcion,
      tipo_documento: data.data.tipo_documento,
      editar: true,
    });
  };

  const Eliminardocumentacion = async ({ data }) => {
    // const { id_documentos_tecnico, index } = data;
    // console.log(id_documentos_tecnico, index);

    // const existeDocumento = await verificarExisteDocumento(id_documentos_tecnico, index + 1);
    // console.log(existeDocumento);
    // if (existeDocumento !== undefined && existeDocumento.length) {
    //   await axios.delete(
    //     `${ObjConstanst.IP_CULTURE}documentosTecnicos/delete/${existeDocumento[0].id_documentos_tecnico}`
    //   );
    // }

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

  let conteoDocumentosTecnicos = 0;
  const handelAsociarDocumentosTecnicos = async () => {
    let idconvocatoria = idConvocatoria;
    if (principalState.documentacion.length === 0) {
      return console.error("NO HAY NINGUN DOCUMENTO ASOCIADO");
    }
    if (principalState.documentacion[conteoDocumentosTecnicos]) {
      try {
        let tipo_documento_id = 1;
        if (editarConvocatoria !== undefined) {
          await axios.post(`${ObjConstanst.IP_CULTURE}documentos/documentosTecnicos/editar`, {
            idconvocatoria,
            descripcion: principalState.documentacion[conteoDocumentosTecnicos].descripcion,
            url_documento: principalState.documentacion[conteoDocumentosTecnicos].url_documento,
            activo: principalState.documentacion[conteoDocumentosTecnicos].activo,
            tipo_documento: principalState.documentacion[conteoDocumentosTecnicos].tipo_documento,
            tipo_documento_id,
          });
        } else {
          await axios.post(`${ObjConstanst.IP_CULTURE}documentos/documentosTecnicos`, {
            idconvocatoria,
            descripcion: principalState.documentacion[conteoDocumentosTecnicos].descripcion,
            url_documento: principalState.documentacion[conteoDocumentosTecnicos].url_documento,
            activo: principalState.documentacion[conteoDocumentosTecnicos].activo,
            tipo_documento: principalState.documentacion[conteoDocumentosTecnicos].tipo_documento,
            tipo_documento_id,
          });
        }
        conteoDocumentosTecnicos++;
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
    return history.push("/documentos");
  };

  return (
    <div style={{ padding: "2%" }}>
      <Segment className="segment-shadow">
        <Form autoComplete="off">
          <Grid style={{ paddingRight: "2%" }}>
            <Grid.Row columns={2} style={{ paddingBottom: "0.5%" }}>
              <Grid.Column>
                <Header style={{ marginBottom: "0" }} className="font-size-14px font-family-Montserrat-SemiBold">
                  Asociar documentación técnica
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
            <Divider clearing style={{ marginTop: "0", marginBottom: "0.2%" }} />
            <Grid.Row columns={4}>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <label className="font-color-4B4B4B">Requisito</label>
                <Form.Select
                  required
                  fluid
                  className="select-registros-adminconvocatoria"
                  placeholder="Seleccionar"
                  value={principalState.tipo_documento}
                  name="tipo_documento"
                  options={RequisitosOptions}
                  onChange={CambiarValor}
                  error={principalError.tipo_documento}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
                {principalError.tipo_documento ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.TextArea
                  label={
                    <label className="font-color-4B4B4B">
                      Descripcion&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                    </label>
                  }
                  onKeyDown={conteoCaracteres}
                  className="select-registros-adminconvocatoria"
                  name="descripcion"
                  maxLength="250"
                  onChange={CambiarValor}
                  value={principalState.descripcion}
                  error={principalError.descripcion}
                />
                <label style={{ float: "right" }} className="no-margin no-padding font-color-F28C02 font-size-10px">
                  {principalState.conteodescripcion}
                </label>
                {principalError.descripcion ? <Label color="red">Campo requerido</Label> : null}
              </Grid.Column>
              <Grid.Column>
                <Form.Field style={{ height: "74%" }}>
                  <label className="font-color-4B4B4B">Adjuntar archivo</label>
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
                      <Table.HeaderCell textAlign="center" className="table-header-tabla">
                        Ver
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center" className="table-header-tabla">
                        Editar
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center" className="table-header-tabla">
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
                <Button className="botones-redondos" color="blue" onClick={handelAsociarDocumentosTecnicos}>
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
