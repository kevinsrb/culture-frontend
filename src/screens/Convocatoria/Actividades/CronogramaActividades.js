import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ObjConstanst } from "../../../config/utils/constanst";
import { Button, Container, Form, Grid, Header, Divider, Segment, Input, Checkbox } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { useHistory } from "react-router";

export const CronogramaActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [actividadessource, setActividadessource] = useState([]);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const history = useHistory();

  useEffect(() => {
    handleCargarActividades();
  }, []);

  const handleCargarActividades = async () => {
    return await axios
      .get(`${ObjConstanst.IP_CULTURE}actividades`)
      .then(({ data }) => {
        let actividadesmap = data.data.map((ds) => {
          return {
            idactividad: ds.idactividad,
            nombre: ds.nombre,
            check: false,
            key: ds.idactividad,
          };
        });
        setActividades(actividadesmap);
        setActividadessource(actividadesmap);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handletoggleChange = (event, result, actividad) => {
    let actividadChange = JSON.parse(JSON.stringify(actividades));
    actividadChange[actividad.idactividad - 1].check = !actividadChange[actividad.idactividad - 1].check;
    return setActividades(actividadChange);
  };

  const handelGuardarActiviadesConvocatorias = async () => {
    let actividadesSeleccionadas = actividades.filter((data) => data.check);
    const objActividades = {
      actividades: actividadesSeleccionadas,
    };

    return await axios
      .post(`${ObjConstanst.IP_CULTURE}convocatorias/actividades/${idConvocatoria}`, objActividades)
      .then(({ data }) => {
        ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        history.push("/Cronograma");
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
        todoJSON[i].check = !todoJSON[i].check
      }
    }
    return setActividades(todoJSON);
  }

  return (
    <>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Form size="large" onSubmit={handelGuardarActiviadesConvocatorias} clasname="formulario">
            <Segment>
              <Header as="h4" floated="right">
                <span className="codigo_convovcatoria">Codigo de convocatoria #: {idConvocatoria}</span>
              </Header>
              <Header as="h4" floated="left">
                Cronograma de actividades
              </Header>
              <Divider clearing />

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Input icon="search" placeholder="Codigo/Nombre" fluid onChange={filtradodeinformacion} />
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <label>Seleccionar actividades</label>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h4" floated="right">
                      <Form.Checkbox onChange={seleccionarTodo} label="Seleccionar todo" name="dinamico" />
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Segment className="container_checks">
                <Grid columns={2}>
                  {actividades.length > 0
                    ? actividades.map((actividad) => (
                        <Grid.Column>
                          <Checkbox
                            label={actividad.nombre}
                            key={actividad.key}
                            value={actividad.idactividad }
                            name={actividad.nombre}
                            checked={actividad.check}
                            className="check"
                            onChange={(event, result) => handletoggleChange(event, result, actividad)}
                          />
                        </Grid.Column>
                      ))
                    : null}
                </Grid>
              </Segment>

              <Container textAlign="right">
                <Button content="Guardar y continuar" className="btn btn-disable" />
              </Container>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};
