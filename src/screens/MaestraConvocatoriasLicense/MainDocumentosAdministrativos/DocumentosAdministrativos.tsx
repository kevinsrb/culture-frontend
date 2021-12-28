import React, { useEffect, useState } from 'react';
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
import MaestraCategoryModel from './DocumentPopupModels/MaestraCategoryModel'
import EditCategoryModel from './DocumentPopupModels/EditCategoryModel'
export default function DocumentosAdministrativos() {
    const { Content } = Layout;
    const { Option } = Select;
    const [cantidadPáginas, setCantidadPáginas] = useState<any>(10);
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const [gestionarCategory, setGestionarCategory] = React.useState([]);
    const [categoryAddStatus, setCategoryAddStatus] = React.useState('');
    const [editLicenseCategoryData, setEditLicenseCategoryData] = React.useState({});
    const [isEditModalVisible, setIsEditModalVisible] = useState<any>(false)
    const [messageShow, setMessageShow] = useState<any>(false)
    const [sidebarShow, setSidebarShow] = useState<any>(false);

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
        } else {
            setMatchScreen(false);
        }
    }

    //  columnas
    const columns = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 10,
            // dataIndex: "license_id",
            // key: "license_id",
            fixed: "left",
            // className: "fixColume",
            //@ts-ignore
            render: (text: any, record: any) => <div>{gestionarCategory.indexOf(record) + 1}</div>
        },
        {
            title: <span className='as_tbl_hd'>Fecha creación</span>,
            width: 35,
            dataIndex: "fecha_date",
            key: "fecha_date",
            fixed: (matchScreenSize == 768)? "":"left",
        },
        {
            title: <span className='as_tbl_hd'>Nombre documento administrativo</span>,
            width: 82,
            dataIndex: "nombre_documen",
            key: "nombre_documen",
        },
        {
            title: <span className='as_tbl_hd'>Tipo de perfil</span>,
            width: 200,
            dataIndex: "tipo_perfil",
            key: "tipo_perfil",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Acciones</span><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 30,
            fixed: "right",
            render: (text: any, record: any, index: any) => (

                <p className='text-center'>
                    <a onClick={() => { handleEditCategory(record, index) }} className='edit_icon icone_size' ><EditOutlined /></a>{"  "}
                    <a className='text-danger icone_size' onClick={() => deleteLicense(record, index)} ><DeleteOutlined /></a>
                </p>
            ),
        }
    ];
    const [editCategoryIndex, setEditCategoryIndex] = useState<any>('');
    const [editCategoryData, setEditCategoryData] = useState<any>({});

    useEffect(() => {
        if (messageShow) {
            setTimeout(() => {
                setMessageShow(false);
            }, 3000);
        }
    }, [messageShow])

    function handleEditCategory(params: any, index: any) {
        // setIsModalVisible(true); 
        // setEditLicenseCategoryData(params); 
        // setCategoryAddStatus('Edit')

        setEditCategoryIndex(index);
        setEditCategoryData(params);
        setIsEditModalVisible(true);

    }
    function editCategory() {

        var arr = [...gestionarCategory];
        //@ts-ignore
        arr[editCategoryIndex].nombre_documen = editCategoryData?.nombre_documen;
        //@ts-ignore
        arr[editCategoryIndex].tipo_perfil = editCategoryData?.tipo_perfil;
        setGestionarCategory(arr);
    }
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
            <Modal className="eval_pro_model" visible={isEditModalVisible} width={1000} footer={false}>
                <EditCategoryModel editCategoryData={editCategoryData} setEditCategoryData={setEditCategoryData} setIsEditModalVisible={setIsEditModalVisible} editCategory={editCategory} setMessageShow={setMessageShow} />
            </Modal>

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
                                    <span className='licn_add_text'> <span style={{ marginRight: 8 }}> Crear</span> <a onClick={() => { setIsModalVisible(true); setCategoryAddStatus('Add') }}><PlusOutlined className='add_icone' /> </a></span>
                                </Content>
                                <Content className='licn__card card_box'>
                                    <Content className='success_message_box'>
                                        {messageShow &&
                                            <Content className='success_msg_area' >
                                                <span>Se editó con éxito</span>
                                                <a className='msg_drop_icone' onClick={() => setMessageShow(false)}><CloseOutlined /></a>
                                            </Content>
                                        }
                                    </Content>
                                    <Content className='licn_form mb-1'>
                                        <Content className="evalpro_table_head asgevl_tbl_head">
                                            <Row>
                                                <Col span={10} className='headin_box'>
                                                    <h4 className='title licn_title font-family-Montserrat-SemiBold'>Gestionar documentos administrativos</h4>
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