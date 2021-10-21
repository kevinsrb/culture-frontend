import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";
import {
  Grid,
  Segment,
  Header,
  Accordion,
  Icon,
  Table,
  Button,
  Checkbox,
  Breadcrumb,
  Dropdown,
} from "semantic-ui-react";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";

var conteoDocumentos = 0;

export const Documentos = () => {
  let initialState = {
    documentacion: {
      0: {
        id: 0,
        descripcion_del_documento: "Carta de invitación",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
        url_documento: "",
      },
      1: {
        id: 1,
        descripcion_del_documento: "Cédula de ciudadania",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
        url_documento: "",
      },
      2: {
        id: 2,
        descripcion_del_documento: "Cronograma",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
        url_documento: "",
      },
      3: {
        id: 3,
        descripcion_del_documento: "Declaración de residencia",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
        url_documento: "",
      },
      4: {
        id: 4,
        descripcion_del_documento: "RUT",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Juridica",
        url_documento: "",
      },
      5: {
        id: 5,
        descripcion_del_documento: "Declaración",
        sustentable: false,
        obligatorio: false,
        source: "Grupo_Conformado",
        url_documento: "",
      },
    },
    data: {
      Persona_Natural: {
        id: "Persona_Natural",
        documentos: [0, 1, 2, 3],
      },
      Persona_Juridica: {
        id: "Persona_Juridica",
        documentos: [4],
      },
      Grupo_Conformado: {
        id: "Grupo_Conformado",
        documentos: [5],
      },
      Documentos_Seleccionados: {
        id: "Documentos_Seleccionados",
        documentos: [],
      },
    },
    orden: ["Persona_Natural", "Persona_Juridica", "Grupo_Conformado", "Documentos_Seleccionados"],
  };

  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const dispatch = useDispatch();

  React.useEffect(() => {
    cargarDocumentos();
  }, []);

  const [documentos, setDocumentos] = useState(initialState);
  const [activeaccordion, setActiveAccordion] = React.useState(0);
  const history = useHistory();
  const persona = {
    1: "Persona_Natural",
    2: "Persona_Juridica",
    3: "Grupo_Conformado",
  };

  const cargarDocumentos = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}documentos/tiposdocumentos/`);
    let documentacionresponse = response.data.data.map((data, index) => {
      return {
        id: index,
        descripcion_del_documento: data.nombre,
        sustentable: false,
        obligatorio: false,
        url_documento: "",
        source: persona[data.tipo_participante_id],
      };
    });
    console.log(response.data.data)
    documentacionresponse = Object.assign({}, documentacionresponse);
    let arraypersonanatural = [];
    let arraypersonajuridica = [];
    let arraygrupoconformado = [];
    for (var i in response.data.data) {
      if (response.data.data[i].tipo_participante_id === 1) {
        arraypersonanatural.push(response.data.data[i].id - 1);
      }
      if (response.data.data[i].tipo_participante_id === 2) {
        arraypersonajuridica.push(response.data.data[i].id - 1);
      }
      if (response.data.data[i].tipo_participante_id === 3) {
        arraygrupoconformado.push(response.data.data[i].id - 1);
      }
    }
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.data.Persona_Natural.documentos = arraypersonanatural;
    todosJSON.data.Persona_Juridica.documentos = arraypersonajuridica;
    todosJSON.data.Grupo_Conformado.documentos = arraygrupoconformado;
    todosJSON.documentacion = documentacionresponse;
    todosJSON.data["Documentos_Seleccionados"].documentos = [];
    setDocumentos(todosJSON);
    consultarDocumentosConvocatoria();
  };

  const consultarDocumentosConvocatoria = async () => {
    console.log('inicia consulta de documentos convocatoria', editarConvocatoria);
    // INICIALIZAR DOCUMENTOS SELECCIONADOS
    if (editarConvocatoria !== undefined) {
      try {
        let todosDocumentos = JSON.parse(JSON.stringify(documentos));
        let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
        if (response.data.data.documentos === null) return;
        let convocatoria = response.data.data;
        for (var i in documentos.documentacion) {
          let doc = documentos.documentacion[i];
          for (var x in convocatoria.documentos) {
            let convdoc = convocatoria.documentos[x];
            if (
              doc.descripcion_del_documento.trim() === convdoc.descripcion.trim() &&
              doc.source === persona[convdoc.tipo_persona + 1] &&
              convdoc.tipo_documento_id === 0
            ) {
              todosDocumentos.data["Documentos_Seleccionados"].documentos.push(doc.id);
              todosDocumentos.data[persona[convocatoria.documentos[i].tipo_persona + 1]].documentos.filter(
                (data) => data !== doc.id
              );
              if (convdoc.url_documento) todosDocumentos.documentacion[doc.id].url_documento = convdoc.url_documento;
            }
          }
        }
        return setDocumentos(todosDocumentos);
      } catch (error) {
        console.error(error);
      }
      // for (var i in response.data.data.documentos) {
      //   for (var x in documentos.documentacion) {
      //     if (
      //       documentos.documentacion[x].descripcion_del_documento.trim() ===
      //         response.data.data.documentos[i].descripcion.trim() &&
      //       documentos.documentacion[x].source === persona[response.data.data.documentos[i].tipo_persona] &&
      //       response.data.data.documentos[i].tipo_documento_id === 0
      //     ) {
      //       let source = documentos.data["Documentos_Seleccionados"];
      //       let sourceData = source.documentos;
      //       sourceData.push(documentos.documentacion[x].id);
      //       source.documentos = sourceData;
      //       let change = documentos.data[persona[response.data.data.documentos[i].tipo_persona]];
      //       let changeDataFilter = change.documentos.filter((id) => id !== documentos.documentacion[x].id);
      //       change.documentos = changeDataFilter;
      //       // let todosJSON = JSON.parse(JSON.stringify(documentos));
      //       let todosJSON = JSON.parse(JSON.stringify(documentos));
      //       todosJSON.data[persona[response.data.data.documentos[i].tipo_persona]] = change;
      //       todosJSON.data["Documentos_Seleccionados"] = source;
      //       setDocumentos(todosJSON);
      //     }
      //   }
      // }
      // revisarArchivosConvocatoria(response.data.data);
    }
  };

  const revisarArchivosConvocatoria = (convo) => {
    var persona = {
      0: "Persona_Natural",
      1: "Persona_Juridica",
      2: "Grupo_Conformado",
    };
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    for (var i in convo.documentos) {
      for (var x in documentos.documentacion) {
        if (
          documentos.documentacion[x].descripcion_del_documento.trim() === convo.documentos[i].descripcion.trim() &&
          documentos.documentacion[x].source === persona[convo.documentos[i].tipo_persona] &&
          convo.documentos[i].tipo_documento_id === 0
        ) {
          if (convo.documentos[i].url_documento !== undefined) {
            todosJSON.documentacion[convo.documentos[i].id].url_documento = convo.documentos[i].url_documento;
          }
        }
      }
    }
    return setDocumentos(todosJSON);
  };

  const handleClickAccordion = (e, Titulo) => {
    let { index } = Titulo;
    let newIndex = activeaccordion === index ? -1 : index;
    return setActiveAccordion(newIndex);
  };

  const agregarDocumentacion = (data) => {
    let source = documentos.data["Documentos_Seleccionados"];
    let sourceData = source.documentos;
    sourceData.push(data.id);
    source.documentos = sourceData;
    let change = documentos.data[data.source];
    let changeDataFilter = change.documentos.filter((id) => id !== data.id);
    change.documentos = changeDataFilter;
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.data[data.source] = change;
    todosJSON.data["Documentos_Seleccionados"] = source;
    return setDocumentos(todosJSON);
  };

  const eliminarDocumento = (data) => {
    let source = documentos.data[data.doc.source];
    let sourceData = source.documentos;
    sourceData.push(data.doc.id);
    source.documentos = sourceData;
    let change = documentos.data["Documentos_Seleccionados"];
    let changeData = change.documentos.filter((id) => id !== data.doc.id);
    change.documentos = changeData;
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.data[data.doc.source] = source;
    todosJSON.data["Documentos_Seleccionados"] = change;
    return setDocumentos(todosJSON);
  };

  const guardardocumentacionadministrativa = async () => {
    conteoDocumentos = 0;
    grabandodocumentacionAdministrativa();
  };

  const handlecheckboxChange = (doc, name) => {
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.documentacion[doc.id][name] = !todosJSON.documentacion[doc.id][name];
    return setDocumentos(todosJSON);
  };

  const grabandodocumentacionAdministrativa = async () => {
    let idconvocatoria = idConvocatoria;
    if (documentos.data["Documentos_Seleccionados"].documentos.length === 0) {
      return console.error("NO PUEDO GUARDAR");
    }
    if (documentos.data["Documentos_Seleccionados"].documentos[conteoDocumentos] >= 0) {
      let documento = documentos.data["Documentos_Seleccionados"].documentos[conteoDocumentos];
      try {
        let tipo_documento_id = 0;
        let tipo = {
          Persona_Natural: 0,
          Persona_Juridica: 1,
          Grupo_Conformado: 2,
        };
        let tipo_persona = tipo[documentos.documentacion[documento].source];
        if (editarConvocatoria !== undefined) {
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosAdministrativos/editar`, {
            idconvocatoria,
            url_documento: documentos.documentacion[documento].url_documento,
            descripcion: documentos.documentacion[documento].descripcion_del_documento,
            sustentable: documentos.documentacion[documento].sustentable,
            obligatorio: documentos.documentacion[documento].obligatorio,
            tipo_documento_id,
            tipo_persona,
          });
        } else {
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosAdministrativos`, {
            idconvocatoria,
            url_documento: documentos.documentacion[documento].url_documento,
            descripcion: documentos.documentacion[documento].descripcion_del_documento,
            sustentable: documentos.documentacion[documento].sustentable,
            obligatorio: documentos.documentacion[documento].obligatorio,
            tipo_documento_id,
            tipo_persona,
          });
        }
        conteoDocumentos++;
        return grabandodocumentacionAdministrativa();
      } catch (error) {
        return console.error(error);
      }
    }
    await ObjNotificaciones.MSG_SUCCESS("success", "Se han asociado correctamente los documentos");
    return history.push("/Administrador/documentacionTecnica");
  };

  const backComponente = () => {
    dispatch(edicionConvocatoria(true));
    dispatch(idConvocatorias(idConvocatoria));
    return history.push("/Administrador/cronograma");
  };

  const saveFile = async (e, doc) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);
      await axios
        .post(`${process.env.REACT_APP_SERVER_CONV}documentos/guardarArchivo`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((data) => {
          let todosJSON = JSON.parse(JSON.stringify(documentos));
          todosJSON.documentacion[doc.id].url_documento = e.target.files[0].name;
          return setDocumentos(todosJSON);
        })
        .catch(function (error) {
          return console.error(error);
        });
    }
  };

  const eliminarArchivo = (doc) => {
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.documentacion[doc.id].url_documento = "";
    return setDocumentos(todosJSON);
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
            text={<span className="font-color-1B1C1D font-family-Montserrat-Regular">Documentos administrativos</span>}
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
      <Grid style={{ marginBottom: "8%", padding: "2%", marginLeft: "0", marginRight: "0" }}>
        <Header
          style={{ marginBottom: "0.5%" }}
          className="font-size-14px font-color-1B1C1D font-family-Montserrat-SemiBold"
          as="h3"
        >
          Asociar documentación administrativa
        </Header>
        <Grid.Row>
          <Grid.Column width={5}>
            {documentos.orden.map((doc, index) => {
              const datos = documentos.data[doc];
              if (datos.id === "Documentos_Seleccionados") return;
              const documentacion = datos.documentos.map((data) => documentos.documentacion[data]);

              return (
                <Segment className="no-margin" key={index}>
                  <Accordion>
                    <Accordion.Title active={activeaccordion === index} index={index} onClick={handleClickAccordion}>
                      {datos.id}
                      <Icon name="dropdown" />
                    </Accordion.Title>
                    <Accordion.Content active={activeaccordion === index}>
                      <div className="listado-container-documentacion">
                        {documentacion.map((docu, index) => (
                          <div
                            className="container-documentacion"
                            onClick={() => agregarDocumentacion(docu)}
                            key={index}
                          >
                            <Icon name="hdd" />
                            {docu.descripcion_del_documento}
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion>
                </Segment>
              );
            })}
          </Grid.Column>
          <Grid.Column width={11}>
            {documentos.orden.map((doc, index) => {
              const datos = documentos.data[doc];
              if (datos.id !== "Documentos_Seleccionados") return;
              const documentacion = datos.documentos.map((data) => documentos.documentacion[data]);

              return (
                <Table striped singleLine key={index} className="table-flex">
                  <Table.Header className="table-thead-tbody-flex">
                    <Table.HeaderCell style={{ width: "30%" }} className="background-color-FFFFFF font-size-12px">
                      Documentos seleccionados
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" style={{ width: "18%" }} className="background-color-FFFFFF font-size-12px">
                      ¿Subsanable?
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" style={{ width: "18%" }} className="background-color-FFFFFF font-size-12px">
                      ¿Obligatorio?
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: "23%" }}
                      className="background-color-FFFFFF font-size-12px"
                      textAlign="center"
                    >
                      Archivo
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ width: "11%" }} className="background-color-FFFFFF font-size-12px" textAlign="center">
                      Acción
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    {documentacion.map((doc, index) => (
                      <Table.Row
                        key={doc.descripcion_del_documento}
                        className="table-thead-tbody-flex background-color-F5FAFC"
                      >
                        <Table.Cell
                          style={{ width: "30%" }}
                          className="font-family-Montserrat-Regular font-size-12px font-color-8796A5"
                        >
                          <Icon name="hdd" />
                          {doc.descripcion_del_documento}
                        </Table.Cell>
                        <Table.Cell textAlign="center" style={{ width: "18%" }}>
                          <Checkbox
                            checked={doc.sustentable}
                            onChange={() => handlecheckboxChange(doc, "sustentable")}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center" style={{ width: "18%" }}>
                          <Checkbox
                            checked={doc.obligatorio}
                            onChange={() => handlecheckboxChange(doc, "obligatorio")}
                          />
                        </Table.Cell>
                        <Table.Cell
                          style={{ width: "23%" }}
                          className="font-family-Montserrat-Regular font-size-12px font-color-8796A5"
                        >
                          {doc.url_documento === "" && (
                            <Button
                              size="mini"
                              content="Seleccionar archivo"
                              className="btn button_archivo"
                              onClick={() => {
                                var inputs = document.getElementsByClassName("inputs-ref");
                                inputs[index].click();
                              }}
                            />
                          )}
                          {doc.url_documento !== "" && (
                            <Grid>
                              <span className="nombreArchivo">{doc.url_documento}</span>
                              <Header
                                onClick={() => eliminarArchivo(doc)}
                                className="font-size-10px font-color-AD0808 no-margin"
                              >
                                Eliminar
                              </Header>
                            </Grid>
                          )}
                          <input className="inputs-ref" type="file" hidden onChange={(e) => saveFile(e, doc)} />
                        </Table.Cell>
                        <Table.Cell textAlign="center" style={{ width: "11%" }}>
                          <Button
                            className="botones-acciones boton-borrar-adminconvocatorias"
                            icon="trash alternate outline"
                            onClick={(e) => eliminarDocumento({ e, doc })}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell colSpan="2" className="end-text-table-documentos">
                      <Button
                        className="botones-redondos"
                        color="blue"
                        onClick={() => guardardocumentacionadministrativa()}
                      >
                        Guardar y continuar
                      </Button>
                    </Table.Cell>
                  </Table.Footer>
                </Table>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button basic color="blue" className="font-size-12px button-back" onClick={backComponente}>
            Atrás
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
};
