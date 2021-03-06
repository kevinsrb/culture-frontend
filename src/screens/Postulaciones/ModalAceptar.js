import React from "react";
import axios from "axios";
import { Modal, Grid, Header, Divider, Button, Checkbox } from "semantic-ui-react";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { TiposIdentificacion } from "../../data/selectOption.data";
import { Empty, Table } from "antd";
import fileDownload from "js-file-download";
// import { columnasDocumentaciontecnicaModal, columnasDocumentacionadministrativaModal } from "./ColumnasModalPostulaciones";

export default function ModalAceptarPropuesta({ openModal, closeModal, actionButton, actionCancelButton, datos }) {
  React.useEffect(() => console.log(datos), [datos]);
  const columnasDocumentaciontecnicaModal = [
    {
      title: "Nombre documentos",
      width: 30,
      dataIndex: "url_participante",
      key: "url_participante",
    },
    {
      title: "Tipo de documento",
      width: 30,
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Acciones",
      width: 30,
      render: (datos) => (
        <>
          <Button className="botones-acciones" icon="eye" onClick={() => descargarArchivos(datos)} />
        </>
      ),
    },
  ];
  const descargarArchivos = async (datos) => {
    console.log(datos);
    if (datos.url_documento !== undefined) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_CONV}documentos/consultarArchivos/${datos.url_documento}`, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, datos.url_documento);
        });
    }
  };
  const columnasDocumentacionadministrativaModal = [
    {
      title: "Nombre documentos",
      width: 30,
      dataIndex: "url_participante",
      key: "url_participante",
    },
    {
      title: "Tipo de documento",
      width: 30,
      dataIndex: "descripcion",
      key: "descripcion",
    },
  ];
  return (
    <Modal centered={false} open={openModal} onClose={closeModal}>
      <Grid className="no-margin">
        <Grid.Row>
          <Grid.Column>
            <Header
              className="font-size-14px font-family-Montserrat-SemiBold"
              floated="left"
              style={{ marginBottom: "0" }}
            >
              Propuesta&nbsp;-&nbsp;
              <span style={{ marginBottom: "0" }} className="font-size-10px font-family-Montserrat-SemiBold no-margin">
                {datos.numero_documento}
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <label className="font-size-24px font-family-Montserrat-SemiBold">{datos.nombre_propuesta}</label>
          </Grid.Column>
        </Grid.Row>
        <Divider clearing style={{ marginTop: "0", marginBottom: "1%" }} />
        <Grid.Row className="no-padding-top no-padding-bottom">
          <Grid.Column>
            <Header
              className="font-size-12px font-family-Montserrat-SemiBold font-color-6A6A6A"
              floated="left"
              style={{ marginBottom: "0" }}
            >
              Linea de convocatoria&nbsp;:&nbsp;
              <span
                style={{ marginBottom: "0" }}
                className="font-size-12px font-family-Montserrat-SemiBold no-margin font-color-000000"
              >
                {datos.nombre_convocatoria}
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding-bottom">
          <Grid.Column>
            <Header
              className="font-size-12px font-family-Montserrat-SemiBold font-color-6A6A6A"
              floated="left"
              style={{ marginBottom: "0" }}
            >
              Categoria linea convocatoria&nbsp;:&nbsp;
              <span
                style={{ marginBottom: "0" }}
                className="font-size-12px font-family-Montserrat-SemiBold no-margin font-color-000000"
              >
                {/* {datos.categoria_linea_convocatoria.length > 0
                  ? datos.categoria_linea_convocatoria.map((data) => {
                      console.log(data);
                      return ` ${data.text} `;
                    })
                  : null} */}
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} className="no-padding-bottom">
          <Grid.Column>
            <Header
              className="font-size-12px font-family-Montserrat-SemiBold font-color-6A6A6A"
              floated="left"
              style={{ marginBottom: "0" }}
            >
              Nombre de participante&nbsp;:&nbsp;
              <span
                style={{ marginBottom: "0" }}
                className="font-size-12px font-family-Montserrat-SemiBold no-margin font-color-000000"
              >
                {datos.nombre_particpante}
              </span>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header
              className="font-size-12px font-family-Montserrat-SemiBold font-color-6A6A6A"
              floated="left"
              style={{ marginBottom: "0" }}
            >
              Tipo de persona&nbsp;:&nbsp;
              <span
                style={{ marginBottom: "0" }}
                className="font-size-12px font-family-Montserrat-SemiBold no-margin font-color-000000"
              >
                {datos.tipo_participante == 1
                  ? "Persona Natural"
                  : datos.tipo_participante == 2
                  ? "Persona Juriedica"
                  : datos.tipo_participante == 3
                  ? "Grupo Conformado"
                  : null}
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding-bottom">
          <Grid.Column>
            <label className="font-size-14px font-family-Montserrat-Regular font-color-000000">
              Documentos t??cnicos
            </label>
            <Table
              columns={columnasDocumentaciontecnicaModal}
              // dataSource={[]}
              locale={{ emptyText: <Empty description="No hay datos" style={{ padding: '50px'}} /> }} 
              dataSource={datos.documentosTecnicos}
              scroll={{ x: 800, y: 300 }}
              size="large"
              rowClassName="sizeTable table-row"
              bordered={false}
              size="middle"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding-bottom">
          <Grid.Column>
            <label className="font-size-14px font-family-Montserrat-Regular font-color-000000">
              Documentos administrativos
            </label>
            <Table
              columns={columnasDocumentacionadministrativaModal}
              dataSource={datos.documentosAdministrativos}
              scroll={{ x: 800, y: 300 }}
              size="large"
              rowClassName="sizeTable table-row"
              bordered={false}
              size="middle"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <label className="font-size-14px font-family-Montserrat-Regular font-color-000000">
              Listado de participantes
            </label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal.Actions>
        <ButtonPrimary labelButton="Cancelar" actionButton={actionCancelButton} />
        <ButtonPrimary labelButton="Aceptar propuesta" actionButton={() => actionButton(datos)} />
      </Modal.Actions>
    </Modal>
  );
}
