import React, { useEffect, useState } from 'react';
import { Grid } from "semantic-ui-react";
import Sidebar from "../../../components/NavBar";
import HeaderMenu from "../../../components/Header";

import { Layout, Row, Col, Form, Input, Select, Table, Space, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import MaestraParaFormModel from './MaestraParaFormModel';
import MaestraParaEditDataModel from './MaestraParaEditDataModel';
export default function MaestraAdministracionPara() {
    const { Search } = Input;
    const [form] = Form.useForm();
    const { Content } = Layout;
    const { Option } = Select;
    //@ts-ignore
    const onFinish = values => {
        // console.log('Received values of form:', values);
    };
    const [visible, setVisible] = useState<any>(false);
    const [editModel, setEditModel] = useState<any>(false);
    const [loading, setLoading] = useState<any>();
    const [editArrayData, setEditArrayData] = useState<any>({});
    const [sidebarShow, setSidebarShow] = useState<any>(false);
    //@ts-ignore
    const onSearch = value => console.log(value);
    // const { Header, Content, Footer, Sider } = Layout;
    
    async function showModal() {
        setVisible(true)
    };

    
    const [matchScreen, setMatchScreen] = useState<any>('')
    const [matchScreenSize, setMatchScreenSize] = useState<any>(1200)
    useEffect(() => {
       
        var mobileQuery = window.matchMedia("(max-width: 768px)");
        if(mobileQuery.matches== true && mobileQuery.media == "(max-width: 768px)"){
            setMatchScreenSize(768);
        }else{
            setMatchScreenSize(1200);
        }
        if(mobileQuery){
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
    
    const [tabData, setTabData] = useState<any>([]);
    const [columns, setColumns] = useState<any>([
        {
            title: <b>No.</b>,
            width: 25,
            dataIndex: 'sNo',
            key: 'sNo',
            fixed: 'left',
        },
        {
            title: <b>Criterio</b>,
            width: 130,
            dataIndex: 'criterio',
            key: 'criterio',
            fixed: 'left',
        },
        {
            title: <b>Action</b>,
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 20,
        },
    ]);

    const [data, setData] = useState<any>([
        {
            sNo: '1',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a onClick={() => setEditModel(true)}><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '2',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '3',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '4',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '5',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '6',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '7',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '8',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '9',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
        {
            sNo: '10',
            criterio: 'Nombre criterio',
            action: <Space size="middle">
                <a><EditOutlined className='text-primary' /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        },
    ]);

    useEffect(() => {
        setTabData(tabData)
    }, [tabData]);
    
  
    async function handleOk(item: any) {
        setTabData(item)
        setLoading(true);
        setLoading(false);
        setVisible(false);
    };

    async function handleCancel() {
        setVisible(false);
    };

    function updateData() {
        const array = [...tabData];
        const index = tabData.findIndex((item: any) => (item.sNo == editArrayData.sNo));
        array[index].criterio = editArrayData.criterio;
        setTabData([...array]);
        setEditModel(false)
    }
    
    console.log('tabData: vbn', tabData);
    return (
        <div>
            <div className={`${visible ? "maestAdt-modal-regi" : ""}`}>
                <Modal
                    visible={visible}
                    className="adt--tbl-model--form model--transparent"
                    style={{ top: 25, backgroundColor: 'transparent !important' }}
                >
                    <Content>
                        <MaestraParaFormModel showModal={showModal} handleCancel={handleCancel} handleOk={handleOk} data={data} setTabData={setTabData} tabData={tabData} setEditModel={setEditModel} setEditArrayData={setEditArrayData}/>
                    </Content>
                </Modal>
            </div>
            {/* MaestraPara Edit Data Model */}
            <div className={`${editModel ? "maestAdt-modal-regi" : ""}`} style={{ backgroundColor: 'red' }}>
                <Modal
                    visible={editModel}
                    className="adt--tbl-model--form model--transparent"
                    style={{ top: 25, backgroundColor: 'transparent !important' }}
                >
                    <Content style={{ backgroundColor: '#ffff', padding: '5px' }}>
                        <MaestraParaEditDataModel setEditModel={setEditModel} editArrayData={editArrayData} setTabData={setTabData} tabData={tabData} updateData={updateData} setEditArrayData={setEditArrayData}/>
                    </Content>
                </Modal>
            </div>
            <Layout>
                <Content className="">
                    <Row>
                        <Col /* span={sidebarShow? 5:0} */ className="column form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar':'hide__sidebar'}`}>
                            <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
                        </Col>
                        <Col /* span={sidebarShow? 19:24} */ className="column form--right-box evaluRigtBox">
                            <Content>
                                <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
                            </Content>
                            <Content className='ma_para-head-box'>
                                <Content className='ma_para-btn-box'>
                                    <span>Crear Criterio</span>
                                    <a onClick={() => showModal()}>
                                        <PlusCircleOutlined className='plush_icone' />
                                    </a>
                                </Content>
                            </Content>
                            <Content className='main-card card'>
                                <Content className='main--containt'>

                                    <Content className='adm--table--head'>
                                        <Row>
                                            <Col span={12}>
                                                <Content><span className='head-table'>Criterios de evaluación</span></Content>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={24} className='text-right' ><small>Registros por página </small>
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
                                            <Form.Item name="area" className='' label="" rules={[{required: true, message: 'Missing area' }]}>
                                                <label className='tbl-form-lable'>Filtrar por palabra clave o código de jurado</label>
                                                <Search
                                                    placeholder="Buscar palabra clave..."
                                                    allowClear
                                                    onSearch={onSearch}
                                                    style={{ width: '100%' }}
                                                    className="adm-search--table"
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Content>
                                    <Content className='adt-table--box'>
                                        <Content className='adt--table-box'>
                                            <Table columns={columns} dataSource={tabData} scroll={{ x: 'calc(490px + 50%)', y: 240 }} className='adt--form-table' />
                                            
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