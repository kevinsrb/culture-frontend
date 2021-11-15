import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import fileDownload from "js-file-download";
import { ObjConstanst } from "../../../config/utils/constanst";
import { Container, Card, Header, Button, Grid, GridColumn } from "semantic-ui-react";
import { documentosAdministrativosCargados } from "../../../store/actions/participantesAction";
import styled from "@emotion/styled";
import { useHistory } from "react-router";

const ContainerFragment = styled.div`
  padding: 1%;
  display: inline-flex;
  width: 50%;
`;

export const DocumentosAdministrativos = () => {
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
  const history = useHistory();

  const { id_postulacion, documentos_administrativos, idParticipante, documentos_administrativos_cargados, documentos_tecnico_cargados } = useSelector((state) => state.participantes);

  // const documentosAdministrativos = documentos_convocatoria.filter((doct) => doct.tipo_documento_id === 0);
  const [documentos, setDocumentos] = useState(documentos_administrativos);

  const [principalState, setPrincipalState] = useState(State);
  console.log(documentos, "estos son los documentos");

  useEffect(() => {
    consultarDocumentosCargados();
  }, []);

  const consultarDocumentosCargados = () => {
    if (documentos_administrativos_cargados !== null && documentos_administrativos_cargados !== undefined && documentos_administrativos_cargados.length > 0 ) {
      return setDocumentos(documentos_administrativos_cargados);
    }
  };

  const descargarPlantilla = async (url_documento, e) => {
    console.log(url_documento);

    if (url_documento !== undefined) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_PARTI}documentos/consultarArchivos/${url_documento}`, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, url_documento);
        });
    }
  };

  const saveFile = async (datos, e, index) => {
    if (e.target.files.length > 0) {
      const { idconvocatoria, tipo_documento, descripcion } = datos;
      const { name } = e.target.files[0];

      const guardarDocumento = {
        idconvocatoria: idconvocatoria,
        descripcion: descripcion,
        url_participante: name,
        tipo_documento: tipo_documento,
        tipo_documento_id: 3,
      };

      let todosJSON1 = JSON.parse(JSON.stringify(documentos));
      todosJSON1[index].url_participante = name;
      if (todosJSON1[index].subsanable) todosJSON1[index].estado_subsanable = true;
      todosJSON1[index].tipo_documento_id = 0;

      await guardarUrlDocumentosPostulacion(id_postulacion,todosJSON1[index].id, name  );

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
      if (todosJSON[index].subsanable) todosJSON[index].estado_subsanable = true
      todosJSON[index].tipo_documento_id = 0;
      dispatch(documentosAdministrativosCargados(todosJSON));
      return setDocumentos(todosJSON);
    }
  };

  const guardarUrlDocumentosPostulacion = async (id_postulacion, id_documento, filename) => {
    const actualizarDocumento = {
      id_postulacion,
      id_documento,
      filename
    }
    await axios
    .put(`${process.env.REACT_APP_SERVER_PARTI}postulaciones/guardarUrlDocumentosPostulacion`, actualizarDocumento)
    .then(({ data }) => {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const eliminarArchivo = async (e, index) => {
    console.log(index, "este es el index a eliminar");
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON[index].url_participante = "";
    todosJSON[index].tipo_documento_id = 1;
    console.log(todosJSON[index]);
    dispatch(documentosAdministrativosCargados(todosJSON));
    guardarUrlDocumentosPostulacion(id_postulacion, todosJSON[index].id, "")
    return setDocumentos(todosJSON);
  };

  const SaveandContinue = () => {
    history.push('/Usuario/AgregarLinks')
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
                      {datos.url_documento === "" ? (
                        <Grid.Column className="no-padding-left">
                          <Header
                            floated="left"
                            className="font-color-F28C02 font-size-12px font-family-Montserrat-Regular font-weight-normal"
                            onClick={(e) => descargarPlantilla(datos.url_documento, e)}
                          >
                            Descargar plantilla
                          </Header>
                        </Grid.Column>
                      ) : null}

                      <Grid.Column className="justify-content-flex-end no-padding-top no-padding-bottom no-padding-right">
                        <Button
                          content="Cargar plantilla"
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
                {datos.url_participante !== "" && datos.url_participante !== null ? (
                  <Card className="card_archivo_subido_admin no-margin">
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
            className="btn btn-primary-outline"
            onClick={SaveandContinue}
            // onClick={() => fileInputRef.current.click()}
          />
        </Container>
      </Grid>
    </React.Fragment>
  );
};
