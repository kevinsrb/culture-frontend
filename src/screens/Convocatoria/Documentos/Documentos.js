import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";
import axios from "axios";
import { Grid, Segment, Header, Accordion, Icon, Table, Button, Checkbox, Divider } from "semantic-ui-react";
import { ObjConstanst } from "../../../config/utils/constanst";
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

  const cargarDocumentos = async () => {
    var persona = {
      1: "Persona_Natural",
      2: "Persona_Juridica",
      3: "Grupo_Conformado",
    };

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
    console.log(todosJSON);
    consultarDocumentosConvocatoria();
    return setDocumentos(todosJSON);
  };

  const consultarDocumentosConvocatoria = async () => {
    // INICIALIZAR DOCUMENTOS SELECCIONADOS
    let documentosseleccionados = documentos.data["Documentos_Seleccionados"];
    documentosseleccionados.documentos = [];
    let info = JSON.parse(JSON.stringify(documentos));
    info.data["Documentos_Seleccionados"] = documentosseleccionados;
    setDocumentos(info);
    // TRAER LOS DOCUMENTOS SELECCIONADOS EN LA CONVOCATORIA
    if (editarConvocatoria !== undefined) {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
      if (response.data.data.documentos === null) return;
      console.log(response.data.data);
      console.log(documentos);
      var persona = {
        0: "Persona_Natural",
        1: "Persona_Juridica",
        2: "Grupo_Conformado",
      };
      for (var i in response.data.data.documentos) {
        for (var x in documentos.documentacion) {
          if (
            documentos.documentacion[x].descripcion_del_documento.trim() ===
              response.data.data.documentos[i].descripcion.trim() &&
            documentos.documentacion[x].source === persona[response.data.data.documentos[i].tipo_persona] &&
            response.data.data.documentos[i].tipo_documento_id === 0
          ) {
            let source = documentos.data["Documentos_Seleccionados"];
            let sourceData = source.documentos;
            sourceData.push(documentos.documentacion[x].id);
            source.documentos = sourceData;
            let change = documentos.data[persona[response.data.data.documentos[i].tipo_persona]];
            let changeDataFilter = change.documentos.filter((id) => id !== documentos.documentacion[x].id);
            change.documentos = changeDataFilter;
            // let todosJSON = JSON.parse(JSON.stringify(documentos));
            let todosJSON = JSON.parse(JSON.stringify(documentos));
            todosJSON.data[persona[response.data.data.documentos[i].tipo_persona]] = change;
            todosJSON.data["Documentos_Seleccionados"] = source;
            setDocumentos(todosJSON);
          }
        }
      }
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
          console.log(convo.documentos[i].id, convo.documentos[i].url_documento, "este es el id");
          if (convo.documentos[i].url_documento !== undefined) {
            todosJSON.documentacion[convo.documentos[i].id].url_documento = convo.documentos[i].url_documento;
          }
        }
      }
    }
    console.log(todosJSON);
    return setDocumentos(todosJSON);
  };

  const handleClickAccordion = (e, Titulo) => {
    console.log(Titulo, activeaccordion, "activar acordeon");
    let { index } = Titulo;
    let newIndex = activeaccordion === index ? -1 : index;
    return setActiveAccordion(newIndex);
  };

  const agregarDocumentacion = (data) => {
    console.log(documentos);
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
    console.log("grabó");
    grabandodocumentacionAdministrativa();
  };

  const handlecheckboxChange = (doc, name) => {
    console.log(doc.id);
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.documentacion[doc.id][name] = !todosJSON.documentacion[doc.id][name];
    return setDocumentos(todosJSON);
  };

  const grabandodocumentacionAdministrativa = async () => {
    let idconvocatoria = idConvocatoria;
    if (documentos.data["Documentos_Seleccionados"].documentos.length === 0) {
      return console.error("NO PUEDO GUARDAR");
    }
    console.log(documentos.data["Documentos_Seleccionados"].documentos[conteoDocumentos]);
    if (documentos.data["Documentos_Seleccionados"].documentos[conteoDocumentos] >= 0) {
      let documento = documentos.data["Documentos_Seleccionados"].documentos[conteoDocumentos];
      console.log(documento, "este es el documento");
      try {
        let tipo_documento_id = 0;
        let tipo = {
          Persona_Natural: 0,
          Persona_Juridica: 1,
          Grupo_Conformado: 2,
        };
        let tipo_persona = tipo[documentos.documentacion[documento].source];
        console.log(tipo_persona);
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
    return history.push("/documentacionTecnica");
  };

  const backComponente = () => {
    dispatch(edicionConvocatoria(true));
    dispatch(idConvocatorias(idConvocatoria));
    return history.push("/cronograma");
  };

  const saveFile = async (e, doc) => {
    console.log(doc.id, "este es el id que seleccione");
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
          console.log(error);
        });
    }
  };

  const eliminarArchivo = (doc) => {
    console.log(doc.id, "este es el id que borre");
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON.documentacion[doc.id].url_documento = "";
    return setDocumentos(todosJSON);
  };

  return (
    <div style={{ padding: "2%", backgroundColor: "#F7FBFF" }}>
      <Header
        style={{ marginBottom: "0.5%" }}
        className="font-size-14px font-color-1B1C1D font-family-Montserrat-SemiBold"
        as="h3"
      >
        Asociar documentacion administrativa
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            {documentos.orden.map((doc, index) => {
              const datos = documentos.data[doc];
              if (datos.id === "Documentos_Seleccionados") return;
              const documentacion = datos.documentos.map((data) => documentos.documentacion[data]);

              return (
                <Segment className="no-margin">
                  <Accordion>
                    <Accordion.Title active={activeaccordion === index} index={index} onClick={handleClickAccordion}>
                      {datos.id}
                      <Icon name="dropdown" />
                    </Accordion.Title>
                    <Accordion.Content active={activeaccordion === index}>
                      <div className="listado-container-documentacion">
                        {documentacion.map((docu, index) => (
                          <div className="container-documentacion" onClick={() => agregarDocumentacion(docu)}>
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
                <Table striped singleLine>
                  <Table.Header>
                    <Table.HeaderCell>{datos.id}</Table.HeaderCell>
                    <Table.HeaderCell>¿Subsanable?</Table.HeaderCell>
                    <Table.HeaderCell>¿Obligatorio?</Table.HeaderCell>
                    <Table.HeaderCell>Subir archivo</Table.HeaderCell>
                    <Table.HeaderCell>Accion</Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    {documentacion.map((doc, index) => (
                      <Table.Row>
                        <Table.Cell>
                          <Icon name="hdd" />
                          {doc.descripcion_del_documento}
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={doc.sustentable}
                            onChange={() => handlecheckboxChange(doc, "sustentable")}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={doc.obligatorio}
                            onChange={() => handlecheckboxChange(doc, "obligatorio")}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          {doc.url_documento === "" && (
                            <Button
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
                        <Table.Cell>
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
            Atras
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
};
