import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import fileDownload from "js-file-download";
import { ObjConstanst } from "../../../config/utils/constanst";
import { Container, Card, Header, Button, Grid } from "semantic-ui-react";
import styled from "@emotion/styled";
import { documentosCargados } from "../../../store/actions/participantesAction";
import { useHistory } from "react-router";

const ContainerFragment = styled.div`
  padding: 1%;
  display: inline-flex;
  width: 50%;
`;

export const DocumentosTecnicos = React.memo(() => {
  const State = {
    tipo_documento: "",
    filename: "",
    file: "",
    descripcion: "",
    url_participante: "",
    tipo_documento_file: "",
  };

  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory()

  const { documentos_convocatoria, idParticipante, documentos_cargados } = useSelector((state) => state.participantes);
  console.log(documentos_convocatoria)
  const documentosTecnicos = documentos_convocatoria.filter((doct) => doct.tipo_documento_id == 1);

  const [documentos, setDocumentos] = useState(documentosTecnicos);
  const [documentosCargadosState, setDocumentosCargadosState] = useState(State);


  useEffect(() => {
    consultarDocumentosCargados();
  }, [])

  const consultarDocumentosCargados = () => {
    console.log(documentos_cargados )
    if(documentos_cargados !== null && documentos_cargados !== undefined){
      const documentosTecnicosCargados = documentos_cargados.filter((doct) => doct.tipo_documento_id === 1);
      setDocumentos(documentos_cargados)
    }
  }

  const descargarPlantilla = async (url_documento, e) => {
    console.log(url_documento);

    if (url_documento != undefined) {
      await axios
        .get(`${ObjConstanst.IP_CULTURE}documentos/consultarArchivos/${url_documento}`, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, url_documento);
        });
    }
  };

  const saveFile = async (datos, e, index) => {
    const { idconvocatoria, tipo_documento, descripcion } = datos;
    const { name } = e.target.files[0];

    const guardarDocumento = {
      idconvocatoria: idconvocatoria,
      descripcion: descripcion,
      url_participante: name,
      tipo_documento: tipo_documento,
      tipo_documento_id: 1,
    };

    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON[index].url_participante = name;
    todosJSON[index].tipo_documento_id = 1;

    await axios
      .post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos`, guardarDocumento)
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });


    await guardarDocumentosParticipante(todosJSON);

    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);
      await axios
        .post(`${ObjConstanst.IP_PARTICIPANTES}participantes/guardarArchivo`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((data) => {})
        .catch(function (error) {
          console.log(error);
        });
      console.log(index, "documento a adjuntar");
      let todosJSON = JSON.parse(JSON.stringify(documentos));
      todosJSON[index].url_participante = name;
      todosJSON[index].tipo_documento_id = 1;  
      dispatch(documentosCargados(todosJSON))
      return setDocumentos(todosJSON);
    }
  };

  const eliminarArchivo = async (e, index) => {

    console.log(index, "este es el index a eliminar");
    let todosJSON = JSON.parse(JSON.stringify(documentos));

    await axios
      .delete(`${ObjConstanst.IP_PARTICIPANTES}participantes/eliminarArchivo/${ todosJSON[index].url_participante}`)
      .then((data) => {
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      })

    todosJSON[index].url_participante = "";
    todosJSON[index].tipo_documento_id = 1;
    dispatch(documentosCargados(todosJSON))
    guardarDocumentosParticipante(todosJSON)

    return setDocumentos(todosJSON);
  };

  const guardarDocumentosParticipante = async(documentos) => {
    await axios
    .put(`${ObjConstanst.IP_PARTICIPANTES}participantes/documentos/${idParticipante}`, documentos )
    .then(({data}) => {
      console.log(data)

    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const asociarDocumenttosTecnicos = () => {



    history.push('/Administrador/AgregarLinks')
  }

  return (
    <React.Fragment>
      <Grid className="no-margin" style={{ paddingTop: "1%" }}>
        <Card.Group style={{ width: "100%", display: "inline-flex" }}>
          {documentos.length > 0 ? (
            documentos.map((datos, index) => (
              <ContainerFragment>
                <Card className="cards_container no-margin box-card-participantes">
                  <Card.Content className="cards_content">
                    <Card.Header>{datos.tipo_documento}</Card.Header>

                    <Card.Description>{datos.descripcion}</Card.Description>

                    <Grid className="no-margin" columns={2}>
                      {datos.url_documento && (
                        <Grid.Column className="no-padding-left">
                          <Header
                            floated="left"
                            className="font-color-F28C02 font-size-12px font-family-Montserrat-Regular font-weight-normal"
                            onClick={(e) => descargarPlantilla(datos.url_documento, e)}
                          >
                            Descargar plantilla
                          </Header>
                        </Grid.Column>
                      )}

                      <Grid.Column className="justify-content-flex-end no-padding-top no-padding-bottom no-padding-right">
                        <Button
                          content="Cargar documento"
                          className="font-size-12px button-back font-family-Montserrat-SemiBold"
                          onClick={() => {
                            var inputs = document.getElementsByClassName("inputs-ref");
                            inputs[index].click();
                          }}
                        />

                        <input className="inputs-ref" type="file" hidden onChange={(e) => saveFile(datos, e, index)} />
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                </Card>
                {datos.url_participante !== "" && datos.url_participante ? (
                  <Card className="card_archivo_subido no-margin">
                    <Card.Content className="cards_content ">
                      <Card.Header className="font-family-Montserrat-Bold font-size-12px font-color-FFFFFF">
                        {datos.tipo_documento}
                      </Card.Header>

                      <Grid columns={2}>
                        <Grid.Column className="justify-content-flex-end">
                          <Button
                            content="Eliminar"
                            className="font-size-12px buttons-documentoscargados-documentosparticiapntes font-weight-normal font-family-Montserrat-Regular"
                            onClick={(e) => eliminarArchivo(e, index)}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Button
                            content="Cargado"
                            className="font-size-12px buttons-documentoscargados-documentosparticiapntes font-family-Montserrat-SemiBold"
                          />
                        </Grid.Column>
                      </Grid>
                    </Card.Content>
                  </Card>
                ) : null}
              </ContainerFragment>
            ))
          ) : (
            <span>No hay datos por mostrar</span>
          )}
        </Card.Group>

        <Container textAlign="right" style={{ paddingRight: "2%", paddingTop: "2%" }}>
          <Button
            content="Guardar y continuar"
            className="btn btn-primary-outline background-color-EAEBEC font-color-FFFFFF border-radius19"
            onClick={asociarDocumenttosTecnicos}
          />
        </Container>
      </Grid>
    </React.Fragment>
  );
});
