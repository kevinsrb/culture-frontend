import React, { useState } from 'react';
import {
    Layout,
    Row,
    Col,
    Table,
    Form,
    Button,
    Input,
    Select,
    Modal,
    Empty
} from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditCategoryModel from './EditCategoryModel'
export default function MaestraCategoryModel(props: any) {
    const { Content } = Layout
    const { Option } = Select
    const [isEditModalVisible, setIsEditModalVisible] = useState<any>(false)
    const [messageShow, setMessageShow] = useState<any>(false)
    const columns = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            dataIndex: "category_id",
            key: "category_id",
            fixed: "left",
            // className: "fixColume",
            // render: (text: any, record: any) => <div>{datosActuales.indexOf(record) + 1}</div>
        },
        {
            title: <span className='as_tbl_hd'>Fecha creación</span>,
            width: 70,
            dataIndex: "fecha_creacion",
            key: "fecha_creacion",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Nombre línea</span>,
            width: 600,
            dataIndex: "nombre_linea",
            key: "nombre_linea",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Acciones</span><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 80,
            fixed: "right",
            render: (text: any, record: any, index: any) => (

                <p className='text-center'>
                    <a onClick={() => setIsEditModalVisible(true)} ><EditOutlined /></a>{"  "}
                    <a className='text-danger'><DeleteOutlined /></a>
                </p>
            ),
        }
    ];

    const [datosActuales, setDatosActuales] = React.useState([]);
    return (
        <div>
            <Modal className="eval_pro_model" visible={isEditModalVisible} width={1000} footer={false}>
                <EditCategoryModel setIsEditModalVisible={setIsEditModalVisible} />
            </Modal>

            <Layout
                className="mb-1 mdl_pd_lf_rg model_info"
                style={{ borderRadius: "15px 15px 15px 15px" }}
            >
                <Content className='model__header asgevl_head'>
                    <Content className='mdl_header_containt'>
                        <Row className='tbl_md_heading_box'>
                            <Col span={12} className=''>
                                <h3 className='asgevl_mdl_form_head'>Crear línea / categoría</h3>
                            </Col>
                            <Col span={12} className='text-right'>
                                <a onClick={() => props.setIsModalVisible(false)} className="mdl_close_btn"><CloseOutlined /></a>
                            </Col>
                        </Row>
                    </Content>
                </Content>
                <Content className="asgevl__top_mdl_box">
                    <Content className=''>
                        <Form>
                            <Content className='mt-2 mb-1'>
                                <label className='form--lable asgevl_form_lable'>Nombre Línea</label>
                                <Input type="text" className='eval-input evl_cat_input' />
                            </Content>
                            <Content className='mt-1 mb-1 cat_form_head'>
                                <span className='cat_heding'>Crear categorías</span>
                            </Content>
                            <Content className='mt-1 mb-1'>
                                <label className='form--lable asgevl_form_lable'>Nombre categoría convocatoria</label>
                                <Input type="text" className='eval-input evl_cat_input' />
                            </Content>

                        </Form>
                    </Content>
                    <Content className="mb-2 text-right">
                        <span className="form__btn_light form_submit_btn" style={{ cursor: "pointer" }}>Agregar</span>
                    </Content>


                </Content>
                    <Content className='success_message_box'>
                        {messageShow &&
                        <Content className='success_msg_area' >
                            <span>Se editó con éxito "Nombre categoría"</span>
                            <a><CloseOutlined /></a>
                        </Content>
                        }
                    </Content>

                <Content className='lice_mdl_tabl_area'>
                    <Content className='mb-1'>
                        {//@ts-ignore
                            <Table columns={columns}
                                style={{ borderTop: "1px solid #C4C4C4" }}
                                locale={{ emptyText: <Empty description="No hay datos" style={{ padding: "50px" }} /> }}
                                pagination={false}
                                dataSource={datosActuales}
                                scroll={{ x: 1200, y: 500 }}
                                size="small"
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                className="table-ant-design-modify"
                                bordered={false}
                            />
                        }
                    </Content>
                </Content>
                <Content className="mb-2 text-right model_footer_btn">
                    <span onClick={() => props.setIsModalVisible(false)} className="form_cat_cnc_btn" style={{ cursor: "pointer", marginRight: '2rem' }}>Cancelar</span>
                    <Button className="btn-submit form_bg_btn" type="primary">Guardar y Finalizar</Button>
                </Content>

            </Layout>
        </div>
    )
}