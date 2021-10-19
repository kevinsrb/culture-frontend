import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CreateNotice from "../screens/Convocatoria/Notices/CreateNotice";
import { InfoConvocatoria } from "../screens/Convocatoria/Convocatorias/InfoConvocatoria";
import { Cronograma } from "../screens/Convocatoria/Cronograma/Cronograma";
import { CreateCategoria } from "../screens/Convocatoria/Categorias/CreateCategoria";
import { CronogramaActividades } from "../screens/Convocatoria/Actividades/CronogramaActividades";
import { AdminConvocatorias } from "../screens/Convocatoria/Convocatorias/adminConvicatoria";
import OlvidoContraseña from "../screens/Login/OlvidoContraseña";
import CrearUsuario from "../screens/Login/CrearUsuario";
import Navbar from "../components/NavBar";
import Home from "../screens/Home";
import { DocumentacionTecnica } from "../screens/Convocatoria/Documentacion/documentacionTecnica";
import { DocumentacionConvocatoria } from "../screens/Convocatoria/Documentacion/documentacionGeneral";
import { CargarArchivos } from "../screens/Convocatoria/CargarArchivos/CargarArchivos";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { consultarIdConvocatoria } from '../store/actions/convocatoriaAction'
import { Documentos } from "../screens/Convocatoria/Documentos/Documentos";
import { PublicarConvocatoria } from "../screens/Convocatoria/Convocatorias/publicarConvocatoria";
import { Inscripcion } from "../screens/Participantes/InscripcionParticipantes/Inscripcion";
import { SeleccionarRoles } from "../screens/Participantes/SeleccionarRoles/SeleccionarRoles";
import { AgregarPaticipante } from "../screens/Participantes/AgregarParticiantes/AgregarPaticipante";
import { BuscarConvocatoria } from "../screens/Participantes/BuscarConvocatoria/BuscarConvocatoria";


export const AppRouter = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/noticias">
            <Navbar />
            <CreateNotice />
          </Route>
          <Route path="/cargarArchivos">
            <Navbar />
            <CargarArchivos />
          </Route>
          <Route path="/infoconvocatorias">
            <Navbar />
            <InfoConvocatoria />
          </Route>
          <Route path="/cronograma">
            <Navbar />
            <Cronograma />
          </Route>
          <Route path="/createCategoria">
            <Navbar />
            <CreateCategoria />
          </Route>
          <Route path="/cronogramaActividades">
            <Navbar />
            <CronogramaActividades />
          </Route>
          <Route path="/adminconvocatorias">
            <Navbar />
            <AdminConvocatorias />
          </Route>
          <Route path="/documentos">
            <Navbar />
            <Documentos />
          </Route>
          <Route path="/documentacionTecnica">
            <Navbar />
            <DocumentacionTecnica />
          </Route>
          <Route path="/documentacionConvocatoria">
            <Navbar />
            <DocumentacionConvocatoria />
          </Route> 
          <Route path="/publicarConvocatoria">
            <Navbar />
            <PublicarConvocatoria />
          </Route>

          <Route path="/bucarConvocatoria">
            <Navbar />
            <BuscarConvocatoria />
          </Route>         
          <Route path="/Inscripcion">
            <Navbar />
            <Inscripcion />
          </Route>
          <Route path="/agregarParticipantes">
            <Navbar />
            <AgregarPaticipante />
          </Route>
          {/* <Route path="/adminMaestras">
            <Navbar />
            <AdminMaestras />
          </Route> */}
          {/* <Route path="/seleccionarMaestra">
            <Navbar />
            <VentanaCreacionMaestras />
          </Route> */}
          <Route path="/OlvidoContraseña">
            <OlvidoContraseña />
          </Route>
          <Route path="/CrearUsuario">
            <CrearUsuario />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
