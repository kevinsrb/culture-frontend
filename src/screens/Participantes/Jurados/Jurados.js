import React, { useEffect, useState } from "react";
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
  Button,
} from "semantic-ui-react";
import { Spin, Checkbox, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { VerJurados } from "../../../components/Jurados/VerJurados";
import { ExportarDatosJurado } from "../../../components/Jurados/ExportarDatosJurado";

const { Option } = Select;

const filtrarPorArea = [
  {
    key: 1,
    value: 1,
    text: "Adquisición de equipos y herramientas tecnológicas",
  },
  {
    key: 2,
    value: 2,
    text: "Apoyo para la participación en ferias y eventos del sector",
  },
  {
    key: 3,
    value: 3,
    text: "Áreas integradas",
  },
  { key: 4, value: 4, text: "Arte" },
];
const filtrarPorEstado = [
  {
    key: 1,
    value: 1,
    text: "Aprobado",
  },
  {
    key: 2,
    value: 2,
    text: "Reprobado",
  },
  { key: 3, value: 3, text: "Sin verificar" },
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

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const FiltrosComponent = () => {
    return (
      <Segment
        className={userPermissions ? "segment-shadow" : "segment-no-shadow"}
      >
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
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4} className="justify-content-flex-start">
              <Grid.Row>
                <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                  Filtrar por area
                </label>
                <Dropdown
                  clearable
                  floating
                  fluid
                  className="select-registros-filtrar-por-area no-margin"
                  placeholder="Seleccionar..."
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
                  clearable
                  floating
                  labeled
                  multiple
                  direction={userPermissions ? "left" : "right"}
                  fluid
                  className="select-registros-filtrar-por-area no-margin"
                  placeholder="Seleccionar..."
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
                  <Select
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    placeholder="Seleccionar..."
                    optionFilterProp="children"
                    allowClear
                  >
                    <Option value="0">Aprobado</Option>
                    <Option value="1">Reprobado</Option>
                    <Option value="2">Sin verificar</Option>
                  </Select>
                </Grid.Row>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </Segment>
    );
  };
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
          <Header as="h3">Gestionar postulación de jurados</Header>
          {userPermissions && <FiltrosComponent />}
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
                            defaultValue={10}
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
              {!userPermissions && <FiltrosComponent />}
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
                      width={4}
                    >
                      Nombres y apellidos
                    </Table.HeaderCell>
                    {userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px "
                        width={3}
                      >
                        No. Documento
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={2}
                    >
                      Código
                    </Table.HeaderCell>
                    {!userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={2}
                      >
                        Estado
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={3}
                    >
                      Areas
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={6}
                    >
                      Categorías
                    </Table.HeaderCell>
                    {userPermissions && (
                      <Table.HeaderCell
                        className="background-color-FFFFFF font-size-12px"
                        width={3}
                      >
                        Estado
                      </Table.HeaderCell>
                    )}
                    <Table.HeaderCell
                      className="background-color-FFFFFF font-size-12px"
                      width={2}
                    >
                      Acciones
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {jurados.length ? (
                    jurados.map((datos, index) => (
                      <Table.Row>
                        {console.log(datos)}
                        <Table.Cell
                          className="font-size-12px font-family-Work-Sans"
                          width={1}
                        >
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell
                          className="font-size-12px font-family-Work-Sans"
                          width={4}
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
                            {datos.status}
                          </Table.Cell>
                        )}
                        <Table.Cell
                          className="font-size-12px font-family-Work-Sans"
                          width={1}
                        >
                          <span
                            key={index}
                            className="font-size-12px font-family-Work-Sans "
                          >
                            {datos.area}
                          </span>
                        </Table.Cell>
                        <Table.Cell
                          width={4}
                          style={{
                            maxWidth: 4,
                          }}
                        >
                          {datos.categories.map((category, index) => {
                            return (
                              category !== null && (
                                <span
                                  key={index}
                                  className="font-size-12px font-family-Work-Sans "
                                >
                                  {category + " "}
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
                            {datos.status}
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
                    <Table.HeaderCell colSpan="8">
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
            {!userPermissions && (
              <Segment>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button className="btn">Atras</Button>
                  <ExportarDatosJurado />
                </div>
              </Segment>
            )}
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
