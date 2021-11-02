import { Col, Row, Typography, Divider, Table } from "antd";
import React, { useState } from "react";
import { Modal, Input, Icon, Button, Form, Grid, Checkbox } from "semantic-ui-react";

const { Title, Paragraph } = Typography;

export const ModalJurados = ({ openModal, setOpenModal }) => {
  const columns = [
    {
      title: "Nombre jurado",
      dataIndex: "nombrejurado",
      key: "nombrejurado",
      width: 300,
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      width: 100,
    },
    {
      title: "Identificación",
      dataIndex: "identificacion",
      key: "identificacion",
      width: 150,
    },
    {
      title: "Perfil",
      dataIndex: "descripcion_perfil",
      key: "descripcion_perfil",
      width: 300,
    },
    {
      title: "Seleccionar",
      dataIndex: "nombreJurado",
      key: "nombreJurado",
      width: 100,
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
      codigo: "AC-1",
      identificacion: "100000001",
      descripcion_perfil: "Este es el perfil del primer jurado",
      nombrejurado: "Administrador",
    },
    {
      id: 2,
      codigo: "AC-2",
      identificacion: "100000002",
      descripcion_perfil: "Este es el perfil del segundo jurado",
      nombrejurado: "Usuario",
    },
  ];

  const onClose = () => {
    setOpenModal(false);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const handleChangeFilter = () => setOpenFilter(!openFilter);

  return (
    <Modal open={openModal} closeIcon onClose={onClose}>
      <Row style={{ padding: "20px" }}>
        <Col span={24}>
          <Title style={{ marginBottom: '0' }} level={4}>Asignar jurado</Title>
        </Col>
        <Divider style={{ marginTop: '1%', marginBottom: '1%' }} />
        <Col span={8}>
          <Input icon={<Icon name="search" />} fluid placeholder="Buscar" />
        </Col>
        <Col span={4}>
          <Button icon="filter" className="button-filtro-adminconvocatorias" onClick={handleChangeFilter} />
        </Col>
        {openFilter && (
          <Col span={24}>
            <Col span={24} style={{ marginTop: "14px" }}>
              <Row gutter={[24, 24]}>
                <Col span={6}>
                  <Form.Select fluid label="Entidad" placeholder="Seleccione una entidad" />
                </Col>
                <Col span={6}>
                  <Form.Select fluid label="Año" placeholder="Seleccione un año" />
                </Col>
                <Col span={6}>
                  <Form.Select fluid label="Categoría" placeholder="Seleccione una categoría" />
                </Col>
                <Col span={6}>
                  <Form.Input fluid label="Identificación" placeholder="Identificación" />
                </Col>
              </Row>
            </Col>
          </Col>
        )}
        <Col style={{ paddingTop:'2%' }} span={24}>
          <Table
            dataSource={data}
            columns={columns}
          />
        </Col>
      </Row>
      <Row justify="end" style={{ padding: "20px" }}>
        <Col>
          <Button className="botones-redondos" color="blue" onClick={() => setOpenModal(false)}>
            Asignar
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
