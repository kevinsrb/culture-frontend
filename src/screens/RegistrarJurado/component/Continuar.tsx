import React, { useState } from "react";

import { Row, Col, Input, Avatar, Select, Typography, Form } from "antd";

const Continuar = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          minHeight: 400,
        }}
      >
        <Title level={5}>iGenial Te has registrado con existo.</Title>
        <Paragraph
          style={{
            maxWidth: 750,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Una contrasena provisional fue envida a tu direccion de correo
          electronico, se te pedria la cambies inmediatamente en el primer
          ingreasso por una de tu eleccion.
        </Paragraph>
      </Col>
    </div>
  );
};
export default Continuar;
