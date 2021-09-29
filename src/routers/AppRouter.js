import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CreateNotice from "../screens/Notices/CreateNotice";
import {InfoConvocatoria} from "../screens/Convocatorias/InfoConvocatoria";
import {Cronograma}  from "../screens/Cronograma/Cronograma";
import { CreateCategoria } from "../screens/Categorias/CreateCategoria";
import { CronogramaActividades } from "../screens/Actividades/CronogramaActividades";
import OlvidoContraseña from '../screens/Login/OlvidoContraseña';
import CrearUsuario from '../screens/Login/CrearUsuario';
import Navbar from "../components/NavBar";
import Home from "../screens/Home";
import { CargarArchivos } from "../screens/CargarArchivos/CargarArchivos";


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
        
        
    )
}
