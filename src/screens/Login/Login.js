import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user_token } from "../../store/actions/userAction";
import axios from "axios";
import { Form, Image, Header, Input, Checkbox, Button, Grid, Divider } from "semantic-ui-react";
import loginimage from "../../assets/login.png";
import logo from "../../assets/escudoAlcaldia.png";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialState = {
    idusuario: "",
    contraseña: "",
    tipopassword: "password",
    disbledIngresar: false,
    buttonVER: "button-contraseña-login-hide",
  };

  const initialerrorState = {
    idusuario: false,
    contraseña: false,
  };

  const initialBorderState = {
    idusuario: "border-color-707070",
    contraseña: "border-color-707070",
  };

  const [principalState, setPrincipalState] = React.useState(initialState);
  const [errorState, setErrorState] = React.useState(initialerrorState);
  const [borderState, setBoderState] = React.useState(initialBorderState);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const onChangeInput = (e) => {
    setBoderState({ ...borderState, [e.target.name]: "border-color-707070" });
    setErrorState({ ...errorState, [e.target.name]: false });
    return setPrincipalState({ ...principalState, [e.target.name]: e.target.value });
  };

  const ingresarUsuario = async () => {
    let idusuario = principalState.idusuario;
    let contraseña = principalState.contraseña;
    let error = 0;
    let arrayErrores = initialerrorState;
    let arrayBordes = initialBorderState;

    if (principalState.idusuario.trim() === "") {
      error++;
      arrayBordes = {
        ...arrayBordes,
        idusuario: "border-color-AD0808",
      };
      arrayErrores = {
        ...arrayErrores,
        idusuario: true,
      };
    }

    if (principalState.contraseña.trim() === "") {
      error++;
      arrayBordes = {
        ...arrayBordes,
        contraseña: "border-color-AD0808",
      };
      arrayErrores = {
        ...arrayErrores,
        contraseña: true,
      };
    }

    if (error > 0) {
      setBoderState(arrayBordes);
      return setErrorState(arrayErrores);
    }

    try {
      let token = await axios.post(`${process.env.REACT_APP_SERVER_USER}autenticacion`, {
        idusuario,
        contraseña,
      });
      console.log(token)
      localStorage.setItem("token", token.data);

      dispatch(user_token(token.data));
      history.push('/Administrador');

    } catch (error) {
      setIsLoginFailed(true);
      console.error(error);
    }
  };

  function mostrarContraseña() {
    if (principalState.contraseña.trim() === "") return;
    if (principalState.tipopassword.trim() === "input") {
      return setPrincipalState({
        ...principalState,
        tipopassword: "password",
        buttonVER: "button-contraseña-login-hide",
      });
    }

    return setPrincipalState({ ...principalState, tipopassword: "input", buttonVER: "button-contraseña-login-show" });
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
                <Header
                  as="h2"
                  className="font-color-632264 font-size-14px font-family-Montserrat-Thin texto-alineado-centro"
                >
                  Convocatorias de fomento y estimulos para el arte y la cultura
                </Header>
                <Header className="font-family-Montserrat-Bold font-size-14px">
                  Ingrese sus datos para inciar sesión
                </Header>
              </Form.Field>
              <Form.Field className="container-inputs-login usuario-item-login">
                <label className="font-color-4B4B4B font-size-12px">Numero de identificación</label>
                <Input
                  name="idusuario"
                  onChange={onChangeInput}
                  value={principalState.idusuario}
                  className={borderState.idusuario}
                />
                {errorState.idusuario ? (
                  <Header style={{ paddingTop: "3%" }} className="font-size-10px font-color-AD0808 no-margin">
                    Campo obligatorio
                  </Header>
                ) : null}
              </Form.Field>
              <Form.Field className="container-inputs-login">
                <label className="font-color-4B4B4B font-size-12px">Digite su contraseña</label>
                <Input
                  name="contraseña"
                  onChange={onChangeInput}
                  value={principalState.contraseña}
                  className={borderState.contraseña}
                  type={principalState.tipopassword}
                  action={<Button className={principalState.buttonVER} content="VER" onClick={mostrarContraseña} />}
                />
                {errorState.contraseña ? (
                  <Header style={{ paddingTop: "3%" }} className="font-size-10px font-color-AD0808 no-margin">
                    Campo obligatorio
                  </Header>
                ) : null}
              </Form.Field>
              <Form.Field className="container-checkbox-login">
                <Checkbox
                  label="Recordar datos de acceso"
                  className="sub-container-checkbox-login checkbox-login font-family-Montserrat-Regular font-size-12px"
                />
              </Form.Field>

              {isLoginFailed &&
                <Header style={{ paddingTop: "3%" }} className="font-size-10px font-color-AD0808 no-margin">
                  Identificación o contraseña incorrectos
                </Header>
              }

              <Form.Field className="container-space-between" style={{ paddingTop: "10%", paddingBottom: "10%" }}>
                <Button
                  basic
                  color="blue"
                  className="boton-ingresar-login"
                  onClick={() => history.push("/CrearUsuario")}
                >
                  Registrarse
                </Button>
                <Button
                  disabled={principalState.disbledIngresar}
                  color="blue"
                  className="boton-ingresar-login"
                  onClick={ingresarUsuario}
                >
                  Ingresar
                </Button>
              </Form.Field>
              <Divider clearing />
              <Header
                as="h2"
                className="font-color-632264 font-size-12px font-family-Montserrat-Thin texto-alineado-centro"
              >
                ¿Olvido la contraseña?&nbsp;&nbsp;&nbsp;&nbsp;
                <a>Recupérala AQUI</a>
              </Header>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
