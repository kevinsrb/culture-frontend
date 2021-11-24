import React, { useState } from 'react';
import { Grid } from "semantic-ui-react";
import Sidebar from "../../../components/NavBar";
import HeaderMenu from "../../../components/Header";

import { Layout, Row, Col, Form, Input, Select, Table, Modal, Button } from "antd";

import DatosJuradoRamirezGonzalesModel from '../models/DatosJuradoRamirezGonzalesModel'
export default function AdministracionJurados() {
    const { Search } = Input;
    const [form] = Form.useForm();
    const { Content } = Layout;
    const { Option } = Select;
    //@ts-ignore
    const onFinish = values => {
        console.log('Received values of form:', values);
    };
    const [visible, setVisible] = useState<any>();
    const [loading, setLoading] = useState<any>();
    //@ts-ignore
    const onSearch = value => console.log(value);
    // const { Header, Content, Footer, Sider } = Layout;

    async function showModal() {
        setVisible(true)
    };

    const columns: any = [
        {
            title: 'No',
            width: 25,
            dataIndex: 'sNo',
            key: 'sNo',
            fixed: 'left',
        },
        {
            title: 'Nombres y apellidos',
            width: 140,
            dataIndex: 'nombresApellidos',
            key: 'nombresApellidos',
            fixed: 'left',
        },
        { title: 'Código', width: 80, dataIndex: 'codigo', key: 'codigo' },
        { title: 'Asignados', width: 80, dataIndex: 'asignados', key: 'asignados' },
        { title: 'Total', width: 80, dataIndex: 'total', key: 'total' },
        { title: 'Estado', width: 80, dataIndex: 'estado', key: 'estado' },
        { title: 'Anexo', width: 80, dataIndex: 'anexo', key: 'anexo' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a onClick={() => showModal()}>Ver más</a>,
        },
    ];

    const data = [
        {
            sNo: '1',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className='text-success'>Pagado</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '2',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className='text-success'>Pagado</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '3',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className='text-success'>Pagado</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '4',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '5',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '6',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '7',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '8',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '9',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
        {
            sNo: '10',
            nombresApellidos: 'Andrés Julián Toro Gonzales',
            codigo: '23401',
            asignados: '20 Proyectos',
            total: '$2.000.000',
            estado: <span className=''>Pendiente</span>,
            anexo: 'Pagado',
        },
    ];

    async function handleOk() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };
    async function handleCancel() {
        setVisible(false);
    };
    return (
        <div>
            <Layout>
                <Content className="">

                    <Modal
                        visible={visible}
                        title={<p><span><b>Datos de Jurado:</b> Juan Esteban Ramírez Gonzales</span><span><b>Código:</b> 23401</span></p>}
                        onOk={() => handleOk()}
                        onCancel={() => handleCancel()}
                        footer={[
                            <Button key="back" style={{ border: '0px' }} onClick={() => handleCancel()}>
                                Cerrar
                            </Button>,
                            <Button key="submit" className='adt-form-submit-btn' type="primary" loading={loading} onClick={() => handleOk()}>
                                Guardar
                            </Button>,
                        ]}
                        className="adt--tbl-model--form"
                        style={{ top: 25 }}
                    >
                        <DatosJuradoRamirezGonzalesModel showModal={showModal} />
                    </Modal>






                    <Row>
                        <Col span={5}>
                            <Sidebar />
                        </Col>
                        <Col span={18}>
                            <Content>
                                <HeaderMenu />
                            </Content>
                            <Content className='main-card card'>
                                <Content className='main--containt'>
                                    <Content className='adm--table--head'>
                                        <Row>
                                            <Col span={18}>
                                                <Content><span className='head-table'>Listado de postulaciones</span></Content>
                                            </Col>
                                            <Col span={6}>
                                                <Row>
                                                    <Col span={7}>
                                                        <p className='table--total'>Total:<span className='text-orance'>59</span></p>
                                                    </Col>
                                                    <Col span={17}><small>Registros por página</small>
                                                        <Select defaultValue="10" style={{ width: 60 }} >
                                                            <Option value="10">10</Option>
                                                            <Option value="20">20</Option>
                                                            <Option value="30">30</Option>
                                                            <Option value="40">40</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Content>
                                    <Content className='adm--form--area'>
                                        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                                            <Row>
                                                <Col span={6}>
                                                    <Form.Item name="area" className='' label="" rules={[{ required: true, message: 'Missing area' }]}>
                                                        <label className='tbl-form-lable'>Filtrar por palabra clave o código</label>
                                                        <Search
                                                            placeholder="Buscar palabra clave..."
                                                            allowClear
                                                            onSearch={onSearch}
                                                            style={{ width: 230 }}
                                                            className="adm-search--table"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Línea convocatoria</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            style={{ width: 230 }}
                                                            className='form--selct'
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                            <Option value="other">other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Categoría convocatoria</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            style={{ width: 230 }}
                                                            className='form--selct'
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                            <Option value="other">other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Estado</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            style={{ width: 230 }}
                                                            className='form--selct'
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                            <Option value="other">other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Content>
                                    <Content className='adt-table--box'>
                                        {/* <Content className='adt--table-box adt-table--hight-box'>
                                            <Table columns={columns} dataSource={data} scroll={{ x: 1100 }} className='adt--form-table' />

                                        </Content> */}

                                        <Content >
                                            <Table columns={columns} dataSource={data} scroll={{ x: 1100 }} className='adt--form-table' />

                                        </Content>


                                    </Content>
                                </Content>
                            </Content>
                        </Col>
                    </Row>

                </Content>
            </Layout>



        </div >
    )
}