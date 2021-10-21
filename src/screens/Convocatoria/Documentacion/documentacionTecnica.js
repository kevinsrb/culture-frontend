import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequisitosOptions } from "../../../data/selectOption.data";
import {
  Grid,
  Segment,
  Header,
  Form,
  Button,
  Table,
  Divider,
  Checkbox,
  Label,
  Modal,
  Icon,
  Dropdown,
  Breadcrumb,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../../config/utils/constanst";
import { useHistory } from "react-router";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";

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
    pdf: "",
    namepdf: "",
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
    let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
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
      url_documento: data.data.url_documento,
      filename: data.data.url_documento,
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
    //     `${process.env.REACT_APP_SERVER_CONV}documentosTecnicos/delete/${existeDocumento[0].id_documentos_tecnico}`
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
        let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}documentosTecnicos/${id_consultar}`);
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
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos/editar`, {
            idconvocatoria,
            descripcion: principalState.documentacion[conteoDocumentosTecnicos].descripcion,
            url_documento: principalState.documentacion[conteoDocumentosTecnicos].url_documento,
            activo: principalState.documentacion[conteoDocumentosTecnicos].activo,
            tipo_documento: principalState.documentacion[conteoDocumentosTecnicos].tipo_documento,
            tipo_documento_id,
          });
        } else {
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos`, {
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
    history.push("/Administrador/documentacionConvocatoria");
  };

  const saveFile = async (e) => {
    console.log(e.target.files.length);
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);
      await axios
        .post(`${process.env.REACT_APP_SERVER_CONV}documentos/guardarArchivo`, formData, {
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
    }
  };

  const Verdocumentacion = async (data) => {
    console.log(data, "esta es la informacion");
    await axios
      .get(`${process.env.REACT_APP_SERVER_CONV}documentos/consultarArchivos/${data.url_documento}`, {
        responseType: "blob",
      })
      .then((response) => {
        console.log(response);
        let mimetype;
        let tipo = data.url_documento.split(".");
        var file, fileURL;
        switch (tipo[1]) {
          case "pdf":
            mimetype = "application/pdf";
            file = new Blob([response.data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "docx":
            mimetype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            file = new Blob([response.data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "xlsx":
            mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            file = new Blob([response.data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "ppt":
            mimetype = "application/vnd.ms-powerpoint";
            file = new Blob([response.data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          default:
            mimetype = "application/pdf";
            file = new Blob([response.data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
        }

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
    return history.push("/Administrador/documentos");
  };

  return (
    <div>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Crear convocatoria
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin">
        <Grid.Column
          className="background-color-6DA3FC-opacity-025 no-margin"
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2% !important" }}
        >
          <span className="font-color-1B1C1D font-size-14px">Crear convocatoria :</span>
          <Dropdown
            text={<span className="font-color-1B1C1D font-family-Montserrat-Regular">Documentos técnicos</span>}
            icon={
              <Icon style={{ float: "right", paddingLeft: "5%" }} className="font-color-1FAEEF" name="angle down" />
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Información General
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Cronograma</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Doc. Administrativos
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. Técnicos</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. General</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Públicación</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
      <Grid style={{ marginBottom: "0", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large" autoComplete="off">
            <Segment className="segment-shadow">
              <Header as="h4" floated="right" style={{ marginBottom: "0.5%" }}>
                <span className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px">
                  {" "}
                  Codigo de convocatoria {idConvocatoria}
                </span>
              </Header>
              <Header
                className="font-size-14px font-family-Montserrat-SemiBold"
                floated="left"
                style={{ marginBottom: "0" }}
              >
                Asociar documentación técnica
              </Header>
              <Divider clearing style={{ marginTop: "0", marginBottom: "1%" }} />
              <Grid className="no-margin">
                <Grid.Row columns={4} className="no-padding-bottom no-padding-top">
                  <Grid.Column></Grid.Column>
                  <Grid.Column></Grid.Column>
                  <Grid.Column></Grid.Column>
                  <Grid.Column>
                    <Form.Select
                      fluid
                      label={<label className="font-color-4B4B4B">Requisito</label>}
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
                <Grid.Row columns={2} className="no-padding-top no-padding-bottom">
                  <Grid.Column>
                    <Form.TextArea
                      label={
                        <label className="font-color-4B4B4B">
                          Descripción&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                        </label>
                      }
                      onKeyDown={conteoCaracteres}
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
                        {principalState.filename !== "" && (
                          <Grid>
                            <span className="nombreArchivo">{principalState.filename}</span>
                            <Header
                              onClick={() => setPrincipalState({ ...principalState, filename: "" })}
                              className="font-size-10px font-color-AD0808 no-margin"
                            >
                              Eliminar
                            </Header>
                          </Grid>
                        )}
                        <input ref={fileInputRef} type="file" hidden onChange={saveFile} />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4} className="no-padding-top no-padding-bottom">
                  <Grid.Column></Grid.Column>
                  <Grid.Column></Grid.Column>
                  <Grid.Column></Grid.Column>
                  <Grid.Column className="container-pagination-adminconvocatorias">
                    <Button className="botones-redondos" color="blue" onClick={agregarFila}>
                      Agregar
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} className="no-padding-top" style={{ paddingBottom: '1%' }}>
                  <Grid.Column>
                    <Header className="font-color-1B1C1D font-size-14px font-family-Montserrat-Regular">Documentación técinca asociada</Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="no-padding-top no-padding-bottom">
                  <Grid.Column>
                    <Table className="border-right-left-none" striped singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={1} rowSpan="2" className="background-color-FFFFFF line-height-0 font-size-12px">
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell width={4} rowSpan="2" className="background-color-FFFFFF line-height-0 font-size-12px">
                            Tipo documento
                          </Table.HeaderCell>
                          <Table.HeaderCell width={5} rowSpan="2" className="background-color-FFFFFF line-height-0 font-size-12px">
                            Descripción
                          </Table.HeaderCell>
                          <Table.HeaderCell width={1} rowSpan="2" className="background-color-FFFFFF line-height-0 font-size-12px">
                            ¿Activo?
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="center" colSpan="3" className="background-color-FFFFFF line-height-0 border-bottom-none font-size-12px">
                            Acciones
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell textAlign="center" className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070">
                            Ver
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="center" className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070">
                            Editar
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign="center" className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070">
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
                                <Button
                                  className="botones-acciones"
                                  icon="eye"
                                  onClick={() => Verdocumentacion(data)}
                                />
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
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button basic color="blue" className="font-size-12px button-back" onClick={backComponente}>
            Atrás
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
          {principalState.pdf.trim() !== "" ? (
            <iframe src={principalState.pdf} style={{ width: "100%", height: "500px" }} />
          ) : null}
        </Modal.Content>
      </Modal>
    </div>
  );
};
