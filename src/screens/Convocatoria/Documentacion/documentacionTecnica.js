import React, { useState, useEffect } from "react";
import { RequisitosOptions } from "../../../data/selectOption.data";

import { Divider, Row, Col, Typography, Form, Select, Input, Table, Button, Empty, Modal, Radio} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import { useFormDocumentacionTecnica } from "./hooks/useFormDocumentacionTecnica";

export const DocumentacionTecnica = () => {

  const {
    cargarDocumentosTecnicos,
    agregarFila,
    editardocumentacion,
    verDocumentacion,
    eliminarDocumentacion,
    guardarArchivo,
    backComponente,
    handelAsociarDocumentosTecnicos,
    principalState,
    setPrincipalState
  } = useFormDocumentacionTecnica();

  useEffect(() => {
    cargarDocumentosTecnicos();
  }, []);

  const fileInputRef = React.useRef();
  
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  
  const { Title, Paragraph, Text } = Typography;
  const { TextArea } = Input;
  const { Option } = Select;

  const fields = [
    { name: "tipo_documento", value: principalState.tipo_documento },
    { name: "descripcion", value: principalState.descripcion },
    { name: "url_documento", value: principalState.url_documento },
    { name: "activo", value: principalState.activo },
    { name: "filename", value: principalState.filename },    
  ];
  
  
  const columns = [
    {
      title : 'N°',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Tipo requisito',
      dataIndex: 'tipo_documento',
      key: 'tipo_documento',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Activo',
      render: (datos, index) => (
        <>
          <Form.Item name="activo">
            <Radio.Group >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Acciones",
      width: 110,
      fixed: "right",
      render: (datos, index) => (
        <>
        <EyeOutlined
          className="botones-acciones"
          onClick={() => {
            verDocumentacion(datos)
          }}
        />

        <EditOutlined 
         className="botones-acciones"
         onClick={() => {
          editardocumentacion(datos, index)
         }}
        />

        <DeleteOutlined
         className="botones-acciones"
         onClick={() => {
          eliminarDocumentacion(datos, index)
         }}
        />
        </>
      ),
    }
  ];
  

  return (
    <>
      <Row>
        <div className="segment">
          <Col className="contenedor__titulos__convocatoria" span={24}>
          
            <Title level={5}>
              Asociar documentacion tecnica
            </Title>
            
            <Text type="secondary">Código convocatoria {idConvocatoria}</Text>
          </Col>

          <Divider />

          <Form
            layout="vertical"
            size="large"
            onFinish={handelAsociarDocumentosTecnicos}
            fields={fields}
            onFieldsChange={(_, fields) => {
              let infoupdate = { ...principalState };
              for (var i in fields) {
                infoupdate[fields[i].name] = fields[i].value;
              }
              setPrincipalState(infoupdate);
            }}
          >
          <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}>
              <Form.Item label="Requisito" name="tipo_documento">
                <Select placeholder="Seleccionar...">
                  {RequisitosOptions.map(({ key, text }) => (
                    <Option key={key} value={text}>
                      {text}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10}>
              <Form.Item 
                label="Descripción" 
                name="descripcion" 
                rules={[{ required: true, message: "" }]}
                // onKeyDown={conteoCaracteres}
                maxLength="250"
              >
                <TextArea rows={4} showCount maxLength={250} />
              </Form.Item>      
            </Col>

            <Col span={10}>
              <div className="label_container">
                <span>Adjuntar un archivo</span>
              </div>
              
              <div className="constiner_documentacion_general" justify="end">
                {principalState.filename === "" && (
                  <Button
                    className="btn button_archivo"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Seleccionar archivo
                  </Button>
                )}
                {principalState.filename !== "" && (
                  <Row>
                    <span className="nombreArchivo">{principalState.filename}</span>
                    <Button
                      onClick={() => setPrincipalState({ ...principalState, filename: "" })}
                      className="font-size-10px font-color-AD0808 no-margin"
                    >
                      Eliminar
                    </Button>
                  </Row>
                )}
                   <input ref={fileInputRef} type="file" hidden onChange={guardarArchivo} />
                
                
              </div>  
            </Col>
          </Row>

          <Row justify="end">
            <Button className="btn btn-primary" onClick={agregarFila}>Agregar</Button>
          </Row>

          <Row>
            <Col span={24}>
              <Table
                dataSource={principalState.documentacion}
                columns={columns}
                locale={{ emptyText: <Empty description="No hay datos" style={{ padding: '50px'}} /> }} 
                size="large"
                rowClassName="sizeTable table-row"
                bordered={false}
              />
            </Col>
          </Row>

            <Modal 
              title="Visualizar " 
              visible={principalState.openModalViewer}
              onCancel={() => setPrincipalState({ ...principalState, openModalViewer: !principalState.openModalViewer })}
            >
              <Title>Previsualización: {principalState.namepdf}</Title>
                <div>
                  {principalState.pdf.trim() !== "" ? (
                    <iframe src={principalState.pdf} style={{ width: "100%", height: "500px" }} />
                  ) : null}
              </div>
            </Modal>
          

          <Row justify="end">
            <Button className="btn btn-primary" onClick={handelAsociarDocumentosTecnicos}>Guardar y continuar</Button>
          </Row>

          </Form>
        </div>
    </Row>
    </>
  );
};
