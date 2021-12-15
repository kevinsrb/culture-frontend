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

import EvaluaarProyectoFormNotaModelForm from "./EvaluaarProyectoFormNotaModelForm";
export default function EvaluaarProyectoFormNotaModel(props: any) {
  const [isTerm, setTerm] = useState<any>(false);
  const [editFormModel, setEditFormModel] = useState<any>(false);
  const [updateData, setUpdateData] = useState<any>([]);
  const [dataArray, setDataArray] = useState<any>([
    {
      no: "1",
      nombreproyecto: "Antigüedad de la entidad en el programa Salas Abiertas para las artes escénicas",
    },
    {
      no: "2",
      nombreproyecto: "Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico",
    },
    {
      no: "3",
      nombreproyecto: "Actualidad de los marcos conceptuales de la investigación",
    },
  ]);
  const [modalType, setModalType] = useState<any>('add');
  const [activeedit, setActiveedit] = useState<any>();
  const [editData, setEditData] = useState<any>({});

  const columns: any = [
    {
      title: <span className='as_tbl_hd'>No.</span>,
      width: 40,
      // dataIndex: "no",
      key: "no",
      fixed: "left",
      render: (text: any, record: any) => <div>{dataArray.indexOf(record) + 1}</div>
    },
    {
      title: <span className='as_tbl_hd'>Criterios</span>,
      width: 550,
      dataIndex: "nombreproyecto",
      key: "nombreproyecto",
      fixed: "left",
    },
    {
      title: <span className='as_tbl_hd'>Aciones</span>,
      key: "acciones",
      // dataIndex: "acciones",
      fixed: "right",
      width: 80,
      //@ts-ignore
      render: (text: any, record: any, index: any) => <a onClick={() => {
        setEditFormModel(true)
        setModalType('add')
        setEditData({
          nombreproyecto: record.nombreproyecto,
          nota: "",
          index: index
        })
      }
      } className='vas--tab-link evaluar_btn'>EVALUAR</a>

    },
  ];



  const updateColumns: any = [
    {
      title: <span className='as_tbl_hd'>No.</span>,
      width: 40,
      dataIndex: "no",
      key: "no",
      fixed: "left",
    },
    {
      title: <span className='as_tbl_hd'>Nombre proyecto</span>,
      width: 500,
      dataIndex: "nombreproyecto",
      key: "nombreproyecto",
    },
    {
      title: <span className='as_tbl_hd'>Nota</span>,
      width: 100,
      dataIndex: "nota",
      key: "nota",
    },
    {
      title: <span className='as_tbl_hd'>Acciones</span>,
      key: "acciones",
      fixed: "right",
      width: 100,
      //@ts-ignore
      render: (text: any, record: any, index: any) => <a onClick={() => {
        setActiveedit(index)
        setModalType('edit')
        setEditFormModel(true)
      }
      } className='vas--tab-link'>EDITAR</a>
    },
  ];
  useEffect(() => {
    if (modalType == 'edit') {
      setEditData({
        ...updateData[activeedit],
      })
    }
  }, [modalType])

  function setUpdatedval(params: any) {
    var data = updateData
    data[activeedit] = editData
  }

  return (
    <div>
      {editFormModel ? (
        <EvaluaarProyectoFormNotaModelForm
          setEditFormModel={setEditFormModel}
          editData={editData}
          setEditData={setEditData}
          setUpdateData={setUpdateData}
          updateData={updateData}
          modalType={modalType}
          activeedit={activeedit}
          setUpdatedval={setUpdatedval}
          dataArray={dataArray}
          setDataArray={setDataArray}

        />
      ) : (
        <div>

          <Layout className="mb-1 model_info">
            {/* <Content className='model__header'>
              <Content className='mdl_header_containt'>
                <Row>
                  <Col span={12} className='p-1'>
                    <h3>Evaluacion de Proyecto</h3>
                  </Col>
                  <Col span={12} className='p-1 text-right'>
                    <a className="mdl_close_btn" onClick={() => (props.setVisible("informacionProyectosList"), props.setVisible(false))}><CloseOutlined /></a>
                  </Col>
                </Row>
              </Content>
            </Content>*/}

            <Content className='model__header'>
              <Content className='mdl_header_containt'>
                <Row className='mdl_heading_row'>
                  <Col span={12} className=''>
                    <h3 className='evel_mdl_title'>Evaluacion de Proyecto</h3>
                  </Col>
                  <Col span={12} className=' text-right'>
                    <a className="mdl_close_btn" onClick={() => (props.setVisible("informacionProyectosList"), props.setVisible(false))}><CloseOutlined /></a>
                  </Col>
                </Row>
              </Content>
            </Content>

            <Content className="evalu__top_mdl_box">
              <Content className="evalu_inform_header">
                <ul className="evalu_inform_menu evalu_info">
                  <li className={
                    props.evalProyectoPage == "informacionProyectosList"
                      ? "active"
                      : ""
                  }>
                    <a onClick={() =>
                      props.setEvalProyectoPage("informacionProyectosList")
                    }>
                      Información del proyecto
                    </a>
                  </li>
                  <li className={
                    props.evalProyectoPage == "evaluaarProyectoForm"
                      ? "active"
                      : ""
                  }>
                    <a onClick={() =>
                      props.setEvalProyectoPage("evaluaarProyectoForm")
                    }>Evaluar proyecto
                    </a>
                  </li>
                </ul>
              </Content>
              <Content className="p-1">
                <p className='title_evaluar' style={{padding: '0px 16px'}}>Seleccione el criterio de evaluación y a continuación asigne la nota. Para finalizar debes evaluar todos los criterios.</p>
              </Content>

              <Content className="evalu_listing evolv_mdl_box">
                <Row className="p-1">
                  <Col span={20}>
                    <span className='title_evaluar'>Criterios de evaluación</span>
                  </Col>
                  <Col span={4} className="text-right">
                    <p className="table--total table--total-mdl">
                      Total:<span className="text-orance">{dataArray?.length}</span>
                    </p>
                  </Col>
                </Row>
                <Table
                  columns={columns}
                  dataSource={dataArray}
                  scroll={{ x: 900 }}
                  pagination={false}
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                />
              </Content>
            </Content>
          </Layout>

          <Layout className="mb-1 model_info">
            <Content className="evalu__top_mdl_box">
              <Content className="evalu_listing">
                <Row className="evol_top_head_box">
                  <Col span={20}>
                    <span className='evol_hed_tb_title'>criterios evaluados</span>
                  </Col>
                  <Col span={4} className="text-right">
                    <p className="table--total table--total-mdl">
                      Total evaluados :<span className="text-orance">{updateData?.length}</span>
                    </p>
                  </Col>
                </Row>
                <Table
                  columns={updateColumns}
                  dataSource={updateData}
                  scroll={{ x: 900 }}
                  pagination={false}
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                />
              </Content>
            </Content>
          </Layout>
        </div>
      )}
    </div>
  );
}
