import { Col, Divider, Row, Typography, Table } from 'antd';
import { Input, Icon, Button } from 'semantic-ui-react';
import React, { useState } from 'react';
import { useAdministrarJurados } from './Hooks/useAdministrarJurados';
import { FiltrosTabla } from './FiltrosTabla';
import { ModalJurados } from './ModalJurados';

const { Title, Paragraph } = Typography;

export const AdministrarJurados = () => {

    const { handleChangeFilter, openFilter } = useAdministrarJurados();

    const columns = [
        {
            title: 'Nombre Propuesta',
            dataIndex: 'nombrePropuesta',
            key: 'nombrePropuesta',
        },
        {
            title: 'Estado Jurado',
            dataIndex: 'estadoJurado',
            key: 'estadoJurado',
        },
        {
            title: 'Nombre Jurado',
            dataIndex: 'nombreJurado',
            key: 'nombreJurado',
        },
        {
            title: 'Asignar Jurado',
            dataIndex: 'id',
            key: 'id',
            render: (datos) => (
                <>
                    <Paragraph style={{cursor: 'pointer'}} onClick={ () => showModal(datos) }>Ver jurado</Paragraph>
                </>
            ),
        },
    ]

    const data = [
        {
            id: 1,
            nombrePropuesta: 'Propuesta 1',
            estadoJurado: 'Activo',
            nombreJurado: 'Administrador',
        },
        {
            id: 2,
            nombrePropuesta: 'Propuesta 1',
            estadoJurado: 'Activo',
            nombreJurado: 'Administrador',
        },
    ]

    const [openModal, setOpenModal] = useState(false);
    const showModal = (datos) => {
        setOpenModal(true);
    }

    

    return (
        <Row gutter={[12,12]} className="container-postulaciones" style={{ marginRight: '15px', marginLeft: '15px' }}>
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
                    <FiltrosTabla

                    />
                </Col>
            }
            <Col span={24}>
                <Table
                    dataSource={data}
                    columns={ columns }
                />
            </Col>

            <ModalJurados 
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </Row >
    )
}
