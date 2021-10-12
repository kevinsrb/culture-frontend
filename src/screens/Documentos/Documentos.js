import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import { Grid, Segment, Header, Accordion, Icon, Table, Button, Checkbox, Divider } from "semantic-ui-react";
import { ObjConstanst } from "../../config/utils/constanst";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

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
      },
      1: {
        id: 1,
        descripcion_del_documento: "Cédula de ciudadania",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
      },
      2: {
        id: 2,
        descripcion_del_documento: "Cronograma",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
      },
      3: {
        id: 3,
        descripcion_del_documento: "Declaración de residencia",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Natural",
      },
      4: {
        id: 4,
        descripcion_del_documento: "RUT",
        sustentable: false,
        obligatorio: false,
        source: "Persona_Juridica",
      },
      5: {
        id: 5,
        descripcion_del_documento: "Declaración",
        sustentable: false,
        obligatorio: false,
        source: "Grupo_Conformado",
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
    }
    if (editarConvocatoria === undefined) {
      let response = await axios.get(`${ObjConstanst.IP_CULTURE}documentos/tiposdocumentos/`);
      let documentacionresponse = response.data.data.map((data, index) => {
        return {
          id: index,
          descripcion_del_documento: data.nombre,
          sustentable: false,
          obligatorio: false,
          source: persona[data.tipo_participante_id],
        }
      })
      documentacionresponse = Object.assign({},documentacionresponse);
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
      return setDocumentos(todosJSON);
    }
    return console.error('ERROR EDITAR NO PERMITIDO');
  }

  const handleClickAccordion = (e, Titulo) => {
    console.log(Titulo, activeaccordion, "activar acordeon");
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
    console.log(idConvocatoria, ' idconvocatoria');
    if (documentos.data["Documentos_Seleccionados"].documentos.length === 0) {
      return console.error("NO PUEDO GUARDAR");
    }

    let documents = documentos.data["Documentos_Seleccionados"].documentos.map((data) => {
      console.log(documentos.documentacion, data);
      return {
        descripcion_del_documento: documentos.documentacion[data].descripcion_del_documento,
        sustentable: documentos.documentacion[data].sustentable,
        obligatorio: documentos.documentacion[data].obligatorio,
      };
    });

    try {
      let response = await axios.post(`${ObjConstanst.IP_CULTURE}convocatorias/documentos/${idConvocatoria}`, {
        documentos: documents,
      });
      console.log(response);
    } catch (error) {
      return console.error(error);
    }


    // return enviardocumentacion(documents);
    await ObjNotificaciones.MSG_SUCCESS("success", "Se han asociado correctamente los documentos");
    return history.push("/documentacionTecnica");
  };

  const enviardocumentacion = async (data) => {
    console.log(data);
    let idconvocatoria = idConvocatoria;
    if (data[conteoDocumentos]){
      try {
        await axios.post(`${ObjConstanst.IP_CULTURE}documentos`, {
          idconvocatoria,
          descripcion_del_documento: data[conteoDocumentos].descripcion_del_documento,
          sustentable: data[conteoDocumentos].sustentable,
          obligatorio: data[conteoDocumentos].obligatorio,
          url: '',
          tipo: 'Documentacion Administrativa',
        });
        conteoDocumentos++;
        console.log(conteoDocumentos);
        return enviardocumentacion();
      } catch (error) {
        return console.error(error);
      }
    }
  };

  return (
    <div style={{ padding: "2%" }}>
      <Segment>
      <Header style={{ paddingLeft: "2%" }} as="h3">
        Asociar documentacion administrativa
      </Header>
      <Divider clearing />
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            {documentos.orden.map((doc, index) => {
              const datos = documentos.data[doc];
              if (datos.id === "Documentos_Seleccionados") return;
              const documentacion = datos.documentos.map((data) => documentos.documentacion[data]);
              console.log(index);

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
                    <Table.HeaderCell>¿Sustentable?</Table.HeaderCell>
                    <Table.HeaderCell>¿Obligatorio?</Table.HeaderCell>
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
                          <Checkbox checked={doc.sustentable} onChange={() => console.log("aca")} />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox checked={doc.obligatorio} onChange={() => console.log("aca")} />
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
      </Segment>
    </div>
  );
};
