import React from 'react'
import { Col, Divider, Modal, Row, Typography, Form, Input, Select, Button } from 'antd';
import { RequisitosOptions } from '../../../data/selectOption.data';
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export const ModalTecnica = ({ openModal, setOpenModal, principalState, setPrincipalState, saveFile, agregarFila, cambiarValor }) => {

    const onCancel = () => {
        setOpenModal(!openModal);
    }

    const handleSelectChange = (value, name ) => {
        setPrincipalState({
            ...principalState,
            [name] : value
        })
    }

    const fileInputRef = React.useRef();

    console.log(principalState)

    return (
        <Modal
            visible={openModal}
            onCancel={onCancel}
            width={1500}
            footer={
                <Button type="primary" onClick={agregarFila}>
                    Agregar
                </Button>
            }
        >
            <Row>
                <Col span={24}>
                    <Title level={5}>Editar documentación general convocatoria</Title>
                </Col>
                <Divider />
                <Col span={24}>
                    <Form
                        layout="vertical"
                    >
                        <Row gutter={[24, 16]}>
                            <Col span={12}>
                                <Form.Item label="Descripcion">
                                    <TextArea name="descripcion" rows={4} value={principalState.descripcion} onChange={cambiarValor} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                {/* <Form.Item label="Adjuntar archivo"> */}
                                <div className="constiner_documentacion_general" style={{ height: '68%', marginTop: '22px' }}>
                                    {principalState.filename === "" && (
                                        <Button
                                            content="Seleccionar archivo"
                                            className="btn button_archivo"
                                            onClick={() => fileInputRef.current.click()}
                                        >Seleccionar archivo</Button>
                                    )}
                                    {principalState.filename !== "" && (
                                        <>
                                            <span className="nombreArchivo">{principalState.filename}</span>
                                            <span
                                                onClick={() => {
                                                    return setPrincipalState({ ...principalState, filename: "" })
                                                }}
                                                className="font-size-10px font-color-AD0808 no-margin"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Eliminar
                                            </span>
                                        </>
                                    )}
                                    <input ref={fileInputRef} type="file" hidden onChange={saveFile} />
                                </div>
                                {/* </Form.Item> */}
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tipo de documento">
                                    <Select value={principalState.tipo_documento} onChange={ (values) => handleSelectChange(values, 'tipo_documento') }>
                                        {RequisitosOptions.map(x =>
                                            <Option key={x.key} value={x.value}>{x.text}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}
