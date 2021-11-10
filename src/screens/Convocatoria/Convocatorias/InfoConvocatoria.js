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
    categoriasLC,
    isDisabledCategorias,
    isEconomico,
    isBolsaConcursable,
    handleConvocatoriaSubmit,
    getConvocatoria,
    convocatoria,
    handleInputChange,
    setConvocatoria,
    errores_style,
    isDisabledForm,
    setIsDisabledForm,
    handleSelectChange
  } = useFormConvocatoria();

  const {
    entidades,
    participaciones,
    ciclo,
    lineasEstrategicas,
    areas,
    coberturas,
    modalidadesEstimulo,
    tipoModalidades,
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
    };
  }, [dispatch]);

  const fields = [
    { name: "nombre_convocatoria", value: convocatoria.nombre_convocatoria },
    { name: "linea_convocatoria", value: convocatoria.linea_convocatoria },
    { name: "categoria_linea_convocatoria", value: convocatoria.categoria_linea_convocatoria },
    { name: "entidad", value: convocatoria.entidad },
    { name: "tipo_participante", value: convocatoria.tipo_participante },
    { name: "ciclo", value: convocatoria.ciclo },
    { name: "linea_estrategica", value: convocatoria.linea_estrategica },
    { name: "area", value: convocatoria.area },
    { name: "cobertura", value: convocatoria.cobertura },
    { name: "modalidad", value: convocatoria.modalidad },
    { name: "tipo_estimulo", value: convocatoria.tipo_estimulo },
    { name: "valor_total_entg", value: convocatoria.valor_total_entg },
    { name: "num_estimulos", value: convocatoria.num_estimulos },
    { name: "descripcion_corta", value: convocatoria.descripcion_corta },
    { name: "noparticipa", value: convocatoria.noparticipa },
    { name: "perfil_participante", value: convocatoria.perfil_participante },
  ];

  return (
    <React.Fragment>
      <Row className="card-shadow">
        <Col className="contenedor__titulos__convocatoria" span={24}>
          <Title level={5}>
            Información General -{" "}
            <Text type="danger" className="titulo__span__convocatoria">
              Todos los campos son obligatorios
            </Text>
          </Title>
          <Text type="secondary">Código convocatoria {idConvocatoria}</Text>
        </Col>
        <Divider style={{ marginTop: "0px" }} />
        <Col span={24}>
          <Form
            layout="vertical"
            size="large"
            onFinish={handleConvocatoriaSubmit}
          >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item
                  label="Nombre convocatoria"
                >
                  <Input name="nombre_convocatoria" value={convocatoria.nombre_convocatoria} onChange={handleInputChange}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Línea convocatoria"
                >
                  <Select
                    placeholder="Seleccionar..."
                    value={convocatoria.linea_convocatoria}
                    onChange={(value) => handleSelectChange(value, "linea_convocatoria")}
                    dropdownClassName="testWrap"
                  >
                    {lineaConvocatorias.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label="Categorias Línea convocatoria"
                >
                  <Select
                    mode="multiple"
                    placeholder="Seleccionar..."
                    disabled={editarConvocatoria ? false : isDisabledCategorias}
                    dropdownClassName="testWrap"
                    value={convocatoria.categoria_linea_convocatoria}
                    onChange={(value) => handleSelectChange(value, 'categoria_linea_convocatoria')}
                  >
                    {categoriasLC.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Entidad" >
                  <Select  onChange={(value) => handleSelectChange(value, 'entidad')} value={convocatoria.entidad}>
                    {entidades.map(({ id, name }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="¿Quién puede participar?"
                >
                  <Select placeholder="Seleccionar..." mode="multiple"  onChange={(value) => handleSelectChange(value, 'tipo_participante')} value={convocatoria.tipo_participante}>
                    {participaciones.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="¿Seudónimos? - opcional">
                  <Radio.Group name="pseudonimo" value={convocatoria.pseudonimo} onChange={handleInputChange}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: "0px" }} />
              <Col span={6}>
                <Form.Item label="Ciclo"  >
                  <Select placeholder="Seleccionar..." onChange={(value) => handleSelectChange(value, 'ciclo')} value={convocatoria.ciclo}>
                    {ciclo.map(({ id, name }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Línea estratégica">
                  <Select placeholder="Seleccionar..." onChange={(value) => handleSelectChange(value,'linea_estrategica')} value={convocatoria.linea_estrategica}>
                    {lineasEstrategicas.map(({ id, name }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Área">
                  <Select placeholder="Seleccionar..." mode="multiple" onChange={(value) => handleSelectChange(value, 'area')} value={convocatoria.area}>
                    {areas.map(({ id, name }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Cobertura" >
                  <Select placeholder="Seleccionar..." onChange={(value) => handleSelectChange(value,'cobertura')} value={convocatoria.cobertura}>
                    {coberturas.map(({ id, name }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="¿En convenio? - opcional">
                  <Radio.Group name="esconvenio" value={convocatoria.esconvenio} onChange={handleInputChange}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="¿Participa menor de edad? - opcional">
                  <Radio.Group name="menor_edad" onChange={handleInputChange} value={convocatoria.menor_edad}>
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: "0px" }} />

              <Col span="24">
                <Row>
                  <Col span={24} style={{ maxWidth: "24%" }}>
                    <Form.Item label="Modalidad de estímulo - opcional">
                      <Select placeholder="Seleccionar..." onChange={(value) => handleSelectChange(value, 'modalidad')} value={convocatoria.modalidad}>
                        {modalidadesEstimulo.map(({ id, name }) => (
                          <Option key={id} value={name}>
                            {name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span="24">
                <Row gutter={[16, 16]}>
                  <Col span={`${isEconomico ? 8 : 24}`} style={{ maxWidth: isEconomico ? "25%" : "24%" }}>
                    <Form.Item label="Tipo de estímulo">
                      <Select
                        placeholder="Seleccionar..."
                        onChange={(value) => handleSelectChange(value, "tipo_estimulo")}
                        value={convocatoria.tipo_estimulo}
                      >
                        {tipoModalidades.map(({ id, name }) => (
                          <Option key={id} value={name}>
                            {name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  {isEconomico && (
                    <>
                      <Col span={6}>
                        <Form.Item
                          label="Valor total de recursos"
                          
                        >
                          <InputNumber
                            controls={false}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{ width: "55%" }}
                            min={0}
                            value={convocatoria.valor_total_entg}
                            onChange={(value) => handleSelectChange(value, "valor_total_entg")}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Bolsa Concursable">
                          <Switch
                            checked={convocatoria.bolsa_concursable}
                            onChange={(value) => handleSelectChange(value, "bolsa_concursable")}
                          />
                        </Form.Item>
                      </Col>
                      {isBolsaConcursable && (
                        <Col span={6}>
                          <Form.Item
                            label="Número de estímulos"
                           
                          >
                            <InputNumber
                              min={0}
                              value={convocatoria.num_estimulos}
                              onChange={(value) => handleSelectChange(value, "num_estimulos")}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </>
                  )}
                </Row>
              </Col>
              <Divider style={{ marginTop: "0px" }} />
              <Col span={24}>
                <Form.Item label="Descripción corta - opcional"  /* rules={[{ required: true, message: "" }]} */>
                  <TextArea value={convocatoria.descripcion_corta} name="descripcion_corta" onChange={handleInputChange} className={convocatoria.error.descripcion_corta_style} rows={4} showCount maxLength={250} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="¿Quién no puede participar? - opcional"
                  
                // rules={[{ required: true, message: "" }]}
                >
                  <TextArea value={convocatoria.noparticipa} name="noparticipa" onChange={handleInputChange} className={convocatoria.error.noparticipa_style} rows={4} showCount maxLength={250} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Perfíl participante - opcional"
                  
                // rules={[{ required: true, message: "" }]}
                >
                  <TextArea value={convocatoria.perfil_participante} name="perfil_participante" onChange={handleInputChange} className={convocatoria.error.perfil_participante_style} rows={4} showCount maxLength={250} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row justify="end">
                  <Col>
                    <Button type="default" htmlType="submit" disabled={isDisabledForm}>
                      Guardar y continuar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};
