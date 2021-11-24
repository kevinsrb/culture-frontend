import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Container,
    Grid,
} from "semantic-ui-react";
import Sidebar from '../../../components/NavBar';
import HeaderMenu from '../../../components/Header';

import { Layout, Row, Col, Divider, List, Typography, Table, Tag, Space, Form, Checkbox, Button } from 'antd';

import { CheckCircleFilled } from '@ant-design/icons';

// import '../../App.css'
export default function FormStatusCheckConfirm() {
    const { Paragraph } = Typography;
    const { item } = List;
    const { Header, Content } = Layout;

    return (
        <div >

            <Layout >
                <Content >
                    <Header >
                        <HeaderMenu />
                    </Header>
                </Content>
                <Content className='frm-stus-head' >
                    <Content >

                    </Content>
                </Content>

                <Content className='main--formal-box' >
                    <Content className='box-container' >
                        <Content className='' >
                            <Row >
                                <Col span={6} >
                                    <Content className='table-area pro-menu-containt'>
                                        <List.Item className='pro-menu'>
                                            <Typography.Text className='pro-list--item'>many different design specs</Typography.Text> 
                                        </List.Item>
                                        <List.Item>
                                            <Typography.Text className='pro-list--item'>many different design specs</Typography.Text> 
                                        </List.Item>
                                        <List.Item>
                                            <Typography.Text className='pro-list--item'>many different design specs</Typography.Text> 
                                        </List.Item>
                                        <List.Item>
                                            <Typography.Text className='pro-list--item'>many different design specs</Typography.Text> 
                                        </List.Item>
                                        <List.Item>
                                            <Typography.Text className='pro-list--item'>many different design specs</Typography.Text> 
                                        </List.Item>

                                    </Content>
                                </Col>
                                <Col span={16} >
                                    <Content className='stts--lf-form-head'>
                                        <Content className='heading--title'>
                                            <h1 className='title'>Lorem Ipsum - All the facts</h1>
                                        </Content>
                                    </Content>

                                    <Content className='containt--area ml-2 mr-2 mb-2 mt-2'>
                                        <Typography>
                                            <Paragraph className='head---text-containt'>
                                                <b>In the process of internal desktop applications development,</b> many different design specs and
                                                implementations would be involved.
                                            </Paragraph>
                                        </Typography>
                                    </Content>

                                    <Content className='containt--area ml-2 mr-2 mb-2 mt-2'>
                                        <Content className='table-area'>

                                            <Row>
                                                <Col span={11}><span><b>Formulario</b></span></Col>
                                                <Col span={9}><span><b>Estado</b></span></Col>
                                                <Col span={4}><span></span></Col>
                                            </Row>

                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col span={11}><p>Lorem Ipsum - All the facts</p></Col>
                                                <Col span={9}><p>
                                                    <CheckCircleFilled twoToneColor="#52c41a" className='list--chk-icon' />Completado</p></Col>
                                                <Col span={4} className='text-right'><a href='#'>EDITAR</a></Col>
                                            </Row>


                                            <Row className='mt-2'>
                                                <Col span={11} className='form--confirm-chkbox'>
                                                    <Form name="basic">
                                                        <Form.Item name="remember" valuePropName="checked">
                                                            <Checkbox className='sts--form-chk-text'>Acepto <a>Termionos y Condiciones</a> </Checkbox>
                                                        </Form.Item>
                                                    </Form>
                                                </Col>
                                            </Row>

                                            <Row className=''>
                                                <Col span={24} className='form--btm-btn-box'>
                                                    <Button className='btn-submit' type="primary">ENVIAR HOJA DE VIDA</Button>
                                                </Col>
                                            </Row>

                                        </Content>
                                    </Content>
                                </Col>
                            </Row>
                        </Content>
                    </Content>
                </Content>
            </Layout>
        </div >
    )
}