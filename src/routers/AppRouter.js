import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CreateNotice from "../screens/Notices/CreateNotice";
import InfoConvocatoria from "../screens/Convocatorias/InfoConvocatoria";
import {Cronograma}  from "../screens/Cronograma/Cronograma";
import { CreateCategoria } from "../screens/Categorias/CreateCategoria";
import { CronogramaActividades } from "../screens/Actividades/CronogramaActividades";
import Navbar from "../components/NavBar";
import Home from "../screens/Home";

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route path="/noticias">
                        <CreateNotice />
                    </Route>
                    <Route path="/infoconvocatorias">
                        <InfoConvocatoria />
                    </Route>
                    <Route path="/cronograma">
                        <Cronograma />
                    </Route>
                    <Route path="/createCategoria">
                        <CreateCategoria />
                    </Route>
                    <Route path="/cronogramaActividades">
                        <CronogramaActividades />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
        
        
    )
}
