import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import fileDownload from "js-file-download";
import { ObjConstanst } from "../../../config/utils/constanst";
import { Container, Card, Header, Button, Grid, GridColumn } from "semantic-ui-react";
import styled from "@emotion/styled";

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

  const { documentos_convocatoria } = useSelector((state) => state.participantes);

  const documentosTecnicos = documentos_convocatoria.filter((doct) => doct.tipo_documento_id == 2);

  const [documentos, setDocumentos] = useState(documentosTecnicos);
  const [principalState, setPrincipalState] = useState(State);
  console.log(documentos);

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
      tipo_documento_id: 3,
    };

    await axios
      .post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos`, guardarDocumento)
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);
      await axios
        .post(`${ObjConstanst.IP_PARTICIPANTES}documentos/guardarArchivo`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((data) => {})
        .catch(function (error) {
          console.log(error);
        });
    }

    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON[index].url_participante = name;
    todosJSON[index].tipo_documento_id = 3;
    return setDocumentos(documentos);
  };

  const eliminarArchivo = (e, index) => {
    console.log(index, "este es el index a eliminar");
    let todosJSON = JSON.parse(JSON.stringify(documentos));
    todosJSON[index].url_participante = "";
    todosJSON[index].tipo_documento_id = 3;
    return setDocumentos(todosJSON);
  };

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
                      {datos.url_documento === '' ? (
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
                          onClick={() => fileInputRef.current.click()}
                        />

                        <input ref={fileInputRef} type="file" hidden onChange={(e) => saveFile(datos, e, index)} />
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                </Card>
                {datos.url_participante !== "" ? (
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
                ) : null }
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
            // onClick={() => fileInputRef.current.click()}
          />
        </Container>
      </Grid>
    </React.Fragment>
  );
};
