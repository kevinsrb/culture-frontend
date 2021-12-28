import React, { useState } from 'react';
import HeaderMenu from "../../../components/Header";
import Sidebar from "../../../components/NavBar";
import { Footer } from "../../Components/Footer";

import {
    Layout,
    Row,
    Col,
    Table,
    Select,
    Modal,
    Empty,
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import MaestraCategoryModel from '../PopupModels/MaestraCategoryModel'
export default function MaestraConvocatoriasCategory() {
    const { Content } = Layout
    const { Option } = Select
    const [cantidadPáginas, setCantidadPáginas] = useState<any>(10);
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const [gestionarCategory, setGestionarCategory] = useState([]);
    const [categoryAddStatus, setCategoryAddStatus] = useState('');
    const [editLicenseCategoryData, setEditLicenseCategoryData] = useState({});
    const [sidebarShow, setSidebarShow] = useState<any>(false);
    //  columnas
    const columns = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 25,
            dataIndex: "license_id",
            key: "license_id",
            fixed: "left",
            // className: "fixColume",
            // render: (text: any, record: any) => <div>{gestionarCategory.indexOf(record) + 1}</div>
        },
        {
            title: <span className='as_tbl_hd'>Fecha creación</span>,
            width: 65,
            dataIndex: "fecha_date",
            key: "fecha_date",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Nombre área</span>,
            width: 600,
            dataIndex: "nombre_linea",
            key: "nombre_linea",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Acciones</span><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 55,
            fixed: "right",
            render: (text: any, record: any, index: any) => (

                <p className='text-center'>
                    <a onClick={() => { setIsModalVisible(true); setEditLicenseCategoryData(record); setCategoryAddStatus('Edit') }} className='edit_icon' ><EditOutlined /></a>{"  "}
                    <a className='text-danger' onClick={() => deleteLicense(record, index)} ><DeleteOutlined /></a>
                </p>
            ),
        }
    ];

    function deleteLicense(params: any, index: any) {
        var arr = [...gestionarCategory];
        arr.splice(index, 1);
        setGestionarCategory(arr);
    }

    function itemRenderTable(current: any, type: any, originalElement: any) {
        if (type === "prev") {
            return (
                <span className="border-ant-prev-table font-size-10px">
                    <LeftOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingRight: "2px" }} />
                    Ant
                </span>
            );
        }
        if (type === "next") {
            return (
                <span className="border-ant-prev-table font-size-10px">
                    Sig
                    <RightOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingLeft: "2px" }} />
                </span>
            );
        }
        return originalElement;
    }

    return (
        <div>
            <Modal className="eval_pro_model" visible={isModalVisible} width={1000} footer={false}>
                <MaestraCategoryModel setIsModalVisible={setIsModalVisible} setGestionarCategory={setGestionarCategory} gestionarCategory={gestionarCategory} categoryAddStatus={categoryAddStatus} setCategoryAddStatus={setCategoryAddStatus} setEditLicenseCategoryData={editLicenseCategoryData} editLicenseCategoryData={editLicenseCategoryData} />
            </Modal>

            <Container fluid>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar' : 'hide__sidebar'}`}>
                            <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
                        </Grid.Column>
                        <Grid.Column className="form--right-box" >
                            <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />

                            <Layout className='licn_containt_area p-1'>
                                <Content className='licn_add_cat_head text-right'>
                                    <span className='licn_add_text'> <span style={{marginRight: 8}}> Crear</span> <a onClick={() => {setIsModalVisible(true); setCategoryAddStatus('Add') }}><PlusOutlined className='add_icone' /> </a></span>
                                </Content>
                                <Content className='licn__card card_box'>

                                    <Content className='licn_form mb-1'>
                                        <Content className="evalpro_table_head asgevl_tbl_head">
                                            <Row>
                                                <Col span={10} className='headin_box'>
                                                    <h4 className='title licn_title font-family-Montserrat-SemiBold'>Gestionar líneas y categorías</h4>
                                                </Col>
                                                <Col span={14}>
                                                    <Content className='text-right'>

                                                        <small className='tbl_pg'>Registros por página</small>
                                                        <Select defaultValue="10" className="select_table_cont">
                                                            <Option value="10">10</Option>
                                                            <Option value="20">20</Option>
                                                            <Option value="30">30</Option>
                                                            <Option value="40">40</Option>
                                                        </Select>
                                                    </Content>
                                                </Col>
                                            </Row>
                                        </Content>

                                        <Content className='mb-1'>
                                            {//@ts-ignore
                                                <Table columns={columns}
                                                    style={{ borderTop: "1px solid #C4C4C4" }}
                                                    locale={{ emptyText: <Empty description="No hay datos" style={{ padding: "50px" }} /> }}
                                                    pagination={{ position: ["bottomRight"], itemRender: itemRenderTable, pageSize: cantidadPáginas }}
                                                    dataSource={gestionarCategory}
                                                    scroll={{ x: 1200, y: 500 }}
                                                    size="small"
                                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                                    className="table-ant-design-modify lince_cat_table"
                                                    bordered={false}
                                                />
                                            }
                                        </Content>
                                    </Content>

                                </Content>

                            </Layout>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}