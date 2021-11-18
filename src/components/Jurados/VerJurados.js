import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
// import { ObjConstanst } from "../../config/utils/constanst";
import {
  Modal,
  Card,
  Button,
  Table,
  Tab,
  Header,
  Divider,
  List,
  CardContent,
  CardHeader,
  CardDescription,
  Icon,
} from "semantic-ui-react";

// import {
//   documentosConvocatoria,
//   idConvocatorias,
// } from "../../store/actions/convocatoriaAction";
// import {
//   categoriasLineasConvocatoria,
//   documentosAdministrativosCargados,
//   documentosTecnicosCargados,
//   fechasParticipantes,
//   idConvocatoriaSelecionada,
//   idPostulacion,
//   nombreConvocatoria,
// } from "../../store/actions/participantesAction";

export const VerJurados = ({ datos }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const {
    idconvocatorias,
    numero_convocatoria,
    descripcion_corta,
    documentos,
    categoria_linea_convocatoria,
    fechas,
  } = datos;
  // const { idParticipante } = useSelector((state) => state.participantes);

  const JuradosLista = [
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad Pontificia Bolivar",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad de Bellas Artes",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad Cooperativa de...",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad de Medellín",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad de Antioquia",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad de Palermo",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Universidad Sergio Arboleda",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Persona Jurídica",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Grupo Conformado",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
    {
      titulo: "Nombre título adquirido",
      nivelEducacion: "Nivel de educación",
      institucionEducativa: "Persona Natural",
      categoriasEspecificas: "Música popular, Formación en artes...",
    },
  ];

  // const crearPostulacion = async () => {
  //   const fechaApertura = fechas.filter((fec) => fec.clave == "Apertura");
  //   const postulante = {
  //     convocatoria_id: idconvocatorias,
  //     numero_documento_participante: idParticipante,
  //     nombre_convocatoria: numero_convocatoria,
  //     categoria_linea_convocatoria,
  //     fecha_apertura: fechaApertura[0].valormin,
  //     estado: "Incompleto",
  //   };

  //   console.log(postulante);

  //   await axios
  //     .post(`${ObjConstanst.IP_PARTICIPANTES}postulaciones/`, postulante)
  //     .then(({ data }) => {
  //       dispatch(idPostulacion(data.data.id_postulacion));
  //     });
  // };

  // const continuar = () => {
  //   dispatch(idConvocatorias(idconvocatorias));
  //   dispatch(documentosConvocatoria(documentos));
  //   dispatch(categoriasLineasConvocatoria(categoria_linea_convocatoria));
  //   dispatch(fechasParticipantes(fechas));
  //   dispatch(nombreConvocatoria(numero_convocatoria));
  //   dispatch(documentosAdministrativosCargados([]));
  //   dispatch(documentosTecnicosCargados([]));
  //   crearPostulacion();
  //   history.push("/Usuario/Seleccionarrol");
  // };
  const TabOne = () => {
    return (
      <>
        <Header size="small" as="h2">
          Descripción del jurado
        </Header>
        <p>{datos.description}</p>
        <Divider />
        {datos.jury.length > 0 && (
          <>
            <Header size="small" as="h2">
              Ha sido jurado en
            </Header>
            <Divider />
            <List bulleted as="ul">
              <List.Item as="li">{datos.jury}</List.Item>
            </List>
          </>
        )}
        <Header size="small" as="h2">
          Categorías específicas
        </Header>
        <Divider />
        {datos.categories != null && datos.categories.length > 0 ? (
          <List bulleted as="ul">
            <List.Item as="li">{datos.categories}</List.Item>
          </List>
        ) : (
          <p>No hay</p>
        )}
      </>
    );
  };
  const TabTwo = () => {
    return (
      <>
        <Table
          columns={5}
          className="border-right-left-none border-bottom-none"
        >
          <Table.Header>
            <Table.Row className="display-flex">
              <Table.HeaderCell
                style={{ width: "5%" }}
                rowSpan="2"
                className="background-color-FFFFFF font-size-12px"
              >
                No.
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ width: "27%" }}
                rowSpan="2"
                className="background-color-FFFFFF font-size-12px"
              >
                Títulos
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ width: "28%" }}
                rowSpan="2"
                className="background-color-FFFFFF font-size-12px"
              >
                Nivel de educación
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ width: "29%" }}
                rowSpan="2"
                className="background-color-FFFFFF font-size-12px"
              >
                Institución educativa
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ width: "9%" }}
                rowSpan="2"
                className="background-color-FFFFFF font-size-12px"
              >
                Acciones
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {JuradosLista.map((datos, index) => (
            <Table.Row className="display-flex table-cell-modal">
              <Table.Cell
                style={{
                  width: "4%",
                  textAlign: "center",
                  padding: "10px",
                }}
                className="font-size-12px font-family-Work-Sans "
                width={5}
              >
                {index + 1}
              </Table.Cell>
              <Table.Cell
                style={{ width: "28%", paddingLeft: "10px", padding: "10px" }}
                className="font-size-12px font-family-Work-Sans table-cell"
                width={1}
              >
                {datos.titulo}
              </Table.Cell>
              <Table.Cell
                style={{ width: "28%", padding: "10px" }}
                className="font-size-12px font-family-Work-Sans"
                width={1}
              >
                {datos.nivelEducacion}
              </Table.Cell>
              <Table.Cell
                style={{ width: "29%", padding: "10px" }}
                className="font-size-12px font-family-Work-Sans"
                width={1}
              >
                {datos.institucionEducativa}
              </Table.Cell>
              <Table.Cell
                style={{ width: "10%", padding: "10px" }}
                className="font-size-12px font-family-Work-Sans"
                width={1}
              >
                Ver anexo
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </>
    );
  };
  const panes = [
    {
      menuItem: "Perfil de jurado",
      render: () => (
        <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
          <TabOne />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Educación",
      render: () => (
        <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
          {" "}
          <TabTwo />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Experiencia",
      render: () => (
        <Tab.Pane
          attached={false}
          style={{ border: "none", height: "100%", boxShadow: "none" }}
        >
          {" "}
          <TabTwo />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Reconocimiento y publicaciones",
      render: () => (
        <Tab.Pane
          attached={false}
          style={{ border: "none", height: "100%", boxShadow: "none" }}
        >
          {" "}
          <TabTwo />
        </Tab.Pane>
      ),
    },
    // { menuItem: "", pane: "TabThree" },
    // { menuItem: "", pane: "TabFour" },
  ];
  const Tabs = () => <Tab panes={panes} style={{ boxShadow: "none" }} />;
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      closeIcon={
        <Icon
          name="x"
          style={{
            color: "#9F0505",
            position: "absolute",
            right: 20,
            top: 25,
            cursor: "pointer",
          }}
        />
      }
      style={{
        width: "80vw",
        height: "90vh",
      }}
      className="modal-jurado"
      trigger={<span className="ver_convocatoria no-margin">Ver más</span>}
    >
      <Modal.Header>
        Postulación a jurado <span className="soft-text">Código 23401</span>
      </Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description style={{ width: "5%" }} className="card-jurado">
          <Card className="card-jurado-main">
            <CardContent className="card-jurado-content">
              <Icon
                name="user circle"
                size="massive"
                style={{ margin: "1rem" }}
                color="grey"
              />
              <CardHeader>
                {datos.first_name}
                {datos.middle_name}
                {datos.first_surname}
                {datos.second_surname}
              </CardHeader>
              <CardDescription>
                C.C. <span>{datos.identification_cc}</span>
              </CardDescription>
              <CardDescription>
                País: <span>{datos.country}</span>
              </CardDescription>
              <CardDescription>
                Municipio: <span>{datos.city}</span>
              </CardDescription>
              <CardDescription>
                Tel: <span>{datos.landline_phone}</span>
              </CardDescription>
              <CardDescription>
                Cel: <span>{datos.mobile}</span>
              </CardDescription>
              <CardDescription>
                <span>{datos.email}</span>
              </CardDescription>
            </CardContent>
          </Card>{" "}
        </Modal.Description>
        <Modal.Description
          style={{ width: "58%", height: "100%", boxShadow: "none" }}
        >
          <Tabs />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          boxShadow: "none",
        }}
      >
        <Button
          color="black"
          onClick={() => setOpen(false)}
          className="btn btn-secondary"
        >
          Cancelar
        </Button>
        <Button onClick={() => setOpen(false)} className="btn btn-primary">
          Postular jurado
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
