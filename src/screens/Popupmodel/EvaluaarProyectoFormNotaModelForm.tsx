import React, { useEffect, useState } from "react";
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
import { Content } from "antd/lib/layout/layout";
import { CloseOutlined } from '@ant-design/icons'

export default function EvaluaarProyectoFormNotaModelForm(props: any) {

    useEffect(() => {
        if (props.modalType == 'add') {
            let edit: any = props.editData
            edit.no = props.updateData?.length + 1
        }
    }, [props.editData])
    return (
        <div>
            <div>
                <Layout
                    className="mb-2 model_info"
                    style={{ borderRadius: "15px", width: '98%' }}
                >
                    <Content className='model__header btm_border'>
                        <Content className='mdl_header_containt'>
                            <Row>
                                <Col span={12} className='p-1'>
                                    <h3>Evaluar criterio</h3>
                                </Col>
                                <Col span={12} className='p-1 text-right'>
                                    <a className="mdl_close_btn" onClick={() => props.setEditFormModel(false)}><CloseOutlined /></a>
                                </Col>
                            </Row>
                        </Content>
                    </Content>
                    <Content className="evalu__top_mdl_box">
                        <Content className="evalu_inform_header"></Content>
                        <Content className="eval_cat_form_text p-1 form_paddin">
                            <p className='cat_title'>
                                {" "}
                                <span> Criterio:</span>{" "}
                            </p>
                            <p>
                                {" "}
                                Actualidad de los marcos conceptuales de la investigación
                            </p>
                            <p className='cat_title'>
                                <span> Descripción:</span>{" "}
                            </p>
                            <p>
                                {" "}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie commodo arcu sit amet malesuada. Aenean ultricies risus a massa dictum, malesuada bibendum sapien ornare.
                            </p>
                        </Content>
                        <Content className="evalu_cat_form p-1">
                            <label>Nota de evaluación</label>
                            <Form className="evalu__form">
                                <Row>
                                    <Col span={12} className="p-1">
                                        <label>
                                        Observaciónes - <small>Opcional</small>
                                        </label>
                                        {/* {        console.log('props?.editData: ', props?.editData)}                                         */}
                                        <Input
                                            placeholder="Basic usage"
                                            className="evl_cat_input"
                                            value={props?.editData?.observations}
                                            onChange={(e) => {
                                                props.setEditData({
                                                    ...props?.editData,
                                                    observations: e.target.value,
                                                })
                                            }}
                                        />
                                        <p className="observations_spn">0/250</p>
                                    </Col>
                                    <Col span={6} className="p-1">
                                        <label>Nota ( 0-100 )</label>
                                        <Input
                                            placeholder=""
                                            className="evl_cat_input"
                                            value={props?.editData?.nota}
                                            onChange={(e) => {
                                                props.setEditData({
                                                    ...props?.editData,
                                                    nota: e.target.value,
                                                })
                                            }}
                                        />
                                    </Col>
                                    <Col span={6} className="p-1">
                                        <label>Porcentaje del criterio</label>
                                        <Input
                                            placeholder="20%"
                                            className="evl_cat_input"
                                            value={props?.editData?.percentage}
                                            onChange={(e) => {
                                                props.setEditData({
                                                    ...props?.editData,
                                                    percentage: e.target.value,
                                                })
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Content>
                        {/* <hr className="border_light" /> */}
                        <Content className="mt-2 mb-2">
                            <Row className="">
                                <Col span={23} className="form--btm-btn-box">
                                    <span

                                        onClick={() => (
                                            props.setEditFormModel(false))}
                                        style={{ margin: 14, cursor: "pointer" }}>
                                        CANCELAR
                                    </span>
                                    <Button
                                        onClick={() => {
                                            props.setEditFormModel(false)
                                            if (props.modalType === 'add') {
                                                props.dataArray.splice( props.editData.index,1)
                                                props.setUpdateData([
                                                    ...props.updateData,
                                                    props.editData
                                                ])
                                            } else {
                                                props.setUpdatedval()
                                            }
                                        }}
                                        className="btn-submit"
                                        type="primary"
                                    >
                                        EVALUAR CRITERIO
                                    </Button>
                                </Col>
                            </Row>
                        </Content>
                    </Content>
                </Layout>
            </div>
        </div >
    );
}
