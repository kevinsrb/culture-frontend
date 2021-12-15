import React, { useState } from 'react';
import {
    Layout,
    Row,
    Col,
    Form,
    Button,
    Input,
    Image,
    Select,
    Modal,
    Empty
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { LeftOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { json } from 'stream/consumers';
import EditSuccessModel from './EditSuccessModel'
export default function EditCategoryModel(props:any) {
    const { Content } = Layout
    const { Option } = Select
    const [isEditSuccessModal, setIsEditSuccessModal] = useState<any>(false)

    return (
        <div>
             <Modal className="eval_pro_model" visible={isEditSuccessModal} width={1000} footer={false}>
                    <EditSuccessModel setIsEditModalVisible={props.setIsEditModalVisible} setIsEditSuccessModal ={setIsEditSuccessModal} />
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
                                <a onClick={()=>props.setIsEditModalVisible(false)} className="mdl_close_btn"><CloseOutlined /></a>
                            </Col>
                        </Row>
                    </Content>
                </Content>
                <Content className="asgevl__top_mdl_box">
                    <Content className=''>
                        <Form>
                            <Content className='mt-2 mb-1'>
                                <label className='form--lable asgevl_form_lable'>Nombre categoría</label>
                                <Input type="text" className='eval-input evl_cat_input' />
                            </Content>
                        </Form>
                    </Content>
                </Content>

               
                    <Content className="mb-2 text-right model_footer_btn">
                        <span onClick={()=>props.setIsEditModalVisible(false)} className="form_cat_cnc_btn " style={{ cursor: "pointer", marginRight:'2rem' }}>Cancelar</span>
                        <Button  onClick={()=>setIsEditSuccessModal(true)} className="btn-submit form_bg_btn" type="primary">Guardar Cambios</Button>
                    </Content>

            </Layout>
        </div>
    )
}