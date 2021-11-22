import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
// import { ObjConstanst } from "../../config/utils/constanst";
import {
  Modal,
  Card,
  Button,
  Icon,
  Table,
  Tab,
  Header,
  Divider,
  List,
  CardContent,
  CardHeader,
  CardDescription,
  Form,
  Radio,
} from "semantic-ui-react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

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
  const [open, setOpen] = useState(false);
  const [stepOne, setStepOne] = useState(false);
  const handleChange = (event, { value }) => setCumpleRequisitos({ value });

  // Acordeon
  const plainOptions = [
    "Chirimías y/o papayeras",
    "Músicos populares  ",
    "Música del mundo, alternativa y tradicionales  ",
    "Arte por la vida  ",
    "Disc Jockey (DJ)  ",
    "Video Jockey (VJ)",
    "Danza",
    "Trovadores",
    "Cuenteros y/o narradores orales",
    "Cartas de amor",
    "Titiriteros y/o cajas mágicas",
    "Artes plásticas",
    "Performance",
    "Teatro",
    "Estatuas Humanas",
    "Películas Itinerantes",
    "Magia",
    "Pantomima",
    "Circo",
    "Comparsas",
  ];
  const defaultCheckedList = [];

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkAll, setCheckAll] = useState(false);

  const onChangeCheck = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  // const { idParticipante } = useSelector((state) => state.participantes);
  const primerModalSubmitButton = (e) => {
    setStepOne(true);
    setOpen(false);
  };

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
          columns={7}
          compact
          unstackable
          striped
          size="small"
          className="border-right-left-none border-bottom-none"
        >
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={1}
              >
                No.
              </Table.HeaderCell>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={3}
              >
                Título
              </Table.HeaderCell>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={2}
              >
                Nivel de educación
              </Table.HeaderCell>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={1}
              >
                Institución educativa
              </Table.HeaderCell>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={1}
              >
                Ciudad
              </Table.HeaderCell>
              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={1}
              >
                Graduado
              </Table.HeaderCell>

              <Table.HeaderCell
                className="background-color-FFFFFF font-size-12px"
                width={1}
              >
                Acciones
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body style={{ height: "100%" }}>
            <Table.Row>
              <Table.Cell
                className="font-size-12px font-family-Work-Sans"
                width={1}
              >
                {datos.resume_id}
              </Table.Cell>
              <Table.Cell
                className="font-size-12px font-family-Work-Sans"
                width={3}
              >
                Título
              </Table.Cell>
              <Table.Cell
                className="font-size-12px font-family-Work-Sans"
                width={2}
              >
                Nivel de educación{" "}
              </Table.Cell>
              <Table.Cell
                className="font-size-12px font-family-Work-Sans"
                width={1}
              >
                Universidad de blablabla{" "}
              </Table.Cell>

              <Table.Cell
                width={1}
                className="font-size-12px font-family-Work-Sans"
              >
                Sin verificar
              </Table.Cell>
              <Table.Cell
                width={1}
                className="font-size-12px font-family-Work-Sans"
              >
                Sin verificar
              </Table.Cell>
              <Table.Cell
                width={1}
                className="font-size-12px font-family-Work-Sans"
              >
                Sin verificar
              </Table.Cell>
            </Table.Row>
          </Table.Body>
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
              Comentarios evaluador de jurados {datos.first_name}{" "}
              {datos.middle_name} {datos.first_surname} {datos.second_surname}
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
            <Form>
              <Form.Field>
                ¿Cumple con los requisitos para ser jurado?
              </Form.Field>
              <div style={{ display: "flex" }}>
                <Form.Field>
                  <Radio
                    label="Si"
                    name="radioGroup"
                    value={true}
                    checked={cumpleRequisitos == true}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="No"
                    name="radioGroup"
                    value={false}
                    checked={cumpleRequisitos == false}
                    onChange={handleChange}
                  />
                </Form.Field>
              </div>
            </Form>{" "}
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
      menuItem: "Experiencia",
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
    {
      menuItem: "Reconocimientos y publicaciones",
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
  const Tabs = () => (
    <Tab
      panes={panes}
      menu={{ secondary: true, pointing: true }}
      className="tabs-jurados"
      renderActiveOnly={true}
    />
  );
  const Accordion = () => {
    return (
      <>
        <Collapse defaultActiveKey={["1"]} accordion>
          <Panel
            header="Estímulos a la creatividad en el espacio público"
            key="1"
            extra={
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              />
            }
          >
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChangeCheck}
            />
          </Panel>
          <Panel header="Medellín vive las artes" key="2">
            a
          </Panel>
          <Panel
            header="Estímulo a la apropiación creativa de nuestro patrimonio vivo"
            key="3"
          >
            <p>a</p>
          </Panel>
          <Panel header="Festival de Tango" key="4">
            <p>a</p>
          </Panel>
          <Panel header="Festival Altavoz" key="5">
            <p>a</p>
          </Panel>
          <Panel
            header="Estímulos para la promoción y distribución de largometrajes y cortometrajes"
            key="6"
          >
            <p>a</p>
          </Panel>
        </Collapse>
      </>
    );
  };
  return (
    <>
      <Modal
        size="fullscreen"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        centered={false}
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
            wrapped
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
          <Button onClick={primerModalSubmitButton} className="btn btn-primary">
            Postular jurado
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        size="fullscreen"
        className="modal-jurado"
        onClose={() => setStepOne(false)}
        open={stepOne}
      >
        <Modal.Header>
          Selecciona las lineas y categorías para el jurado
        </Modal.Header>
        <Modal.Content scrolling>
          <Accordion />
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
            content="cancelar"
            className="btn"
            onClick={() => setStepOne(false)}
          />
          <Button
            content="Finalizar postulación de jurado"
            className="btn"
            onClick={() => setStepOne(false)}
            primary
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};
