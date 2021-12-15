import React, { useState } from 'react';
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
    Radio,
    Empty,
    Dropdown as DropdownAnt,
    Radio as RadioAnt, Form as FormAnt
} from "antd";
import { Container, Grid } from "semantic-ui-react";
export default function MaestraConvocatorias(props: any) {
    const { Content } = Layout
    const { Option } = Select

    const [children, setChildren] = useState<any>([]);
    const [validation, setValidation] = useState<any>(false);
    const [gestionarMaestra, setGestionarMaestra] = useState<any>('');

    function onChange(value:any) {
        setGestionarMaestra(value);
        setValidation(false) 
    }

    function onSearch(val:any) {
    console.log('search:', val);
    }
    return (
        <div>
            <Container fluid>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="form--left-box">
                            <Sidebar />
                        </Grid.Column>
                        <Grid.Column className="form--right-box">
                            <HeaderMenu />

                            <Layout className='licn_containt_area p-1'>
                                <Content className='licn__card card_box'>
                                    <Content className='licn_card_header'>
                                        <h4 className='title licn_title font-family-Montserrat-SemiBold'>Gestionar maestra convocatorias</h4>
                                    </Content>
                                    <Content className='licn_form mt-2 mb-2'>
                                        <Form>
                                            <Content className=''>
                                                <label className='form--lable asgevl_form_lable'>Seleccionar Maestra</label>
                                                <Select
                                                    showSearch
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onSearch={onSearch}
                                                    filterOption={(input:any, option:any) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    style={{ width: '100%' }} 
                                                    size='large'
                                                    className={`select_licn ${validation?'select_validation':''} `} 
                                                >
                                                    <Option value="jack">Línea y categoría</Option>
                                                    <Option value="lucy">Actividades cronograma</Option>
                                                    <Option value="tom">Documentos administrativos</Option>
                                                    <Option value="tom">Documentos técnicos</Option>
                                                    <Option value="tom">Área</Option>
                                                </Select>
                                            </Content>
                                        </Form>
                                    </Content>

                                    <Content className='asgevl_table_box mt-1'>

                                        <Content className="mb-2">
                                            <Row className="">
                                                <Col span={24} className="form--btm-btn-box">
                                                    {(gestionarMaestra != '')?
                                                    <Button className="btn-submit form_bg_btn" type="primary" onClick={() => props.setShowPage(2)}>Continuar</Button>:
                                                    <Button onClick={()=>setValidation(true)} className="btn-submit form_bg_btn" type="primary">Continuar</Button>

                                                    }
                                                </Col>
                                            </Row>
                                        </Content>
                                    </Content>
                                </Content>

                            </Layout>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}