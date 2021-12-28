import React, { useState } from 'react'
import HeaderMenu from "../../../components/Header";
import Sidebar from "../../../components/NavBar";
import { Footer } from "../../Components/Footer";

import checkBoxChk from '../../../assets/check-box.png'
import checkBoxEpt from '../../../assets/empty-checkbox.png'

import {
    Icon,
    Breadcrumb,
} from "semantic-ui-react";

import {
    Layout,
    Row,
    Col,
    Divider,
    List,
    Typography,
    Table,
    Tag,
    Space,
    Form,
    Checkbox,
    Button,
    Input,
    Image,
    Select,
    Modal,
    Radio,
    Empty,
    Dropdown as DropdownAnt,
    Radio as RadioAnt, Form as FormAnt
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import EvaluacionCriteriosModel from './EvaluacionCriteriosModel'
import EvaluacionCriteriosModelEdit from './EvaluacionCriteriosModelEdit';
// import './antTable.css'
export default function EvaluacionCriterios() {
    const { Content } = Layout
    const { Option }  = Select

    const [isModalVisible, setIsModalVisible] = useState<any>(false);


    const [cantidadPáginas, setCantidadPáginas] = React.useState(10);
    const [datosEdit, setDatosEdit] = React.useState([
        {
            idconvocatorias: 1,
            nombre_jurado: 'Nombre jurado',
        }
    ])
    const [datosActuales, setDatosActuales] = React.useState([
        {
            idconvocatorias: 1,
            nombre_jurado: 'Nombre jurado',
        },
        {
            idconvocatorias: 2,
            nombre_jurado: 'Nombre jurado',
        },
        {
            idconvocatorias: 3,
            nombre_jurado: 'Nombre jurado',
        },

    ]);

    const [editValue, setEditValue] = useState<any>([]);
    const [editValueList, setEditValueList] = useState<any>([]);
    const [editAssignedCat, setEditAssignedCat] = useState<any>({});
    const [editAssignedModl, setEditAssignedModl] = useState<any>(false);
    const [allCheckbox, setAllCheckbox] = useState<any>(false);
    const [sidebarShow, setSidebarShow] = useState<any>(false);
    const [checkboxCheck, setCheckboxCheck] = useState<any>(false);
    // colores estados
    const coloresEstado: any = { Abierta: "#21BA45", "En proceso": "#EFC236", Cerrada: "#9F0505" };
    const [chkSec, setChkSec] = useState(false);
    //  columnas
    const columns = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            dataIndex: "idconvocatorias",
            key: "idconvocatorias",
            fixed: "left",
            // className: "fixColume",
            // render: (text: any, record: any) => <div>{datosActuales.indexOf(record) + 1}</div>
        },
        {
            title: <span className='as_tbl_hd'>Nombre jurado</span>,
            width: 600,
            dataIndex: "nombre_jurado",
            key: "nombre_jurado",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Seleccionar</span ><small className='pr-1 ast_tbl_txt_sml'  >Todos<img src={allCheckbox ? checkBoxChk : checkBoxEpt} width={allCheckbox ? 12 : 18} onClick={() => handelCheckAllData()} className="chkImg" /> </small></p>,
            width: 70,
            fixed: "right",
            render: (text: any, record: any, index: any) => (

                <p className='text-center'>
                    {
                        editValue.findIndex((item: any) => (item.idconvocatorias == record.idconvocatorias)) >= 0 ?
                            <img onClick={() => setCheckBoxValue(record)} src={checkBoxChk} width={12} />
                            :
                            <img onClick={() => setCheckBoxValue(record)} src={checkBoxEpt} width={18} />
                    }
                </p>
            ),
        }
    ];

    function setCheckBoxValue(item: any) {
        var valueda = editValue;
        const arrIndex = editValue.findIndex((items: any) => (items.idconvocatorias == item.idconvocatorias))

        if (allCheckbox) {
            setAllCheckbox(false);
        }
        if (arrIndex >= 0) {
            valueda.splice(arrIndex, 1);
            setEditValue([...valueda])
        } else {
            setEditValue([...valueda, item])
        }
        setCheckboxCheck(true);
    }

    function handelCheckAllData() {
        var valueda = editValue;
        if (allCheckbox) {
            setAllCheckbox(false);
            setEditValue([])
        } else {
            setAllCheckbox(true);

            // console.log('valueda: ', valueda);
            // console.log('datosActuales: ', datosActuales);
            var arr = [...valueda, ...datosActuales]
            // console.log('arr: ', arr);
            // setEditValue(datosActuales)
            setEditValue([...valueda, ...datosActuales])
            setCheckboxCheck(true);
        }
    }

    const columnsEdit = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            // dataIndex: "idconvocatorias",
            key: "idconvocatorias",
            fixed: "left",
            render: (text: any, record: any) => <div>{editValueList.indexOf(record) + 1}</div>

        },
        {
            title: <span className='as_tbl_hd'>Nombre jurado</span>,
            width: 600,
            dataIndex: "nombre_jurado",
            key: "nombre_jurado",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Seleccionar</span ><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 90,
            fixed: "right",
            render: (datos: any, datos2: any, index: any) => (
                <>
                    <p className='text-center'>
                        {/* <a onClick={() => setIsModalVisible(true)}><EditOutlined /></a>{"  "} */}
                        <a onClick={() => editVisibleFormList(datos2)}><EditOutlined /></a>{"  "}
                        <a className='text-danger'
                            onClick={() => {
                                const val = editValueList
                                val.splice(index, 1);
                                setEditValueList([...val])
                            }}
                        ><DeleteOutlined /></a>
                    </p>
                </>
            ),
        }
    ];

    function editVisibleFormList(item: any) {
        setEditAssignedCat(item)
        setEditAssignedModl(true);
        setIsModalVisible(true)
    }

    function handelFormSubmit() {

        if (allCheckbox) {
            setDatosActuales([])
        }
        setEditAssignedModl(false);
        setIsModalVisible(true);
    }

  

    function itemRenderTable(current: any, type: any, originalElement: any) {
        if (type === "prev") {
            return (
                <span className="border-ant-prev-table font-size-10px">
                    <LeftOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingRight: "2px" }} />
                    Ant.
                </span>
            );
        }
        if (type === "next") {
            return (
                <span className="border-ant-prev-table font-size-10px">
                    Sig.
                    <RightOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingLeft: "2px" }} />
                </span>
            );
        }
        return originalElement;
    }




    return (
        <div>
            <Modal className="eval_pro_model" visible={isModalVisible} footer={false} width={1000}>
                {
                    editAssignedModl ?
                        <EvaluacionCriteriosModelEdit setIsModalVisible={setIsModalVisible} editAssignedCat={editAssignedCat} setEditAssignedCat={setEditAssignedCat} editValue={editValue} setEditValue={setEditValue} setEditValueList={setEditValueList} /> :
                        <EvaluacionCriteriosModel setIsModalVisible={setIsModalVisible} editValue={editValue} setEditValue={setEditValue} setEditValueList={setEditValueList} datosActuales={datosActuales} setDatosActuales={setDatosActuales} setCheckboxCheck={setCheckboxCheck} />
                }
            </Modal>

            <Container fluid>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar' : 'hide__sidebar'}`}>
                            <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
                        </Grid.Column>
                        <Grid.Column className="form--right-box">
                            <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />

                            <Layout className='asgn_eval_containt_area p-1'>
                                <Content className='asgn_eval__card'>
                                    <Content className='asgevl_card_header'>
                                        <h4 className='title asgevl_title font-family-Montserrat-SemiBold'>Asignar criterios de evaluación a jurados</h4>
                                    </Content>
                                    <Content className='asgevl_contain'>
                                        <p className='asgevl_text'>Seleccione los <b className=""> jurados que evaluaran bajo los mismos criterios.</b> Para guardar y continuar debe asignarle criterios de evaluación a todos los jurados.</p>
                                    </Content>
                                    <Content className='asgevl_table_box mt-1'>
                                        <Content className="evalpro_table_head asgevl_tbl_head">
                                            <Row>
                                                <Col span={5} style={{paddingTop: 5}}>
                                                    <span className='tbl__head '>Jurados</span>
                                                </Col>
                                                <Col span={19}>
                                                    <Content className='text-right'>
                                                        <span className="asgevl_tbl_right_text table--total text-right " style={{ paddingRight: '1rem' }} >
                                                            Total :
                                                            <span className="text-orance"> 3</span>
                                                        </span>

                                                        <span className="asgevl_tbl_right_text table--total text-right">Jurados seleccionados <span className="text-orance">(3)</span>
                                                        </span>
                                                    </Content>
                                                </Col>
                                            </Row>
                                        </Content>

                                        <Content className='mb-1'>
                                            {//@ts-ignore
                                                <Table columns={columns}
                                                    style={{ borderTop: "1px solid #C4C4C4" }}
                                                    locale={{ emptyText: <Empty description="No hay datos" style={{ padding: "50px" }} /> }}
                                                    pagination={false}
                                                    /* pagination={{ position: ["bottomRight"], itemRender: itemRenderTable, pageSize: cantidadPáginas }} */
                                                    dataSource={datosActuales}
                                                    scroll={{ x: 800, y: 300 }}
                                                    size="small"
                                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                                    className="table-ant-design-modify"
                                                    bordered={false}
                                                />
                                            }
                                        </Content>
                                        <Content className="mb-2">
                                            <Row className="">
                                                <Col span={24} className="form--btm-btn-box">
                                                    {editValue.length > 0 && checkboxCheck ?
                                                        <Button
                                                            className="form_submit_btn"
                                                            type="primary"
                                                            onClick={() => handelFormSubmit()}
                                                        >Asignar Criterios</Button>
                                                        : <Button className="form_submit_btn"
                                                            type="primary"
                                                        >Asignar Criterios</Button>
                                                    }
                                                </Col>
                                            </Row>
                                        </Content>
                                    </Content>


                                    <Content className='asgevl_table_box mt-1'>
                                        <Content className="evalpro_table_head asgevl_tbl_head">
                                            <Row>
                                                <Col span={23}>
                                                    <span className='tbl__head'>Jurados con criterios asignados</span>
                                                </Col>
                                                <Col span={1}></Col>
                                            </Row>
                                        </Content>

                                        <Content className='mb-1'>
                                            {//@ts-ignore
                                                <Table columns={columnsEdit}
                                                    dataSource={editValueList}
                                                    scroll={{ x: 800, y: 300 }}
                                                    size="small"
                                                    //rowClassName="sizeTable table-row"
                                                    className="table-ant-design-modify"
                                                    bordered={false}
                                                    pagination={false}
                                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                                />
                                            }
                                        </Content>

                                        <Content className="mb-2">
                                            <Row className="">
                                                <Col span={24} className="form--btm-btn-box">
                                                    {editValueList && editValueList.length > 0 ?
                                                        <Button className="btn-submit form_bg_btn" type="primary">Guardar y Continuar</Button>
                                                        : <Button className="btn-submit__ gray_btn" type="primary">Guardar y Continuar</Button>
                                                    }
                                                </Col>
                                            </Row>
                                        </Content>

                                    </Content>
                                </Content>


                            </Layout>

                            <Content className="mb-2 mt-1" style={{ borderTop: '1px solid #80808042', paddingTop: '2rem' }}>
                                <Row className="">
                                    <Col span={24} className=" text-left">
                                        <span className="form__btn_light" style={{ margin: 14, cursor: "pointer" }}>Atrás</span>
                                    </Col>
                                </Row>
                            </Content>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>


        </div>
    )
}

