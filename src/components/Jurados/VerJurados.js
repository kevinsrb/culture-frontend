import React, { useEffect, useState } from "react";
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
import { Collapse, Checkbox, Select, Input } from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

export const VerJurados = ({ datos, userState }) => {
  const [cumpleRequisitos, setCumpleRequisitos] = useState(false);
  const [open, setOpen] = useState(false);
  const [stepOne, setStepOne] = useState(false);
  const handleChange = (event, { value }) => setCumpleRequisitos({ value });

  // fetch educacion formal
  const [educacionFormal, setEducacionFormal] = useState([]);
  const urlEducacionFormal = `http://localhost:3333/api/formal-education/jury/${datos.resume_id}`;
  const obtenerEducacionFormal = async (urlEducacionFormal) => {
    const response = await fetch(urlEducacionFormal);
    const respJSON = await response.json();
    setEducacionFormal(respJSON.items);
  };
  useEffect(() => {
    obtenerEducacionFormal(urlEducacionFormal);
    console.log(educacionFormal);
  }, []);
  // fetch educacion no formal
  const [educacionNoFormal, setEducacionNoFormal] = useState([]);
  const urlEducacionNoFormal = `http://localhost:3333/api/informal-education/jury/${datos.resume_id}`;
  const obtenerEducacionNoFormal = async (urlEducacionNoFormal) => {
    const response = await fetch(urlEducacionNoFormal);
    const respJSON = await response.json();
    setEducacionNoFormal(respJSON.items);
  };
  useEffect(() => {
    obtenerEducacionNoFormal(urlEducacionNoFormal);
    console.log(educacionNoFormal);
  }, []);
  // fetch experienciaFormal
  const [experienciaFormal, setExperienciaFormal] = useState([]);
  const urlExperienciaFormal = `http://localhost:3333/api/professional-experience/jury/${datos.resume_id}`;
  const obtenerExperienciaFormal = async (urlExperienciaFormal) => {
    const response = await fetch(urlExperienciaFormal);
    const respJSON = await response.json();
    setExperienciaFormal(respJSON.items);
  };
  useEffect(() => {
    obtenerExperienciaFormal(urlExperienciaFormal);
    console.log(experienciaFormal);
  }, []);
  // fetch experiencia como jurado
  const [experienciaJurado, setExperienciaJurado] = useState([]);
  const urlExperienciaJurado = `http://localhost:3333/api/jury-experience/jury/${datos.resume_id}`;
  const obtenerExperienciaJurado = async (urlExperienciaJurado) => {
    const response = await fetch(urlExperienciaJurado);
    const respJSON = await response.json();
    setExperienciaJurado(respJSON.items);
  };
  useEffect(() => {
    obtenerExperienciaJurado(urlExperienciaJurado);
    console.log(experienciaJurado);
  }, []);
  // fetch reconocimientos
  const [reconocimientos, setReconocimientos] = useState([]);
  const urlReconocimientos = `http://localhost:3333/api/acknowledgments/jury/${datos.resume_id}`;
  const obtenerReconocimientos = async (urlReconocimientos) => {
    const response = await fetch(urlReconocimientos);
    const respJSON = await response.json();
    setReconocimientos(respJSON.items);
  };
  useEffect(() => {
    obtenerReconocimientos(urlReconocimientos);
    console.log(reconocimientos);
  }, []);
  // fetch experiencia como jurado
  const [publicaciones, setPublicaciones] = useState([]);
  const urlPublicaciones = `http://localhost:3333/api/publications/jury/${datos.resume_id}`;
  const obtenerPublicaciones = async (urlPublicaciones) => {
    const response = await fetch(urlPublicaciones);
    const respJSON = await response.json();
    setPublicaciones(respJSON.items);
  };
  useEffect(() => {
    obtenerPublicaciones(urlPublicaciones);
    console.log(publicaciones);
  }, []);
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
  const primerModalSubmitButton = (e) => {
    setStepOne(true);
    setOpen(false);
  };

  // PESTAÑAS DEL MODAL
  const TabOne = () => {
    return (
      <>
        {datos.description !== null && (
          <>
            <Header size="small" as="h2">
              Descripción del jurado
            </Header>
            <p className="font-size-12px font-family-Work-Sans">
              {datos.description}
            </p>
            <Divider />
          </>
        )}
        {datos.jury !== null && (
          <>
            <Header size="small" as="h2">
              Ha sido jurado en
            </Header>
            <Divider />
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

        <Header size="small" as="h2">
          Area principal de conocimiento
        </Header>
        <Divider />
        {datos !== undefined && Object.keys(datos.categories).length !== 0 && (
          <List bulleted as="ul">
            <List.Item as="li" className="font-size-12px font-family-Work-Sans">
              {datos.area}
            </List.Item>
          </List>
        )}

        {!userState && (
          <>
            <Header size="small" as="h2">
              Respuesta del jurado
            </Header>
            <Divider />
            <Select defaultValue="" style={{ width: "200px" }}>
              <Option value="Acepto">Acepto</Option>
              <Option value="No Acepto">No Acepto</Option>
              <Option value="No responde">No responde</Option>
            </Select>
          </>
        )}
      </>
    );
  };
  const TabTwo = () => {
    const TabEducacionFormal = () => {
      return (
        <>
          <Table
            columns={7}
            compact
            unstackable
            fixed
            singleLine
            striped
            fixed
            singleLine
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
                  width={3}
                >
                  Fecha de graduación
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Anexo
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {educacionFormal !== undefined && (
              <Table.Body style={{ height: "100%" }}>
                {educacionFormal.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={3}
                    >
                      {datos.certification}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={2}
                    >
                      {datos.education_level}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.educational_institution}
                    </Table.Cell>

                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.town}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.graduate_status}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.date_graduation}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      Ver anexo
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </>
      );
    };
    const TabEducacionNoFormal = () => {
      return (
        <>
          <Table
            columns={7}
            compact
            unstackable
            fixed
            singleLine
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
                  Tipo
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={2}
                >
                  Modalidad
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Nombre
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Institución
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Fecha de inicio
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Fecha de terminación
                </Table.HeaderCell>

                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Número de horas
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Ciudad
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {educacionNoFormal !== undefined && (
              <Table.Body style={{ height: "100%" }}>
                {educacionNoFormal.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
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
                      {datos.modality}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.name}
                    </Table.Cell>

                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.institution}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.start_date}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.finish_date}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.hours}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.town}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </>
      );
    };
    const educationPanes = [
      {
        menuItem: "Educación formal",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            <TabEducacionFormal />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Educación no formal",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            {" "}
            <TabEducacionNoFormal />
          </Tab.Pane>
        ),
      },
    ];
    const EducationTabs = () => (
      <Tab
        panes={educationPanes}
        menu={{ secondary: true, pointing: true }}
        className="tabs-jurados"
        renderActiveOnly={true}
      />
    );
    return (
      <>
        <EducationTabs />
      </>
    );
  };
  const TabThree = () => {
    const TabExperienciaFormal = () => {
      return (
        <>
          <Table
            columns={7}
            compact
            unstackable
            fixed
            singleLine
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
                  Nombre entidad
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={2}
                >
                  Fecha de inicio
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Fecha de terminación
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Cargo/Rol desempeñado
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Anexo
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {experienciaFormal !== undefined && (
              <Table.Body style={{ height: "100%" }}>
                {experienciaFormal.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={3}
                    >
                      {datos.project_name}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={2}
                    >
                      {datos.start_date}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.finish_date}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.principal_functions}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      Anexo
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </>
      );
    };
    const TabExperienciaJurado = () => {
      return (
        <>
          <Table
            columns={7}
            fixed
            singleLine
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
                  Nombre convocatoria
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={2}
                >
                  Entidad
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
                  Año
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Area
                </Table.HeaderCell>

                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Anexo
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {experienciaJurado !== undefined ? (
              <Table.Body style={{ height: "100%" }}>
                {experienciaJurado.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={3}
                    >
                      {datos.name}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={2}
                    >
                      {datos.entity}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.town}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.year}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.area}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      Anexo
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : (
              <Header>No hay</Header>
            )}
          </Table>
        </>
      );
    };
    const experienciaPanes = [
      {
        menuItem: "Experiencia formal",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            <TabExperienciaFormal />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Experiencia como jurado",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            {" "}
            <TabExperienciaJurado />
          </Tab.Pane>
        ),
      },
    ];
    const ExperienciaTabs = () => (
      <Tab
        panes={experienciaPanes}
        menu={{ secondary: true, pointing: true }}
        className="tabs-jurados"
        renderActiveOnly={true}
      />
    );
    return (
      <>
        <ExperienciaTabs />
      </>
    );
  };
  const TabFour = () => {
    const TabReconocimientos = () => {
      return (
        <>
          <Table
            columns={7}
            compact
            unstackable
            fixed
            singleLine
            striped
            fixed
            singleLine
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
                  Nombre reconocimiento
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={2}
                >
                  Institución que la otorga
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Año
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
                  Anexar documento
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {reconocimientos !== undefined && (
              <Table.Body style={{ height: "100%" }}>
                {reconocimientos.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={3}
                    >
                      {datos.name}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={2}
                    >
                      {datos.institution_grants}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.year}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.town}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      Anexo
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </>
      );
    };
    const TabPublicaciones = () => {
      return (
        <>
          <Table
            columns={7}
            compact
            unstackable
            fixed
            singleLine
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
                  Nombre Publicaciones
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={2}
                >
                  Tema
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Tipo
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Formato
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
                  Año
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="background-color-FFFFFF font-size-12px"
                  width={1}
                >
                  Anexar documento
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {publicaciones !== undefined ? (
              <Table.Body style={{ height: "100%" }}>
                {publicaciones.map((datos, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={3}
                    >
                      {datos.title}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={2}
                    >
                      {datos.theme}
                    </Table.Cell>
                    <Table.Cell
                      className="font-size-12px font-family-Work-Sans"
                      width={1}
                    >
                      {datos.guy}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.format}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.town}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      {datos.year}
                    </Table.Cell>
                    <Table.Cell
                      width={1}
                      className="font-size-12px font-family-Work-Sans"
                    >
                      Anexo
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : (
              <Header>No hay</Header>
            )}
          </Table>
        </>
      );
    };
    const ReconocimientosyPublicacionesPanes = [
      {
        menuItem: "Reconomientos",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            <TabReconocimientos />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Publicaciones",
        render: () => (
          <Tab.Pane attached={false} style={{ border: "none", height: "100%" }}>
            {" "}
            <TabPublicaciones />
          </Tab.Pane>
        ),
      },
    ];
    const ReconocimientosyPublicacionesTabs = () => (
      <Tab
        panes={ReconocimientosyPublicacionesPanes}
        menu={{ secondary: true, pointing: true }}
        className="tabs-jurados"
        renderActiveOnly={true}
      />
    );
    return (
      <>
        <ReconocimientosyPublicacionesTabs />
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
          <TabThree />
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
          <TabFour />
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
        <Modal.Content style={{ display: "flex" }} scrolling>
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
          {!userState && <TextArea rows={2} style={{ margin: "1rem 0" }} />}
          <br />
          <Button onClick={() => setOpen(false)} className="btn">
            {userState ? "Cerrar" : "Cancelar"}
          </Button>
          {!userState && (
            <Button
              onClick={primerModalSubmitButton}
              className="btn btn-primary"
            >
              Postular jurado
            </Button>
          )}
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
