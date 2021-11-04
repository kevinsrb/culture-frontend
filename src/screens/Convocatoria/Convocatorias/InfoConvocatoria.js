import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edicionConvocatoria } from "../../../store/actions/convocatoriaAction";
import axios from "axios";
import {
  LineaEstrategicaOptions,
  CicloOptions,
  CoberturaOptions,
  ModalidadEstimuloOptions,
  EntidadOptions,
  AreaOptions,
  TipoEstimuloOptions,
  NumeroConvocatoiriaOptions,
  QuienParticipaOptions,
  EntidadSelected,
} from "../../../data/selectOption.data";

//Alertas y notificaciones
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";

// Ant Desing
import { Row, Col, Typography, Divider, Form, Input, Select, Radio, Button, InputNumber, Switch } from "antd";
import { useFormConvocatoria } from "./Hooks/useFormConvocatoria";
import { useOptionsSelect } from "./Hooks/useOptionsSelect";


// Ant Controllers
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const InfoConvocatoria = () => {

  const {
    getLineaConvocatorias,
    lineaConvocatorias,
    handleLineaConvocatoriaChange,
    categoriasLC,
    isDisabledCategorias,
    handleTipoEstimuloChange,
    isEconomico,
    handleBolsaConcursableChange,
    isBolsaConcursable,
    handleConvocatoriaSubmit,
    getConvocatoria,
    convocatoria,
    handleInputChange
  } = useFormConvocatoria();

  const {
    entidades,
    participaciones,
    ciclo,
    lineasEstrategicas,
    areas,
    coberturas,
    modalidadesEstimulo,
    tipoModalidades
  } = useOptionsSelect();




  const history = useHistory();
  const dispatch = useDispatch();
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // if(editarConvocatoria) {
      getConvocatoria(idConvocatoria, user, editarConvocatoria);
      // }
      getLineaConvocatorias();
    }
    return () => {
      mounted = false;
    }
  }, [dispatch]);


  return (
    <React.Fragment>
      <Row className="card-shadow">
        <Col className="contenedor__titulos__convocatoria" span={24}>
          <Title level={5}>Información General - <Text type="danger" className="titulo__span__convocatoria">Todos los campos son obligatorios</Text></Title>
          <Text type="secondary">Código convocatoria {idConvocatoria}</Text>
        </Col>
        <Divider style={{ marginTop: '0px' }} />
        <Col span={24}>
          <Form
            layout="vertical"
            size="large"
            onFinish={handleConvocatoriaSubmit}
            initialValues={{
              nombre_convocatoria: `${convocatoria.nombre_convocatoria}`,
              seudonimos: true
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item label="Nombre convocatoria" name="nombre_convocatoria" rules={[{ required: true, message: '' }]} >
                  <Input  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Línea convocatoria" rules={[{ required: true, message: '' }]}>
                  <Select
                    placeholder="Seleccionar..."
                    value={convocatoria.linea_convocatoria}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'linea_convocatoria')}
                    dropdownClassName="testWrap"
                  >
                    {lineaConvocatorias.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Categorias Línea convocatoria" rules={[{ required: true, message: '' }]}>
                  <Select
                    mode="multiple"
                    placeholder="Seleccionar..."
                    disabled={editarConvocatoria ? false : isDisabledCategorias}
                    dropdownClassName="testWrap"
                    value={convocatoria.categoria_linea_convocatoria}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'categoria_linea_convocatoria')}
                  >
                    {categoriasLC.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Entidad" rules={[{ required: true, message: '' }]}>
                  <Select
                    value={convocatoria.entidad}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'entidad')}
                  >
                    {entidades.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Quién puede participar?" rules={[{ required: true, message: '' }]}>
                  <Select
                    placeholder="Seleccionar..."
                    mode="multiple"
                    value={convocatoria.tipo_participante}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'tipo_participante')}
                  >
                    {participaciones.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Seudónimos? - opcional" rules={[{ required: true, message: '' }]}>
                  <Radio.Group name="pseudonimo" value={convocatoria.pseudonimo} onChange={handleInputChange}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '0px' }} />
              <Col span={6}>
                <Form.Item label="Ciclo" rules={[{ required: true, message: '' }]}>
                  <Select
                    placeholder="Seleccionar..."
                    value={convocatoria.ciclo}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'ciclo')}
                  >
                    {ciclo.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Línea estratégica" rules={[{ required: true, message: '' }]}>
                  <Select
                    value={convocatoria.linea_estrategica}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'linea_estrategica')}
                    placeholder="Seleccionar..."
                  >
                    {lineasEstrategicas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Área" rules={[{ required: true, message: '' }]}>
                  <Select
                    placeholder="Seleccionar..."
                    mode="multiple"
                    value={convocatoria.area}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'area')}
                  >
                    {areas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Cobertura - opcional" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar..."
                    value={convocatoria.cobertura}
                    onChange={(value) => handleLineaConvocatoriaChange(value, 'cobertura')}
                  >
                    {coberturas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="¿En convenio? - opcional" rules={[{ required: true, message: '' }]}>
                  <Radio.Group name="esconvenio" value={convocatoria.esconvenio} onChange={handleInputChange}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="¿Participa menor de edad? - opcional">
                  <Radio.Group name="menoredad" onChange={handleInputChange} value={convocatoria.menoredad}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '0px' }} />

              <Col span="24">
                <Row>
                  <Col span={24} style={{ maxWidth: '24%' }}>
                    <Form.Item label="Modalidad de estímulo - opcional"

                    >
                      <Select placeholder="Seleccionar..."
                        value={convocatoria.modalidad}
                        onChange={(value) => handleLineaConvocatoriaChange(value, 'modalidad')}
                      >
                        {modalidadesEstimulo.map(({ id, name }) =>
                          <Option key={id} value={name}>{name}</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span="24">
                <Row gutter={[16, 16]}>
                  <Col span={`${isEconomico ? 8 : 24}`} style={{ maxWidth: isEconomico ? '25%' : '24%' }}>
                    <Form.Item label="Tipo de estímulo" rules={[{ required: true, message: '' }]}>
                      <Select placeholder="Seleccionar..."
                        onChange={(value) => handleTipoEstimuloChange(value, 'tipo_estimulo')}
                        value={convocatoria.tipo_estimulo}
                      // onChange={(value) => handleLineaConvocatoriaChange(value, 'cobertura')}
                      >
                        {tipoModalidades.map(({ id, name }) =>
                          <Option key={id} value={name}>{name}</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  {isEconomico &&
                    <>
                      <Col span={6} >
                        <Form.Item label="Valor total de recursos" rules={[{ required: true, message: '' }]}>
                          <InputNumber
                            controls={false}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '55%' }}
                            min={0}
                            value={convocatoria.valor_total_entg}
                            onChange={(value) => handleLineaConvocatoriaChange(value, 'valor_total_entg')}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Bolsa Concursable">
                          <Switch checked={ convocatoria.bolsa_concursable } onChange={(value) => handleBolsaConcursableChange(value, 'bolsa_concursable')} />
                        </Form.Item>
                      </Col>
                      {isBolsaConcursable &&
                        <Col span={6}>
                          <Form.Item label="Número de estímulos" rules={[{ required: true, message: '' }]}>
                            <InputNumber min={0}
                              value={convocatoria.num_estimulos}
                              onChange={(value) => handleLineaConvocatoriaChange(value, 'num_estimulos')}
                            />
                          </Form.Item>
                        </Col>
                      }
                    </>
                  }
                </Row>
              </Col>
              <Divider style={{ marginTop: '0px' }} />
              <Col span={24}>
                <Form.Item label="Descripción corta">
                  <TextArea
                    rows={4}
                    rows={4}
                    showCount
                    maxLength={250}
                    name="descripcion_corta"
                    onChange={handleInputChange}
                    value={convocatoria.descripcion_corta}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Quién no puede participar?">
                  <TextArea
                    rows={4}
                    rows={4}
                    showCount
                    maxLength={250}
                    name="noparticipa"
                    onChange={handleInputChange}
                    value={convocatoria.noparticipa}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Perfíl participante">
                  <TextArea
                    rows={4}
                    showCount
                    maxLength={250}
                    name="perfil_participante"
                    onChange={handleInputChange}
                    value={convocatoria.perfil_participante}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row justify="end">
                  <Col>
                    <Button type="default" htmlType="submit">Guardar y continuar</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}
