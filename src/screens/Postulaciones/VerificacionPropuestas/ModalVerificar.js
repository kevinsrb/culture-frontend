import { Col, Row, Typography, Table, Empty } from 'antd';
import React from 'react';

import {
    Segment,
    Modal,
    Button,
    Header,
    Grid,
    Form,
    Input,
    Checkbox,
    Icon,
    Pagination,
    Divider,
    Select,
    Dropdown as DropdownSemantic,
    Breadcrumb,
    GridColumn,
} from "semantic-ui-react";

const { Title, Paragraph } = Typography;

export const ModalVerificar = ({ openModal, setOpenModal, datos }) => {

    const columns1 = [
        {
           title: 'Documentación formal solicitada',
           dataIndex: '',
           key: '',
           width: 400
        },
        {
           title: 'Archivos',
           dataIndex: '',
           key: '',
           width: 400
        },
        {
           title: 'Resultado',
           dataIndex: '',
           key: '',
           width: 400
        },
    ]
    const columns2 = [
        {
           title: 'Contenido de la propuesta solicitado',
           dataIndex: '',
           key: '',
           width: 400
        },
        {
           title: 'Archivos',
           dataIndex: '',
           key: '',
           width: 400
        },
        {
           title: 'Resultado',
           dataIndex: '',
           key: '',
           width: 400
        },
    ]

    return (
        <Modal open={openModal} size="large" style={{ padding: '20px' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Title level={4}>Información de la propuesta</Title>
                </Col>
                <Col span={8}>
                    <Title level={5}>Nombre de la convocatoria</Title>
                    <p>Prueba campos convocatoria</p>
                </Col>
                <Col span={8}>
                    <Title level={5}>Categoría</Title>
                </Col>
                <Col span={8}>
                    <Title level={5}>Año de la convocatoria</Title>
                    <p>2021</p>
                </Col>
                <Col span={8}>
                    <Title level={5}>Participante</Title>
                    <p>APELLIDO NOMBRE</p>
                </Col>
                <Col span={8}>
                    <Title level={5}>Identificación</Title>
                    <p>Cédula de ciudadanía: 34243243</p>
                </Col>
                <Col span={8}>
                    <Title level={5}>Código</Title>
                    <p>45-343</p>
                </Col>
                <Col>
                    <Table columns={columns1}   locale={{ emptyText: <Empty description="No hay datos" style={{ padding: '50px'}} /> }} />
                </Col>
                <Col>
                    <Table columns={columns2}  locale={{ emptyText: <Empty description="No hay datos" style={{ padding: '50px'}} /> }}  />
                </Col>
            </Row>
            <Row justify="end" style={{padding: '20px'}}>
                <Col >
                    <Button
                        className="botones-redondos"
                        basic
                        color="blue"
                        onClick={() => setOpenModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button className="botones-redondos" color="blue" onClick={() => setOpenModal(false)}>
                        Aceptar
                    </Button>
                </Col>
            </Row>
        </Modal>
    )
}
