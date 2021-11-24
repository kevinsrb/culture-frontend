import React, { useState } from "react";

import { Row, Col, Input, Avatar, Select, Typography, Form } from "antd";

const PersonaNatural = () => {
  const { Title, Text, Paragraph } = Typography;
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<any>("optional");
  // @ts-ignore
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <div>
      {//@ts-ignore
        <Form requiredMark={requiredMark}
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
                <Input placeholder="No." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tipa de antidad" required>
                <Select>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Nombre o razon social" required>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Correo electronico" required>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Direccion comercial" required>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Borio de residencia">
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Row>
                <Col span={10}>
                  <Form.Item label="Telefono commercial" required>
                    <Select>
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
                    <Input placeholder="Numerio" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Form.Item label="Pais" required>
                <Select>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Departamento" required>
                <Select>
                  <Select.Option value="demo">pais</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ciudad" required>
                <Select>
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
