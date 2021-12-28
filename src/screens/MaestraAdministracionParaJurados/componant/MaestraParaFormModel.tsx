import React, { useEffect, useState } from "react";
import { Layout, Form, Button, Input, Row, Col, Space, Table, Select } from "antd";
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
export default function MaestraParaFormModel(props: any) {
    const { Content } = Layout;
    const { data, setTabData, tabData, setEditModel, setEditArrayData } = props;


    const [columns, setColumns] = useState<any>([
        {
            title: 'No',
            width: 25,
            dataIndex: 'sNo',
            key: 'sNo',
            fixed: 'left',
        },
        {
            title: 'Criterio',
            width: 130,
            dataIndex: 'criterio',
            key: 'criterio',
            fixed: 'left',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 35,
        },
    ]);
    
    const [formTabData, setFormTabData] = useState<any>([]);
    const [formData, setFormData] = useState<any>({
        sNo: '0',
        criterio: '',
    });
    
    useEffect(() => {
        // setFormTabData([]);
    }, [tabData, formTabData])


    function submitData() {
        var formVal = {
            sNo: formData.sNo,
            criterio: formData.criterio,
            action: <Space size="middle">
                <a onClick={() => (setEditModel(true), setEditArrayData(formData) )}><EditOutlined className='text-primary'   /></a>
                <a><DeleteOutlined style={{ color: 'red' }} /></a>
            </Space>,
        }
        var datadd = [...formTabData];
        setFormTabData([...datadd, formVal]);
        setTabData([...tabData, formVal])
        // setTabData(datadd);
        setFormData({
            ...formData,
            criterio: ''
        })
    }
    
    return (
        <div>
            <Layout className="mastAdt--form-box">
                <Content style={{backgroundColor: '#ffff', padding: '5px' }}>
                    <Content className='adm--form--area'>
                        <Content className='maf-head mb-2'>
                            <Row>
                                <Col span={22}>
                                    <Content>
                                        <span className='title'>Crear criterios de evaluación</span>
                                    </Content>
                                </Col>
                                <Col span={2}>
                                    <Content style={{ textAlign: "right" }}>
                                        <a onClick={() => props.handleCancel()} className='close_btn text-danger'><CloseOutlined /></a>
                                    </Content>
                                </Col>
                            </Row>
                        </Content>

                        <Content>
                            <Form name="dynamic_form_nest_item" autoComplete="off">
                                <Form.Item name="area" className='' label="" rules={[{ required: true, message: 'Missing area' }]}>
                                    <label className='tbl-form-lable'>Filtrar por palabra clave o código de jurado</label>
                                    <Input placeholder="Basic usage" onChange={(e) => setFormData({
                                        ...formData,
                                        sNo: formTabData.length + 1,
                                        criterio: e.target.value
                                    })} value={formData.criterio} />
                                </Form.Item>
                            </Form>
                            <Content className='text-right'>
                                <Button onClick={() => submitData()} key="submit" className='adt-form-submit-btn' type="primary">Crear</Button>
                            </Content>
                        </Content>
                    </Content>
                </Content>
            </Layout>
            <Layout className='mstAdt-model-table-area'>
                <Content className='mstAdt-model-table-head'>
                    <Row>
                        <Col span={18}>
                           <Content><span className='head-table'>Criterios creados</span></Content>
                        </Col>
                        <Col span={6} className='text-right'>
                            <span>Total: <span>{formTabData.length}</span></span>
                        </Col>
                    </Row>
                </Content>
                <Content className='mstAdt-model-table-box' >
                    <Content className='adt--table-box '>
                        <Table columns={columns} dataSource={tabData} scroll={{ x: 'calc(300px + 50%)', y: 240 }} className='adt--form-table' pagination={false} />
                    </Content>
                </Content>
                <Content className='text-right mastAdt-modl-footer'>
                    <a key="submit"  >Cancelar</a>
                    <Button key="submit" className='adt-form-submit-btn' type="primary" onClick={() => props.handleOk(formTabData)}>Guardar y Continuar</Button>
                </Content>
            </Layout>

        </div>
    )
}