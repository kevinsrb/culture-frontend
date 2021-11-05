import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
// RUTAS
import Navbar from "../components/NavBar";

// CONVOCATORIAS
import { AdminConvocatorias } from "../screens/Convocatoria/Convocatorias/adminConvicatoria";
import { InfoConvocatoria } from "../screens/Convocatoria/Convocatorias/InfoConvocatoria";
// import { CronogramaActividades } from "../screens/Convocatoria/Actividades/CronogramaActividades";
import { Cronograma } from "../screens/Convocatoria/Cronograma/Cronograma";
import { Documentos } from "../screens/Convocatoria/Documentos/Documentos";
import { DocumentacionTecnica } from "../screens/Convocatoria/Documentacion/documentacionTecnica";
import { DocumentacionConvocatoria } from "../screens/Convocatoria/Documentacion/documentacionGeneral";

// POSTULACIONES
import { GestionarPostulaciones } from "../screens/Postulaciones/GestionarPostulaciones/GestionarPostulaciones";
import GestionarDocumentosPostulacion from "../screens/Postulaciones/GestionarDocumentos/GestionarDocumentosPostulacion";
import { Propuestas } from "../screens/Postulaciones/Propuestas/Propuestas"; 

// Menu de usuario
import { Grid, Icon } from "semantic-ui-react";
import { VerificacionPropuestas } from "../screens/Postulaciones/VerificacionPropuestas/VerificacionPropuestas";
import { AdministrarJurados } from "../screens/Postulaciones/AdministrarJurados/AdministrarJurados";
import { CronogramaActividades } from "../screens/Convocatoria/Actividades/NewCronogramaActividades";

export default function AdminRouter() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7FBFF" }}>
        <div style={{ width: "18.75%" }}>
          <Navbar />
        </div>
        <div style={{ width: "81.25%" }}>
          <Grid className="menu-usuario-principal no-margin">
            <Grid.Row>
              <Grid.Column style={{ display: "flex", justifyContent: "flex-end" }}>
                <span className="font-family-Montserrat-Regular font-size-10px">Hola,</span>
                <span
                  className="font-family-Montserrat-Bold font-size-10px"
                  style={{ marginLeft: "0.2%", marginRight: "1%" }}
                >
                  Luisa María Sanchez Cadavid
                </span>
                <Icon name="bell" className="font-color-FF8900" />
                <span
                  className="font-family-Montserrat-SemiBold font-size-10px font-color-FF8900"
                  style={{ marginLeft: "0", marginRight: "1.5%" }}
                >
                  99+
                </span>
                <Icon name="bars" className="font-color-1FAEEF" size="large" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Route exact path="/Administrador/">
            <AdminConvocatorias />
          </Route>
          <Route exact path="/Administrador/infoconvocatorias">
            <InfoConvocatoria />
          </Route>
          <Route exact path="/Administrador/cronogramaActividades">
            <CronogramaActividades />
          </Route>
          <Route exact path="/Administrador/cronograma">
            <Cronograma />
          </Route>
          <Route exact path="/Administrador/documentos">
            <Documentos />
          </Route>
          <Route exact path="/Administrador/documentacionTecnica">
            <DocumentacionTecnica />
          </Route>
          <Route exact path="/Administrador/documentacionConvocatoria">
            <DocumentacionConvocatoria />
          </Route>
          <Route path="/Administrador/gestionarPostulaciones">
            <GestionarPostulaciones />
          </Route>
          <Route path="/Administrador/gestionarPostulacionesdocumentos">
            <GestionarDocumentosPostulacion />
          </Route>
          <Route path="/Administrador/verificacionPropuestas">
            <VerificacionPropuestas />
          </Route>
          <Route path="/Administrador/administrarJurados">
            <AdministrarJurados />
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
}
