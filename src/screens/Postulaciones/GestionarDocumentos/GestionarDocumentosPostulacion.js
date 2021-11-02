import React from "react";
import BreadcrumbComponent from "../../../components/Breadcrumb";
import {
  Segment,
  Grid,
  Input,
  Icon,
  Divider,
  Header,
  Form,
  Button,
  Dropdown as DropdownSemantic,
} from "semantic-ui-react";
import { Table, Dropdown as DropdownAnt, Menu } from "antd";
import { EntidadOptions, Years, cantidadRegistros } from "../../../data/selectOption.data";
import { useGestionarDocumentosPostulaciones } from "./Hooks/useGestionarDocumentosPostulaciones";
import SelectMultiple from "../../../components/SelectMultiple";
import ModalNotificacion from "./ModalNotificacion";
import ModalAceptarPropuesta from "../ModalAceptar";
import ModalPostulacion from "../ModalPostualcion";
import ButtonIcon from "../../../components/Buttons/ButtonIcons";

const dataBreadcrumb = [{ onlyicon: true }, { nombre: "Propuesta", onlyicon: false }];

export default function GestionarDocumentosPostulacion() {
  const [
    formulario,
    handleChange,
    getDataInitial,
    mostrarConvocatorias,
    filtrarTablaMultiple,
    mostrarmodalPostulacion,
    handlechangechecksustentable,
    handlechangecheckaceptar,
    handlechangecheckcancelar,
    modificarDocumentos,
    salirModal,
    mostrarModalAceptarPropuesta,
  ] = useGestionarDocumentosPostulaciones({
    filtro: false,
    datosActuales: [],
    cantidadPáginas: 10,
    datossinfiltro: [],
    openModal: false,
    openModalPostulacion: false,
    openModalAceptarPropuesta: false,
    informacionPostulacion: [],
    aceptado: true,
    rechazado: false,
    documentocambiar: [],
  });
  React.useEffect(() => {
    getDataInitial();
  }, []);
  const columns = [
    {
      title: "Codigo propuesta",
      width: 100,
      dataIndex: "numero_documento",
      key: "numero_documento",
      fixed: "left",
    },
    {
      title: "Participante",
      width: 200,
      fixed: "left",
      dataIndex: "nombre_particpante",
      key: "nombre_particpante",
    },
    {
      title: "Identificación",
      width: 120,
      dataIndex: "id_participante",
      key: "id_participante",
    },
    {
      title: "Estado",
      width: 100,
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Barrio",
      width: 150,
      dataIndex: "barrio",
      key: "barrio",
    },
    {
      title: "Comuna",
      width: 100,
      dataIndex: "comuna",
      key: "comuna",
    },
    {
      title: "Teléfono Fijo",
      width: 150,
      dataIndex: "telefono_fijo",
      key: "telefono_fijo",
    },
    {
      title: "Teléfono Celular",
      width: 169,
      dataIndex: "telefono_celular",
      key: "telefono_celular",
    },
    {
      title: "Pais residencia",
      width: 169,
      dataIndex: "pais_residencia",
      key: "pais_residencia",
    },
    {
      title: "Ver propuesta",
      width: 90,
      fixed: "right",
      render: (datos) => (
        <>
          <ButtonIcon iconRender="eye" actionButton={() => mostrarmodalPostulacion(datos)} />
          {/* <ButtonIcon iconRender="mail outline" actionButton={() => mostrarModal(datos)} /> */}
        </>
      ),
    },
    {
      title: "Aceptar propuesta",
      width: 90,
      fixed: "right",
      render: (datos) => (
        <>
          <ButtonIcon iconRender="checkmark" actionButton={() => mostrarModalAceptarPropuesta(datos)} />
        </>
      ),
    },
  ];
  return (
    <div>
      <BreadcrumbComponent Ruta={dataBreadcrumb} />
      <Grid className="no-margin" style={{ paddingLeft: "2%", paddingRight: "2%", paddingTop: "2%" }}>
        <Segment className="segment-shadow">
          <Grid columns={4}>
            <Grid.Row style={{ paddingBottom: "0.8%" }}>
              <Grid.Column>
                <Header
                  className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold"
                  style={{ paddingLeft: "2%" }}
                >
                  Gestionar propuestas
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-admin-convocatorias" />
            <Grid.Row>
              <Grid.Column className="no-padding-rigth">
                <Input
                  icon="search"
                  placeholder="Buscar Nombre/Código"
                  className="font-family-Work-Sans font-size-14px"
                  fluid
                  //   onChange={filtradodeinformacion}
                />
              </Grid.Column>
              <Grid.Column>
                <Button
                  icon="filter"
                  name="filtro"
                  className="button-filtro-adminconvocatorias"
                  onClick={handleChange}
                />
              </Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column className="registos-adminconvocatoria">
                <label className="font-family-Montserrat-Regular font-size-9px font-color-7E7E7E" style={{ flex: 0.5 }}>
                  Registros por página
                </label>
                <DropdownSemantic
                  fluid
                  className="select-registros-adminconvocatoria no-margin"
                  defaultValue={formulario.cantidadPáginas}
                  options={cantidadRegistros}
                  icon={<Icon className="font-color-1FAEEF" name="angle down" />}
                  onChange={(e, { value }) => mostrarConvocatorias(value)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {formulario.filtro ? (
            <Grid>
              <Grid.Row className="container-grid-filtros">
                <Grid.Column>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field>
                        <SelectMultiple
                          options={EntidadOptions}
                          functiondata={filtrarTablaMultiple}
                          labelName="Estado"
                          selectName="Estado"
                        />
                      </Form.Field>
                      <Form.Field>
                        <SelectMultiple
                          options={Years}
                          functiondata={filtrarTablaMultiple}
                          labelName="Año"
                          selectName="año"
                        />
                      </Form.Field>
                      <Form.Field>
                        <SelectMultiple
                          options={EntidadOptions}
                          functiondata={filtrarTablaMultiple}
                          labelName="Linea convocatoria"
                          selectName="linea_convocatoria"
                        />
                      </Form.Field>
                      <Form.Field>
                        <SelectMultiple
                          options={EntidadOptions}
                          functiondata={filtrarTablaMultiple}
                          labelName="Categorias"
                          selectName="categoria"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label className="font-color-4B4B4B font-size-12px">Código</label>
                        <Input placeholder="Digite la categoria" />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : null}
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Table
                  columns={columns}
                  dataSource={formulario.datosActuales}
                  scroll={{ x: 1500, y: 300 }}
                  size="large"
                  rowClassName="sizeTable table-row"
                  bordered={false}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid>
      <ModalPostulacion
        openModal={formulario.openModalPostulacion}
        actionButton={modificarDocumentos}
        actionCancelButton={salirModal}
        datos={formulario.informacionPostulacion}
        handlechangechecksustentable={handlechangechecksustentable}
        handlechangecheckaceptar={handlechangecheckaceptar}
        handlechangecheckcancelar={handlechangecheckcancelar}
      />
      <ModalAceptarPropuesta
        openModal={formulario.openModalAceptarPropuesta}
        actionButton={mostrarModalAceptarPropuesta}
        actionCancelButton={mostrarModalAceptarPropuesta}
        datos={formulario.informacionPostulacion}
      />
    </div>
  );
}
