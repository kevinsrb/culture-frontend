import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TermConditionModal from "../../../Popupmodel/TermConditionModal";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import { apiCall, errorToast } from "../../../../utils/httpClient";

import { Layout, Row, Col, List, Typography, Form, Button, Image } from "antd";
import { Container, Grid } from "semantic-ui-react";

import Loader from "../../../../components/loader";
import { CheckCircleFilled } from "@ant-design/icons";
import checkboxSel from "../../../../assets/circle.png";
import checkboxEm from "../../../../assets/circleselect.png";
import HeaderMenu from "../../../../components/Header";
// @ts-ignore
export default function AdministradorPostulacionesDeJurado(props: any) {
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [statusData, setStatusData] = useState<any>({});
  const [activeItem, setActiveItem] = useState<any>("Mis_Proyectos");
  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isTerm, setTerm] = useState<any>(false);
  const [isSubmit, setIsSubmit] = useState<any>(false);

  const { Paragraph } = Typography;
  // @ts-ignore
  const { item } = List;
  const { Header, Content } = Layout;

  useEffect(() => {
    getRegistrationData();
  }, []);

  async function getRegistrationData() {
    const resData = await localStorage.getItem("resumeData");
    // @ts-ignore
    const val = JSON.parse(resData);
    const params = {
      resume_id: val?.resume_id,
    };
    setIsLoading(true);
    const { data } = await apiCall("POST", ApiEndPoint.FORMSTATUS, params);
    if (data.status == 200) {
      setStatusData(data.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }
  // @ts-ignore
  async function handleClick(index) {
    const newIndex = index != activeIndex ? index : null;
    setActiveIndex(newIndex);
  }
  // FORMSTATUS
  // @ts-ignore
  async function handleItemClick(item) {
    setActiveItem(item);
  }

  return (
    // @ts-ignore
    <div>
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
        {/* <Content >
                    <Header >
                        <HeaderMenu />
                    </Header>
                </Content> */}

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
                    Lorem Ipsum has been the industry's
                  </h2>
                  <p className="res--text">
                    Filler text is text that shares some characteristics of a
                    real written text, but is random or otherwise generated. It
                    may be used to display a sample of fonts, generate text for
                    testing, or to spoof an e-mail spam filter.
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
                          <p>
                            Hola <b>Manuela Andrea Ceballos Linares</b>
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
                <Col span={17}>
                  <Content className="stts--lf-form-head">
                    <Content className="heading--title">
                      <h1 className="title title_gg">Hoja de vida Jurado</h1>
                    </Content>
                  </Content>

                  <Content className="containt--area ml-2 mr-2 mb-2 mt-2">
                    <Typography>
                      <Paragraph
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        className={`${
                          isSubmit ? "show-data" : "hide-data"
                        } head---text-containt`}
                      >
                        <Content className="success-text--data">
                          <b style={{ color: "green" }}>
                            So envio con exito tu hoja de vida
                          </b>
                          <br />
                          le notificaremos si es selecciondo para ser jurado
                        </Content>

                        <Content className="mt-2">
                          <Row className="">
                            <Col span={24} className="form--btm-btn-box">
                              <Button
                                onClick={() => props.setShowPage(11)}
                                className="btn-submit"
                                type="primary"
                              >
                                ENVIAR HOJA DE VIDA
                              </Button>
                            </Col>
                          </Row>
                        </Content>
                      </Paragraph>

                      <Paragraph
                        className={`${
                          isSubmit ? "hide-data" : "show-data"
                        } head---text-containt`}
                      >
                        <b>
                          In the process of internal desktop applications
                          development,
                        </b>
                        <br />
                        many different design specs and implementations would be
                        involved.
                      </Paragraph>
                    </Typography>
                  </Content>
                  <Content className="containt--area ml-2 mr-2 mb-2 mt-2">
                    {isSubmit ? (
                      <div />
                    ) : (
                      <Content className="table-area">
                        <Row>
                          <Col span={11}>
                            <span>
                              <b>Formulario</b>
                            </span>
                          </Col>
                          <Col span={9}>
                            <span>
                              <b>Estado</b>
                            </span>
                          </Col>
                          <Col span={4}>
                            <span></span>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Datos personales</p>
                          </Col>

                          <Col span={9}>
                            {statusData?.show_resume ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.show_resume ? (
                              <a onClick={() => props.onPressEdit(1)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(1)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Areas de conocimiento</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.knowlage_category ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.knowlage_category ? (
                              <a onClick={() => props.onPressEdit(2)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(2)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Educacion formal</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.formal_education ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.formal_education ? (
                              <a onClick={() => props.onPressEdit(3)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(3)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Educacion no formal</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.non_formal_education ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.non_formal_education ? (
                              <a onClick={() => props.onPressEdit(4)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(4)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Experiencia profesional</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.professional_experience ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.professional_experience ? (
                              <a onClick={() => props.onPressEdit(5)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(5)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Experiencia como jurado</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.jury_experience ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.jury_experience ? (
                              <a onClick={() => props.onPressEdit(6)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(6)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Publicacions</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.publications ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.publications ? (
                              <a onClick={() => props.onPressEdit(7)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(7)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col span={11}>
                            <p>Reconocimientos</p>
                          </Col>
                          <Col span={9}>
                            {statusData?.acknowledgment ? (
                              <p>
                                <CheckCircleFilled
                                  twoToneColor="#52c41a"
                                  className="list--chk-icon"
                                />
                                Completado
                              </p>
                            ) : (
                              <p>
                                formulario opcional, no agregaste information
                              </p>
                            )}
                          </Col>
                          <Col span={4} className="text-right">
                            {statusData?.acknowledgment ? (
                              <a onClick={() => props.onPressEdit(8)}>EDITAR</a>
                            ) : (
                              <a onClick={() => props.onPressEdit(8)}>
                                AGREGAR
                              </a>
                            )}
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col span={11} className="form--confirm-chkbox">
                            <Form name="basic">
                              <Form.Item
                                name="remember"
                                valuePropName="checked"
                                className="row"
                              >
                                <Row className="mt-2">
                                  <p onClick={() => setTerm(!isTerm)}>
                                    <Image
                                      width={25}
                                      preview={false}
                                      src={!isTerm ? checkboxSel : checkboxEm}
                                    />
                                  </p>
                                  <a
                                    style={{ marginLeft: 5 }}
                                    onClick={() => setViewEduOpen(true)}
                                  >
                                    Termionos y Condiciones
                                  </a>{" "}
                                </Row>
                              </Form.Item>
                            </Form>
                          </Col>
                        </Row>

                        <Row className="">
                          <Col span={24} className="form--btm-btn-box">
                            <Button
                              onClick={() =>
                                isTerm
                                  ? setIsSubmit(true)
                                  : errorToast(
                                      "Please Select Termionos y Condiciones"
                                    )
                              }
                              className="btn-submit"
                              type="primary"
                            >
                              ENVIAR HOJA DE VIDA
                            </Button>
                          </Col>
                        </Row>
                      </Content>
                    )}
                  </Content>
                </Col>
              </Row>
            </Content>
          </Content>
        </Content>
        <Content className="footer-bar">
          <Content className="box-container">
            <Row>
              <Col span={18}>
                <Content className="footer-item-box">
                  <List.Item className="footer_menu">
                    <Image
                      className="footer_logo"
                      width={100}
                      preview={false}
                      src="/static/media/escudoAlcaldia.196c7a80.png"
                    />
                  </List.Item>
                  <List.Item className="footer_menu">
                    <span className="footer--text-item">
                      Alcaldia de medelline
                    </span>
                  </List.Item>

                  <List.Item className="footer_menu">
                    <Image
                      className=""
                      style={{ width: "60px" }}
                      preview={false}
                      src="images/Vanamo_Logo.png"
                    />
                  </List.Item>
                  <List.Item className="footer_menu">
                    <Image
                      className="footer_logo_img"
                      width={130}
                      preview={false}
                      src="images/download.jpeg"
                    />
                  </List.Item>
                </Content>
              </Col>
              <Col span={5}>
                <a className="footer_link">conoce GOV.co aqui</a>
              </Col>
            </Row>
          </Content>
        </Content>
      </Layout>
      <TermConditionModal
        viewEduOpen={viewEduOpen}
        setViewEduOpen={setViewEduOpen}
      />
    </div>
  );
}
