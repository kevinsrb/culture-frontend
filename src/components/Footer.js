import React from "react";
import { Row, Col, Image, Typography } from "antd";
import EscudoAlcaldia from "./../assets/Escudo_de_Medellín.png";
const { Title } = Typography;

export default function Footer() {
  return (
    <>
      <Col style={{ width: "8%", paddingLeft: "5%" }}>
        <Image src={EscudoAlcaldia} />
      </Col>
      <Col style={{ width: "15%", paddingLeft: "1%" }}>
        <Title className="font-family-Montserrat-Regular font-size-10px font-color-FFFFFF font-weight-normal letter-spacing-1px">
          Alcaldía de Medellín
        </Title>
      </Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
    </>
  );
}
