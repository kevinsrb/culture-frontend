import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Segment,
  Header,
  Grid,
  Table,
  Breadcrumb,
  Icon,
  Dropdown,
  Pagination,
  Search,
  Divider,
} from "semantic-ui-react";
import { useHistory } from "react-router";
import {
  VerJurados,
  VerPostulaciones,
} from "../../../components/Jurados/VerJurados";

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
const JuradosLista = [
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "Postulado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No cumple",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
  {
    nombreCompleto: "Andres Julián Toro Gonzales",
    nroDocumento: "1017196606",
    codigo: "23401",
    categoriasEspecificas: "Música popular, Formación en artes...",
    estado: "No verificado",
  },
];

export const Jurados = () => {
  const initialState = {
    area: [],
    linea_convocatoria: [],
    tipo_participante: [],
    categoria_linea_convocatoria: [],
  };

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

  const abrirModal = () => {
    console.log("helloo");
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
          <Segment className="segment-shadow">
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} className="justify-content-flex-start">
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
                <Grid.Column width={8} className="justify-content-flex-start">
                  <Grid.Row>
                    <label className="font-family-Montserrat-Regular font-size-16px font-color-000">
                      Filtrar por palabra clave o código de jurado
                    </label>
                    <Search
                      placeholder="Buscar por palabra clave..."
                      className="formulario-palabra-clave"
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
                        "{JuradosLista.length}"
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
              <Grid className="no-margin" style={{ paddingTop: "1%" }}>
                <Grid.Row className="no-padding-top no-padding-left no-padding-bottom">
                  <Grid.Column className="no-padding-left no-padding-right no-padding-bottom">
                    <Table
                      columns={8}
                      className="border-right-left-none border-bottom-none"
                    >
                      <Table.Header>
                        <Table.Row className="display-flex">
                          <Table.HeaderCell
                            style={{ width: "4%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "19%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Nombres y apellidos
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "14%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            No. Documento
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "7%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Código
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "30%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Areas
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Estado
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "10%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Acciones
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="no-padding-top no-padding-left">
                  <Grid.Column
                    style={{ height: "360px", overflowY: "auto" }}
                    className="no-padding-left no-padding-right"
                  >
                    <Table
                      columns={8}
                      className="border-right-left-none border-top-none"
                    >
                      <Table.Body>
                        {JuradosLista.length > 0 ? (
                          JuradosLista.map((datos, index) => (
                            <Table.Row className="display-flextable-cell">
                              <Table.Cell
                                style={{ width: "4%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "19%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.nombreCompleto}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "14%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.nroDocumento}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "6%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.codigo}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "30%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.categoriasEspecificas}
                              </Table.Cell>{" "}
                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.estado}
                              </Table.Cell>{" "}
                              <Table.Cell
                                style={{ width: "10%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                <VerJurados datos={datos} />
                              </Table.Cell>
                            </Table.Row>
                          ))
                        ) : (
                          <Table.Row>
                            <Table.Cell style={{ "line-height": "26px" }}>
                              No hay datos por mostrar
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="container-pagination-jurados">
                    <Pagination
                      totalPages="10"
                      activePage="1"
                      // onPageChange={changePagination}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
