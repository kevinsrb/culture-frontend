import React, { useEffect, useState } from 'react'
import HeaderMenu from "../../../components/Header";
import Sidebar from "../../../components/NavBar";
import { Footer } from "../../Components/Footer";
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
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { LeftOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function EditFormEvaluacionCriteriosModel(props: any) {
    const { Content } = Layout
    const { Option } = Select
    const {editFormData, setEditFormData} =props;

    const [editData, setEditData] = useState<any>();
    
    useEffect(()=>{
        setEditData(editFormData)
    },[props])
    
    console.log('editData: frm ', editData);
    return (
        <div>
            <Layout
                className="mb-2  model_info mdl_pd_lf_rg"
                style={{ borderRadius: "15px 15px 15px 15px" }}
            >
                <Content className='model__header asgevl_head'>
                            <Content className='mdl_header_containt'>
                                <Row className='tbl_md_heading_box'>
                                    <Col span={12} className=''>
                                        <h3 className='asgevl_mdl_form_head'>Editar criterio de evaluación</h3>
                                    </Col>
                                    <Col span={12} className='text-right'>
                                        <a className="mdl_close_btn" onClick={() => props.setEditForm(false)}><CloseOutlined /></a>
                                    </Col>
                                </Row>
                            </Content>
                        </Content>

                <Content className="asgevl__top_mdl_box">
                    <Content className=''>
                        <Form>
                            <Row>
                                <Col span={24}>
                                    <Content className='p-1'>
                                        <label className='form--lable asgevl_form_lable'>Criterio de evaluacion</label>
                                        <Select defaultValue="Seleccionar..." 
                                        style={{ width: '100%' }} value={editData?.criterio} className='eval--selct' onChange={(e)=>setEditData({
                                            ...editData,
                                            criterio:e })} >
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled">Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </Content>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Content className='p-1'>
                                        <label className='form--lable asgevl_form_lable'>Descripción</label>
                                        <Input.TextArea className='eval--textarea' value={editData?.descripción} 
                                        onChange={(e)=>setEditData({
                                            ...editData,
                                            descripción:e.target.value
                                        })} />
                                        <p className='text-right'><span className='textarea_txt_count '>0/240</span></p>
                                    </Content>
                                </Col>
                                <Col span={12}>
                                    <Content className='p-1'>
                                        <label className='form--lable asgevl_form_lable'>Porcentaje de evaluacion</label>
                                        <Input type="number" className='eval-input evl_cat_input' value={editData?.evaluacion} 
                                        onChange={(e)=>setEditData({
                                            ...editData,
                                            evaluacion:e.target.value
                                        })} />
                                    </Content>
                                </Col>
                            </Row>

                        </Form>
                    </Content>
                    <Content className="mb-2">
                        <Row className="">
                          
                            <Col span={24} className="form--btm-btn-box">
                                <Button className="form_bg_btn" type="primary" 
                                onClick={() => props.onEdit(editData)}>
                                    Guardar Cambios
                                </Button>
                            </Col>
                        </Row>
                    </Content>
                </Content>
            </Layout>
        </div>
    )
}