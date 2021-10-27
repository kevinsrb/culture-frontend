import { Col, Row, Typography, Divider, Table } from 'antd';
import React, { useState } from 'react';
import { Modal, Input, Icon, Button, Form } from 'semantic-ui-react';

const { Title, Paragraph } = Typography;

export const ModalJurados = ({ openModal, setOpenModal }) => {

    const columns = [
        {
            title: 'Nombre documentos',
            dataIndex: 'nombrePropuesta',
            key: 'nombrePropuesta',
        },
        {
            title: 'Tipo de documento',
            dataIndex: 'estadoJurado',
            key: 'estadoJurado',
        },
        {
            title: 'Acciones',
            dataIndex: 'nombreJurado',
            key: 'nombreJurado',
        },
    ];

    const onClose = () => {
        setOpenModal(false);
    }


    const [openFilter, setOpenFilter] = useState(false);
    const handleChangeFilter = () => setOpenFilter(!openFilter);

    return (
        <Modal
            open={openModal}
            closeIcon
            onClose={onClose}
        >
            <Row style={{ padding: '20px' }}>
                <Col span={24}>
                    <Title level={4}>
                        Adminstrar Jurados
                    </Title>
                </Col>
                <Divider />
                <Col span={8}>
                    <Input
                        icon={<Icon name="search" />}
                        fluid
                        placeholder="Buscar"
                    />
                </Col>
                <Col span={4}>
                    <Button
                        icon="filter"
                        className="button-filtro-adminconvocatorias"
                        onClick={handleChangeFilter}
                    />
                </Col>
                {openFilter &&
                    <Col span={24}>
                        <Col span={24} style={{ marginTop: '14px' }}>
                            <Row gutter={[24, 24]}>
                                <Col span={6}>
                                    <Form.Select
                                        fluid
                                        label="Entidad"
                                        placeholder="Seleccione una entidad"
                                    />
                                </Col>
                                <Col span={6}>
                                    <Form.Select
                                        fluid
                                        label="Año"
                                        placeholder="Seleccione un año"
                                    />
                                </Col>
                                <Col span={6}>
                                    <Form.Select
                                        fluid
                                        label="Categoría"
                                        placeholder="Seleccione una categoría"
                                    />
                                </Col>
                                <Col span={6}>
                                    <Form.Input
                                        fluid
                                        label="Identificación"
                                        placeholder="Identificación"
                                    />
                                </Col>
                                <Col span={24}>
                                    <Table
                                        // dataSource={data}
                                        columns={columns}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                }


            </Row>
            <Row justify="end" style={{padding: '20px'}}>
                <Col>
                    <Button className="botones-redondos" color="blue" onClick={() => setOpenModal(false)}>
                        Asignar
                    </Button>
                </Col>
            </Row>
        </Modal>
    )
}
