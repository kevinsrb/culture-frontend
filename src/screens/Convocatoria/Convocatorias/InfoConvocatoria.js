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
    handleConvocatoriaSubmit
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
    getLineaConvocatorias()
  }, [dispatch]);

  useEffect(() => {
    // cargarEdicion();
  }, []);

  // const cargarEdicion = async () => {
  //   console.log(user);
  //   console.log(editarConvocatoria);
  //   if (editarConvocatoria === undefined) {
  //     return setConvocatoria({ ...convocatoria, usuario_creacion: user.idusuario });
  //   }
  //   let participantes = [];
  //   let categorias = [];
  //   let areas = [];
  //   let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
  //   console.log(response, "este es el response");
  //   for (var i in response.data.data.tipo_participante) {
  //     participantes.push(response.data.data.tipo_participante[i].value);
  //   }
  //   setTipoparticipanteseleccionado(participantes);
  //   let lineasconvocatorias = await axios.get(
  //     `${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${response.data.data.linea_convocatoria}`
  //   );
  //   categoriaslineasconvocatoriaMap = lineasconvocatorias.data.data.map((ds) => {
  //     return {
  //       key: ds.idcategorialineaconvocatoria,
  //       value: ds.idcategorialineaconvocatoria,
  //       text: ds.nombre,
  //     };
  //   });
  //   setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
  //   console.log(categoriasLineaconvocatoria);
  //   for (var x in response.data.data.categoria_linea_convocatoria) {
  //     categorias.push(response.data.data.categoria_linea_convocatoria[x].value);
  //   }
  //   setTipocategoriasseleccionado(categorias);
  //   for (var y in response.data.data.area) {
  //     areas.push(response.data.data.area[y].value);
  //   }
  //   setAreaSeleccionada(areas);
  //   console.log(tipocategoriasseleccionado);
  //   return setConvocatoria({
  //     ...convocatoria,
  //     nombre_convocatoria: response.data.data.nombre_convocatoria,
  //     linea_convocatoria: response.data.data.linea_convocatoria,
  //     categoria_linea_convocatoria: response.data.data.categoria_linea_convocatoria,
  //     entidad: response.data.data.entidad,
  //     pseudonimos: response.data.data.pseudonimo,
  //     tipo_participante: response.data.data.tipo_participante,
  //     cobertura: response.data.data.cobertura,
  //     ciclo: response.data.data.ciclo,
  //     linea_estrategica: response.data.data.linea_estrategica,
  //     area: response.data.data.area,
  //     convenido: response.data.data.esconvenio,
  //     modalidad: response.data.data.modalidad,
  //     tipo_estimulo: response.data.data.tipo_estimulo,
  //     valor_total_entg: response.data.data.valor_total_entg,
  //     bolsa_concursable: response.data.data.bolsa_concursable,
  //     num_estimulos: response.data.data.num_estimulos,
  //     descripcion_corta: response.data.data.descripcion_corta,
  //     perfil_participante: response.data.data.perfil_participante,
  //     noparticipa: response.data.data.noparticipa,
  //     usuario_creacion: user.idusuario,
  //   });
  //   // console.log(convocatoria, tipoparticipanteseleccionado);
  // };

 

  return (
    <React.Fragment>
      <Row className="card-shadow">
        <Col className="contenedor__titulos__convocatoria" span={24}>
          <Title level={5}>Información General - <Text type="danger" className="titulo__span__convocatoria">Todos los campos son obligatorios</Text></Title>
          <Text type="secondary">Código convocatoria {idConvocatoria}</Text>
        </Col>
        <Divider style={{ marginTop: '0px' }} />
        <Col span={24}>
          <Form layout="vertical" size="large" onFinish={handleConvocatoriaSubmit}
            initialValues={{
              entidad: 'SCC',
              valor_total_entg: 0,
              num_estimulos: 0,
              menor_edad: false,
              convenido: false,
              pseudonimo: false,
              descripcion_corta: '',
              modalidad: '',
              noparticipa: '',
              perfil_participante: '',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item label="Nombre convocatoria" name="nombre_convocatoria" rules={[{ required: true, message: '', message: '' }]}>
                  <Input  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Línea convocatoria" name="linea_convocatoria" rules={[{ required: true, message: '', message: '' }]}>
                  <Select placeholder="Seleccionar..." onChange={handleLineaConvocatoriaChange}
                    dropdownClassName="testWrap"
                  >
                    {lineaConvocatorias.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Categorias Línea convocatoria" name="categoria_linea_convocatoria" rules={[{ required: true, message: '' }]}>
                  <Select
                    mode="multiple"
                    placeholder="Seleccionar..."
                    disabled={isDisabledCategorias}
                    dropdownClassName="testWrap"
                  >
                    {categoriasLC.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Entidad" name="entidad" rules={[{ required: true, message: '' }]}>
                  <Select>
                    {entidades.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Quién puede participar?" name="tipo_participante" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar..." mode="multiple">
                    {participaciones.map(({ id, name }) =>
                      <Option key={id} value={id}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Seudónimos? - opcional" name="pseudonimo" rules={[{ required: true, message: '' }]}>
                  <Radio.Group>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '0px' }} />
              <Col span={6}>
                <Form.Item label="Ciclo" name="ciclo" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar...">
                    {ciclo.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Línea estratégica" name="linea_estrategica" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar...">
                    {lineasEstrategicas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Área" name="area" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar..." mode="multiple">
                    {areas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Cobertura - opcional" name="cobertura" rules={[{ required: true, message: '' }]}>
                  <Select placeholder="Seleccionar...">
                    {coberturas.map(({ id, name }) =>
                      <Option key={id} value={name}>{name}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="¿En convenio? - opcional" name="convenido" rules={[{ required: true, message: '' }]}>
                  <Radio.Group>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="¿Participa menor de edad? - opcional" name="menor_edad">
                  <Radio.Group>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '0px' }} />

              <Col span="24">
                <Row>
                  <Col span={24} style={{ maxWidth: '24%' }}>
                    <Form.Item label="Modalidad de estímulo - opcional" name="modalidad">
                      <Select placeholder="Seleccionar...">
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
                    <Form.Item label="Tipo de estímulo" name="tipo_estimulo" rules={[{ required: true, message: '' }]}>
                      <Select placeholder="Seleccionar..." onChange={handleTipoEstimuloChange}>
                        {tipoModalidades.map(({ id, name }) =>
                          <Option key={id} value={name}>{name}</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  {isEconomico &&
                    <>
                      <Col span={6} >
                        <Form.Item label="Valor total de recursos" name="valor_total_entg" rules={[{ required: true, message: '' }]}>
                          <InputNumber
                            controls={false}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '55%' }}
                            min={0}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Bolsa Concursable" valuePropName="checked" name="bolsa_concursable">
                          <Switch checkedChildren="Sí" unCheckedChildren="No" onChange={handleBolsaConcursableChange} />
                        </Form.Item>
                      </Col>
                      {isBolsaConcursable &&
                        <Col span={6}>
                          <Form.Item label="Número de estímulos" name="num_estimulos" rules={[{ required: true, message: '' }]}>
                            <InputNumber min={0} />
                          </Form.Item>
                        </Col>
                      }
                    </>
                  }
                </Row>
              </Col>
              <Divider style={{ marginTop: '0px' }} />
              <Col span={24}>
                <Form.Item label="Descripción corta - opcional" name="descripcion_corta">
                  <TextArea rows={4} rows={4} showCount maxLength={250} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Quién no puede participar? - opcional" name="noparticipa">
                  <TextArea rows={4} rows={4} showCount maxLength={250} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Perfíl participante - opcional" name="perfil_participante">
                  <TextArea rows={4} showCount maxLength={250} />
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
