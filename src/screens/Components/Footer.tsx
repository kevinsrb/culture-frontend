import React from "react";
// Style components
import { Row, Col, Image, Typography } from "antd";
// Images
import EscudoAlcaldiaBlanco from "./../../assets/landing/logo3.png";
import GOVCO from "./../../assets/landing/Logo.png";
import Logo2 from "./../../assets/landing/logo2.png";
// styles
import "./Footer.scss";

export const Footer = () => {
  return (
    <Row className="container-footer">
      <Col className="container-escudo-alcaldia">
        <Image src={EscudoAlcaldiaBlanco} preview={false} />
      </Col>
      <Col className="container-text-alcaldia">
        <Typography.Text className=" footer-text">
          Alcaldía de Medellín
        </Typography.Text>
      </Col>
      <Col className="container-logo2">
        <Image src={Logo2} width="40%" preview={false} />
      </Col>
      <Col className="container-logoGOV">
        <Image src={GOVCO} width="20%" preview={false} />
      </Col>
      <Col className="font-family-Montserrat-Regular font-size-10px font-color-FFFFFF font-weight-normal letter-spacing-1px">
        Conoce GOVCO aquí
      </Col>
    </Row>
  );
};
