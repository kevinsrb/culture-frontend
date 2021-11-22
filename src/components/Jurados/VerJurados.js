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
import { Radio } from "antd";

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

export const VerJurados = ({ datos, userState }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cumpleRequisitos, setCumpleRequisitos] = useState(false);
  const onChange = (e) => {
    e.preventDefault();
    setCumpleRequisitos(e.target.value);
  };
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
        <p className="font-size-12px font-family-Work-Sans">
          {datos.description}
        </p>
        <Divider />
        <Header size="small" as="h2">
          Ha sido jurado en
        </Header>
        <Divider />
        {datos.jury.length > 0 && (
          <>
            <List bulleted as="ul">
              <List.Item
                as="li"
                className="font-size-12px font-family-Work-Sans"
              >
                {datos.jury}
              </List.Item>
            </List>
          </>
        )}
        <Header size="small" as="h2">
          Categorías específicas
        </Header>
        <Divider />
        {datos !== undefined && Object.keys(datos.categories).length !== 0 && (
          <List bulleted as="ul">
            {datos.categories.map((category, index) => {
              return (
                category !== null && (
                  <List.Item
                    key={index}
                    as="li"
                    className="font-size-12px font-family-Work-Sans"
                  >
                    {category}
                  </List.Item>
                )
              );
            })}
          </List>
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
  const TabFive = () => {
    return (
      <>
        {userState ? (
          <>
            <Header size="small" as="h2">
              Comentarios evaluador de jurados
            </Header>
            <div className="descripcion-del-jurado">
              <p className="font-size-12px font-family-Work-Sans ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                finibus suscipit quam, at faucibus felis lacinia in. Vestibulum
                quis consectetur odio, cursus imperdiet massa. Nulla sodales
                vulputate tortor, eu lacinia justo volutpat vel. Vivamus vel
                nisi suscipit, consequat tellus a, iaculis dui. Aliquam
                vulputate eros ut accumsan commodo. Nullam vel ipsum ac velit
                posuere condimentum a sit amet odio. Duis leo enim, rhoncus a
                posuere eget, posuere eget orci. Quisque eleifend faucibus
                purus, at aliquet orci mollis a. Etiam cursus nunc at magna
                hendrerit, ut fringilla nunc vehicula. Mauris interdum ultricies
                gravida.
              </p>
            </div>{" "}
          </>
        ) : (
          <>
            <Header size="small" as="h2">
              ¿Cumple con los requisitos para ser jurado?
            </Header>
            <div>
              <Radio.Group
                onChange={onChange}
                value={cumpleRequisitos}
                defaultValue={[]}
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </div>
          </>
        )}
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
      menuItem: "Observaciones  del evaluador",
      render: () => (
        <Tab.Pane
          attached={false}
          style={{ border: "none", height: "100%", boxShadow: "none" }}
        >
          {" "}
          <TabFive />
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
      <Modal.Header className="font-size-12px font-family-Work-Sans">
        Postulación a jurado{" "}
        <span className="font-size-14px font-family-Work-Sans">
          Código {datos.identification_no}
        </span>
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
              {userState && (
                <>
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
                </>
              )}
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
