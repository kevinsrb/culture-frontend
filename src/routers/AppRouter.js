import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CreateNotice from "../screens/Notices/CreateNotice";
import { InfoConvocatoria } from "../screens/Convocatorias/InfoConvocatoria";
import { Cronograma } from "../screens/Cronograma/Cronograma";
import { CreateCategoria } from "../screens/Categorias/CreateCategoria";
import { CronogramaActividades } from "../screens/Actividades/CronogramaActividades";
import { AdminConvocatorias } from "../screens/Convocatorias/adminConvicatoria";
import OlvidoContraseña from "../screens/Login/OlvidoContraseña";
import CrearUsuario from "../screens/Login/CrearUsuario";
import Navbar from "../components/NavBar";
import Home from "../screens/Home";
import { DocumentacionTecnica } from "../screens/Documentacion/documentacionTecnica";
import { DocumentacionConvocatoria } from "../screens/Documentacion/documentacionGeneral";
import { CargarArchivos } from "../screens/CargarArchivos/CargarArchivos";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { consultarIdConvocatoria } from '../store/actions/convocatoriaAction'
import { Documentos } from "../screens/Documentos/Documentos";
import { PublicarConvocatoria } from "../screens/Convocatorias/publicarConvocatoria";
import { AdminMaestras } from "../screens/Maestras/Maestros";
import { VentanaCreacionMaestras } from "../screens/Maestras/creandoMaestros";


export const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(consultarIdConvocatoria());
  }, [dispatch]);

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
          <Route path="/adminMaestras">
            <Navbar />
            <AdminMaestras />
          </Route>
          <Route path="/seleccionarMaestra">
            <Navbar />
            <VentanaCreacionMaestras />
          </Route>
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
