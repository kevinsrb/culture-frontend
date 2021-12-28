import React, { useState } from 'react';
import HeaderMenu from "../../../components/Header";
import Sidebar from "../../../components/NavBar";
import { Footer } from "../../Components/Footer";

import {
    Layout,
    Row,
    Col,
    Form,
    Button,
    Select,
} from "antd";
import { Container, Grid } from "semantic-ui-react";
export default function MaestraConvocatorias(props: any) {
    const { Content } = Layout
    const { Option } = Select

    const [children, setChildren] = useState<any>([]);
    const [validation, setValidation] = useState<any>(false);
    const [gestionarMaestra, setGestionarMaestra] = useState<any>('');
    const [sidebarShow, setSidebarShow] = useState<any>(false);

    function onChange(value:any) {
        setGestionarMaestra(value);
        props.setSelectMaestr(value);
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
                        <Grid.Column className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar':'hide__sidebar'}`}>
                            <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
                        </Grid.Column>
                        <Grid.Column className="form--right-box" >
                            <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />

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
                                                    className={`select_licn select_main_licn ${validation?'select_validation':''} `} 
                                                >
                                                    <Option value="linea_categoria">Línea y categoría</Option>
                                                    <Option value="actividades_cronograma">Actividades cronograma</Option>
                                                    <Option value="documentos_administrativos">Documentos administrativos</Option>
                                                    <Option value="documentos_tecnicos">Documentos técnicos</Option>
                                                    <Option value="area">Área</Option>
                                                    <Option value="entidad">Entidad</Option>
                                                    <Option value="linea_estrategica">Linea Estrategica</Option>
                                                    <Option value="ciclos">Ciclos</Option>
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