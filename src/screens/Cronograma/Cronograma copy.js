import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ObjConstanst } from "../../config/utils/constanst";

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
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

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
    rango_fechassi: true,
    rango_fechasno: false,
    hora_cierresi: true,
    hora_cierreno: false,
  };
  const [principalState, setPrincipalState] = React.useState(stateInitial);

  React.useEffect(() => {
    primerasFechas();
  }, []);

  async function primerasFechas() {
    let response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/1`);
    if (response.data.data.length === 0) return;

    return console.log(response);
    // let events = [
    //   ...eventosCalendario,
    //   {
    //     id: id,
    //     title: actividad.text,
    //     start: `${fechainicioaño}-${fechainiciomes}-${fechainiciodia} 06:00`,
    //     end: `${fechafinalaño}-${fechafinalmes}-${fechafinaldia} ${hora}:${minuto}`,
    //     allDay: false,
    //   },
    // ];
    // return setEventosCalendar(events);
  }

  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState([]);

  const { idConvocatoria } = useSelector((state) => state.convocatoria);

  let actividadesSeleccionadasMap = [];

  useEffect(() => {
    handelCargarActividadesSeleccionadas();
  }, []);

  function seleccionarActividad(event, result) {
    let seleccionada = result.options.filter((data) => data.value === result.value);
    console.log(seleccionada[0]);
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
      return console.error("falta diligenciar la actividad");
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
    let id_convocatoria = idConvocatoria;
    let calendaroptions = CalendarRef.current.getApi();
    let events = calendaroptions.getEvents();
    console.log(events.length, "total de eventos");
    if (events.length === 0) return;
    if (events[conteoFechas]) {
      try {
        await axios.post(`${ObjConstanst.IP_CULTURE}fechas`, {
          id_convocatoria,
          clave: events[conteoFechas].title,
          valormin: events[conteoFechas].start,
          valormax: events[conteoFechas].end,
        });
        conteoFechas++;
        console.log(conteoFechas);
        return grabarActividades();
      } catch (error) {
        return console.error(error);
      }
    }
    await ObjNotificaciones.MSG_SUCCESS("success", "Se han asociado las actividades al cronograma");
    return history.push("/documentos");
  }

  const handelCargarActividadesSeleccionadas = async () => {
    console.log(idConvocatoria);
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

        setActividadesSeleccionadas(actividadesSeleccionadasMap);
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

  return (
    <div style={{ padding: "2%" }}>
      <Segment style={{ paddingLeft: "3%", paddingRight: "3%" }}>
        <Header
          as="h4"
          className="font-size-14px font-color-1B1C1D font-family-Montserrat-SemiBold"
          style={{ marginBottom: "0.5%" }}
          floated="left"
        >
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
            fluid
            label="Gender"
            options={actividadesSeleccionadas}
            placeholder="Seleccionar..."
            onChange={seleccionarActividad}
            icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
          />
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column style={{ paddingTop: "1.5%" }}>
                <label className="font-color-454545 font-family-Montserrat-Regular font-size-12px">
                  Rango de Fechas
                </label>
                <Grid>
                  <Grid.Row style={{ paddingTop: "8%" }}>
                    <Grid.Column style={{ width:"20%" }}>
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
                    <Grid.Column style={{ paddingLeft: "15%" }}>
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
              <Grid.Column>
                <label>Fecha</label>
                <Grid>
                  <Grid.Row columns={4}>
                    <Grid.Column style={{ width:"20%" }}
                    >
                      <Input
                        placeholder="DD"
                        onChange={(e) => setFechainiciodia(e.target.value)}
                        maxLength="2"
                        fluid
                        value={fechainiciodia}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Input
                        placeholder="MM"
                        onChange={(e) => setFechainiciomes(e.target.value)}
                        maxLength="2"
                        fluid
                        value={fechainiciomes}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Input
                        placeholder="AAAA"
                        onChange={(e) => setFechainicioaño(e.target.value)}
                        maxLength="4"
                        fluid
                        value={fechainicioaño}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
          <div className="container-modal-fechas-checkbox">
            <Form className="container-fechas-modal-actividades">
              <div className="container-clasefecha-modal">
                {verFechas ? (
                  <React.Fragment>
                    <Form.Field className="primer-input-fecha">
                      <label>Inicio</label>
                      <Input
                        placeholder="DD"
                        onChange={(e) => setFechainiciodia(e.target.value)}
                        maxLength="2"
                        value={fechainiciodia}
                      />
                    </Form.Field>
                    <Form.Field className="input-container-sin-label">
                      <Input
                        placeholder="MM"
                        onChange={(e) => setFechainiciomes(e.target.value)}
                        maxLength="2"
                        value={fechainiciomes}
                      />
                    </Form.Field>
                    <Form.Field className="input-container-sin-label-año">
                      <Input
                        placeholder="AAAA"
                        onChange={(e) => setFechainicioaño(e.target.value)}
                        maxLength="4"
                        value={fechainicioaño}
                      />
                    </Form.Field>
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
                  </React.Fragment>
                ) : null}
              </div>
              <div className="container-clasefecha-modal">
                {verFechas ? (
                  <React.Fragment>
                    <Form.Field className="primer-input-fecha">
                      <label>Fin</label>
                      <Input
                        placeholder="DD"
                        onChange={(e) => setFechafinaldia(e.target.value)}
                        maxLength="2"
                        value={fechafinaldia}
                      />
                    </Form.Field>
                    <Form.Field className="input-container-sin-label">
                      <Input
                        placeholder="MM"
                        onChange={(e) => setFechafinalmes(e.target.value)}
                        maxLength="2"
                        value={fechafinalmes}
                      />
                    </Form.Field>
                    <Form.Field className="input-container-sin-label-año">
                      <Input
                        placeholder="AAAA"
                        onChange={(e) => setFechafinalaño(e.target.value)}
                        maxLength="4"
                        value={fechafinalaño}
                      />
                    </Form.Field>
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
                  </React.Fragment>
                ) : null}
              </div>
            </Form>
            <Form className="container-checkbox-modal-actividades">
              <Form.Field>
                <label>Rango de fechas</label>
                <Checkbox toggle onChange={() => setVerFechas(!verFechas)} checked={verFechas} />
              </Form.Field>
            </Form>
          </div>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <label className="font-color-454545 font-family-Montserrat-Regular font-size-12px">
                  Hora de Cierre
                </label>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
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
                    <Grid.Column style={{ paddingLeft: "15%" }}>
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
            </Grid.Row>
          </Grid>
          <div className="container-modal-fechas-checkbox">
            <Form className="container-fechas-modal-actividades">
              <div className="container-clasefecha-modal"></div>
              <div className="container-clasefecha-modal">
                {verHoras ? (
                  <React.Fragment>
                    <Form.Field className="input-container-horas">
                      <label>Hora</label>
                      <Input placeholder="HH" maxLength="2" onChange={(e) => setHora(e.target.value)} value={hora} />
                    </Form.Field>
                    <Form.Field className="input-container-horas">
                      <label>Minutos</label>
                      <Input
                        placeholder="MM"
                        maxLength="2"
                        onChange={(e) => setMinuto(e.target.value)}
                        value={minuto}
                      />
                    </Form.Field>
                  </React.Fragment>
                ) : null}
              </div>
            </Form>
            <Form className="container-checkbox-modal-actividades">
              <Form.Field>
                <label>Definir horario fin</label>
                <Checkbox toggle onChange={() => setVerHoras(!verHoras)} checked={verHoras} />
              </Form.Field>
            </Form>
          </div>
        </Modal.Description>
        <Modal.Actions>
          <Grid className="contenido-acciones-modal-actividades" centered>
            <Button className="botones-redondos" basic color="blue" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="botones-redondos" color="blue" onClick={adicionarActividad}>
              Asignar Actividades
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
