import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Divider, Dropdown, Row, Menu, Typography, Input, Checkbox, Button } from 'antd';
import { DownOutlined, HomeFilled, SearchOutlined } from '@ant-design/icons';
import { useActividades } from './Hooks/useActividades';
import apiConvocatorias from '../../../api/api-convocatorias';

// Ant Controllers
const { Title, Paragraph, Text } = Typography;
const CheckboxGroup = Checkbox.Group;
// const { TextArea } = Input;
// const { Option } = Select;

export const CronogramaActividades = () => {

    const {
        actividades,
        getActividades,
        indeterminate,
        onCheckAllChange,
        checkAll,
        checkedList,
        onChange,
        handleSubmit,
        getActividadesConvocatoria
    } = useActividades();

    

    
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getActividades();
            getActividadesConvocatoria();
        }
        return () => {
            mounted = false;
        }
    }, [])


    const menu = (
        <Menu defaultOpenKeys={0}>
            <Menu.Item key="0">
                Información General
            </Menu.Item>
            <Menu.Item key="1">
                Cronograma
            </Menu.Item>
            <Menu.Item key="3">
                Doc. Administrativos
            </Menu.Item>
            <Menu.Item key="4">
                Doc. Técnicos
            </Menu.Item>
            <Menu.Item key="5">
                Doc. General
            </Menu.Item>
            <Menu.Item key="6">
                Públicación
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row>
                <Col span={24} className="background-color-6DA3FC">
                    <Breadcrumb style={{ paddingLeft: '4%' }}>
                        <Breadcrumb.Item><HomeFilled style={{ color: 'white' }} /></Breadcrumb.Item>
                        <Breadcrumb.Item style={{ color: 'white' }}>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={24} className="background-color-6DA3FC-opacity-025 no-margin contenedor-dropdown" >
                    <span className="font-color-1B1C1D font-size-14px">Crear convocatoria :</span>
                    <Dropdown overlay={menu} trigger={['click']} className="">
                        <a style={{ marginLeft: '10px' }} onClick={e => e.preventDefault()}>
                            Cronograma <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>
            </Row>

            <Row className="card-shadow">
                <Title level={5}>Seleccionar actividades</Title>
                <Divider style={{ marginTop: "0px" }} />

                <Col span={6}>
                    <Input
                        placeholder="Buscar Nombre/Código"
                        suffix={
                            <SearchOutlined />
                        }
                    />
                </Col>
                <Col span={24} style={{ marginTop: '20px' }}>
                    <Title level={5}>Seleccionar actividades</Title>
                    <Row className="container-checks">
                        <Col span={24}>
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                Seleccionar todo
                            </Checkbox>
                        </Col>
                        <Col span={24} className="">
                            <Row>
                                <Col span={24}>
                                    <CheckboxGroup options={actividades} value={checkedList} onChange={onChange} className="CheckboxActividades" />
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" onClick={handleSubmit}>Guardar y continuar</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
