import React, { useState } from "react";

import { Row, Col, Input, Avatar, Select, Typography, Form } from "antd";

const PersonaNatural = () => {
  const { Title, Text, Paragraph } = Typography;
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<any>("optional");
  const [diparmentShow, setDiparmentShow] = useState<any>(true);
  const [diparment, setDiparment] = useState<any>("columbia");
  // @ts-ignore
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  function selectCountryOption(item: any) {
    setDiparment(item);
    if (item == "india") {
      setDiparmentShow(false);
    } else {
      setDiparmentShow(true);
    }
  }
  return (
    <div>
      {
        //@ts-ignore
        <Form
          requiredMark={requiredMark}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
        >
          <Row
            gutter={24}
            style={{
              marginTop: 10,
            }}
          >
            <Col span={8}>
              <Form.Item label="NIT" required>
                <Input placeholder="No." className='form--cont' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tipa de antidad" required>
                <Select className='form--cont'>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Nombre o razon social" required>
                <Input placeholder="" className='form--cont' />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Correo electronico" required>
                <Input placeholder="" className='form--cont'/>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Direccion comercial" required>
                <Input placeholder="" className='form--cont'/>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Borio de residencia">
                <Input placeholder="" className='form--cont'/>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Row>
                <Col span={10}>
                  <Form.Item label="Telefono commercial" required>
                    <Select className='form--cont'>
                      <Select.Option value="demo">pais</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col
                  span={13}
                  style={{
                    marginLeft: 5,
                  }}
                >
                  <Form.Item label=" " required>
                    <Input placeholder="Numerio" className='form--cont' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Form.Item label="Pais" required>
                <Select
                className='form--cont'
                  style={{ width: "100%" }}
                  placeholder="Select Pais"
                  optionFilterProp="children"
                  value={diparment}
                  onChange={(e: any) => selectCountryOption(e)}
                >
                  <Select.Option value="columbia">Columbia</Select.Option>
                  <Select.Option value="india">India</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} className={diparmentShow ? "showFild" : "hideFild"}>
              <Form.Item label="Departamento" required>
                <Select className='form--cont'>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className={diparmentShow ? "showFild" : "hideFild"}>
              <Form.Item label="Ciudad" required>
                <Select className='form--cont'>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      }
    </div>
  );
};
export default PersonaNatural;
