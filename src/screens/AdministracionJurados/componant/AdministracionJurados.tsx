import React, { useState, useEffect } from 'react';
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
    const [sidebarShow, setSidebarShow] = useState<any>(false);
    async function showModal() {
        setVisible(true)
    };

    const [matchScreen, setMatchScreen] = useState<any>('')
    const [matchScreenSize, setMatchScreenSize] = useState<any>(1200)
 

    useEffect(() => {
        var mobileQuery1024 = window.matchMedia("(max-width: 1024px)");
        console.log('mobileQuery1024: ', mobileQuery1024);
        var mobileQuery991 = window.matchMedia("(max-width: 991px)");
        var mobileQuery = window.matchMedia("(max-width: 768px)");
     
        if (mobileQuery1024.matches == true && mobileQuery1024.media == "(max-width: 1024px)") {
            setMatchScreenSize(1024);
        }
        if (mobileQuery991.matches == true && mobileQuery991.media == "(max-width: 991px)") {
            setMatchScreenSize(991);
        }
        if (mobileQuery.matches == true && mobileQuery.media == "(max-width: 768px)") {
            setMatchScreenSize(768);
        } 
        if(mobileQuery1024.matches == false && mobileQuery991.matches == false && mobileQuery.matches == false) {
            setMatchScreenSize(1200);
        }

        if (mobileQuery) {
            mediaQueryCheck(mobileQuery);
            mobileQuery.addEventListener("change", mediaQueryCheck);
        }
        return () => {
            mobileQuery.removeEventListener("change", mediaQueryCheck);
        }
    }, [matchScreen])
    function mediaQueryCheck(inputQuery: any) {
        if (inputQuery.matches) {
            setMatchScreen(true);
            setSidebarShow(false);
        } else {
            setSidebarShow(true);
            setMatchScreen(false);
        }
    }

 
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
            width: 130,
            dataIndex: 'nombresApellidos',
            key: 'nombresApellidos',
            fixed: 'left',
        },
        { title: 'Código', width: 60, dataIndex: 'codigo', key: 'codigo' },
        { title: 'Asignados', width: 60, dataIndex: 'asignados', key: 'asignados' },
        { title: 'Total', width: 60, dataIndex: 'total', key: 'total' },
        { title: 'Estado', width: 60, dataIndex: 'estado', key: 'estado' },
        { title: 'Anexo', width: 60, dataIndex: 'anexo', key: 'anexo' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 60,
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

    console.log('matchScreenSize: screen ', matchScreenSize);

    
   
    return (
        <div>
            <Layout>
                <Content className="">

                    <Modal
                        visible={visible}
                        title={<p><span><b>Datos de Jurado:</b> Juan Esteban Ramírez Gonzales</span><span style={{ marginLeft: 15 }}><b>Código:</b> 23401</span></p>}
                        onOk={() => handleOk()}
                        onCancel={() => handleCancel()}
                        footer={[
                            <Button key="back" style={{ border: '0px' }} onClick={() => handleCancel()}>
                                Cerrar
                            </Button>,
                            <Button key="submit" className='adt-form-submit-btn' type="primary" loading={loading} onClick={() => handleOk()}>
                                Guardar
                            </Button>
                        ]}
                        className="adt--tbl-model--form"
                        style={{ top: 25 }}
                    >
                        <DatosJuradoRamirezGonzalesModel showModal={showModal} />
                    </Modal>
                    <Row>
                        <Col span={(matchScreenSize > 1024)?4:(matchScreenSize == 1024) ? 6 : (matchScreenSize == 991) ? (sidebarShow)? 7:0 : (matchScreenSize == 768 && sidebarShow)?0:4 }  /* span={sidebarShow ?  4 : 0} */ className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar' : 'hide__sidebar'}`}>
                            <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
                        </Col>
                        <Col span={(matchScreenSize > 1024)?20:(matchScreenSize == 1024) ? (sidebarShow)? 18:24 : (matchScreenSize == 991) ? (sidebarShow)? 17:24 : (matchScreenSize == 768 && sidebarShow)?24:24 } /* span={sidebarShow ? 20 : 24} */ className='right_box_pd'>
                            <Content className="form--right-box__">
                                <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
                            </Content>
                            <Content className='main-card card'>
                                <Content className='main--containt'>
                                    <Content className='adm--table--head'>
                                        <Row>
                                            <Col span={8}>
                                                <Content><span className='head-table'>Listado de postulaciones</span></Content>
                                            </Col>
                                            <Col span={16}>
                                                <Content className='text-right'>
                                                    <span className='table--total' style={{marginRight:13}}>Total:<span className='text-orance'>59</span></span>
                                                    
                                                    <small style={{marginRight:5}}>Registros por página</small>
                                                    <Select defaultValue="10" className='table_num_drop' >
                                                        <Option value="10">10</Option>
                                                        <Option value="20">20</Option>
                                                        <Option value="30">30</Option>
                                                        <Option value="40">40</Option>
                                                    </Select>

                                                </Content>
                                                {/* <Row>
                                                    <Col span={7} className='text-right'>
                                                        <p className='table--total'>Total:<span className='text-orance'>59</span></p>
                                                    </Col>
                                                    <Col span={17} className='text-right'><small>Registros por página</small>
                                                        <Select defaultValue="10" className='table_num_drop' >
                                                            <Option value="10">10</Option>
                                                            <Option value="20">20</Option>
                                                            <Option value="30">30</Option>
                                                            <Option value="40">40</Option>
                                                        </Select>
                                                    </Col>
                                                </Row> */}
                                            </Col>
                                        </Row>

                                    </Content>
                                    <Content className='adm--form--area'>
                                        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">

                                            <Row>
                                                <Col span={(matchScreenSize > 991) ? 6 : matchScreenSize > 768 ? 12 : 24} className='form_tab' >
                                                    <Form.Item name="area" className='' label="" rules={[{ required: true, message: 'Missing area' }]}>
                                                        <label className='tbl-form-lable'>Filtrar por palabra clave o código</label>
                                                        <Search
                                                            placeholder="Buscar palabra clave..."
                                                            allowClear
                                                            onSearch={onSearch}
                                                            // style={{ width: 230 }}
                                                            className="adm-search--table frm-pr"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={(matchScreenSize > 991) ? 6 : (matchScreenSize > 768) ? 12 : 24} className='form_tab'>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Línea convocatoria</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            // style={{ width: 230 }}
                                                            className='form--selct frm-pr'
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                            <Option value="other">other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={(matchScreenSize > 991) ? 6 : (matchScreenSize > 768) ? 12 : 24} className='form_tab'>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Categoría convocatoria</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            // style={{ width: 230 }}
                                                            className='form--selct frm-pr'
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                            <Option value="other">other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={(matchScreenSize > 991) ? 6 : (matchScreenSize > 768) ? 12 : 24} className='form_tab'>
                                                    <Form.Item
                                                        name=""
                                                        label=""
                                                        rules={[{ required: true, },]}>
                                                        <label className='tbl-form-lable'>Filtrar por Estado</label>
                                                        <Select
                                                            placeholder="Seleccionar..."
                                                            allowClear
                                                            // style={{ width: 230 }}
                                                            className='form--selct frm-pr'
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
                                            <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} className='adt--form-table' />
                                        </Content> */}
                                        <Content className='adt--table-box'>
                                            <Table columns={columns} dataSource={data} scroll={{ x: 'calc(520px + 50%)', y: 240 }} className='adt--form-table' />
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