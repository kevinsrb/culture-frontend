import React from "react";
// styled components
import { Row, Col } from "antd";

// models
interface IProps {
  TituloSpan: string;
  TitulosinSpan: string;
}

export const TextoInicialJurados: React.FC<IProps> = (props: IProps) => {
  return (
    <Row style={{ paddingLeft: "5%", paddingTop: "2%" }}>
      <Col className="no-margin font-family-Montserrat-Regular font-size-18px" span={24}>
        <span className="font-family-Montserrat-SemiBold">{props.TituloSpan}</span> {props.TitulosinSpan}
      </Col>
    </Row>
  );
};
