import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ObjConstanst } from "../../../config/utils/constanst";
import {
  AreaOptions,
  QuienParticipaOptions,
} from "../../../data/selectOption.data";
import {
  Button,
  Container,
  Form,
  Segment,
  Header,
  Divider,
  Grid,
  Table,
  Select,
  Breadcrumb,
  Icon,
  Dropdown,
  Pagination,
} from "semantic-ui-react";
import { useHistory } from "react-router";
import { VerConvocatoria } from "../../../components/Participantes/VerConvocatoria";
import { useBuscarConvocatoria } from "./Hooks/useBuscarConvocatoria";

const cantidadRegistros = [
  {
    key: 0,
    value: null,
    text: "",
  },
  {
    key: 1,
    value: 10,
    text: "Adquisición de equipos y herramientas tecnológicas",
  },
  {
    key: 2,
    value: 20,
    text: "Apoyo para la participación en ferias y eventos del sector",
  },
  { key: 3, value: 50, text: "Áreas integradas" },
  { key: 4, value: 100, text: "Arte" },
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

  const [
    formulario,
    handleLineaConvocatoria,
    primeroDatostabla,
    changePagination,
    showConvocatorias,
    filtrarTablaMultiple,
  ] = useBuscarConvocatoria({
    categoriaslineasconvocatorias: [],
    lineasconvocatorias: [],
    datosActuales: [],
    paginacionTotal: 0,
    paginacionActual: 1,
    datossinfiltro: [],
    datosfiltroanterior: [],
    numeroregistros: 0,
    cantidadPáginas: 10,
    filtros: [],
  });

  const [filtros, setfiltros] = useState(initialState);
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] =
    useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState(
    []
  );

  useEffect(() => {
    primeroDatostabla();
  }, []);

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
            <Grid.Column width={1}>
              <Grid className="justify-content-space-between">
                <Grid.Row>
                  <Grid.Column width={4} className="justify-content-flex-end">
                    <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E">
                      Filtrar por area
                    </label>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Dropdown
                      fluid
                      className="select-registros-adminconvocatoria no-margin"
                      defaultValue={formulario.cantidadPáginas}
                      options={cantidadRegistros}
                      icon={
                        <Icon className="font-color-1FAEEF" name="angle down" />
                      }
                      onChange={(e, { value }) => showConvocatorias(e, value)}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={3} className="no-padding-left">
              <Grid>
                <Grid.Column width={4} className="justify-content-flex-end">
                  <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E">
                    Filtrar por palabra clave o código de jurado
                  </label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Dropdown
                    fluid
                    className="select-registros-adminconvocatoria no-margin"
                    defaultValue={formulario.cantidadPáginas}
                    options={cantidadRegistros}
                    icon={
                      <Icon className="font-color-1FAEEF" name="angle down" />
                    }
                    onChange={(e, { value }) => showConvocatorias(e, value)}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
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
                        style={{ marginLeft: "1%" }}
                      >
                        {formulario.numeroregistros}
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
                            defaultValue={formulario.cantidadPáginas}
                            options={cantidadRegistros}
                            icon={
                              <Icon
                                className="font-color-1FAEEF"
                                name="angle down"
                              />
                            }
                            onChange={(e, { value }) =>
                              showConvocatorias(e, value)
                            }
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
                            style={{ width: "5%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            No.
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Nombres y apellidos
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            No. Documento
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "10%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Código
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "40%" }}
                            rowSpan="2"
                            className="background-color-FFFFFF font-size-12px"
                          >
                            Categorías específicas
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "15%" }}
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
                        {formulario.datosActuales.length > 0 ? (
                          formulario.datosActuales.map((datos, index) => (
                            <Table.Row className="display-flex">
                              <Table.Cell
                                style={{ width: "5%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.nombre_convocatoria}
                              </Table.Cell>
                              {/* <Table.Cell width={2}>{datos.fechas[0]}</Table.Cell> */}

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={2}
                              >
                                {datos.tipo_participante.map((parti, index) => (
                                  <p className="font-size-12px font-family-Work-Sans">
                                    {" "}
                                    {parti.text}
                                  </p>
                                ))}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "10%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.fechas !== null
                                  ? datos.fechas[0].valormin
                                  : null}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "10%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.fechas !== null
                                  ? datos.fechas[1].valormin
                                  : null}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={2}
                              >
                                {datos.area.map((area, index) => (
                                  <p className="font-size-12px font-family-Work-Sans">
                                    {" "}
                                    {area.text}
                                  </p>
                                ))}
                              </Table.Cell>

                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                                width={1}
                              >
                                {datos.entidad}
                              </Table.Cell>
                              <Table.Cell
                                style={{ width: "15%" }}
                                className="font-size-12px font-family-Work-Sans"
                              >
                                <Button
                                  className="botones-acciones"
                                  icon="eye "
                                  onClick={(e) => abrirModal(e, datos)}
                                />
                                <VerConvocatoria datos={datos} />
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
                  <Grid.Column className="container-pagination-adminconvocatorias">
                    <Pagination
                      totalPages={formulario.paginacionTotal}
                      activePage={formulario.paginacionActual}
                      onPageChange={changePagination}
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
