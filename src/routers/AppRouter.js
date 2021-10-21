import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import OlvidoContraseña from "../screens/Login/OlvidoContraseña";
import CrearUsuario from "../screens/Login/CrearUsuario";
import Login from "../screens/Login/Login";
import AdminRouter from "./AdminRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/OlvidoContraseña">
          <OlvidoContraseña />
        </Route>
        <Route path="/CrearUsuario">
          <CrearUsuario />
        </Route>
        <Route path="/Administrador">
          <AdminRouter />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
