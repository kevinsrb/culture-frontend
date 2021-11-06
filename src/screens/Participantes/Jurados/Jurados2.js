import React from "react";
import { Row, Col, Image, Typography } from "antd";
import EscudoAlcaldia from "./../../../assets/Escudo_de_Medellín.png";
import ImageParticipantes from "./../../../assets/login.png";
import BreadcrumbPaticipantes from "../../../components/BreadcrumbParticipantes";
import Footer from "../../../components/Footer";
const { Title } = Typography;

// ROUTES FOR BREADCRUMB
const routes = [
  {
    path: "/Usuario/2",
    breadcrumbName: "Alcaldía de Medellín",
  },
  {
    path: "/Usuario/2",
    breadcrumbName: "Secretaría de Cultura Ciudadana",
  },
  {
    path: "/Usuario/2",
    breadcrumbName: "Convocatorias",
  },
];

export default function Jurados() {
  return (
    <>
      <Row style={{ backgroundColor: "#3467CC" }}>
        <Col style={{ paddingLeft: "10%" }}>GOV</Col>
      </Row>
      <Row
        style={{
          backgroundColor: "#E6EFFD",
          paddingTop: "0.5%",
          paddingBottom: "0.5%",
          alignItems: "center",
        }}
      >
        <Col style={{ marginLeft: "10%", width: "3%" }}>
          <Image src={EscudoAlcaldia} width={"100%"} />
        </Col>
        <Col style={{ width: "50%", paddingLeft: "1%" }}>
          <Row style={{ flexDirection: "column" }}>
            <Col>
              <Title className="font-family-Montserrat-Bold font-size-12px no-margin font-weight-600">
                Alcaldía de Medellín
              </Title>
            </Col>
            <Col>
              <Title className="font-family-Montserrat-Regular font-size-10px">
                Secretaria de cultura ciudadana
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingLeft: "10%" }}>
          <BreadcrumbPaticipantes routesComing={routes} />
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "50%" }}>
          <Image src={ImageParticipantes} />
        </Col>
        <Col></Col>
      </Row>
      <Row
        style={{
          backgroundColor: "#3366CC",
          paddingTop: "0.5%",
          paddingBottom: "0.5%",
          alignItems: "center",
        }}
      >
        <Footer />
      </Row>
    </>
  );
}
