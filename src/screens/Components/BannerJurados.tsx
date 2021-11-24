import React from "react";
// styled components
import { Row, Col, Image } from "antd";
// images
import Imageconvocatoria from "../../../assets/landing/ImageConvocatoria.png";

// models

interface IProps {
  BannerText: string;
}
export const BannerJurados: React.FC<IProps> = (props: IProps) => {
  return (
    <Row className="container-background-participantes">
      <Row className="subcontainer-background-participantes">
        <Col
          span={2}
          style={{ marginLeft: "5%", paddingTop: "3%", paddingBottom: "3%" }}
        >
          <Image src={Imageconvocatoria} preview={false} />
        </Col>
        <Col
          span={12}
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
              className="font-family-Montserrat-Regular font-size-22px font-color-FFFFFF"
            >
              Formulario de Postulación
            </Col>
            <Col
              style={{ lineHeight: "normal", textShadow: "2px 0 black" }}
              span={24}
              className="font-family-Montserrat-Regular font-size-14px font-color-FFFFFF"
            >
              {props.BannerText}
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
