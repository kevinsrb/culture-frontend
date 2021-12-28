import React, { useEffect, useState } from "react";
import { Layout, Form, Button, Input, Row, Col, Space, Table, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

export default function MaestraParaEditDataModel(props: any) {
    const { Content } = Layout;
    const { editArrayData, setEditArrayData, setTabData, tabData } = props;
    const [edifFormData, setEditFormData] = useState<any>({ sNo: '', criterio: '' })
    console.log('edifFormData: viren ==>', edifFormData);

    useEffect(() => {
        setEditFormData(editArrayData)
    }, [props])

    function updateData() {
        
        const array = [...tabData]
        const index = tabData.findIndex((item: any) => (item.sNo == edifFormData.sNo))
        array[index].criterio = edifFormData.criterio
        setTabData([...array]);

        props.setEditModel(false)
    }
    return (
        <div>
            <Layout className="mastAdt--form-box" style={{ marginBottom: '0rem' }}>
                <Content style={{ backgroundColor: '#ffff', padding: '5px', borderRadius: '15px' }} >
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
                                        <a onClick={() => props.setEditModel(false)} className='close_btn text-danger'><CloseOutlined /></a>
                                    </Content>
                                </Col>
                            </Row>
                        </Content>

                        <Content>
                            <Form name="dynamic_form_nest_item" autoComplete="off">
                                <Form.Item name="area" className='' label="" rules={[{ required: true, message: 'Missing area' }]}>
                                    <label className='tbl-form-lable'>Filtrar por palabra clave o código de jurado</label>
                                    <Input placeholder="Basic usage form--cont" value={edifFormData?.criterio} onChange={(e) => setEditArrayData({
                                        ...editArrayData,
                                        criterio: e.target.value
                                    })} />
                                </Form.Item>
                            </Form>
                            <Content className='text-right'>
                                <Button key="submit" className='adt-form-submit-btn' type="primary" onClick={() => updateData()}>Crear</Button>
                            </Content>
                        </Content>
                    </Content>
                </Content>
            </Layout>

        </div>
    )
}