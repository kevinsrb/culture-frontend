import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from '../../../config/utils/constanst'

import {
  Segment,
  Modal,
  Button,
  Header,
  Grid,
  Form,
  Select,
  Input,
  Checkbox,
  Icon,
  Divider,
  Container,
} from "semantic-ui-react";
import es from "date-fns/locale/es";
import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fullcalendar/timegrid/main.css";
import "semantic-ui-css/semantic.min.css";
import "@fullcalendar/daygrid/main.css";
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";
import { edicionConvocatoria, idConvocatorias } from "../../../store/actions/convocatoriaAction";

registerLocale("es", es);

var conteoFechas = 0;

const options = [
  { key: 1, value: 1, text: "Observaciones a los lineamientos" },
  { key: 2, value: 2, text: "Observaciones al informe final de verificación de documentos" },
  { key: 3, value: 3, text: "Informe evaluación" },
  { key: 4, value: 4, text: "Cierre" },
  { key: 5, value: 5, text: "Observaciones al informe de evaluación" },
];

export const StyleWrapper = styled.div`
  .fc-button.fc-button-primary {
    background: white;
    color: #632264;
    border-color: #632264;
    padding-left: 17%;
    padding-right: 17%;
  }
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button {
    background: white;
    color: #632264;
    border-color: #632264;
    padding-left: 10px;
    padding-right: 10px;
  }
  .fc-button.fc-prev-button span,
  .fc-button.fc-next-button span {
    margin-left: 0;
  }
  .fc-button.fc-button-primary.fc-button-active {
    background: #632264;
    padding-top: 6%;
    padding-bottom: 6%;
    padding-left: 18%;
    padding-right: 18%;
  }
  .fc-toolbar-title {
    font-family: ""
    text-transform: capitalize;
    font-weight: normal;
    font-size: 22px;
    letter-spacing: 0px;
  }
  .fc-col-header-cell.fc-day.fc-day-sun,
  .fc-col-header-cell.fc-day.fc-day-mon,
  .fc-col-header-cell.fc-day.fc-day-tue,
  .fc-col-header-cell.fc-day.fc-day-wed,
  .fc-col-header-cell.fc-day.fc-day-thu,
  .fc-col-header-cell.fc-day.fc-day-fri,
  .fc-col-header-cell.fc-day.fc-day-sat {
    background: #632264;
    border-right: 1px solid #632264;
  }
  .fc-col-header-cell-cushion {
    color: white;
    text-transform: uppercase;
  }
  .fc-daygrid-day-number {
    color: black;
  }
  .fc-day-today.fc-daygrid-day-number {
    background: #632264;
  }
  .fc-time-grid .fc-content-skeleton {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }
  .fc-toolbar-chunk {
    width: 22%;
  }
  .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-top a {
    background: #632264;
    color: white;
    border-radius: 1rem;
  }
  .fc-today-button {
    border-radius: 19px;
    padding-left: 7% !important;
    padding-right: 7% !important;
  }
`;

