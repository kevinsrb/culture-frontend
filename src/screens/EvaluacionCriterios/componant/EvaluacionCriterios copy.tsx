import React, { useState } from 'react'
import HeaderMenu from "../../../components/Header";
import Sidebar from "../../../components/NavBar";
import { Footer } from "../../Components/Footer";

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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EvaluacionCriteriosModel from './EvaluacionCriteriosModel'
import EvaluacionCriteriosModelEdit from './EvaluacionCriteriosModelEdit';
// import './antTable.css'
export default function EvaluacionCriterios() {
    const { Content } = Layout
    const { Option } = Select

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



    // colores estados
    const coloresEstado: any = { Abierta: "#21BA45", "En proceso": "#EFC236", Cerrada: "#9F0505" };
    //  columnas
    const columns = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            dataIndex: "idconvocatorias",
            key: "idconvocatorias",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Nombre jurado</span>,
            width: 600,
            dataIndex: "nombre_jurado",
            key: "nombre_jurado",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Seleccionar</span ><small className='pr-1' >Todos<Checkbox onClick={()=> handelCheckAllData()} style={{ margin: '0px 5px' }} /> </small></p>,
            width: 60,
            fixed: "right",
            render: (text: any, record: any, index: any) => (
                <p className='text-center'>
                    <Checkbox onClick={() => setCheckBoxValue(record)} />
                </p>
            ),
        }
    ];
    const [editValue, setEditValue] = useState<any>([]);
    const [editValueList, setEditValueList] = useState<any>([]);
    const [editAssignedCat, setEditAssignedCat] = useState<any>({});
    const [editAssignedModl, setEditAssignedModl] = useState<any>(false);
  
    function setCheckBoxValue(item: any) {
        var valueda = editValue;
        setEditValue([...valueda, item])
    }
    function handelCheckAllData() {
        setEditValue(datosActuales)
    }


    const columnsEdit = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            // dataIndex: "idconvocatorias",
            key: "idconvocatorias",
            fixed: "left",
            render: (text:any, record:any) =><div>{editValueList.indexOf(record) + 1}</div>

        },
        {
            title: <span className='as_tbl_hd'>Nombre jurado</span>,
            width: 600,
            dataIndex: "nombre_jurado",
            key: "nombre_jurado",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Seleccionar</span ><small className='pr-1' >Editar</small> <small className='pr-1' >Eliminar</small></p>,
            width: 60,
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

    // function onSelectChange(selectedRowKeys:any){
    //     setRowSelection(selectedRowKeys);
    //   };

    // const [rowSelection,  setRowSelection ] = useState();

    return (
        <div>
            <Modal className="eval_pro_model" visible={isModalVisible} footer={false} width={1000}>
                {
                    editAssignedModl ?
                        <EvaluacionCriteriosModelEdit setIsModalVisible={setIsModalVisible} editAssignedCat={editAssignedCat} setEditAssignedCat={setEditAssignedCat} editValue={editValue} setEditValue={setEditValue} /> :
                        <EvaluacionCriteriosModel setIsModalVisible={setIsModalVisible} editValue={editValue} setEditValue={setEditValue} setEditValueList={setEditValueList} datosActuales={datosActuales} setDatosActuales={setDatosActuales}/>
                }
            </Modal>

            <Container fluid>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="form--left-box">
                            <Sidebar />
                        </Grid.Column>
                        <Grid.Column className="form--right-box">
                            <HeaderMenu />

                            <Layout className='asgn_eval_containt_area p-1'>
                                <Content className='asgn_eval__card'>
                                    <Content className='asgevl_card_header'>
                                        <h4 className='title'>Asignar criterios de evaluación a jurados</h4>
                                    </Content>
                                    <Content className='asgevl_contain'>
                                        <p>Seleccione los <b> jurados que evaluaran bajo los mismos criterios.</b> Para guardar y continuar debe asignarle criterios de evaluación a todos los jurados.</p>
                                    </Content>
                                    <Content className='asgevl_table_box mt-1'>
                                        <Content className="evalpro_table_head asgevl_tbl_head">
                                            <Row>
                                                <Col span={16}>
                                                    <span className='tbl__head'>Proyectos a evaluar</span>
                                                </Col>
                                                <Col span={8}>
                                                    <Row>
                                                        <Col span={12} className='text-right'>
                                                            <p className="table--total text-right" style={{ paddingRight: '4px' }}>
                                                                Total:
                                                                <span className="text-orance">59</span>
                                                            </p>
                                                        </Col>
                                                        <Col span={12} className=''>
                                                            <p className="table--total">
                                                                Jurados seleccionados<span className="text-orance">(3)</span>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Content>

                                        <Content className='mb-1'>
                                            {//@ts-ignore
                                                <Table columns={columns}
                                                    dataSource={datosActuales}
                                                    scroll={{ x: 800, y: 300 }}
                                                    size="small"
                                                    //rowClassName="sizeTable table-row"
                                                    className="table-ant-design-modify"
                                                    bordered={false}
                                                    pagination={false}
                                                // rowSelection={rowSelection}
                                                />
                                            }
                                        </Content>
                                        <Content className="mb-2">
                                            <Row className="">
                                                <Col span={23} className="form--btm-btn-box">
                                                    {editValue.length > 0 ?
                                                        <Button
                                                            className="btn-submit"
                                                            type="primary"
                                                            onClick={() => setIsModalVisible(true)}
                                                        >Asignar Criterios</Button>
                                                        : <Button
                                                            className="btn-submit"
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
                                                <Col span={16}>
                                                    <span className='tbl__head'>Jurados con criterios asignados</span>
                                                </Col>
                                                <Col span={8}></Col>
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
                                                />
                                            }
                                        </Content>

                                        <Content className="mb-2">
                                            <Row className="">
                                                <Col span={23} className="form--btm-btn-box">
                                                    <Button
                                                        className="btn-submit__ gray_btn"
                                                        type="primary"
                                                    >Guardar y Continuar</Button>
                                                </Col>
                                            </Row>
                                        </Content>

                                    </Content>
                                </Content>


                            </Layout>

                            <Content className="mb-2 mt-1" style={{ borderTop: '1px solid #80808042', paddingTop: '2rem' }}>
                                <Row className="">
                                    <Col span={23} className=" text-left">
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

