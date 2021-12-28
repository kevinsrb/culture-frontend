import React, { useEffect, useState } from 'react';
import {
    Layout,
    Row,
    Col,
    Table,
    Form,
    Button,
    Input,
    Select,
    Modal,
    Empty
} from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditCategoryModel from './EditCategoryModel'
import EditSuccessModel from './EditSuccessModel'
import moment from 'moment';
export default function MaestraCategoryModel(props: any) {
    const { gestionarCategory, setGestionarCategory, categoryAddStatus, setCategoryAddStatus, editLicenseCategoryData, setEditLicenseCategoryData, } = props;
    const { Content } = Layout
    const { Option } = Select
    const [isEditModalVisible, setIsEditModalVisible] = useState<any>(false)
    const [messageShow, setMessageShow] = useState<any>(false)
    const [isEditSuccessModal, setIsEditSuccessModal] = useState<any>(false)
    const columns = [
        {
            title: <span className='as_tbl_hd'>Nombre documento administrativo</span>,
            width: 180,
            dataIndex: "nombre_documen",
            key: "nombre_documen",
            fixed: "left",
        },
        {
            title: <span className='as_tbl_hd'>Tipo de perfil</span>,
            width: 600,
            dataIndex: "tipo_perfil",
            key: "tipo_perfil",
            fixed: "left",
        },
        {
            title: () => <p className='text-center'><span className='as_tbl_hd'>Acciones</span><small className='pr-1 ast_tbl_txt_sml' >Editar</small> <small className='pr-1 ast_tbl_txt_sml' >Eliminar</small></p>,
            width: 80,
            fixed: "right",
            render: (text: any, record: any, index: any) => (

                <p className='text-center'>
                    <a onClick={() => handelEditCategory(record, index)} className='edit_icon' ><EditOutlined /></a>{"  "}
                    <a className='text-danger' onClick={() => onDelete(record, index)}><DeleteOutlined /></a>
                </p>
            ),
        }
    ];
    const [nombreLinea, setNombreLinea] = useState<any>('');
    const [category, setcategory] = useState<any>({ category_name: '' });
    const [datosCategory, setDatosCategory] = useState<any>([]);
    const [formErrors, setFormErrors] = useState<any>({});
    const [nombreDocumen, setNombreDocumen] = useState<any>('');
    const [asociarTipoPerfil, setAsociarTipoPerfil] = useState<any>('');


    function formValidation() {
        let formErrors: any = {};
        let formIsValid = true;

        if (!nombreDocumen) {
            formIsValid = false;
            formErrors["nombre_documen"] = true;
        }
        if (!asociarTipoPerfil) {
            formIsValid = false;
            formErrors["tipo_perfil"] = true;
        }
        setFormErrors(formErrors);
        return formIsValid;
    }
    function handelAddCategory() {
        if (formValidation()) {
            const arr = {
                license_id: (gestionarCategory.length > 0) ? gestionarCategory.length + datosCategory.length + 1 : datosCategory.length + 1,
                fecha_date: moment().format("D-M-Y"),
                nombre_documen: nombreDocumen,
                tipo_perfil: asociarTipoPerfil,
            }
            setDatosCategory([...datosCategory, arr]);
            setNombreDocumen('');
            setAsociarTipoPerfil('');
        }
    }

    function handelCategoryAddForm() {
        if (datosCategory.length > 0) {
            setGestionarCategory([...gestionarCategory, ...datosCategory])
            props.setIsModalVisible(false)
            setIsEditSuccessModal(true);
        }
    }

    useEffect(() => {
        categoryHandelArray()
    }, [props, categoryAddStatus]);

    useEffect(() => {
        if (messageShow) {
            setTimeout(() => {
                setMessageShow(false);
            }, 3000);
        }
    }, [messageShow])
    function categoryHandelArray() {
        if (categoryAddStatus == 'Add') {
            const arr: any = [];
            const valArr: any = '';
            setDatosCategory([...arr])
            setcategory({ ...category, category_name: '' })
            setNombreLinea(valArr)
        }
        if (categoryAddStatus == 'Edit') {
            const arr: any = editLicenseCategoryData.category_data;
            const valArr: any = editLicenseCategoryData.nombre_linea;
            setDatosCategory([...arr])
            setcategory({ ...category, category_name: '' })
            setNombreLinea(valArr)
        }
    }
    const [editCategoryIndex, setEditCategoryIndex] = useState<any>('');
    const [editCategoryData, setEditCategoryData] = useState<any>({});
    function handelEditCategory(record: any, index: any) {
        setEditCategoryIndex(index);
        setEditCategoryData(record);
        setIsEditModalVisible(true);
    }
    function editCategory() {
        var arr = [...datosCategory];
        arr[editCategoryIndex].nombre_documen = editCategoryData?.nombre_documen;
        arr[editCategoryIndex].tipo_perfil = editCategoryData?.tipo_perfil;
        setDatosCategory(arr);
    }
    function onDelete(params: any, item: any) {
        var arr = [...datosCategory];
        arr.splice(item, 1);
        setDatosCategory(arr);
    }

    function handelSelectValue(value:any){
        setAsociarTipoPerfil(value)
    }
    return (
        <div>
            <Modal className="eval_pro_model" visible={isEditModalVisible} width={1000} footer={false}>
                <EditCategoryModel editCategoryData={editCategoryData} setEditCategoryData={setEditCategoryData} setIsEditModalVisible={setIsEditModalVisible} editCategory={editCategory} setMessageShow={setMessageShow} />
            </Modal>

            <Modal className="eval_pro_model" visible={isEditSuccessModal} width={600} footer={false}>
                <EditSuccessModel setIsEditModalVisible={props.setIsEditModalVisible} setIsEditSuccessModal={setIsEditSuccessModal} setMessageShow={setMessageShow} />
            </Modal>

            <Layout
                className="mb-1 mdl_pd_lf_rg model_info"
                style={{ borderRadius: "15px 15px 15px 15px" }}
            >
                <Content className='model__header asgevl_head'>
                    <Content className='mdl_header_containt'>
                        <Row className='tbl_md_heading_box'>
                            <Col span={12} className=''>
                                <h3 className='asgevl_mdl_form_head'>Crear documento administrativo</h3>
                            </Col>
                            <Col span={12} className='text-right'>
                                <a onClick={() => props.setIsModalVisible(false)} className="mdl_close_btn"><CloseOutlined /></a>
                            </Col>
                        </Row>
                    </Content>
                </Content>
                <Content className="asgevl__top_mdl_box">
                    <Content className=''>
                        <Form>
                            <Content className='mt-2 mb-1'>
                                <Row className='tbl_md_heading_box'>
                                    <Col span={12} className='' style={{ paddingRight: 10 }}>
                                        <label className='form--lable asgevl_form_lable'>Nombre documento administrativo</label>
                                        <Input onChange={(e: any) => setNombreDocumen(e.target.value)} type="text" className={`${(categoryAddStatus == 'Edit') ? 'cat_bold ' : ''} eval-input evl_cat_input`} id={`${!nombreDocumen && formErrors?.nombre_documen ? 'error' : ''}`} value={nombreDocumen} />
                                    </Col>
                                    <Col span={12} className='' style={{ paddingLeft: 10 }}>
                                        <label className='form--lable asgevl_form_lable dct_lbl_slct'>Asociar tipo perfil</label>
                                        
                                        <Select  onChange={handelSelectValue} placeholder= 'Seleccionar…' className={`${!asociarTipoPerfil && formErrors?.tipo_perfil ? 'select_validation' : ''} select_licn select_main_licn select_main_dct`}   size='large' style={{ width: '100%' }} value={asociarTipoPerfil} >
                                            <Option value="Seleccionar 1">Seleccionar 1</Option>
                                            <Option value="Seleccionar 2">Seleccionar 2</Option>
                                            <Option value="Seleccionar 3">Seleccionar 3</Option>
                                        </Select>

                                    </Col>
                                </Row>
                            </Content>
                        </Form>
                    </Content>
                    <Content className="mb-1 text-right">
                        <span onClick={() => handelAddCategory()} className="form__btn_light form_submit_btn" style={{ cursor: "pointer" }}>Agregar</span>
                    </Content>
                </Content>
                <Content className='success_message_box'>
                    {messageShow &&
                        <Content className='success_msg_area' >
                            <span>Se editó con éxito</span>
                            <a className='msg_drop_icone' onClick={() => setMessageShow(false)}><CloseOutlined /></a>
                        </Content>
                    }
                </Content>
                <Content className='mdl_cat_tbl_head'>
                    <span className='mdl_cat_tbl_title'>Documentos administrativos creados</span>
                </Content>
                <Content className='lice_mdl_tabl_area'>
                    <Content className='mb-1'>
                        {//@ts-ignore
                            <Table columns={columns}
                                style={{ borderTop: "1px solid #C4C4C4" }}
                                locale={{ emptyText: <Empty description="No hay datos" style={{ padding: "50px" }} /> }}
                                pagination={false}
                                dataSource={datosCategory}
                                scroll={{ x: 1200, y: 250 }}
                                size="small"
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                className="table-ant-design-modify"
                                bordered={false}
                            />
                        }
                    </Content>
                </Content>
                <Content className="mb-2 text-right model_footer_btn">
                    <span onClick={() => props.setIsModalVisible(false)} className="form_cat_cnc_btn" style={{ cursor: "pointer", marginRight: '2rem' }}>Cancelar</span>
                    <Button onClick={() => handelCategoryAddForm()} className="btn-submit form_bg_btn" type="primary">Guardar y Finalizar</Button>
                </Content>

            </Layout>
        </div>
    )
}