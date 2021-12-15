import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TermConditionModal from "../../../Popupmodel/TermConditionModal";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import { apiCall, errorToast } from "../../../../utils/httpClient";
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
  Empty,
} from "antd";
import { Container, Grid } from "semantic-ui-react";

import Loader from "../../../../components/loader";
import { CheckCircleFilled } from "@ant-design/icons";
import checkboxSel from "../../../../assets/circle.png";
import checkboxEm from "../../../../assets/circleselect.png";
import HeaderMenu from "../../../../components/Header";
import { Footer } from "../../../Components/Footer";
import EvaluacionProyectosModel from "../../../Popupmodel/EvaluacionProyectosModel";
import reducers from "../../../../store/reducers";
import { evaluateProjectList } from "../../../../data/api";
import {LeftOutlined, RightOutlined } from "@ant-design/icons";
// @ts-ignore
export default function EvaluacionProyectosList(props: any) {
  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);

  const { Option } = Select;
  const { Paragraph } = Typography;
  // @ts-ignore
  const { item } = List;
  const { Header, Content } = Layout;
  const [visible, setVisible] = useState(false);
  const [cantidadPáginas, setCantidadPáginas] = React.useState(10);

  const columns: any = [
    {
      title: <span className='as_tbl_hd'>No.</span>,
      width: 30,
      dataIndex: "no",
      key: "no",
      fixed: "left",
      className: 'border_sh'
    },
    {
      title: <span className='as_tbl_hd'>Nombre proyecto</span>,
      width: 100,
      dataIndex: "nombreproyecto",
      key: "nombreproyecto",
      fixed: "left",
      className: 'border_sh'
    },
    { title: <span className='as_tbl_hd'>Nota final</span>, dataIndex: "notafinal", key: "1", width: 100 },
    { title: <span className='as_tbl_hd'>Codigo</span>, dataIndex: "codigo", key: "2", width: 100 },
    { title: <span className='as_tbl_hd'>Linea </span>, dataIndex: "linea", key: "3", width: 100 },
    { title: <span className='as_tbl_hd'>Categoria</span>, dataIndex: "categoria", key: "4", width: 100 },
    { title: <span className='as_tbl_hd'>Fecha act.</span>, dataIndex: "fechaact", key: "4", width: 100 },
    {
      title: <span className='as_tbl_hd'>Acciones</span>,
      key: "acciones",
      fixed: "right",
      width: 70,
      className: 'border_sh',
      render: () => <a onClick={() => setVisible(true)} className='vas--tab-link view_data_tbl'>VER MÁS</a>,
    },
  ];

  function itemRenderTable(current: any, type: any, originalElement: any) {
    if (type === "prev") {
        return (
            <span className="border-ant-prev-table font-size-10px">
                <LeftOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingRight: "2px" }} />
                Ant.
            </span>
        );
    }
    if (type === "next") {
        return (
            <span className="border-ant-prev-table font-size-10px">
                Sig.
                <RightOutlined className="font-color-1FAEEF" style={{ display: "inline-flex", paddingLeft: "2px" }} />
            </span>
        );
    }
    return originalElement;
}


  return (
    // @ts-ignore
    <div>
      <div className="virn" style={{ backgroundColor: "red" }}>
        <Modal
          // title="Evaluacion deProyectosList"
          centered
          visible={visible}
          /* onOk={() => setVisible(false)}
           */
          onCancel={() => setVisible(false)}
          width={1000}
          className="eval_pro_model mt-2"
          footer={false}
        >
          <EvaluacionProyectosModel
            setVisible={setVisible}
            evalProyectoPage={"informacionProyectosList"}
          />
        </Modal>
      </div>

      {isLoading && <Loader />}
      <Container fluid>
        <Grid columns={1} className="form--page-header">
          <Grid.Row>
            <Grid.Column className="form--header--box">
              <HeaderMenu showIcon={true} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Layout>
        <Content className="frm-stus-head">
          <Content className="box-container">
            <Row>
              <Col span={5}>
                <Content className="head-containt-img-left">
                  <Image
                    className="head--"
                    width={200}
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Content>
              </Col>
              <Col span={17}>
                <Content className="head_right_containt">
                  <h2 className="heading__text">
                    Panel de gestión de Convocatorias
                  </h2>
                  <p className="res--text">
                    Bienvenido, desde aquí puedes hacer seguimiento de tus postulaciones a las convocatorias de fomento y estímulos para el arte y cultura.
                  </p>
                </Content>
              </Col>
            </Row>
          </Content>
        </Content>

        <Content className="main--formal-box">
          <Content className="box-container">
            <Content className="">
              <Row>
                <Col span={5}>
                  <Content className="table-area pro-menu-containt">
                    <Content className="lft--pro-list">
                      <Content className="mb-1">
                        <Content className="pro-menu">
                          <Image
                            className="sts_user_profile"
                            width={200}
                            preview={false}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          />
                          <p className='nvbr_cl_name'>
                            Hola <span>Manuela Andrea Ceballos Linares</span>
                          </p>
                        </Content>
                      </Content>
                      <List.Item className="pro-menu">
                        <Typography.Text className="pro-list--item">
                          Mis Postulaciones{" "}
                          <a className="btn-clr-gray-num">15</a>
                        </Typography.Text>
                      </List.Item>
                      <List.Item className="pro-menu">
                        <Typography.Text className="pro-list--item active">
                          Jurado<a className="btn-clr-org-num">8</a>{" "}
                        </Typography.Text>
                      </List.Item>
                      <List.Item className="pro-menu">
                        <Typography.Text className="pro-list--item">
                          Configurar mis Perfiles
                        </Typography.Text>
                      </List.Item>
                      <List.Item className="pro-menu">
                        <Typography.Text className="pro-list--item">
                          Busccar Convocatorias
                        </Typography.Text>
                      </List.Item>
                    </Content>
                  </Content>
                </Col>
                <Col span={19}>
                  <Content className="stts--lf-form-head">
                    <Content className="heading--title">
                      <ul
                        className="stts--headin-drop"
                        style={{ marginBottom: "-0.2em" }}
                      >
                        <li className="stts--link active">
                          <a className="menu-txt active ">
                            Evaluación proyectos
                          </a>
                        </li>
                        <li className="stts--link">
                          <a className="menu-txt">Historial de evaluación</a>
                        </li>
                        <li className="stts--link">
                          <a className="menu-txt">Hoja de vida Jurado</a>
                        </li>
                      </ul>
                    </Content>
                  </Content>

                  <Content className="eval_pro_containt_area ml-2 mr-2 mb-2 mt-2">
                    <Typography>
                      <Paragraph>
                        <Content className="evalpro_containt_head_text">
                          <p>
                            <span style={{ fontFamily: 'Montserrat-SemiBold' }}>
                              {" "}
                              A continuación se listaran los proyectos que se le asignaron.{" "}
                            </span>{" "} Recuerde que debe completar todas las avaluaciones asignadas para poder enviarlas.{" "}
                          </p>
                        </Content>

                        <Content className="evalpro__list_table table_card">
                          <Content className="evalpro_table_head">
                            <Row>
                              <Col span={16}>
                                <span className='tbl_head_title'>Proyectos a evaluar</span>
                              </Col>
                              <Col span={8}>
                                <Row>
                                  <Col span={7} className='text-right'>
                                    <p className="table--total table--total-mdl">
                                      Total :
                                      <span className="text-orance"> 59</span>
                                    </p>
                                  </Col>
                                  <Col span={17} className='text-right'>
                                    <small className='tbl_pg'>Registros por página</small>
                                    <Select
                                      defaultValue="10"
                                      className="select_table_cont"
                                    >
                                      <Option value="10">10</Option>
                                      <Option value="20">20</Option>
                                      <Option value="30">30</Option>
                                      <Option value="40">40</Option>
                                    </Select>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Content>
                          <Content className='' >
                            <Content className=''>
                            {/*   <Table
                                columns={columns}
                                dataSource={evaluateProjectList}
                                scroll={{ x: 'calc(590px + 50%)', y: 340 }}
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                              /> */}
                             {
                              <Table columns={columns}
                                style={{ borderTop: "1px solid #C4C4C4" }}
                                locale={{ emptyText: <Empty description="No hay datos" style={{ padding: "50px" }} /> }}
                                pagination={{ position: ["bottomRight"], itemRender:itemRenderTable, pageSize: cantidadPáginas }}
                                dataSource={evaluateProjectList}
                                scroll={{ x: 'calc(590px + 50%)', y: 340 }}
                                size="small"
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-dark' : 'table-row-light'}
                                bordered={false}
                            />
                           }

                            </Content>
                          </Content>
                        </Content>
                      </Paragraph>
                    </Typography>
                  </Content>
                </Col>
              </Row>
            </Content>
          </Content>
          <Content className="text-right">
            <Row className="">
              <Col span={14}></Col>
              <Col span={9} className="form--confirm-chkbox text-right">
                <Content className='mb-2'>
                  <p className='text-right evel_font_text'>
                    Debe completar todas las evaluaciones asignadas para poder enviarlas.
                  </p>
                </Content>

              </Col>
            </Row>
          </Content>


          <Content className="mb-2">
            <Row className="">
              <Col span={23} className="form--btm-btn-box">
                <span className="form__btn_light form_submit_btn font-family-Work-Sans-SemiBold" style={{ margin: 14, cursor: "pointer" }}>
                  ATRÁS
                </span>
                <Button
                  className="form_bg_btn form_btn_text "
                  type="primary"
                >
                  ENVIAR EVALUACIONES
                </Button>
              </Col>
            </Row>
          </Content>
        </Content>
        <Content className="footer-bar">
          <Footer />
        </Content>
      </Layout>
      <TermConditionModal
        viewEduOpen={viewEduOpen}
        setViewEduOpen={setViewEduOpen}
      />
    </div>
  );
}
