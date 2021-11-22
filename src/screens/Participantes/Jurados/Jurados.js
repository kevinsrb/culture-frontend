import React, { Children, useEffect, useState } from "react";
import {
  Form,
  Segment,
  Header,
  Grid,
  Table,
  Breadcrumb,
  Icon,
  Dropdown,
  Menu,
  Search,
} from "semantic-ui-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Checkbox } from "antd";

import { useHistory } from "react-router";
import { VerJurados } from "../../../components/Jurados/VerJurados";

const filtrarPorArea = [
  {
    key: 1,
    value: 1,
    text: [],
  },
  {
    key: 2,
    value: 2,
    text: "Adquisición de equipos y herramientas tecnológicas",
  },
  {
    key: 3,
    value: 3,
    text: "Apoyo para la participación en ferias y eventos del sector",
  },
  { key: 4, value: 4, text: "Áreas integradas" },
  { key: 5, value: 5, text: "Arte" },
];
const cantidadRegistros = [
  {
    key: 1,
    value: 10,
    text: "10",
  },
  {
    key: 2,
    value: 20,
    text: "20",
  },
  { key: 3, value: 50, text: "50" },
  { key: 4, value: 100, text: "100" },
];

export const Jurados = () => {
  const [userPermissions, setUserPermissions] = useState(true);
  const [jurados, setJurados] = useState([]);
  const url = "http://localhost:3333/api/juries";
  const obtenerJurados = async (url) => {
    const response = await fetch(url);
    const respJSON = await response.json();
    setJurados(respJSON.juries);
  };
  useEffect(() => {
    obtenerJurados(url);
  }, []);
  // const initialState = {
  //   area: [],
  //   linea_convocatoria: [],
  //   tipo_participante: [],
  //   categoria_linea_convocatoria: [],
  // };

  const initialStateFiltros = {
    datossinfiltro: [],
    numeroregistros: 0,
  };

  //variables
  // let LineaConvocatoriaOptionsMap = {};
  // let categoriaslineasconvocatoriaMap;

  const history = useHistory();

  // useEffect(() => {
  //   primeroDatostabla();
  // }, []);

  // const handleInputChange = (event, result) => {
  //   const { name, value } = result || event.target;
  //   return setfiltros({ ...filtros, [name]: value });
  // };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <React.Fragment>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">
              /
            </Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Jurados
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">
              /
            </Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Postulaciones de jurados
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid
        style={{
          marginBottom: "0%",
          marginLeft: "0",
          marginTop: "0",
          marginRight: "0",
        }}
      >
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Checkbox onChange={() => setUserPermissions(!userPermissions)}>
            {userPermissions ? <h1>Administrador</h1> : <h1>Evaluador</h1>}
          </Checkbox>
          <h1>Gestionar postulación de jurados</h1>
          <Segment className="segment-shadow">
            <Grid>
              <Grid.Row>
                <Grid.Column
                  width={userPermissions ? 8 : 4}
                  className="justify-content-flex-start"
                >
                  <Grid.Row>
                    <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                      Filtrar por palabra clave o código
                    </label>
                    <Search
                      placeholder="Buscar por palabra clave..."
                      className="formulario-palabra-clave no-margin"
                      // loading={loading}
                      // onResultSelect={(e, data) =>
                      //   dispatch({
                      //     type: "UPDATE_SELECTION",
                      //     selection: data.result.title,
                      //   })
                      // }
                      // onSearchChange={handleSearchChange}
                      // results={results}
                      // value={value}
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} className="justify-content-flex-start">
                  <Grid.Row>
                    <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                      Filtrar por area
                    </label>
                    <Dropdown
                      fluid
                      className="select-registros-filtrar-por-area no-margin"
                      placeholder="Seleccionar..."
                      defaultValue={filtrarPorArea}
                      options={filtrarPorArea}
                      icon={
                        <Icon className="font-color-1FAEEF" name="angle down" />
                      }
                    />
                  </Grid.Row>
                </Grid.Column>

                <Grid.Column width={4} className="justify-content-flex-start">
                  <Grid.Row>
                    <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                      Filtrar por Categoría
                    </label>
                    <Dropdown
                      fluid
                      className="select-registros-filtrar-por-area no-margin"
                      placeholder="Seleccionar..."
                      defaultValue={filtrarPorArea}
                      options={filtrarPorArea}
                      icon={
                        <Icon className="font-color-1FAEEF" name="angle down" />
                      }
                    />
                  </Grid.Row>
                </Grid.Column>

                {!userPermissions && (
                  <Grid.Column width={4} className="justify-content-flex-start">
                    <Grid.Row>
                      <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                        Filtrar por Estado
                      </label>
                      <Dropdown
                        fluid
                        className="select-registros-filtrar-por-area no-margin"
                        placeholder="Seleccionar..."
                        defaultValue={filtrarPorArea}
                        options={filtrarPorArea}
                        icon={
                          <Icon
                            className="font-color-1FAEEF"
                            name="angle down"
                          />
                        }
                      />
                    </Grid.Row>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>

      <Grid
        style={{
          marginBottom: "8%",
          marginLeft: "0",
          marginTop: "0",
          marginRight: "0",
        }}
      >
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large">
            <Segment className="segment-shadow">
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column width={8}>
                    <Header
                      as="h4"
                      floated="left"
                      className="font-size-14px font-family-Montserrat-Regular"
                    >
                      Resultados de jurados postulados
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    width={5}
                    className="justify-content-flex-end no-padding-right"
                  >
                    <span
                      className="font-color-1B1C1D font-family-Montserrat-Regular font-size-12px"
                      style={{ width: "45%" }}
                    >
                      Total:
                      <span
                        className="font-color-F28C02 font-family-Montserrat-Regular font-size-12px"
                        style={{ marginLeft: "4%" }}
                      >
                        "{jurados.length}"
                      </span>
                    </span>
                  </Grid.Column>
                  <Grid.Column width={3} className="no-padding-left">
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column
                          width={10}
                          className="justify-content-flex-end"
                        >
                          <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E">
                            Registros por página
                          </label>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Dropdown
                            fluid
                            className="select-registros-adminconvocatoria no-margin"
                            defaultValue={cantidadRegistros}
                            options={cantidadRegistros}
                            icon={
                              <Icon
                                className="font-color-1FAEEF"
                                name="angle down"
                              />
                            }
                            // onChange={(e, { value }) =>
                            //   showConvocatorias(e, value)
                            // }
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
                      Nombres y apellidos
                    </Table.HeaderCell>
                    {userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={2}
                      >
                        No. Documento
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={1}
                    >
                      Código
                    </Table.HeaderCell>
                    {!userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={1}
                      >
                        Estado
                      </Table.HeaderCell>
                    )}
                    {!userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={1}
                      >
                        Areas
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={6}
                    >
                      Categorías
                    </Table.HeaderCell>
                    {userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={1}
                      >
                        Estado
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={1}
                    >
                      Acciones
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {jurados.length ? (
                    jurados.map((datos, index) => (
                      <Table.Row>
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
                          {datos.first_name}
                          {datos.middle_name}
                          {datos.first_surname}
                          {datos.second_surname}
                        </Table.Cell>
                        {userPermissions && (
                          <Table.Cell
                            className="font-size-12px font-family-Work-Sans"
                            width={2}
                          >
                            {datos.document_number}
                          </Table.Cell>
                        )}
                        <Table.Cell
                          className="font-size-12px font-family-Work-Sans"
                          width={1}
                        >
                          {datos.identification_no}
                        </Table.Cell>
                        {!userPermissions && (
                          <Table.Cell
                            width={2}
                            className="font-size-12px font-family-Work-Sans"
                          >
                            Sin verificar
                          </Table.Cell>
                        )}
                        {!userPermissions && (
                          <Table.Cell
                            className="font-size-12px font-family-Work-Sans"
                            width={1}
                          >
                            <span
                              key={index}
                              className="font-size-12px font-family-Work-Sans"
                            >
                              {datos.knowledge_area + " "}
                            </span>
                          </Table.Cell>
                        )}
                        <Table.Cell width={5}>
                          {datos.categories.map((category, index) => {
                            return (
                              category !== null && (
                                <span
                                  key={index}
                                  className="font-size-12px font-family-Work-Sans"
                                >
                                  -{category + " "}
                                </span>
                              )
                            );
                          })}
                        </Table.Cell>{" "}
                        {userPermissions && (
                          <Table.Cell
                            width={2}
                            className="font-size-12px font-family-Work-Sans"
                          >
                            Sin verificar
                          </Table.Cell>
                        )}
                        <Table.Cell
                          className="font-size-12px font-family-Work-Sans"
                          width={1}
                        >
                          <VerJurados
                            datos={datos}
                            userState={userPermissions}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : jurados.length ? (
                    <Table.Row>
                      <Table.Cell style={{ "line-height": "26px" }}>
                        No hay datos por mostrar
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "10px",
                      }}
                    >
                      <Spin indicator={antIcon} />
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="7">
                      <Menu floated="right" pagination>
                        <Menu.Item as="a" icon>
                          <Icon name="chevron left" />
                        </Menu.Item>
                        <Menu.Item as="a">1</Menu.Item>
                        <Menu.Item as="a">2</Menu.Item>
                        <Menu.Item as="a">3</Menu.Item>
                        <Menu.Item as="a">4</Menu.Item>
                        <Menu.Item as="a" icon>
                          <Icon name="chevron right" />
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
