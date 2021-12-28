import React, { useState } from "react";
// components
import { Header } from "../Components/haeder.view";
import { Footer } from "../Components/Footer";
import { BannerJurados } from "../Components/BannerJurados";
import { TextoInicialJurados } from "../Components/TextoInicialJurados";

// styled components
import { Row, Col, Button, Checkbox, Radio, Typography } from "antd";
import { TextoinicialNumero } from "../Components/TextoinicialNumero";

import PersonaNatural from "./component/PersonaNatural";
import PersonalJuridica from "./component/PersonaJuridica";
import Continuar from "./component/Continuar";
import { useHistory } from "react-router-dom";

const RegistrarJurado = () => {
  const { Title, Text, Paragraph } = Typography;
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  function onChanges(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div>
      <Header />
      <BannerJurados BannerText="Banco de Jurados" />

      <Col
        className="box-container p-1"
        style={{
          minHeight: 400,
        }}
      >
        {value !== 3 && (
          <>
            <Col
              style={{
                borderBottom: "0.1px solid #a9a9a9",
                paddingBottom: 10,
              }}
            >
              <Row
                style={{
                  maxWidth: 950,
                  marginTop: 10,
                }}
              >
                <Paragraph
                  style={{
                    fontSize: 17,
                  }}
                  className="font-family-Montserrat-Regular reg--form-text"
                >
                  <b className="font-family-Montserrat-Bold">
                    Completa el formulario de reistrio para participar en las
                    convocatories.
                  </b>{" "}
                  Recuerda que todos los compos son obligatories excepto los
                  marcados como opcionales.
                </Paragraph>
              </Row>
              {
                <Text className="heading_regi font-family-Montserrat-Regular">
                  Formulario de registro
                </Text>
              }
            </Col>
            <Text className="radio_label_regi font-family-Montserrat-Bold">
              Tipa de sociedad
            </Text>
            <Row className="btn_con_re">
              <Radio.Group onChange={onChange} style={{}} value={value}>
                <Radio value={1}>Persona Natural</Radio>
                <Radio value={2}>Persona Juridica</Radio>
              </Radio.Group>
            </Row>
          </>
        )}
        <Col>
          {value == 1 ? (
            <PersonaNatural />
          ) : value == 2 ? (
            <PersonalJuridica />
          ) : (
            value == 3 && <Continuar />
          )}
        </Col>
        {(value === 1 || value === 2) && (
          <Checkbox onChange={onChanges}>
            Accepto{" "}
            <Text style={{ color: "lightblue" }}>Politicas de uso </Text> y ios.{" "}
            <Text style={{ color: "lightblue" }}>Terminos y Condiciones</Text>
          </Checkbox>
        )}
        {(value === 1 || value === 2 || value === 3) && (
          <Row className="btn_con_re">
            <Col span={20}></Col>
            <Col>
              <Button
                onClick={() => {
                  console.log("value: ", value);
                  if (value === 3) {
                    history.push("/cambiarContrasena");
                  } else {
                    setValue(3);
                  }
                }}
                type="primary"
                htmlType="submit"
                className="reg-form--btn"
              >
                CONTINUAR
              </Button>
            </Col>
          </Row>
        )}
      </Col>
      <Footer />
    </div>
  );
};
export default RegistrarJurado;
