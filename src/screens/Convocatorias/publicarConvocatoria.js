import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ObjConstanst } from "../../config/utils/constanst";
import DatePicker, { registerLocale } from "react-datepicker";
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";
import { Grid, Segment, Header, Form, Button, Icon, Divider, Input, Label, Container, Radio } from "semantic-ui-react";
import { useHistory } from 'react-router';


export const PublicarConvocatoria = () => {

  const {idConvocatoria} = useSelector(state => state.convocatoria)
  const history = useHistory();

  useEffect(() => {
    consultarConvocatoria();
  }, [idConvocatoria])

  const inicialState = {
    numeroLinea: 0,
    nombre: ''
  }

  const [lineaConvocatoriaState, setLineaConvocatoriaState] = useState(inicialState)
  const [startDate1, setStartDate1] = useState(new Date());
  const [openDatepicker1, setOpenDatepicker1] = useState(false);

  // FECHA DE INICIO
  const [dia, setDia] = useState();
  const [mes, setMes] = useState();
  const [anio, setAnio] = useState();
  const [fecha, setFecha] = useState();



  const consultarConvocatoria = async() => {
    let numero = 0;
    if(idConvocatoria !== undefined){
      await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`)
      .then(({ data }) => {
        numero = data.data.linea_convocatoria; 
      })
      .catch(function (error) {
        console.error(error);
      })
  
    if(lineaConvocatoriaState.numeroLinea !== undefined){
      console.log(numero)
      await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatoria/${numero}`)
        .then(({ data }) => {
          console.log(data.data)
          const { nombre } = data.data;
          setLineaConvocatoriaState({...lineaConvocatoriaState, nombre: nombre  }) 
        })
        .catch(function (error) {
          console.error(error);
        })
      }
    } 
  }

  const onFechaSeleccionada1 = (e) => {
    setStartDate1(e);
    let fecha = moment(e).format("YYYYMMDD");
    let dia = fecha.substring(6, 8);
    let mes = fecha.substring(4, 6);
    let anio = fecha.substring(0, 4);
    setDia(dia);
    setMes(mes);
    setAnio(anio);
    setFecha(fecha)
    setOpenDatepicker1(false);
  }

  const publicarConvocatoria = async() => {
    
    const arrfecha = [anio, mes, dia]
    console.log(idConvocatoria) 
    let id_convocatoria = idConvocatoria;
    await axios.post(`${ObjConstanst.IP_CULTURE}fechas`, {
      id_convocatoria,
      clave: 'Fecha publicacion convocatoria',
      valormin: arrfecha.join('-'),
      valormax: null,
    })
    .catch(function (error) {
      console.error(error);
    })

    await ObjNotificaciones.MSG_SUCCESS("success", "Se han creado correctamnete la convocatoria");
    return history.push("/adminconvocatorias");

  }



  return (
    <Container>
      <Segment>
        <Header as="h4" floated="right">
        <span className="codigo_convovcatoria"> Codigo de convocatoria #: {idConvocatoria} </span>
          </Header>
        <Header as="h4" floated="left">
          Publicar convocatoria
        </Header>
        <Divider clearing />
        <Grid>
          <Grid.Row className="container_publicar">
            <Grid.Column width={10}>
              <strong>{lineaConvocatoriaState.nombre}</strong>
            </Grid.Column>
            <Grid.Column width={2}>
              <label>Previsualizar</label>
              <Button className="botones-acciones" icon="eye" />
            </Grid.Column>
            <Grid.Column width={3}>
              <label>Fecha publicacion</label>
              <div className="container-fecha">
                <Input
                  placeholder="DD"
                  onChange={(e) => setDia(e.target.value)}
                  maxLength="2"
                  className="input_fechas"
                  value={dia}
                />
                <Input
                  placeholder="MM"
                  onChange={(e) => setMes(e.target.value)}
                  maxLength="2"
                  className="input_fechas"
                  value={mes}
                />
                <Input
                  placeholder="AAAA"
                  onChange={(e) => setAnio(e.target.value)}
                  maxLength="4"
                  className="input_fechas_anio"
                  value={anio}
                />
                <Icon
                  name="calendar alternate"
                  size="large"
                  color="blue"
                  className="icono-fechas-actividades"
                  onClick={() => setOpenDatepicker1(!openDatepicker1)}
                />
                {openDatepicker1 ? (
                  <div className="container-datepicker">
                    <DatePicker locale="es" selected={startDate1} onChange={onFechaSeleccionada1} inline />
                  </div>
                ) : null}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider clearing />
          <Container textAlign='right'>
              <Button 
                content='Guardar y continuar' 
                className="btn btn-primary"  
                onClick={ publicarConvocatoria }
               />
          </Container>
        </Grid>
      </Segment>
      
    </Container>
  )
}
