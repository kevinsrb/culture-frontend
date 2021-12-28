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
import EditFormEvaluacionCriteriosModel from './EditFormEvaluacionCriteriosModel';
import { json } from 'stream/consumers';
export default function EvaluacionCriteriosModel(props: any) {
    const { editValue, setEditValue, setEditValueList, datosActuales, setDatosActuales } = props;
    const { Content } = Layout
    const { Option } = Select


    const [evaluationData, setEvaluationData] = useState<any>([]);
    const [evaluationFormData, setEvaluationFormData] = useState<any>({
        idconvocatorias: 1,
        criterio: '',
        descripción: '',
        evaluacion: '',
    });

    const [editForm, setEditForm] = useState<any>(false);
    const [editFormData, setEditFormData] = useState<any>({});

    const columnsEdit = [
        {
            title: <span className='as_tbl_hd'>No.</span>,
            width: 30,
            dataIndex: "idconvocatorias",
            key: "idconvocatorias",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Criterio</span>,
            width: 200,
            dataIndex: "criterio",
            key: "criterio",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Descripción</span>,
            width: 100,
            dataIndex: "descripción",
            key: "descripción",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>% evaluación</span>,
            width: 100,
            dataIndex: "evaluacion",
            key: "evaluacion",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Acciones</span ><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 60,
            fixed: "right",
            render: (datos: any, datos2: any, index: any) => (
                <>
                    <p className='text-center'>
                        <a onClick={() => (setEditForm(true), setEditFormData(datos2))}><EditOutlined /></a>{"  "}
                        <a className='text-danger' onClick={() => onDelete(index, datos2)} ><DeleteOutlined /></a>
                    </p>
                </>
            ),
        }
    ];
    const [formErrors, setFormErrors] = useState<any>();

    useEffect(() => {
        handelEditValueArray();

    }, [props]);

    function onDelete(params: any, item: any) {        
        const array = [...evaluationData]
        array.splice(params, 1);
        setEvaluationData(array)
    }

    function handelEditValueArray() {
        console.log('editValue: fff', editValue);
        const arrIndexs = editValue.findIndex((item: any) => !item.arrayData);
        
        if (arrIndexs) {
            setEvaluationData([]);
        }
    }

    function formValidation() {
        let formErrors: any = {};
        let formIsValid = true;

        if (!evaluationFormData.criterio) {
            formIsValid = false;
            formErrors["criterio"] = true;
        }
        console.log('evaluationData.descripción: ', evaluationFormData.descripción);
        if (!evaluationFormData.descripción) {
            formIsValid = false;
            formErrors["descripción"] = true;
        }
        if (!evaluationFormData.evaluacion) {
            formIsValid = false;
            formErrors["evaluacion"] = true;
        }
        setFormErrors(formErrors);
        return formIsValid;
    }
    function handelFormSubmit() {
        if (formValidation()) {

            let arrData = evaluationData;
            setEvaluationData([...arrData, evaluationFormData]);

            setEvaluationFormData({
                idconvocatorias: evaluationFormData.idconvocatorias + 1,
                criterio: '',
                descripción: '',
                evaluacion: '',
            })
        }
    }
    function handelListDataSubmit() {
        let arr: any = []

        // console.log('editValue: virjj ', editValue);
        
        editValue && editValue.map((value: any) => {
            if (value.arrayData) {
            } else {
                value.arrayData = evaluationData
                const index = datosActuales.findIndex((item: any) => (item.idconvocatorias == value.idconvocatorias))
                datosActuales.splice(index, 1);
            }
            arr.push(value);
            setDatosActuales([...datosActuales])
        });
        setEditValueList(arr);
        setEditValue(arr);
        setEvaluationData([]);
        props.setIsModalVisible(false)
        props.setCheckboxCheck(false)
    }

   /*  function handelListDataSubmit() {
        let arrData = [...evaluationData];
        let fullarr = [...editValue];
        console.log('arrData: ', arrData);

        editValue.map((item: any, index: any) => {
            console.log('item: dcd', item);
            console.log('editAssignedCat: dcd', editAssignedCat);
            if (item.idconvocatorias == editAssignedCat.idconvocatorias) {
                console.log('editValue[index]: cd ', editValue[index]);
                fullarr[index].arrayData = arrData
            }
        })
        console.log('fullarr: ', fullarr);
        setEditValue(fullarr)
        setEditValueList(fullarr)
        // console.log('editValue: ', editValue);
        props.setIsModalVisible(false)
    } */


    function onEdit(upData: any) {

        // const index = editValue.findIndex((item: any) => (item.idconvocatorias == editAssignedCat.idconvocatorias))
        const indexs = evaluationData.findIndex((item: any) => (item.idconvocatorias == upData.idconvocatorias))
        evaluationData[indexs] = upData
        setEditForm(false)
    }

    return (
        <div>
            {editForm ?
                <Modal className="eval_pro_model" visible={editForm} footer={false} width={1000}>
                    <EditFormEvaluacionCriteriosModel setEditForm={setEditForm} editFormData={editFormData} setEditFormData={setEditFormData} onEdit={onEdit} />
                </Modal>
                :
                <div>
                    <Layout
                        className="mb-1 mdl_pd_lf_rg model_info"
                        style={{ borderRadius: "15px 15px 15px 15px" }}
                    >
                        <Content className='model__header asgevl_head'>
                            <Content className='mdl_header_containt'>
                                <Row className='tbl_md_heading_box'>
                                    <Col span={20} className=''>
                                        <h3 className='asgevl_mdl_form_head'>Criterios de evaluación </h3>
                                    </Col>
                                    <Col span={4} className='text-right'>
                                        <a className="mdl_close_btn" onClick={() => props.setIsModalVisible(false)}><CloseOutlined /></a>
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
                                                <Select defaultValue="Seleccionar..." style={{ width: '100%' }} onChange={(e: any) => setEvaluationFormData({
                                                    ...evaluationFormData,
                                                    criterio: e
                                                })} className='eval--selct'
                                                    value={evaluationFormData.criterio}
                                                    id={`${!evaluationFormData.criterio && formErrors?.criterio ? 'error' : ''}`} >
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
                                                <Input.TextArea className='eval--textarea'
                                                    onChange={(e: any) => setEvaluationFormData({
                                                        ...evaluationFormData,
                                                        descripción: e.target.value,

                                                    })} value={evaluationFormData.descripción}
                                                    id={`${!evaluationFormData.descripción && formErrors?.descripción ? 'error' : ''}`}
                                                />
                                                {console.log('formErrors: ', formErrors)}
                                                <p className='text-right'><span className='textarea_txt_count'>0/240</span></p>
                                            </Content>
                                        </Col>
                                        <Col span={12}>
                                            <Content className='p-1'>
                                                <label className='form--lable asgevl_form_lable'>Porcentaje de evaluacion</label>
                                                <Input type="number" onChange={(e: any) => setEvaluationFormData({
                                                    ...evaluationFormData,
                                                    evaluacion: e.target.value,
                                                })} className='eval-input evl_cat_input' value={evaluationFormData.evaluacion}
                                                    id={`${!evaluationFormData.evaluacion && formErrors?.evaluacion ? 'error' : ''}`} />
                                            </Content>
                                        </Col>
                                    </Row>
                                </Form>
                            </Content>
                            <Content className="mb-2">
                                <Row className="">
                                    <Col span={24} className="form--btm-btn-box">
                                        <span onClick={() => handelFormSubmit()} className="form__btn_light form_submit_btn" style={{ margin: 14, cursor: "pointer" }}>Agregar</span>
                                    </Col>
                                </Row>
                            </Content>
                        </Content>
                    </Layout>
                    <Layout
                        className="mb-2  model_info evaluar_mdl_box mdl_pd_lf_rg"
                        style={{ borderRadius: "15px 15px 15px 15px" }}
                    >
                        <Content >
                            <Content className='asgevl_table_box'>
                                <Content className="evalpro_table_head asgevl_tbl_head">
                                    <Row className='tbl_md_heading_box'>
                                        <Col span={16}>
                                            <span className='tbl__head eval_tbl_head'>Lista de criterios a evaluar</span>
                                        </Col>
                                        <Col span={8}>
                                            <p className="table--total table--total-mdl text-right">Total :{" "} <span className="text-orance">{evaluationData.length}</span>
                                            </p>
                                        </Col>
                                    </Row>
                                </Content>

                                <Content className='mb-1'>
                                    {//@ts-ignore
                                        <Table columns={columnsEdit}
                                            dataSource={evaluationData}
                                            scroll={{ x: 800, y: 300 }}
                                            size="small"
                                            //rowClassName="sizeTable table-row"
                                            className="table-ant-design-modify"
                                            bordered={false}
                                            pagination={false}
                                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                        />
                                    }
                                </Content>

                                <Content className="mb-2">
                                    <Row className="">
                                        <Col span={24} className="form--btm-btn-box form_clr_spn_btn">
                                            <span className='form_cat_cnc_btn' onClick={() => props.setIsModalVisible(false)} style={{ paddingRight: '5px', cursor: 'pointer' }}>Cancelar</span>
                                            {evaluationData && evaluationData.length > 0 ?
                                                <Button className="btn-submit form_bg_btn" type="primary" onClick={() => handelListDataSubmit()}>Asignar Criterios</Button>
                                                : <Button className="btn-submit form_bg_btn" type="primary">Asignar Criterios</Button>
                                            }
                                        </Col>
                                    </Row>
                                </Content>
                            </Content>
                        </Content>

                    </Layout>
                </div>
            }
        </div>
    )
}