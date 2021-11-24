import React from "react";
// styled components
import { Row, Col } from "antd";
// style
// import "../Jurados.style.scss";

// model
interface IProps {
  numero: string;
  textosinspan: string;
  textospan: string;
  color: string;
}

export const TextoinicialNumero: React.FC<IProps> = (props: IProps) => {
  return (
    <Row style={{ paddingLeft: "5%", paddingTop: "2%" }}>
      <Col
        className={`no-margin font-family-Montserrat-Regular font-size-18px numero-seleccionar-postulacion background-titulos-jurados-${props.color}`}
      >
        {props.numero}
      </Col>
      <Col
        className="font-family-Montserrat-Regular font-size-18px titulo-numero-postulacion"
        span={22}
      >
        {props.textosinspan} <span>{props.textospan}</span>
      </Col>
    </Row>
  );
};
