import { Col, Divider, Row, Typography, Table } from "antd";
import { Input, Icon, Button, Checkbox, Grid } from "semantic-ui-react";
import React, { useState } from "react";
import { useAdministrarJurados } from "./Hooks/useAdministrarJurados";
import { FiltrosTabla } from "./FiltrosTabla";
import { ModalJurados } from "./ModalJurados";

const { Title, Paragraph } = Typography;

export const AdministrarJurados = () => {
  const { handleChangeFilter, openFilter } = useAdministrarJurados();

  const columns = [
    {
      title: "Nombre propuesta",
      dataIndex: "nombrepropuesta",
      key: "nombrepropuesta",
      width: 300,
      fixed: "left",
    },
    {
      title: "Codigo propuesta",
      dataIndex: "codigpropuesta",
      key: "codigpropuesta",
      width: 200,
    },
    {
      title: "Nombre participante",
      dataIndex: "nombreparticipante",
      key: "nombreparticipante",
      width: 300,
    },
    {
      title: "Linea convocatoria",
      dataIndex: "lineaconvocatoria",
      width: 200,
      key: "lineaconvocatoria",
    },
    {
      title: "Categorias",
      dataIndex: "categorias",
      width: 200,
      key: "categorias",
    },
    {
      title: "Seleccionar",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: "right",
      render: (datos) => (
        <>
          {/* <Paragraph style={{cursor: 'pointer'}} onClick={ () => showModal(datos) }>Ver jurado</Paragraph> */}
          <Grid className="no-margin">
            <Grid.Row className="justify-content-center no-padding-bottom no-padding-top">
              <Checkbox radio />
            </Grid.Row>
          </Grid>
        </>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      nombrepropuesta: "Propuesta 1",
      codigpropuesta: "AC-1",
      estadoJurado: "Activo",
      nombreparticipante: "Nombre del participante",
      lineaconvocatoria: "linea de convocatoria",
      categorias: "Rap HipHop",
      nombreJurado: "Administrador",
    },
    {
      id: 2,
      nombrepropuesta: "Propuesta 2",
      codigpropuesta: "AC-2",
      nombreparticipante: "Nombre del participante",
      lineaconvocatoria: "linea de convocatoria",
      estadoJurado: "Activo",
      categorias: "Rock Metal",
      nombreJurado: "Administrador",
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const showModal = (datos) => {
    setOpenModal(true);
  };

  return (
    <Row gutter={[12, 12]} className="container-postulaciones" style={{ marginRight: "15px", marginLeft: "15px" }}>
      <Col span={24}>
        <Title level={4}>Adminstrar Jurados</Title>
      </Col>
      <Divider />
      <Col span={8}>
        <Input icon={<Icon name="search" />} fluid placeholder="Buscar" />
      </Col>
      <Col span={4}>
        <Button icon="filter" className="button-filtro-adminconvocatorias" onClick={handleChangeFilter} />
      </Col>
      {openFilter && (
        <Col span={24}>
          <FiltrosTabla />
        </Col>
      )}
      <Col span={24}>
        <Table dataSource={data} columns={columns} />
      </Col>
      <Col span={24} className="justify-content-flex-end">
        <Button className="botones-redondos" color="blue" onClick={showModal}>Asignar Jurado</Button>
      </Col>

      <ModalJurados openModal={openModal} setOpenModal={setOpenModal} />
    </Row>
  );
};
