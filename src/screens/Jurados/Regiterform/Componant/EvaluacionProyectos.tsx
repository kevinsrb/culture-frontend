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
} from "antd";
import { Container, Grid } from "semantic-ui-react";

import Loader from "../../../../components/loader";
import { CheckCircleFilled } from "@ant-design/icons";
import checkboxSel from "../../../../assets/circle.png";
import checkboxEm from "../../../../assets/circleselect.png";
import HeaderMenu from "../../../../components/Header";
import Sidebar from "../../../../components/NavBar";
// import { FooterMenu } from "../../../../Components/Footer";
import { Footer } from "../../../Components/Footer";
// @ts-ignore
export default function EvaluacionProyectos(props: any) {
  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);

  const { Paragraph } = Typography;
  // @ts-ignore
  const { item } = List;
  const { Header, Content } = Layout;
  const [sidebarShow, setSidebarShow] = useState<any>(false);
  const [matchScreen, setMatchScreen] = useState<any>('')
  const [matchScreenSize, setMatchScreenSize] = useState<any>(1200)
  useEffect(() => {

   
    var mobileQuery1024 = window.matchMedia("(max-width: 1024px)");
    var mobileQuery991 = window.matchMedia("(max-width: 991px)");
    var mobileQuery = window.matchMedia("(max-width: 768px)");

    if (mobileQuery1024.matches == true && mobileQuery1024.media == "(max-width: 1024px)") {
        setMatchScreenSize(1024);
    }
    if (mobileQuery991.matches == true && mobileQuery991.media == "(max-width: 991px)") {
        setMatchScreenSize(991);
    }
    if (mobileQuery.matches == true && mobileQuery.media == "(max-width: 768px)") {
        setMatchScreenSize(768);
    } 
    if(mobileQuery1024.matches == false && mobileQuery991.matches == false && mobileQuery.matches == false) {
        setMatchScreenSize(1200);
    }

    var mobileQuery = window.matchMedia("(max-width: 768px)");
    mediaQueryCheck(mobileQuery);
    mobileQuery.addEventListener("change", mediaQueryCheck);
    return () => {
      mobileQuery.removeEventListener("change", mediaQueryCheck);
    }
  }, [matchScreen])
  function mediaQueryCheck(inputQuery: any) {
    if (inputQuery.matches) {
      setMatchScreen(true);
    } else {
      setMatchScreen(false);
    }
  }
  return (
    // @ts-ignore
    <div>
      {isLoading && <Loader />}
      <Container fluid>
        <Grid columns={1} className="form--page-header">
          <Grid.Row>
            <Grid.Column className="form--header--box">
              <HeaderMenu showIcon={true} setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
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
                    style={{ padding: '.7rem' }}
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
              <Row className="row_head_box">
                <Col span={(matchScreen == true) ? 24 : 5} style={{ padding: (matchScreen == true) ? 10 : 0 }} >
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
                <Col span={(matchScreen == true) ? 24 : 17}>
                  <Content className="stts--lf-form-head">
                    <Content className="heading--title">
                      <ul className="stts--headin-drop" style={{marginBottom: "-0.2em" }}>
                        <li className="stts--link active">
                          <a className="menu-txt active">Evaluacion Proyectos</a>
                        </li>
                        <li className="stts--link">
                          <a className="menu-txt">Hoja de vida Jurado</a>
                        </li>
                      </ul>
                    </Content>
                  </Content>

                  <Content className="pl-2 pr-2 mb-2 mt-2">
                    <Content className="eval_pro_containt_area evelpro_card">
                      <Typography>
                        <Paragraph>
                          <Content className="evalpro_containt_head_text">
                            <p>
                              <span style={{ fontFamily: 'Montserrat-SemiBold' }}>Le han asignado proyectos para continuar.
                              </span> Lea y acepte la designación como jurado de la convocatoria de fomento y estímulos.{" "}
                            </p>
                          </Content>

                          <Content className="evalpro_containt_text">
                            <h5 className="title-text">
                              Aceptación de designación como jurado de la convocatoria de fomento y estímulos</h5>
                            <p className="containt-text">
                              Mediante esta comunicación dejo constancia expresa que acepto la designación como jurado de la Convocatoria de Fomento y Estímulos para el Arte y la Cultura de Medellín, y en consecuencia manifiesto que conozco las condiciones generales de participación y mis obligaciones como jurado.
                            </p>

                            <h5 className="evalpro_list_Heading">
                              Además me comprometo a:{" "}
                            </h5>

                            <ul className="evalpro_listting">
                              <li>
                                <p>Leer detenidamente los lineamientos generales y específicos de participación de la Convocatoria de Fomento y Estímulos, estos serán suministrados por la Secretaría de Cultura Ciudadana.{" "}
                                </p>
                              </li>

                              <li>
                                <p>
                                  Declararme impedido para evaluar proyectos de familiares o amigos. En caso de que más de la mitad de jurados se declaren impedidos, la Secretaría de Cultura Ciudadana designará mediante acto administrativo jurados ad hoc para evaluar las propuestas a las que haya lugar.{" "}
                                </p>
                              </li>

                              <li>
                                <p>
                                  Analizar, evaluar y valorar técnicamente cada una de las propuestas asignadas, con base en los criterios establecidos para cada convocatoria y modalidad, previo al proceso de deliberación conjunta con los otros jurados.{" "}
                                </p>
                              </li>

                              <li>
                                <p>
                                  Diligenciar y firmar por cada propuesta asignada el formato de planilla de evaluación de acuerdo a las especificaciones de la Secretaría de Cultura Ciudadana.{" "}
                                </p>
                              </li>

                              <li>
                                <p>
                                  Entregar los formatos de evaluación finalizados el día de la deliberación conjunta con los otros jurados. Estos deberán estar bien diligenciados en su totalidad y bajo aprobación de la consultoría.{" "}
                                </p>
                              </li>
                              <li>
                                <p>
                                  Participar en la deliberación conjunta con los otros jurados en la fecha y hora indicada por la Secretaría de Cultura Ciudadana.{" "}
                                </p>
                              </li>
                              <li>
                                <p>Observar total imparcialidad, objetividad y actuar con plena autonomía.{" "}</p>
                              </li>
                              <li>
                                <p> Abstenerme de hacer uso de la información a que se accede para cualquier objetivo diferente de la evaluación, respetando siempre los derechos de autor del participante.{" "}</p>
                              </li>
                              <li>
                                <p> Sustentar y firmar el acta de veredicto de ganadores de las convocatorias que evalúe.{" "}</p>
                              </li>
                              <li>
                                <p>Retornar a la Secretaría de Cultura Ciudadana todo el material evaluado para ser devuelto a los participantes. (En caso de que se envíe material físico).{" "}</p>
                              </li>
                              <li>
                                <p>Entregar los documentos que les sean requeridos para el reconocimiento y remuneración del servicio en los tiempos establecidos.{" "}</p>
                              </li>
                              <li>
                                <p>Informar en los tres primeros días posteriores a la recepción de los documentos si algún archivo no abre adecuadamente o no permite su visualización.{" "}</p>
                              </li>
                              <li>
                                <p>Declaro que no tengo procesos en curso por la comisión de delitos sexuales cometidos contra menores de 18 años, de conformidad con lo establecido en la Ley 1918 de 2018.{" "}</p>
                              </li>
                            </ul>

                            <Content style={{ padding: "0.5rem 3rem" }}>
                              <p className="evalpro--btm-text-data">
                                Firmo en constancia de aceptar lo anteriormente estipulado; de igual forma certifico que no hago parte de ningún proyecto presentado a la Convocatoria de Fomento y Estímulos para el Arte y la Cultura de Medellín en la presente etapa y línea, y que actualmente no soy servidor público de ninguna entidad estatal de Colombia.{" "}
                              </p>

                              <h5 className='eval__frm_text'>A continuación adjunte la imagen de su firma en formato png, ingrese su Nombre completo y su número de documento.</h5>

                              <Content className="evalpro--form">
                                <Form>
                                  <Content>
                                    <label className='asgevl_form_lable'>Firma</label>
                                    <Input type="file" id="fileSelect" style={{ display: 'none' }} />
                                    <Input.Search
                                      placeholder=""
                                      enterButton="ADJUNTAR"
                                      size="large"
                                      className="evalpro--form-file"
                                      onClick={() => document.getElementById('fileSelect')?.click()}
                                      readOnly={true}
                                    />
                                  </Content>
                                  <Content className="mt-1">
                                    <label className='asgevl_form_lable'>Nombre</label>
                                    <Input placeholder="" style={{ height: '40px', borderRadius: '6px' }} />
                                  </Content>

                                  <Content className="mt-1">
                                    <Row>
                                      <Col span={18} style={{ padding: "3px" }}>
                                        <label className='asgevl_form_lable'>Tipo de documento</label>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col span={(matchScreenSize > 768)?6:8} style={{ padding: "3px" }}>
                                        {/*  <label className='asgevl_form_lable'>Tipo de documento</label> */}
                                        <Select
                                          defaultValue="CC"
                                          style={{
                                            width: "100%",
                                            height: '40px',
                                          }}
                                          className="evalpro_select_cc evalpro_cc_sel"
                                        >
                                          <Select.Option value="CC1">
                                            CC1
                                          </Select.Option>
                                          <Select.Option value="CC2" disabled>
                                            CC2
                                          </Select.Option>
                                          <Select.Option value="CC3">
                                            CC3
                                          </Select.Option>
                                        </Select>
                                      </Col>
                                      <Col span={(matchScreenSize > 768)?18:16} style={{ padding: "3px" }}>
                                        {/* <label
                                          style={{ marginTop: "1.5rem" }}
                                        ></label> */}
                                        <Input
                                          placeholder="No."
                                          style={{ height: '40px', borderRadius: '6px' }}
                                        />
                                      </Col>
                                    </Row>
                                  </Content>
                                </Form>
                              </Content>
                            </Content>
                          </Content>

                          <Content className="mt-2">
                            <Row className="">
                              <Col span={23} className="form--btm-btn-box" style={{ marginRight: '0.5rem' }}>
                                <Button
                                  onClick={() => props.setShowPage(12)}
                                  className="form_bg_btn"
                                  type="primary"
                                >
                                  ENVIAR Y CONTINUAR
                                </Button>
                              </Col>
                            </Row>
                          </Content>
                        </Paragraph>
                      </Typography>
                    </Content>
                  </Content>
                </Col>
              </Row>
            </Content>
          </Content>
        </Content>
        <Content className="footer-bar">
          <Footer />
          {/*  <Content className="box-container">
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
                    </Content> */}
        </Content>
      </Layout>
      <TermConditionModal
        viewEduOpen={viewEduOpen}
        setViewEduOpen={setViewEduOpen}
      />
    </div>
  );
}