export const Cronograma = () => {
  const CalendarRef = React.useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);

  const [actividad, setActividad] = React.useState({ text: "" });
  const [open, setOpen] = React.useState(false);
  const [openDatepicker1, setOpenDatepicker1] = React.useState(false);
  const [openDatepicker2, setOpenDatepicker2] = React.useState(false);
  const [startDate1, setStartDate1] = React.useState(new Date());
  const [startDate2, setStartDate2] = React.useState(new Date());
  const [verFechas, setVerFechas] = React.useState(true);
  const [verHoras, setVerHoras] = React.useState(true);
  const [fechaClickeada, setFechaClickeada] = React.useState("");
  // FECHA DE INICIO
  const [fechainiciodia, setFechainiciodia] = React.useState();
  const [fechainiciomes, setFechainiciomes] = React.useState();
  const [fechainicioaño, setFechainicioaño] = React.useState();
  // FECHA DE FINALIZACION
  const [fechafinaldia, setFechafinaldia] = React.useState();
  const [fechafinalmes, setFechafinalmes] = React.useState();
  const [fechafinalaño, setFechafinalaño] = React.useState();
  //  HORA FINAL
  const [hora, setHora] = React.useState("23");
  const [minuto, setMinuto] = React.useState("59");
  // EVENTOS
  const [eventosCalendario, setEventosCalendar] = React.useState([]);
  // PRINCIPAL STATE
  const stateInitial = {
    rango_fechassi: false,
    rango_fechasno: true,
    hora_cierresi: false,
    hora_cierreno: true,
    verFechas: false,
    verHoras: false,
    hora: "23",
    minuto: "59",
  };
  const stateErrores = {
    actividad: false,
  };
  const [principalState, setPrincipalState] = React.useState(stateInitial);
  const [errorState, setErrorState] = React.useState(stateErrores);
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState([]);

  React.useEffect(() => {
    handelCargarActividadesSeleccionadas();
  }, []);

  React.useEffect(() => {
    primerasFechas();
  }, []);

  async function primerasFechas() {
    if (editarConvocatoria === undefined) return;

    let response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/${idConvocatoria}`);
    if (response.data.data.length === 0) return;

    var events = [];
    if (response.data.data.fechas === null) return;
    for (var i in response.data.data.fechas) {
      let fechainicio = moment(response.data.data.fechas[i].valormin).format("YYYY-MM-DD HH:mm");
      let fechafin = moment(response.data.data.fechas[i].valormax).format("YYYY-MM-DD HH:mm");
      if (fechafin.trim() === "Invalid date") fechafin = null;
      if (response.data.data.fechas[i]) {
        events = [
          ...events,
          {
            id: i,
            title: response.data.data.fechas[i].clave,
            start: fechainicio,
            end: fechafin,
            allDay: true,
          },
        ];
      }
    }
    return setEventosCalendar(events);
  }

  let actividadesSeleccionadasMap = [];

  function seleccionarActividad(event, result) {
    let seleccionada = result.options.filter((data) => data.value === result.value);
    console.log(seleccionada[0]);
    setErrorState({ actividad: false });
    return setActividad(seleccionada[0]);
  }

  function onFechaSeleccionada1(e) {
    setStartDate1(e);
    let fecha = moment(e).format("YYYYMMDD");
    let dia = fecha.substring(6, 8);
    let mes = fecha.substring(4, 6);
    let año = fecha.substring(0, 4);
    console.log(año, mes, dia, "fecha1 que llega");
    setFechainiciodia(dia);
    setFechainiciomes(mes);
    setFechainicioaño(año);
    setOpenDatepicker1(false);
  }
  function onFechaSeleccionada2(e) {
    setStartDate2(e);
    let fecha = moment(e).format("YYYYMMDD");
    console.log(fecha, `${fechainicioaño}${fechainiciomes}${fechainiciodia}`, "fecha 2 tomada");
    if (parseInt(`${fechainicioaño}${fechainiciomes}${fechainiciodia}`) > parseInt(fecha)) {
      return console.error("FECHA INVALIDA");
    }
    setFechafinaldia(fecha.substring(6, 8));
    setFechafinalmes(fecha.substring(4, 6));
    setFechafinalaño(fecha.substring(0, 4));
    setOpenDatepicker2(false);
  }
  function adicionarActividad() {
    let id = eventosCalendario.length;
    const calendarApi = CalendarRef.current.getApi();
    if (actividad.text.trim() === "") {
      return setErrorState({ actividad: true });
    }
    calendarApi.unselect();
    setOpen(false);
    let events = [
      ...eventosCalendario,
      {
        id: id,
        title: actividad.text,
        start: `${fechainicioaño}-${fechainiciomes}-${fechainiciodia} 06:00`,
        end: `${fechafinalaño}-${fechafinalmes}-${fechafinaldia} ${hora}:${minuto}`,
        allDay: false,
      },
    ];
    setActividadesSeleccionadas(actividadesSeleccionadas.filter((i) => i !== actividad));
    return setEventosCalendar(events);
    // return calendarApi.addEvent({
    //   id: id,
    //   title: actividad.text,
    //   start: `${fechainicioaño}-${fechainiciomes}-${fechainiciodia} 06:00`,
    //   end: `${fechafinalaño}-${fechafinalmes}-${fechafinaldia} ${hora}:${minuto}`,
    //   allDay: false,
    // });
  }
  async function grabarActividades() {
    console.log("grabó");
    if (editarConvocatoria !== undefined)
      await axios.post(`${ObjConstanst.IP_CULTURE}convocatorias/fechas/${idConvocatoria}`);
    grabandoActividades();
  }

  const grabandoActividades = async () => {
    let id_convocatoria = idConvocatoria;
    let calendaroptions = CalendarRef.current.getApi();
    let events = calendaroptions.getEvents();
    if (events.length === 0) return;
    console.log(events, eventosCalendario, "estos son los eventos");
    if (events[conteoFechas]) {
      try {
        console.log("grabe", events[conteoFechas]);
        await axios.post(`${ObjConstanst.IP_CULTURE}fechas`, {
          id_convocatoria,
          clave: events[conteoFechas].title,
          valormin: events[conteoFechas].start,
          valormax: events[conteoFechas].end,
        });
        conteoFechas++;
        return grabandoActividades();
      } catch (error) {
        return console.error(error);
      }
    }
    await ObjNotificaciones.MSG_SUCCESS("success", "Se han asociado las actividades al cronograma");
    return history.push("/documentos");
  };

  const handelCargarActividadesSeleccionadas = async () => {
    return await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/actividades/${idConvocatoria}`)
      .then(({ data }) => {
        actividadesSeleccionadasMap = data.data.map((ds) => {
          return {
            key: ds.key,
            value: ds.idactividad,
            text: ds.nombre,
          };
        });
        if (eventosCalendario.length > 0) {
          console.log(eventosCalendario);
          for (var x in eventosCalendario) {
            console.log(eventosCalendario[x].title, actividadesSeleccionadas);
            let actividad = eventosCalendario[x].title;
            if (actividad !== "Fecha publicacion convocatoria") {
              setActividadesSeleccionadas(
                actividadesSeleccionadas.filter((data) => data.text.trim() !== actividad.trim())
              );
            }
          }
          return;
        } else {
          return setActividadesSeleccionadas(actividadesSeleccionadasMap);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    if (name === "rango_fechassi") {
      return setPrincipalState({ ...principalState, [name]: true, rango_fechasno: false, verFechas: true });
    }
    if (name === "rango_fechasno") {
      return setPrincipalState({ ...principalState, [name]: true, rango_fechassi: false, verFechas: false });
    }
    if (name === "hora_cierresi") {
      return setPrincipalState({ ...principalState, [name]: true, hora_cierreno: false, verHoras: true });
    }
    if (name === "hora_cierreno") {
      return setPrincipalState({ ...principalState, [name]: true, hora_cierresi: false, verHoras: false });
    }
  };

  const backComponente = () => {
    dispatch(edicionConvocatoria(true));
    console.log(idConvocatoria);
    dispatch(idConvocatorias(idConvocatoria));
    return history.push("/infoconvocatorias");
  };

  return (
    <div style={{ padding: "2%" }}>
      <Segment style={{ paddingLeft: "3%", paddingRight: "3%" }} className="segment-shadow">
        <Header
          as="h4"
          className="font-size-14px font-color-1B1C1D font-family-Montserrat-SemiBold"
          style={{ marginBottom: "0.5%" }}
          floated="left">
          Cronograma
        </Header>
        <Header as="h4" floated="right" style={{ marginBottom: "0.5%" }}>
          <span className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px">
            Codigo de convocatoria {idConvocatoria}
          </span>
        </Header>

        <Divider clearing style={{ marginTop: "0", marginBottom: "0%" }} />

        <StyleWrapper style={{ padding: "1%" }}>
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            droppable={true}
            locale="es"
            height={450}
            headerToolbar={{
              start: "timeGridDay,timeGridWeek,dayGridMonth",
              center: "title",
              end: "prev,next today",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
            dateClick={(info) => {
              setFechainicioaño(moment(info.date).format("YYYY"));
              setFechainiciomes(moment(info.date).format("MM"));
              setFechainiciodia(moment(info.date).format("DD"));
              return setOpen(true);
            }}
            events={eventosCalendario}
            eventColor="#1FAEEF"
            ref={CalendarRef}
          />
        </StyleWrapper>
        <Container textAlign="right">
          {/* <Button basic className="botones-redondos" color="blue" onClick={() => console.log("atras")}>
            Atras
          </Button> */}
          <Button className="botones-redondos" color="blue" onClick={grabarActividades}>
            Guardar y continuar
          </Button>
        </Container>
      </Segment>
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button basic color="blue" className="font-size-12px button-back" onClick={backComponente}>
            Atras
          </Button>
        </Grid.Row>
      </Grid>
      <Modal centered={false} open={open} size="small">
        <Modal.Description className="container-modal-description">
          <Header className="font-color-1B1C1D font-family-Montserrat-Regular font-size-14px">
            Selecciona la Actividad
          </Header>
          <Divider clearing style={{ marginTop: "0", marginBottom: "0%" }} />
          <Header
            style={{ marginTop: "1%", marginBottom: "0.5%" }}
            className="font-color-4B4B4B font-family-Montserrat-Regular font-size-12px"
          >
            Lista de Actividades
          </Header>
          <Select
            error={errorState.actividad}
            fluid
            label="Gender"
            options={actividadesSeleccionadas}
            placeholder="Seleccionar..."
            onChange={seleccionarActividad}
            icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
          />
          <Grid style={{ width: "100%" }}>
            <Grid.Row columns={3}>
              <Grid.Column style={{ paddingTop: "1.5%" }} width={4}>
                <label className="font-color-454545 font-family-Montserrat-Regular font-size-12px">
                  Rango de Fechas
                </label>
                <Grid>
                  <Grid.Row style={{ paddingTop: "14%" }}>
                    <Grid.Column style={{ width: "40%" }}>
                      <Form.Checkbox
                        className="font-color-4B4B4B"
                        radio
                        label="Si"
                        name="rango_fechassi"
                        value={principalState.rango_fechassi}
                        checked={principalState.rango_fechassi}
                        onChange={handletoggleChange}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: "2%" }}>
                      <Form.Checkbox
                        className="font-color-4B4B4B"
                        radio
                        label="No"
                        name="rango_fechasno"
                        value={principalState.rango_fechasno}
                        checked={principalState.rango_fechasno}
                        onChange={handletoggleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={6} style={{ paddingTop: "1.5%" }}>
                <label>Fecha</label>
                <Grid>
                  <Grid.Row columns={4}>
                    <Grid.Column width={4} className="column-without-padding-rigth">
                      <Input
                        placeholder="DD"
                        onChange={(e) => setFechainiciodia(e.target.value)}
                        maxLength="2"
                        fluid
                        value={fechainiciodia}
                      />
                    </Grid.Column>
                    <Grid.Column width={4} className="column-without-padding-rigth">
                      <Input
                        placeholder="MM"
                        onChange={(e) => setFechainiciomes(e.target.value)}
                        maxLength="2"
                        fluid
                        value={fechainiciomes}
                      />
                    </Grid.Column>
                    <Grid.Column width={5} className="column-without-padding-rigth">
                      <Input
                        placeholder="AAAA"
                        onChange={(e) => setFechainicioaño(e.target.value)}
                        maxLength="4"
                        fluid
                        value={fechainicioaño}
                      />
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign="middle">
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              {principalState.verFechas ? (
                <Grid.Column width={6} style={{ paddingTop: "1.5%" }}>
                  <label>Fecha</label>
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column width={4} className="column-without-padding-rigth">
                        <Input
                          placeholder="DD"
                          onChange={(e) => setFechafinaldia(e.target.value)}
                          maxLength="2"
                          fluid
                          value={fechafinaldia}
                        />
                      </Grid.Column>
                      <Grid.Column width={4} className="column-without-padding-rigth">
                        <Input
                          placeholder="MM"
                          onChange={(e) => setFechafinalmes(e.target.value)}
                          maxLength="2"
                          fluid
                          value={fechafinalmes}
                        />
                      </Grid.Column>
                      <Grid.Column width={5} className="column-without-padding-rigth">
                        <Input
                          placeholder="AAAA"
                          onChange={(e) => setFechafinalaño(e.target.value)}
                          maxLength="4"
                          fluid
                          value={fechafinalaño}
                        />
                      </Grid.Column>
                      <Grid.Column width={2} verticalAlign="middle">
                        <Icon
                          name="calendar alternate"
                          size="large"
                          color="blue"
                          className="icono-fechas-actividades"
                          onClick={() => setOpenDatepicker2(!openDatepicker2)}
                        />
                        {openDatepicker2 ? (
                          <div className="container-datepicker">
                            <DatePicker selected={startDate2} onChange={onFechaSeleccionada2} inline />
                          </div>
                        ) : null}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              ) : null}
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                <label className="font-color-454545 font-family-Montserrat-Regular font-size-12px">
                  Hora de Cierre
                </label>
                <Grid>
                  <Grid.Row style={{ paddingTop: "14%" }}>
                    <Grid.Column style={{ width: "40%" }}>
                      <Form.Checkbox
                        className="font-color-4B4B4B"
                        radio
                        label="Si"
                        name="hora_cierresi"
                        value={principalState.hora_cierresi}
                        checked={principalState.hora_cierresi}
                        onChange={handletoggleChange}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: "2%" }}>
                      <Form.Checkbox
                        className="font-color-4B4B4B"
                        radio
                        label="No"
                        name="hora_cierreno"
                        value={principalState.hora_cierreno}
                        checked={principalState.hora_cierreno}
                        onChange={handletoggleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              {principalState.verHoras ? (
                <Grid.Column width={6}>
                  <Grid className="no-padding">
                    <Grid.Row columns={3} style={{ paddingBottom: "0%" }}>
                      <Grid.Column width={5} className="column-without-padding-rigth">
                        <label>Hora</label>
                      </Grid.Column>
                      <Grid.Column width={5} className="column-without-padding-rigth">
                        <label>Minutos</label>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid>
                    <Grid.Row columns={3} style={{ paddingTop: "0%" }}>
                      <Grid.Column width={5} className="column-without-padding-rigth">
                        <Input
                          placeholder="HH"
                          onChange={(e) => setPrincipalState({ ...principalState, hora: e.target.value })}
                          maxLength="2"
                          fluid
                          value={principalState.hora}
                        />
                      </Grid.Column>
                      <Grid.Column width={5} className="column-without-padding-rigth">
                        <Input
                          placeholder="mm"
                          onChange={(e) => setPrincipalState({ ...principalState, minuto: e.target.value })}
                          maxLength="2"
                          fluid
                          value={principalState.minuto}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              ) : null}
            </Grid.Row>
          </Grid>
        </Modal.Description>
        <Modal.Actions>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button className="botones-redondos boton-cancelar-ghost" basic onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button className="botones-redondos" color="blue" onClick={adicionarActividad}>
                  Asignar Actividades
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
