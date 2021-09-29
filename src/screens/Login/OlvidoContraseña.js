import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Image, Header, Input, Button, Grid } from "semantic-ui-react";
import loginimage from "../../assets/login.png";
import logo from "../../assets/escudoAlcaldia.png";

export default function OlvidoContraseña() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");

  function enviarCorreo() {
    console.log("enviando correo electronico");
    history.push("/");
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
              <Form.Field className="container-center" >
                <Image className="image-logo-container-login" src={logo} />
              </Form.Field>
              <Form.Field>
                <Header as="h2" className="sub-header-login">
                  Convocatorias de fomento y estimulos para el arte y la cultura
                  <Header.Subheader className="sub-header-login">Ingrese el correo electrónico</Header.Subheader>
                </Header>
              </Form.Field>
              <Form.Field className="container-inputs-login usuario-item-login">
                <label>Email</label>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} />
              </Form.Field>
              <Form.Field className="container-space-between">
                <Button color="black" className="boton-ingresar-login" onClick={() => history.push("/")}>
                  Regresar
                </Button>
                <Button color="blue" className="boton-ingresar-login" onClick={enviarCorreo}>
                  Enviar
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
