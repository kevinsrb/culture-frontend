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
                <Col span={6}>
                    <Form.Select
                        fluid
                        label="Entidad"
                        placeholder="Seleccione una entidad"
                    />
                </Col>
                <Col span={6}>
                    <Form.Select
                        fluid
                        label="Año"
                        placeholder="Seleccione un año"
                    />
                </Col>
                <Col span={6}>
                    <Form.Select
                        fluid
                        label="Categoría"
                        placeholder="Seleccione una categoría"
                    />
                </Col>
                <Col span={6}>
                    <Form.Input
                        fluid
                        label="Identificación"
                        placeholder="Identificación"
                    />
                </Col>
            </Row>
        </Col>
    )
}
