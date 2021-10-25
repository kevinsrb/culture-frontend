import React, { useEffect, useState } from "react";
import axios from "axios";
import { ObjConstanst } from "../../../config/utils/constanst";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Divider,
  Segment,
  Input,
  Checkbox,
  Label,
  Breadcrumb,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { useHistory } from "react-router";
// import { editarConvocatoria } from "../../store/actions/convocatoriaAction";

export const CronogramaActividades = () => {
  const stateError = {
    apertura: false,
    cierre: false,
    otorgamiento: false,
  };
  const [principalError, setPrincipalError] = useState(stateError);
  const [actividades, setActividades] = useState([]);
  const [actividadessource, setActividadessource] = useState([]);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const history = useHistory();

  useEffect(() => {
    handleCargarActividades();
  }, []);

  const handleCargarActividades = async () => {
    return await axios
      .get(`${process.env.REACT_APP_SERVER_CONV}actividades`)
      .then(({ data }) => {
        let actividadesmap = data.data.map((ds) => {
          return {
            idactividad: ds.idactividad,
            nombre: ds.nombre,
            check: false,
            key: ds.idactividad,
          };
        });
        let todoJSON = JSON.parse(JSON.stringify(actividadesmap));
        for (var i in todoJSON) {
          if (
            todoJSON[i].nombre.trim() === "Apertura" ||
            todoJSON[i].nombre.trim() === "Cierre" ||
            todoJSON[i].nombre.trim() === "Resolución de otorgamiento"
          ) {
            todoJSON[i].check = !todoJSON[i].check;
          }
        }
        setActividades(todoJSON);
        setActividadessource(todoJSON);
        if (editarConvocatoria !== undefined) {
          return obtenerConvocatoria();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const obtenerConvocatoria = async () => {
    let convocatoria = await axios
      .get(
        `${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${editarConvocatoria.idnumero_convocatoria}`
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch(function (error) {
        console.console.error(error);
      });
    console.log(convocatoria);
  };

  const handletoggleChange = (event, result, actividad, index) => {
    let actividadChange = JSON.parse(JSON.stringify(actividades));
    actividadChange[index].check = !actividadChange[index].check;
    if (actividad.nombre.trim() === "Apertura" && actividadChange[index].check) {
      setPrincipalError({ ...principalError, apertura: false });
    }
    if (actividad.nombre.trim() === "Cierre" && actividadChange[index].check) {
      setPrincipalError({ ...principalError, cierre: false });
    }
    if (actividad.nombre.trim() === "Resolución de otorgamiento" && actividadChange[index].check) {
      setPrincipalError({ ...principalError, otorgamiento: false });
    }
    return setActividades(actividadChange);
  };

  const handelGuardarActiviadesConvocatorias = async () => {
    let actividadesSeleccionadas = actividades.filter((data) => data.check);
    let apertura = actividades.filter((data) => data.nombre === "Apertura" && data.check === true);
    let cierre = actividades.filter((data) => data.nombre === "Cierre" && data.check === true);
    let otorgamiento = actividades.filter(
      (data) => data.nombre === "Resolución de otorgamiento" && data.check === true
    );
    let arrayErrores = stateError;
    let error = false;
    if (apertura.length === 0) {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        apertura: true,
      };
    }

    if (cierre.length === 0) {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        cierre: true,
      };
    }

    if (otorgamiento.length === 0) {
      error = true;
      arrayErrores = {
        ...arrayErrores,
        otorgamiento: true,
      };
    }

    if (error) {
      return setPrincipalError(arrayErrores);
    }

    const objActividades = {
      actividades: actividadesSeleccionadas,
    };

    return await axios
      .post(`${process.env.REACT_APP_SERVER_CONV}convocatorias/actividades/${idConvocatoria}`, objActividades)
      .then(({ data }) => {
        ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        history.push("/Administrador/cronograma");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const filtradodeinformacion = (e) => {
    if (e.target.value === "") {
      return setActividades(actividadessource);
    }
    let filtrado = actividades.filter((data) => data.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0);
    return setActividades(filtrado);
  };

  const seleccionarTodo = () => {
    let todoJSON = JSON.parse(JSON.stringify(actividades));
    for (var i in todoJSON) {
      if (todoJSON[i]) {
        todoJSON[i].check = !todoJSON[i].check;
      }
    }
    return setActividades(todoJSON);
  };

  const backComponente = () => {
    history.push("/Administrador/infoConvocatorias");
  };

  return (
    <>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Crear convocatoria
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin">
        <Grid.Column
          className="background-color-6DA3FC-opacity-025 no-margin"
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2% !important" }}
        >
          <span className="font-color-1B1C1D font-size-14px">Crear convocatoria :</span>
          <Dropdown
            text={<span className="font-color-1B1C1D font-family-Montserrat-Regular">Cronograma</span>}
            icon={
              <Icon style={{ float: "right", paddingLeft: "5%" }} className="font-color-1FAEEF" name="angle down" />
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Información General
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Cronograma</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Doc. Administrativos
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. Técnicos</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. General</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Públicación</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%", padding: '2%' }}>
          <Form size="large" onSubmit={handelGuardarActiviadesConvocatorias} clasname="formulario">
            <Segment className="segment-shadow" style={{ paddingLeft: '3%', paddingRight: '3%' }}>
              <Header as="h4" floated="right" style={{ marginBottom: "0.5%" }}>
                <span className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px">
                  Codigo de convocatoria {idConvocatoria}
                </span>
              </Header>
              <Header as="h4" style={{ marginBottom: "0.5%" }} floated="left">
                Seleccionar actividades
              </Header>

              <Divider clearing style={{ marginTop: "0", marginBottom: "2%" }} />

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Input icon="search" placeholder="Buscar Nombre/Código..." fluid onChange={filtradodeinformacion} />
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row style={{ paddingBottom: "0.3%" }}>
                  <Grid.Column>
                    <label className="font-color-4B4B4B font-size-12px">Seleccionar actividades</label>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h4" floated="right">
                      <Form.Checkbox
                        onChange={seleccionarTodo}
                        label={<label className="font-color-4B4B4B font-size-13px font-weight-600">Seleccionar todo</label>}
                        name="dinamico"
                      />
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Segment className="container_checks">
                <Grid columns={2} style={{ paddingTop: '1%' }}>
                  {actividades.length > 0
                    ? actividades.map((actividad, index) => (
                        <Grid.Column className="checkbox-padding" key={index}>
                          <Checkbox
                            label={<label className="font-color-4B4B4B font-family-Work-Sans font-size-12px font-weight-normal">{actividad.nombre}</label>}
                            key={actividad.key}
                            value={actividad.idactividad}
                            name={actividad.nombre}
                            checked={actividad.check}
                            className="check"
                            onChange={(event, result) => handletoggleChange(event, result, actividad, index)}
                          />
                        </Grid.Column>
                      ))
                    : null}
                </Grid>
              </Segment>

              {principalError.apertura ? <Label color="red">Falta seleccionar la Apertura</Label> : null}
              {principalError.cierre ? <Label color="red">Falta seleccionar el Cierre</Label> : null}
              {principalError.otorgamiento ? (
                <Label color="red">Falta seleccionar la Resolución de otorgamiento</Label>
              ) : null}

              <Container textAlign="right">
                <Button content="Guardar y continuar" className="btn btn-disable font-color-B0B0B0 background-color-E0E1E2" />
              </Container>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button className="font-size-12px button-back" onClick={backComponente}>
            Atrás
          </Button>
        </Grid.Row>
      </Grid>
    </>
  );
};
