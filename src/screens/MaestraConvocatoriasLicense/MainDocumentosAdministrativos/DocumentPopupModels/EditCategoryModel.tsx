import React, { useState } from 'react';
import {
    Layout,
    Row,
    Col,
    Form,
    Button,
    Input,
    Select,
    Modal,
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { LeftOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { json } from 'stream/consumers';
import EditSuccessModel from './EditSuccessModel'
export default function EditCategoryModel(props: any) {
    const { editCategoryData, setEditCategoryData, setMessageShow } = props;
    const { Content } = Layout
    const { Option } = Select
    const [isEditSuccessModal, setIsEditSuccessModal] = useState<any>(false)

    console.log('editCategoryData: ', editCategoryData);

    function handleEditCategry() {
        props.editCategory();
        props.setIsEditModalVisible(false);
        props.setMessageShow(true)
    }
    function handelSelectValue(value: any) {
        setEditCategoryData({
            ...editCategoryData,
            tipo_perfil: value
        })
    }
    return (
        <div>
            <Modal className="eval_pro_model" visible={isEditSuccessModal} width={1000} footer={false}>
                <EditSuccessModel setIsEditModalVisible={props.setIsEditModalVisible} setIsEditSuccessModal={setIsEditSuccessModal} setMessageShow={setMessageShow} />
            </Modal>

            <Layout
                className="mb-1 mdl_pd_lf_rg model_info"
                style={{ borderRadius: "15px 15px 15px 15px" }}
            >
                <Content className='model__header asgevl_head'>
                    <Content className='mdl_header_containt'>
                        <Row className='tbl_md_heading_box'>
                            <Col span={12} className=''>
                                <h3 className='asgevl_mdl_form_head'>Editar categoría</h3>
                            </Col>
                            <Col span={12} className='text-right'>
                                <a onClick={() => props.setIsEditModalVisible(false)} className="mdl_close_btn"><CloseOutlined /></a>
                            </Col>
                        </Row>
                    </Content>
                </Content>
                <Content className="asgevl__top_mdl_box">
                    <Content className=''>
                        <Form>
                            <Content className='mt-2 mb-1'>
                                <Row className='tbl_md_heading_box'>
                                    <Col span={12} className='' style={{ paddingRight: 10 }}>
                                        <label className='form--lable asgevl_form_lable'>Nombre documento administrativo</label>
                                        <Input onChange={(e: any) => setEditCategoryData({
                                            ...editCategoryData,
                                            nombre_documen: e.target.value
                                        })} type="text" className='eval-input evl_cat_input cat_bold' value={editCategoryData?.nombre_documen} />
                                    </Col>
                                    <Col span={12} className='' style={{ paddingLeft: 10 }}>
                                        <label className='form--lable asgevl_form_lable dct_lbl_slct'>Asociar tipo perfil</label>
                                        <Select onChange={handelSelectValue} defaultValue="Seleccionar…" className='select_licn select_main_licn select_main_dct' value={editCategoryData?.tipo_perfil} size='large' style={{ width: '100%' }} >
                                            <Option value="Seleccionar 1">Seleccionar 1</Option>
                                            <Option value="Seleccionar 2">Seleccionar 2</Option>
                                            <Option value="Seleccionar 3">Seleccionar 3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Content>
                        </Form>
                    </Content>
                </Content>

                <Content className="mb-2 text-right model_footer_btn">
                    <span onClick={() => props.setIsEditModalVisible(false)} className="form_cat_cnc_btn " style={{ cursor: "pointer", marginRight: '2rem' }}>Cancelar</span>
                    {/* <Button  onClick={()=>setIsEditSuccessModal(true)} className="btn-submit form_bg_btn" type="primary">Guardar Cambios</Button> */}
                    <Button onClick={() => { handleEditCategry() }} className="btn-submit form_bg_btn" type="primary">Guardar Cambios</Button>
                </Content>

            </Layout>
        </div>

    )
}