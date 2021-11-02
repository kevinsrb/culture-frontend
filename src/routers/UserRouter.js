import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Grid, Icon } from "semantic-ui-react";
// RUTAS
import Navbar from "../components/NavBar";

// PARTICIPANTES
import { Inscripcion } from "../screens/Participantes/InscripcionParticipantes/Inscripcion";
import { SeleccionarRoles } from "../screens/Participantes/SeleccionarRoles/SeleccionarRoles";
import { AgregarPaticipante } from "../screens/Participantes/AgregarParticiantes/AgregarPaticipante";
import { BuscarConvocatoria } from "../screens/Participantes/BuscarConvocatoria/BuscarConvocatoria";
import { PersonaNatural } from "../screens/Participantes/InscripcionParticipantes/PersonaNatural";
import { PersonaJuridica } from "../screens/Participantes/InscripcionParticipantes/PersonaJuridica";
import { GrupoConformado } from "../screens/Participantes/InscripcionParticipantes/GrupoConformado";
import { HomeParticipantes } from "../screens/Participantes/HomeParticipantes/HomeParticipantes";
import { CargarDocumentos } from "../screens/Participantes/CargarDocumentos/CargarDocumentos";
import { AgregarLinks } from "../screens/Participantes/AgregarLinks/AgregarLinks";
import { Propuestas } from "../screens/Postulaciones/Propuestas/Propuestas";
import BuscarConvocatorias from "../screens/Participantes/BuscarConvocatoria/BuscarConvocatorias2";

export default function UserRouter() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7FBFF" }}>
        <div style={{ width: "100%" }}>
          <Route exact path="/Usuario/">
            <BuscarConvocatoria />
          </Route>
          <Route exact path="/Usuario/2">
            <BuscarConvocatorias />
          </Route>
          <Route exact path="/Usuario/Inscripcion">
            <Inscripcion />
          </Route>
          <Route exact path="/Usuario/Agregararticipantes">
            <AgregarPaticipante />
          </Route>
          <Route exact path="/Usuario/Personanatural">
            <PersonaNatural />
          </Route>
          <Route exact path="/Usuario/Personajuridica">
            <PersonaJuridica />
          </Route>
          <Route exact path="/Usuario/Grupoconformado">
            <GrupoConformado />
          </Route>
          <Route exact path="/Usuario/Seleccionarrol">
            <SeleccionarRoles />
          </Route>
          <Route exact path="/Usuario/Cargardocumentos">
            <CargarDocumentos />
          </Route>
          <Route exact path="/Usuario/AgregarLinks">
            <AgregarLinks />
          </Route>
          <Route exact path="/Usuario/Participantes">
            <HomeParticipantes />
          </Route>
          <Route exact path="/Usuario/misPropuestas">
            <Propuestas />
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
}
