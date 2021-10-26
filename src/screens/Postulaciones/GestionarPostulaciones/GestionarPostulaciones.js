import { Col, Row, Divider as DividerAntd, Table } from 'antd';
import { FormProvider } from 'rc-field-form';
import React, { useEffect } from 'react';
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
import { columns } from './ColumnasTabla';
import { FiltrosTabla } from './FiltrosTabla';
import { useGestionarPostulaciones } from './Hooks/useGestionarPostulaciones';



export const GestionarPostulaciones = () => {

    const {
        openFilter,
        handleChangeFilter,
        getPostulaciones,
        postulaciones
    } = useGestionarPostulaciones();

    useEffect(() => {
        let mounted = true;
        if(mounted) {
            getPostulaciones()
        }
        return () => {
            mounted = false;
        }
    }, [])

    console.log(postulaciones)

    return (
        <>
            <Row className="container-postulaciones" style={{ marginRight: '15px', marginLeft: '15px' }}>
                <Col span={24}>
                    <Header
                        className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold"
                    >
                        Busqueda de propuestas
                    </Header>
                </Col>
                <Col span={8}>
                    <Input
                        icon={<Icon name="search" />}
                        fluid
                        placeholder="Buscar Nombre"
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
                    <FiltrosTabla

                    />
                }
                <Col span={24}>
                    <Table
                        dataSource={postulaciones}
                        columns={columns}
                    />
                </Col>
            </Row>
        </>

    )
}