import React from "react";
import { Modal, Grid, Header, Divider } from "semantic-ui-react";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { TiposIdentificacion } from "../../data/selectOption.data";
import { Table } from "antd";
import { columnasDocumentaciontecnicaModal, columnasDocumentacionadministrativaModal } from "./ColumnasModalPostulaciones";

export default function ModalPostulacion({ openModal, closeModal, actionButton, datos }) {
  React.useEffect(() => console.log(datos), [datos]);
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
                Código propuesta
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <label className="font-size-24px font-family-Montserrat-SemiBold">Nombre de propuesta</label>
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
                {datos.categoria_linea_convocatoria
                  ? datos.categoria_linea_convocatoria.map((data) => {
                      console.log(data);
                      return ` ${data.text} `;
                    })
                  : null}
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
                {datos.tipo_participante
                  ? TiposIdentificacion.filter((data) => data.value === datos.tipo_participante)[0].text
                  : null}
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding-bottom">
          <Grid.Column>
            <label className="font-size-14px font-family-Montserrat-Regular font-color-000000">
              Documentos técnicos
            </label>
            <Table
              columns={columnasDocumentaciontecnicaModal}
              dataSource={datos.documentosTecnicos}
              scroll={{ x: 800, y: 300 }}
              size="large"
              rowClassName="sizeTable table-row"
              bordered={false}
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
        <ButtonPrimary labelButton="Enviar" actionButton={actionButton} />
      </Modal.Actions>
    </Modal>
  );
}
