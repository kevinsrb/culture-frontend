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

// import checkboxSel from "../../../../assets/circle.png";
import checkboxSel from "../../assets/circle.png";
import checkboxEm from "../../assets/circleselect.png";
import { CloseOutlined } from '@ant-design/icons'

import EvaluaarProyectoFormNotaModel from "./EvaluaarProyectoFormNotaModel";
import ViewTechnicalDocumentsProjectModel from "./ViewTechnicalDocumentsProjectModel";
export default function EvaluacionProyectosModel(props: any) {
  const [tableShow, setTableShow] = useState<any>("documentosTecnicos");
  const [evalProyectoPage, setEvalProyectoPage] = useState<any>(
    "informacionProyectosList"
  );
  const [isTerm, setTerm] = useState<any>(false);
  const [documentOpen, setDocumentOpen] = useState<any>(false);
  const listData = [
    {
      title: "1. Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico",
      description: "Descripción criterio de evaluación",
    },
    {
      title: "2. Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico",
      description: "Descripción criterio de evaluación",
    },
    {
      title: "3. Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico.",
      description: "Descripción criterio de evaluación",
    },
    {
      title: "4. Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico.",
      description: "Descripción criterio de evaluación",
    },
  ];
  const columns: any = [
    {
      title: <span className='as_tbl_hd'>No.</span>,
      width: 40,
      dataIndex: "no",
      key: "no",
      fixed: "left",
    },
    {
      title: <span className='as_tbl_hd'>Nombre documento</span>,
      width: 500,
      dataIndex: "nombreproyecto",
      key: "nombreproyecto",
      fixed: "left",
    },
    {
      title: <span className='as_tbl_hd'>Acciones</span>,
      key: "acciones",
      fixed: "right",
      width: 70,
      render: () => <a className='view_detl' onClick={() => setDocumentOpen(true)}>VerMas</a>,
    },
  ];

  const data = [
    {
      no: "1",
      nombreproyecto: "Nombre tipo documento tecnico",
    },
    {
      no: "2",
      nombreproyecto: "Coherencia entre el planteamiento estético, - poética, concepto, experiencia, sensibilidad- y el desarrollo técnico",
    },
    {
      no: "3",
      nombreproyecto: "Actualidad de los marcos conceptuales de la investigación",
    },
  ];

  const enlacesColumns: any = [
    {
      title: <span className='as_tbl_hd'>No.</span>,
      width: 40,
      dataIndex: "no",
      key: "no",
      fixed: "left",
    },
    {
      title: <span className='as_tbl_hd'>Nombre documento</span>,
      width: 600,
      dataIndex: "nombreproyectoo",
      key: "nombreproyectoo",
      // fixed: 'left',
    },
    {
      title: <span className='as_tbl_hd'>Acciones</span>,
      key: "acciones",
      // fixed: 'right',
      width: 100,
      render: () => <a></a>,
    },
  ];
  const enlacesData = [
    {
      no: "1",
      nombreproyectoo: <a>https://xd.adobe.com/view/fa7509de-a369-4be6-8642-023e3516b4e3-af26/screen/ceabbf4a-e9cd-4051-87b1-01edc5033829</a>,
    },
    {
      no: "2",
      nombreproyectoo: <a>https://xd.adobe.com/view/fa7509de-a369-4be6-8642-023e3516b4e3-af26/screen/ceabbf4a-e9cd-4051-87b1-01edc5033829</a>,
    },
    {
      no: "3",
      nombreproyectoo: <a>https://xd.adobe.com/view/fa7509de-a369-4be6-8642-023e3516b4e3-af26/screen/ceabbf4a-e9cd-4051-87b1-01edc5033829</a>,
    },
    {
      no: "4",
      nombreproyectoo: <a>https://xd.adobe.com/view/fa7509de-a369-4be6-8642-023e3516b4e3-af26/screen/ceabbf4a-e9cd-4051-87b1-01edc5033829</a>,
    },
  ];

  useEffect(() => {
    // setEvalProyectoPage(props.evalProyectoPage);
  }, [evalProyectoPage]);

  return (
    <div>
      {documentOpen ? (
        <Layout style={{ borderRadius: 15 }}>
          <ViewTechnicalDocumentsProjectModel
            setDocumentOpen={setDocumentOpen}
          />
        </Layout>
      ) : (
        <div>
          {evalProyectoPage == "informacionProyectosList" ? (
            <div>
              <Layout
                className="mb-1 model_info"
                style={{ borderRadius: "15px 15px 15px 15px" }}
              >
                <Content className='model__header'>
                  <Content className='mdl_header_containt'>
                    <Row className='mdl_heading_row'>
                      <Col span={20} className=''>
                        <h3 className='evel_mdl_title'>Evaluacion de Proyecto</h3>
                      </Col>
                      <Col span={4} className=' text-right'>
                        <a className="mdl_close_btn" onClick={() => props.setVisible(false)}><CloseOutlined /></a>
                      </Col>
                    </Row>
                  </Content>
                </Content>
                <Content className="evalu__top_mdl_box">
                  <Content className="evalu_inform_header">
                    <ul className="evalu_inform_menu evalu_info">
                      <li
                        className={
                          evalProyectoPage == "informacionProyectosList"
                            ? "active"
                            : ""
                        }
                      >
                        <a
                          onClick={() =>
                            setEvalProyectoPage("informacionProyectosList")
                          }
                        >Información del proyecto
                        </a>
                      </li>
                      <li
                        className={
                          evalProyectoPage == "evaluaarProyectoForm"
                            ? "active"
                            : ""
                        }
                      >
                        <a onClick={() =>
                          setEvalProyectoPage("evaluaarProyectoForm")
                        }
                        >
                          Evaluar proyecto
                        </a>
                      </li>
                    </ul>
                  </Content>

                  <Content className="evalu_inform_list mb-1">
                    <Row>
                      <Col span={12}>
                        <Row>
                          <Col span={12} className="text-right inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_title'>Código del proyecto:</span>
                            </Content>
                          </Col>
                          <Col span={12} className="inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_value'>200350 </span>
                            </Content>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={12} className="text-right inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_title'>Línea:</span>
                            </Content>
                          </Col>
                          <Col span={12} className="inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_value'>Linea convocatoria</span>
                            </Content>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Row>
                          <Col span={12} className="text-right inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_title'>Nombre del proyecto:</span>
                            </Content>
                          </Col>
                          <Col span={12} className="inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_value'>Nombre del proyecto:</span>
                            </Content>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={12} className="text-right inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_title'>Categorías:</span>
                            </Content>
                          </Col>
                          <Col span={12} className="inform--col">
                            <Content className="inform--col-box">
                              {" "}
                              <span className='inform_value'>Categoría 1, Categoria 2</span>
                            </Content>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Content>
                </Content>
              </Layout>

              <Layout className="mt-1 mb-2 p-1 category_list">
                <Content className="category_mdl_box">
                  <Content className="category_head">
                    <span className="md-title-text">Criterios de evaluación</span>
                  </Content>
                  <Content className="cat_listing">
                    <List
                      style={{ padding: 10 }}
                      itemLayout="horizontal"
                      dataSource={listData}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            className="list_cat"
                            title={<a className='cat_list_title'>{item.title}</a>}
                            description={<span className='cat_list_desc'>Descripción criterio de evaluación</span>}
                          />
                        </List.Item>
                      )}
                    />
                  </Content>
                </Content>
              </Layout>

              <Layout
                className="mt-1 mb-2 evalu__list_box"
                style={{ borderRadius: "15px" }}
              >
                <Content className="evalu_mdl_box">
                  <Content className="evalu_head">
                    <Content className="evalu_inform_header">
                      <ul className="evalu_inform_menu evalu_confirm_menu">
                        <li
                          className={
                            tableShow == "documentosTecnicos" ? "active" : ""
                          }
                        >
                          <a onClick={() => setTableShow("documentosTecnicos")}>
                            Documentos técnicos del proyecto
                          </a>
                        </li>
                        <li
                          className={
                            tableShow == "enlacesProyecto" ? "active" : ""
                          }
                        >
                          <a onClick={() => setTableShow("enlacesProyecto")}>
                            Enlaces del proyecto
                          </a>
                        </li>
                      </ul>
                    </Content>
                  </Content>
                  <Content className="evalu_listing">
                    {tableShow == "documentosTecnicos" ? (
                      <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: 1000 }}
                        pagination={false}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                      />
                    ) : (
                      <Table
                        columns={enlacesColumns}
                        dataSource={enlacesData}
                        scroll={{ x: 1000 }}
                        pagination={false}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                      />
                    )}
                  </Content>
                  <Content className="text-right">
                    {/* <Row className="">
                      <Col span={15}></Col>
                      <Col span={9} className="form--confirm-chkbox text-right">
                        <Form name="basic">
                          <Form.Item
                            name="remember"
                            valuePropName="checked"
                            className="row"
                          >
                            <Row className="text-right">
                              <p onClick={() => setTerm(!isTerm)}>
                                <Image
                                  width={19}
                                  preview={false}
                                  src={!isTerm ? checkboxSel : checkboxEm}
                                />
                              </p>
                              <span className='cat_mdl_chk'>
                                Me decaro inhabilitado para evauluar este proyecto
                              </span>{" "}
                            </Row>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row> */}

                    {/* <Form name="basic">
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className="row"
                      >
                        <Row className="text-right">
                          <p onClick={() => setTerm(!isTerm)}>
                            <Image
                              width={19}
                              preview={false}
                              src={!isTerm ? checkboxSel : checkboxEm}
                            />
                          </p>
                          <span className='cat_mdl_chk'>
                            Me decaro inhabilitado para evauluar este proyecto
                          </span>{" "}
                        </Row>
                      </Form.Item>
                    </Form> */}

                    <Content>
                      <span className='cat_mdl_chk' style={{marginRight: '1rem'}}>
                        <Image
                          onClick={() => setTerm(!isTerm)}
                          width={19}
                          style={{margin: -6}}
                          preview={false}
                          src={!isTerm ? checkboxSel : checkboxEm}
                        />Me decaro inhabilitado para evauluar este proyecto{" "}
                      </span>

                    </Content>

                  </Content>
                </Content>

                <Content className="mb-2">
                  <Row className="">
                    <Col span={23} className="form--btm-btn-box form_cat_cnc_btn">
                      <span style={{ margin: 14, cursor: "pointer" }}>
                        CERRAR
                      </span>
                      <Button
                        onClick={() => props.setVisible(false)}
                        className="form_bg_btn font-family-Montserrat-SemiBold"
                        type="primary"
                      >
                        EVALUAR PROYECTO
                      </Button>
                    </Col>
                  </Row>
                </Content>
              </Layout>
            </div>
          ) : evalProyectoPage == "evaluaarProyectoForm" ? (
            <EvaluaarProyectoFormNotaModel
              evalProyectoPage={evalProyectoPage}
              setVisible={props.setVisible}
              setEvalProyectoPage={setEvalProyectoPage}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
