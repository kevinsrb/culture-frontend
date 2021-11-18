import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import SubirArchivo from "../../components/Archivos/SubirArchivos";
import { TipodocumentosOptions, RequisitosOptions } from "../../../data/selectOption.data";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
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
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";
import { ModalConvocatoria } from "./ModalConvocatoria";
import documentosTecnicosServices from "../../../services/convocatorias/documentosTecnicosServices";

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

  useEffect(() => {
    cargarDocumentosGenerales();
  }, []);

  const cargarDocumentosGenerales = async () => {
   
    axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/consultarDocumentosGenerales/${idConvocatoria}`)
    .then(({data}) => {
      console.log(data)
      return setPrincipalState({ ...principalState, documentacion: data.documentos_generales });
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const fileInputRef = React.useRef();

  const saveFile = async (e) => {
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
    if(openModal){
      setOpenModal(!openModal)
    }
    let arrayErrores = stateErrores;
    let error = false;
    // if (principalState.nombre.trim() === "") {
    //   error = true;
    //   arrayErrores = {
    //     ...arrayErrores,
    //     nombre: true,
    //   };
    // }

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
    console.log(principalState.documentacion);
    if (!principalState.editar) {
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
    }

    let todoJSON = JSON.parse(JSON.stringify(principalState.documentacion));
    
    console.log(todoJSON)
    console.log(principalState.index)
    todoJSON[principalState.index].nombre = principalState.nombre;
    todoJSON[principalState.index].tipo_documento = principalState.tipo_documento;
    todoJSON[principalState.index].descripcion = principalState.descripcion;
    todoJSON[principalState.index].url_documento = principalState.filename;
    todoJSON[principalState.index].activo = principalState.activo;
    array = todoJSON;

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

  const [openModal, setOpenModal] = useState(false);

  const Editardocumentacion = (data) => {
    console.log(data)
    setOpenModal(true);
    return setPrincipalState({
      ...principalState,
      index: data.index,
      nombre: data.data.nombre,
      descripcion: data.data.descripcion,
      tipo_documento: data.data.tipo_documento,
      url_documento: data.data.url_documento,
      filename: data.data.url_documento,
      editar: true,
    });
  };

  const Eliminardocumentacion = async (data) => { 
    let array = [];
    let copy = principalState.documentacion.map((data) => data);
    array = copy.filter((doc) => doc.index !== data.index);
    return setPrincipalState({ ...principalState, documentacion: array });
  };

  const handelAsociarDocumentosGenerales = async () => {
      if (principalState.documentacion.length === 0) {
        return console.error("NO HAY NINGUN DOCUMENTO ASOCIADO");
      }

      await axios.post(`${process.env.REACT_APP_SERVER_CONV}convocatorias/documentos_generales/${idConvocatoria}`, principalState.documentacion)
      .then(({data}) => {
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  
      await ObjNotificaciones.MSG_SUCCESS("success", "Se Han asociado los documentos correctamente");
      history.push("/Administrador/publicarConvocatoria");
    
  };


    const Verdocumentacion = async (documento) => {
      console.log(documento)
      const data  = await documentosTecnicosServices.getArchivo(documento.url_documento);
      console.log(data)
      if(data){
          let mimetype;
          let tipo = documento.url_documento.split(".");
          var file, fileURL;
          switch (tipo[1]) {
            case "pdf":
              mimetype = "application/pdf";
              file = new Blob([data], {
                type: mimetype,
              });
              fileURL = URL.createObjectURL(file);
              break;
            case "docx":
              mimetype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
              file = new Blob([data], {
                type: mimetype,
              });
              fileURL = URL.createObjectURL(file);
              break;
            case "xlsx":
              mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
              file = new Blob([data], {
                type: mimetype,
              });
              fileURL = URL.createObjectURL(file);
              break;
            case "ppt":
              mimetype = "application/vnd.ms-powerpoint";
              file = new Blob([data], {
                type: mimetype,
              });
              fileURL = URL.createObjectURL(file);
              break;
            default:
              mimetype = "application/pdf";
              file = new Blob([data], {
                type: mimetype,
              });
              fileURL = URL.createObjectURL(file);
              break;
          }
  
          console.log(principalState.openModalViewer, 'cvxdc')
  
          return setPrincipalState({
            ...principalState,
            pdf: fileURL,
            namepdf: data.url_documento,
            openModalViewer: !principalState.openModalViewer,
          });
      }
      
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
    return history.push("/Administrador/documentacionTecnica");
  };


  return (
    <div>
      {/* <SubirArchivo file={file => setPrincipalState({...principalState, file: file})} type={type => setPrincipalState({...principalState, tipo_documento_file: type})} /> */}
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
            text={<span className="font-color-1B1C1D font-family-Montserrat-Regular">Documentación</span>}
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
      <Grid style={{ marginBottom: "8%", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large">
            <Segment className="segment-shadow">
              <Header
                className="font-size-14px font-family-Montserrat-SemiBold"
                floated="left"
                style={{ marginBottom: "0" }}
              >
                Documentación general convocatoria
              </Header>
              <Header as="h4" floated="right" style={{ marginBottom: "0.5%" }}>
                <span className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px">
                  {" "}
                  Codigo de convocatoria {idConvocatoria}
                </span>
              </Header>
              <Divider clearing style={{ marginTop: "0", marginBottom: "1%" }} />
              <Grid className="no-margin">
                <Grid.Row columns={2} className="no-padding-top no-padding-bottom">
                  <Grid.Column>
                    <Form.Input
                      label={<label className="font-color-4B4B4B">Nombre</label>}
                      name="nombre"
                      placeholder="Nombre"
                      value={principalState.nombre}
                      onChange={CambiarValor}
                      error={principalErrores.nombre}
                    />
                    {principalErrores.nombre ? <Label color="red">Campo requerido</Label> : null}
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Select
                      fluid
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
                <Grid.Row columns={2} className="no-padding-top no-padding-bottom">
                  <Grid.Column>
                    <Form.TextArea
                      label={<label className="font-color-4B4B4B">Descripcion</label>}
                      name="descripcion"
                      placeholder="Descripcion"
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
                <Grid.Row className="no-padding-top no-padding-bottom">
                  <Grid.Column className="container-pagination-adminconvocatorias justify-content-flex-end">
                    <Button className="botones-redondos" color="blue" onClick={agregarFila}>
                      Agregar
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="no-padding-top">
                  <Grid.Column>
                    <Header className="font-family-Montserrat-Regular font-size-14px font-color-1B1C1D">
                      Documentación generales asociados
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: "0.2%" }}>
                  <Grid.Column>
                    <Table className="border-right-left-none" striped singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-size-12px" width={1} rowSpan="2">
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-size-12px" width={2} rowSpan="2">
                            Nombre
                          </Table.HeaderCell>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-size-12px" width={2} rowSpan="2">
                            Tipo documento
                          </Table.HeaderCell>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-size-12px" width={5} rowSpan="2">
                            Descripción
                          </Table.HeaderCell>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 font-size-12px" width={1} rowSpan="2">
                            ¿Activo?
                          </Table.HeaderCell>
                          <Table.HeaderCell className="background-color-FFFFFF line-height-0 border-bottom-none font-size-12px" textAlign="center" colSpan="3">
                            Acciones
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell
                            className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070"
                            textAlign="center"
                          >
                            Ver
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070"
                            textAlign="center"
                          >
                            Editar
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            className="background-color-FFFFFF line-height-0 font-family-Montserrat-Regular font-size-9px font-color-707070"
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
                              <Table.Cell width={1}>{data.index}</Table.Cell>
                              <Table.Cell width={2}>{data.nombre}</Table.Cell>
                              <Table.Cell width={2}>{data.tipo_documento}</Table.Cell>
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
                    <Button className="botones-redondos" color="blue" onClick={handelAsociarDocumentosGenerales}>
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
          {principalState.pdf.trim() !== "" ? (
            <iframe src={principalState.pdf} style={{ width: "100%", height: "500px" }} />
          ) : null}
        </Modal.Content>
      </Modal>

      <ModalConvocatoria 
        openModal={openModal}
        setOpenModal={setOpenModal}
        principalState={principalState}
        setPrincipalState={setPrincipalState}
        fileInputRef={fileInputRef}
        saveFile={saveFile}
        agregarFila={agregarFila}
        cambiarValor={CambiarValor}
      />
    </div>

    
  );
};
