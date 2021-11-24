import React, { useState } from 'react';
import Sidebar from "../../../components/NavBar";
import HeaderMenu from "../../../components/Header";
import { Layout, Row, Col, Form, Input, Select, Table, Modal, Button } from "antd";
export default function InvitacionJurado() {
    const { Search } = Input;
    const [form] = Form.useForm();
    const { Content } = Layout;
    const { Option } = Select;
    const [showFild, setShowFild] = useState<any>('hide-data')


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div>
            <Layout>
                <Content className="">

                    <Modal title="" visible={isModalVisible} onCancel={handleCancel}
                        className="invit--succes-model" footer={null}>
                        <Content style={{ textAlign: 'center' }} className="invit--model-containt">
                            <h3 className='title'>Correo enviado con éxito</h3>
                            <p>Se ha enviado la invitación a jurado extemporáneo exitosamente</p>
                            <p className='text-co'>Hemos enviado un mensaje con las instrucciones de inscripción al banco de jurados para "Nombre Jurado"</p>
                        </Content>
                        <Content style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={handleOk} shape="round" className='mt-2'>
                                Aceptar
                            </Button>
                        </Content>
                    </Modal>

                    <Row>
                        <Col span={5}>
                            <Sidebar />
                        </Col>
                        <Col span={18}>
                            <Content>
                                <HeaderMenu />
                            </Content>
                            <Content className='main-card card'>
                                <Content className='main--containt'>
                                    <Content className='adm--table--head'>
                                        <Row>
                                            <Col span={18}>
                                                <Content><span className='head-table'>Invitación a la inscripción extemporánea de jurado - <small className='text-danger'>Todos los campos son obligatorios</small> </span></Content>
                                            </Col>
                                        </Row>
                                    </Content>
                                    <Content className='adm--form--area'>
                                        <Form form={form} name="dynamic_form_nest_item" autoComplete="off">
                                            <Content className='inv--form-fild'>
                                                <label className='inv--lable-text'>Invitación a profesional</label>
                                                <Select
                                                    onChange={() => setShowFild('show-data')}
                                                    placeholder="Seleccionar..."
                                                    optionFilterProp="children"
                                                    className='inv--form-select form--cont'
                                                >
                                                    <Option value="interno">Interno</Option>
                                                    <Option value="externo">Externo</Option>
                                                </Select>
                                            </Content>
                                            <Content className={`${(showFild) ? showFild : ''}`}>
                                                <Content className='inv--form-fild'>
                                                    <label className='inv--lable-text'>Nombres y Apellidos</label>
                                                    <Input placeholder="" className='form--cont' />
                                                </Content>
                                                <Content className='inv--form-fild'  >
                                                    <label className='inv--lable-text'>Correo electrónico</label>
                                                    <Input placeholder="" className='form--cont' type='email' />
                                                </Content>

                                                <Content className='text-right'>
                                                    <Button type="primary" onClick={showModal} shape="round">
                                                        Enviar invitación
                                                    </Button>
                                                </Content>
                                            </Content>

                                        </Form>
                                    </Content>

                                </Content>
                            </Content>
                        </Col>
                    </Row>

                </Content>
            </Layout>


        </div>
    )
}