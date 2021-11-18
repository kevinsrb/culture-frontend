import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { ObjConstanst } from "../../../config/utils/constanst";
import DatePicker, { registerLocale } from "react-datepicker";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Icon, Divider, Input, Label, Container } from "semantic-ui-react";
import { Radio } from "antd";
import { useHistory } from "react-router";

export const PublicarConvocatoria = () => {
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const history = useHistory();

  useEffect(() => {
    consultarConvocatoria();
  }, [idConvocatoria]);

  const inicialState = {
    numeroLinea: 0,
    nombre: "",
    publico: "",
  };

  const [lineaConvocatoriaState, setLineaConvocatoriaState] = useState(inicialState);

  const consultarConvocatoria = async () => {
    // let numero = 0;
    if (idConvocatoria !== undefined) {
      await axios
        .get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`)
        .then(({ data }) => {
          console.log(data);
          return setLineaConvocatoriaState({
            ...lineaConvocatoriaState,
            nombre: data.data.nombre_convocatoria,
            publico: data.data.publico,
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const publicarConvocatoria = async () => {
    // const arrfecha = [anio, mes, dia];
    // console.log(idConvocatoria);
    // let id_convocatoria = idConvocatoria;
    // await axios
    //   .post(`${ObjConstanst.IP_CULTURE}fechas`, {
    //     id_convocatoria,
    //     clave: "Fecha publicacion convocatoria",
    //     valormin: arrfecha.join("-"),
    //     valormax: null,
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    await ObjNotificaciones.MSG_SUCCESS("success", "Se han creado correctamnete la convocatoria");
    return history.push("/Administrador");
  };

  const handleInputChange = ({ target }) => {
    setLineaConvocatoriaState({
      ...lineaConvocatoriaState,
      [target.name]: target.value,
    });
  };

  return (
    <Container>
      <Segment className="segment-shadow" style={{ marginTop: "2%" }}>
        <Header as="h4" floated="right">
          <span className="codigo_convovcatoria"> Codigo de convocatoria #: {idConvocatoria} </span>
        </Header>
        <Header as="h4" floated="left">
          Publicar convocatoria
        </Header>
        <Divider clearing />
        <Grid>
          <Grid.Row className="container_publicar">
            <Grid.Column width={8}>
              <strong>{lineaConvocatoriaState.nombre}</strong>
            </Grid.Column>
            <Grid.Column width={4}>
              <label style={{ display: "inline-flex", paddingRight: "2%" }}>Previsualizar</label>
              <Button className="botones-acciones" icon="eye" />
            </Grid.Column>
            <Grid.Column width={3}>
              <Radio.Group name="publico" value={lineaConvocatoriaState.publico} onChange={handleInputChange}>
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Grid.Column>
          </Grid.Row>
          <Divider clearing />
          <Container textAlign="right">
            <Button content="Guardar y continuar" className="btn btn-primary padding-top-bottom-2" onClick={publicarConvocatoria} />
          </Container>
        </Grid>
      </Segment>
    </Container>
  );
};
