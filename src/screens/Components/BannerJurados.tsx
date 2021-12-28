import React from "react";
// styled components
import { Row, Col, Image, Modal, Layout } from "antd";
// images
import Imageconvocatoria from "./../../assets/landing/ImageConvocatoria.png";

// models

interface IProps {
  BannerText: string;
}
export const BannerJurados: React.FC<IProps> = (props: IProps) => {

  const { Header, Content } = Layout;
  return (
    <Row
      className="container-background-participantes"
      style={{
        backgroundColor: "#ae3e97",
      }}
    >
      {/* <Content className='p-1'>
        <Row>
          <Col span={5}>
            <Content className="head-containt-img-left">
              <Image
                className="head--"
                style={{ padding: '.7rem' }}
                preview={false}
                src={Imageconvocatoria}
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
      </Content>*/}

       <Row className="subcontainer-background-participantes">
        <Col
          span={3}
          style={{ marginLeft: "5%", paddingTop: "3%", paddingBottom: "3%" }}
        >
          <Image src={Imageconvocatoria} preview={false} />
        </Col>
        <Col
          span={18}
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "5%",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        >
          <Row gutter={[0, 8]}>
            <Col
              style={{ lineHeight: "normal", textShadow: "2px 0 black" }}
              span={24}
              className="font-family-Montserrat-Regular hedd--top-boxx-title font-size-22px font-color-FFFFFF"
            >
              Formulario de Postulación
            </Col>
            <Col
              style={{ lineHeight: "normal", textShadow: "2px 0 black" }}
              span={24}
              className="font-family-Montserrat-Regular hedd--top-boxx-text font-size-14px font-color-FFFFFF"
            >
              {props.BannerText}
            </Col>
          </Row>
        </Col>
      </Row> 
    </Row>
  );
};
