import React from "react";
import { DocumentosTecnicos } from "./DocumentosTecnicos";
import { DocumentosAdministrativos } from "./DocumentosAdministrativos";
import { Container, Tab, Grid, Breadcrumb, Icon, Header } from "semantic-ui-react";

export const CargarDocumentos = () => {
  const panes = [
    {
      menuItem: "Documento Técnicos",
      render: () => <DocumentosTecnicos attached={false} />,
    },
    {
      menuItem: "Documentos Administrativos",
      render: () => <DocumentosAdministrativos attached={false} />,
    },
  ];

  return (
    <React.Fragment>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "2%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Crear convocatoria
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Nombre convocatoria
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin background-color-FFFFFF">
        <Header
          floated="left"
          className="font-color-000000 font-family-Montserrat-SemiBold font-size-14px font-weight-600"
          style={{ paddingTop: "2%", paddingLeft: "3.6%", paddingBottom: "1%" }}
        >
          Cargar documentos -{" "}
          <span className="font-color-DB2828 font-size-10px no-margin font-family-Montserrat-Regular font-weight-normal">Todos los formatos son obligatorios</span>
        </Header>
      </Grid>
      <Grid className="no-margin">
        <Tab style={{ paddingLeft: "0", width: "100%", paddingRight: '0' }} menu={{ secondary: true, pointing: true }} panes={panes} />
      </Grid>
    </React.Fragment>
  );
};
