import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
// RUTAS
import Navbar from "../components/NavBar";

// CONVOCATORIAS
import { AdminConvocatorias } from "../screens/Convocatoria/Convocatorias/adminConvicatoria";
import { InfoConvocatoria } from "../screens/Convocatoria/Convocatorias/InfoConvocatoria";
import { CronogramaActividades } from "../screens/Convocatoria/Actividades/CronogramaActividades";
import { Cronograma } from "../screens/Convocatoria/Cronograma/Cronograma";
import { Documentos } from "../screens/Convocatoria/Documentos/Documentos";
import { DocumentacionTecnica } from "../screens/Convocatoria/Documentacion/documentacionTecnica";
import { DocumentacionConvocatoria } from "../screens/Convocatoria/Documentacion/documentacionGeneral";

// PARTICIPANTES
import { Inscripcion } from "../screens/Participantes/InscripcionParticipantes/Inscripcion";
import { SeleccionarRoles } from "../screens/Participantes/SeleccionarRoles/SeleccionarRoles";
import { AgregarPaticipante } from "../screens/Participantes/AgregarParticiantes/AgregarPaticipante";
import { BuscarConvocatoria } from "../screens/Participantes/BuscarConvocatoria/BuscarConvocatoria";
import { PersonaNatural } from "../screens/Participantes/InscripcionParticipantes/PersonaNatural";
import { PersonaJuridica } from "../screens/Participantes/InscripcionParticipantes/PersonaJuridica";
import { GrupoConformado } from "../screens/Participantes/InscripcionParticipantes/GrupoConformado";
import { HomeParticipantes } from "../screens/Participantes/HomeParticipantes/HomeParticipantes";

// Menu de usuario
import { Grid, Icon } from "semantic-ui-react";

export default function AdminRouter() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7FBFF" }}>
        <div style={{ flex: "0 0 240px" }}>
          <Navbar />
        </div>
        <div style={{ flex: 1 }}>
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
          <Route path="/Administrador/bucarConvocatoria">
            <BuscarConvocatoria />
          </Route>
          <Route path="/Administrador/Inscripcion">
            <Inscripcion />
          </Route>
          <Route path="/Administrador/agregarParticipantes">
            <AgregarPaticipante />
          </Route>
          <Route path="/Administrador/personaNatural">
            <PersonaNatural />
          </Route>
          <Route path="/Administrador/personaJuridica">
            <PersonaJuridica />
          </Route>
          <Route path="/Administrador/grupoConformado">
            <GrupoConformado />
          </Route>
          <Route path="/Administrador/seleccionarRol">
            <SeleccionarRoles />
          </Route>
          <Route path="/Administrador/Homeparticipantes">
            <HomeParticipantes />
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
}
