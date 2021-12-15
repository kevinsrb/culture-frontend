import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// components
import { Header } from "../../Components/haeder.view";
import { Footer } from "../../Components/Footer";
import { BannerJurados } from "../../Components/BannerJurados";

// styled components
import { Row, Col, Button, Form, Input, Typography, Modal } from "antd";

const CambiarContrasena = () => {
  const { Text, Paragraph, Title } = Typography;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModal, setShowModal] = useState<boolean>(false);
  const [showConPassword, setShowConPassword] = useState<boolean>(false);
  const [requiredMark, setRequiredMarkType] = useState<any>("optional");
  const [formErrors, setFormErrors] = useState<any>();

  const [formData, setFormData] = useState<any>({
    mobileNumber: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onRequiredTypeChange = ({ requiredMarkValue }: any) => {
    setRequiredMarkType(requiredMarkValue);
  };

  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;
    if (!formData.mobileNumber) {
      formIsValid = false;
      formErrors["mobileNumber"] = true;
    }
    if (!formData.newPassword) {
      formIsValid = false;
      formErrors["newPassword"] = true;
    }
    if (!formData.confirmPassword) {
      formIsValid = false;
      formErrors["confirmPassword"] = true;
    }

    if (!(formData.confirmPassword === formData.newPassword)) {
      // console.log("formData.newPassword:===", formData.newPassword);
      // console.log("formData.confirmPassword: ===", formData.confirmPassword);
      // console.log(
      //   "formData.confirmPassword === formData.newPassword:=== ",
      //   !(formData.confirmPassword === formData.newPassword)
      // );
      formIsValid = false;
      formErrors["confirmPasswords"] = true;
      formErrors["newPasswords"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }
  const onSubmit = () => {
    if (formValidation()) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <Header />
      <BannerJurados BannerText="Banco de Jurados" />
      <Col
        className="box-container "
        style={{
          minHeight: 400,
        }}
      >
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
              <Paragraph className="font-family-Montserrat-bold txt_regi">
                Hola <Text style={{ color: "#ae3e97" }}>Jhon</Text>, por tu
                seguridad debes cambiar la contrasena.
              </Paragraph>
            </Row>
            <Text className="heading_regi font-family-Montserrat-Regular">
              Cambiar contrasena 
            </Text>
          </Col>
          <Text className="radio_label_regi font-family-Montserrat-bold">
            La contrasena debe tener minimo 8 caracteres maximo 20, debe tener
            al menos un numero.
          </Text>
        </>
        <Col>
          <Form
            layout="vertical"
            initialValues={{
              requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label={<p className="">Numero de identificacion</p>}
                  required
                  validateStatus={
                    !formData.mobileNumber &&
                    formErrors?.mobileNumber &&
                    "error"
                  }
                  help={
                    !formData.mobileNumber &&
                    formErrors?.mobileNumber &&
                    "Numero de identificacion is required"
                  }
                >
                  <Input
                  className='form--cont'
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobileNumber: e.target.value,
                      })
                    }
                    value={formData?.mobileNumber}
                    prefix="NO."
                    placeholder=""
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  validateStatus={
                    formErrors?.newPasswords
                      ? "error"
                      : !formData.newPassword &&
                        formErrors?.newPassword &&
                        "error"
                  }
                  help={
                    formErrors?.newPasswords
                      ? "Nueva contrasena and Confirmar contrasena are not same"
                      : !formData.newPassword &&
                        formErrors?.newPassword &&
                        "Nueva contrasena is required"
                  }
                  label="Nueva contrasena"
                  required
                >
                  <Input
                  className='form--cont'
                    placeholder="******"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newPassword: e.target.value,
                      })
                    }
                    value={formData?.newPassword}
                    type={`${showPassword ? "text" : "password"}`}
                    suffix={
                      <div
                        className={`active-showpassbtn curser-pointer `}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        VER
                      </div>
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Confirmar contrasena"
                  required
                  validateStatus={
                    formErrors?.confirmPasswords
                      ? "error"
                      : !formData.confirmPassword &&
                        formErrors?.confirmPassword &&
                        "error"
                  }
                  help={
                    formErrors?.confirmPasswords
                      ? "Nueva contrasena and Confirmar contrasena are not same"
                      : !formData.confirmPassword &&
                        formErrors?.confirmPassword &&
                        "Confirmar contrasena is required"
                  }
                >
                  <Input
                  className='form--cont'
                    placeholder="*******"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    value={formData?.confirmPassword}
                    type={`${showConPassword ? "text" : "password"}`}
                    suffix={
                      <div
                        className="curser-pointer active-showpassbtn "
                        onClick={() => setShowConPassword(!showConPassword)}
                      >
                        VER
                      </div>
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Row className="btn_con_re">
          <Col span={20}></Col>
          <Col>
            <Button
              onClick={() => onSubmit()}
              type="primary"
              htmlType="submit"
              className="reg-form--btn"
            >
              CAMBIAR CONTRASENA 
            </Button>
          </Col>
        </Row>
      </Col>
      <Footer />
      <div className={`${isModal ? "suc-modal-regi" : ""}`}>
        <Modal
          footer={null}
          closable={false}
          visible={isModal}
          bodyStyle={{
            borderRadius: 550,
            overflow: "hidden",
          }}
        >
          <>
            <Col className="suc-modal-maincon">
              <Title
                className="font-family-Montserrat-bold"
                style={{ marginBottom: 0, fontSize: 20, color: "green" }}
                level={3}
              >
                Combio de contrasena exitoso
              </Title>
              <Paragraph
                style={{ marginBottom: 0, fontSize: 15 }}
                className="font-family-Montserrat-Regular"
              >
                se ha cambiado correctamente la contrasena
              </Paragraph>
              <Title
                style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}
                className="font-family-Montserrat-Bold"
                level={5}
              >
                Acepta para continuar
              </Title>
            </Col>
            <Col className="suc-modal-btncon">
              <Button
                onClick={() => setShowModal(false)}
                type="primary"
                htmlType="submit"
                className="reg-form--btn"
              >Acceptar</Button>
            </Col>
          </>
        </Modal>
      </div>
    </div>
  );
};
export default CambiarContrasena;
