import React from "react";
import { Segment, Modal, Button, Header, Grid, Form, Select, Input, Checkbox, Icon } from "semantic-ui-react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import es from "date-fns/locale/es";
import styled from "@emotion/styled";
// import Actividades from "./../../../Actividades.json";

import "@fullcalendar/timegrid/main.css";
import "semantic-ui-css/semantic.min.css";
import "@fullcalendar/daygrid/main.css";

registerLocale("es", es);

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
  }
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button {
    background: white;
    color: #632264;
    border-color: #632264;
  }
  .fc-button.fc-button-primary.fc-button-active {
    background: #632264;
  }
  .fc-toolbar-title {
    text-transform: capitalize;
  }
  .fc-col-header-cell.fc-day.fc-day-sun,
  .fc-col-header-cell.fc-day.fc-day-mon,
  .fc-col-header-cell.fc-day.fc-day-tue,
  .fc-col-header-cell.fc-day.fc-day-wed,
  .fc-col-header-cell.fc-day.fc-day-thu,
  .fc-col-header-cell.fc-day.fc-day-fri,
  .fc-col-header-cell.fc-day.fc-day-sat {
    background: #632264;
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
`;

export const Cronograma = () => {
  const CalendarRef = React.useRef();
  const [actividad, setActividad] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openDatepicker1, setOpenDatepicker1] = React.useState(false);
  const [openDatepicker2, setOpenDatepicker2] = React.useState(false);
  const [startDate1, setStartDate1] = React.useState(new Date());
  const [startDate2, setStartDate2] = React.useState(new Date());
  const [verFechas, setVerFechas] = React.useState(true);
  const [verHoras, setVerHoras] = React.useState(true);
  const [fechaClickeada, setFechaClickeada] = React.useState('');
  // FECHA DE INICIO
  const [fechainiciodia, setFechainiciodia] = React.useState(moment().format("DD"));
  const [fechainiciomes, setFechainiciomes] = React.useState(moment().format("MM"));
  const [fechainicioaño, setFechainicioaño] = React.useState(moment().format("YYYY"));
  // FECHA DE FINALIZACION
  const [fechafinaldia, setFechafinaldia] = React.useState(moment().endOf("month").format("DD"));
  const [fechafinalmes, setFechafinalmes] = React.useState(moment().format("MM"));
  const [fechafinalaño, setFechafinalaño] = React.useState(moment().format("YYYY"));
  //  HORA FINAL
  const [hora, setHora] = React.useState("");
  const [minuto, setMinuto] = React.useState("");
  // EVENTOS
  const [eventosCalendario, setEventosCalendar] = React.useState([]);

  function onFechaSeleccionada1(e) {
    setStartDate1(e);
    let fecha = moment(e).format("YYYYMMDD");
    let dia = fecha.substring(6, 8);
    let mes = fecha.substring(4, 6);
    let año = fecha.substring(0, 4);
    console.log(año, mes, dia, "fecha1 que llega");
    setFechainiciodia(dia);
    console.log(fechainiciodia);
    setFechainiciomes(mes);
    console.log(fechainiciomes);
    setFechainicioaño(año);
    console.log(fechainicioaño);
    setOpenDatepicker1(false);
  }
  function onFechaSeleccionada2(e) {
    setStartDate2(e);
    let fecha = moment(e).format("YYYYMMDD");
    console.log(fecha, `${fechainicioaño}${fechainiciomes}${fechainiciodia}`, "fecha 2 tomada");
    if (parseInt(`${fechainicioaño}${fechainiciomes}${fechainiciodia}`) > parseInt(fecha)) {
      console.error("FECHA INVALIDA");
    }
    setFechafinaldia(fecha.substring(6, 8));
    setFechafinalmes(fecha.substring(4, 6));
    setFechafinalaño(fecha.substring(0, 4));
    setOpenDatepicker2(false);
  }
  function grabarActividades() {
    setOpen(false);
    let id = eventosCalendario.length;
    if (hora.trim() === "") setHora("00");
    if (minuto.trim() === "") setMinuto("00");
    // setEventosCalendar([{ id:id,  title:actividad, start: `${fechainicioaño}-${fechainiciomes}-${fechainiciodia} 06:00`, end: `${fechafinalaño}-${fechafinalmes}-${fechafinaldia} ${hora}:${minuto}` , allDay: false }])
    const calendarApi = CalendarRef.current.getApi();
    calendarApi.addEvent({
      id: id,
      title: actividad,
      start: `${fechainicioaño}-${fechainiciomes}-${fechainiciodia} 06:00`,
      end: `${fechafinalaño}-${fechafinalmes}-${fechafinaldia} ${hora}:${minuto}`,
      allDay: false,
    });
  }
  return (
    <div>
      <Segment>
        <StyleWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            droppable={true}
            locale="es"
            height={450}
            headerToolbar={{
              start: "title",
              center: "dayGridMonth,timeGridWeek,timeGridDay",
              end: "today prev,next",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
            dateClick={(info) => {
              let fecha = moment(info.date).format('YYYY-MM-DD');
              setFechaClickeada(fecha);
              setOpen(true);
            }}
            events={eventosCalendario}
            eventColor="blue"
            ref={CalendarRef}
          />
        </StyleWrapper>
      </Segment>
      <Modal open={open} size="large">
        <Modal.Description className="container-modal-description">
          <div className="container-titulos-modal-actividades">
            <Header as="h2">
              Seleccionar Actividades
              <Header.Subheader>Seleccionar las actividades que se van a asignar</Header.Subheader>
            </Header>
          </div>
          <Header sub>Lista de actividades</Header>
          <Select
            fluid
            label="Gender"
            options={options}
            placeholder="Actividades"
            onChange={(e, { value }) => setActividad(value.toString())}
          />
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
                      onMouseOver={() => setOpenDatepicker1(true)}
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
                      onMouseOver={() => setOpenDatepicker2(true)}
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
            <Button className="botones-redondos" color="blue" onClick={grabarActividades}>
              Asignar Actividades
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
