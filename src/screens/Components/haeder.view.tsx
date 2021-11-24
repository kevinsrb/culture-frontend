import React from "react";
import { Button, Col, Image, Row, Typography } from "antd";
import GOVCO from "../../assets/landing/Logo.png";
import Escudo from "../../assets/landing/Escudo.png";
import "./header.style.scss";
// import { useNavigate } from 'react-router';

export const Header = () => {
  // const navigate = useNavigate();

  const goLogin = (): void => {
    // navigate("/login");
  };

  return (
    <>
      <Row className="container__header">
        <Col className="logo__header">
          <Image src={GOVCO} className="logo__img" preview={false} />
        </Col>
        <Col className="logo__header">
          <Button type="primary" shape="round" onClick={goLogin}>
            Iniciar Sesión
          </Button>
        </Col>
      </Row>
      <Row className="container__shield__section">
        <Col className="shield___image__content">
          <Image src={Escudo} className="logo__escudo" preview={false} />
        </Col>
        <Col className="shield__content">
          <Col className="font-size-14px font-family-Montserrat-Bold">
            Alcaldía de Medellín
          </Col>
          <Col className="font-size-14px font-family-Montserrat-Regular">
            Secretaría de cultura ciudadana
          </Col>
        </Col>
      </Row>
    </>
  );
};
