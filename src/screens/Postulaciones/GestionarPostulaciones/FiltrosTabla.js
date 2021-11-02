import { Col, Row } from 'antd'
import React from 'react'
import {
    Segment,
    Modal,
    Button,
    Header,
    Grid,
    Form,
    Input,
    Checkbox,
    Icon,
    Pagination,
    Divider,
    Select,
    Dropdown as DropdownSemantic,
    Breadcrumb,
    GridColumn,
} from "semantic-ui-react";


export const FiltrosTabla = () => {

    


    return (
        <Col span={24} style={{ marginTop: '14px' }}>
            <Row gutter={[24, 24]}>
                <Col span={5}>
                    <Form.Select
                        fluid
                        label="Estado"
                        placeholder="Seleccione un estado"
                    />
                </Col>
                <Col span={4}>
                    <Form.Select
                        fluid
                        label="Año"
                        placeholder="Seleccione un año"
                    />
                </Col>
                <Col span={5}>
                    <Form.Select
                        fluid
                        label="Linea convocatoria"
                        placeholder="Seleccione una linea"
                    />
                </Col>
                <Col span={6}>
                    <Form.Select
                        fluid
                        label="Categoría"
                        placeholder="Seleccione una categoría"
                    />
                </Col>
                <Col span={4}>
                    <Form.Input
                        fluid
                        label="Codigo"
                        placeholder="Digite un codigo"
                    />
                </Col>
            </Row>
        </Col>
    )
}
