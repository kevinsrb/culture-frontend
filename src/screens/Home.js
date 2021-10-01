import React from "react";
import { useHistory } from "react-router-dom";
import * as actions from './../store/actions/userAction';
import axios from "axios";
import { Form, Image, Header, Input, Checkbox, Button, Grid } from "semantic-ui-react";
import loginimage from "../assets/login.png";
import logo from "../assets/escudoAlcaldia.png";

export default function Home() {
  const history = useHistory();
  const [idusuario, setIdusuario] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [contenidopassword, setContenidopassword] = React.useState("VER");
  const [tipopassword, setTipoPassword] = React.useState("password");

  async function ingresarUsuario() {
    console.log("ingreso el usuario");
    try {
      let token = await axios.post(`${process.env.REACT_APP_PAGE_HOST}api/autenticacion`, {
        idusuario,
        contraseña,
      });
      localStorage.setItem('token', token.data)
      history.push('/adminconvocatorias')
    } catch (error) {
      console.error(error);
    }
  }
  function mostrarContraseña() {
    if (contraseña.trim() === "") return;
    if (contenidopassword.trim() === "VER") {
      setTipoPassword("input");
      setContenidopassword("OCULTAR");
    } else {
      setTipoPassword("password");
      setContenidopassword("VER");
    }
  }
  return (
    <div>
      <Grid columns={2} style={{ height: "100vh" }} className="no-margin">
        <Grid.Row className="no-padding-bottom no-padding-top">
          <Grid.Column className="no-padding-right no-padding-left">
            <Image className="image-container-login" src={loginimage} />
          </Grid.Column>
          <Grid.Column className="no-padding-right no-padding-left container-form-creacion-cuentas">
            <Form className="container-form-login">
              <Form.Field className="container-center">
                <Image className="image-logo-container-login" src={logo} />
              </Form.Field>
              <Form.Field>
                <Header as="h2" className="sub-header-login">
                  Convocatorias de fomento y estimulos para el arte y la cultura
                  <Header.Subheader className="sub-header-login">
                    Inicie sesion o registrese para acceder al sistema
                  </Header.Subheader>
                </Header>
              </Form.Field>
              <Form.Field className="container-inputs-login usuario-item-login">
                <label>Usuario</label>
                <Input onChange={(e) => setIdusuario(e.target.value)} value={idusuario} />
              </Form.Field>
              <Form.Field className="container-inputs-login">
                <label>Contraseña</label>
                <Input
                  onChange={(e) => setContraseña(e.target.value)}
                  value={contraseña}
                  type={tipopassword}
                  action={<Button basic color="blue" content={contenidopassword} onClick={mostrarContraseña} />}
                />
              </Form.Field>
              <Form.Field className="container-checkbox-login">
                <Checkbox label="Recordar" className="sub-container-checkbox-login checkbox-login" />
                <Header
                  size="small"
                  color="blue"
                  className="sub-container-checkbox-login login-olvido-contraseña"
                  onClick={() => history.push("/OlvidoContraseña")}
                >
                  ¿Olvido la contraseña?
                </Header>
              </Form.Field>
              <Form.Field className="container-flex-end">
                <Header size="small" color="blue" className="login-olvido-contraseña">
                  Valida tu código de verificación
                </Header>
              </Form.Field>
              <Form.Field className="container-space-between">
                <Button color="black" className="boton-ingresar-login" onClick={() => history.push("/CrearUsuario")}>
                  Registrarme
                </Button>
                <Button color="blue" className="boton-ingresar-login" onClick={ingresarUsuario}>
                  Ingresar
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
