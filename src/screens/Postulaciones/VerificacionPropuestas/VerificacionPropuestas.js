import { Col, Empty, Row, Table } from 'antd'
import React from 'react'
import { FiltrosTabla } from './FiltrosTabla'
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
import { useVerificacionPropuestas } from './Hooks/useVerificacionPropuestas';
import { ModalVerificar } from './ModalVerificar';

export const VerificacionPropuestas = () => {

    const {
        openFilter,
        handleChangeFilter,
        getPostulaciones,
        postulaciones,
        openModal,
        showModal,
        columns,
        setOpenModal,
        datos
    } = useVerificacionPropuestas();

    let data = [
        {
            "id_participante": 43,
            "tipo_identificacion": "CC",
            "numero_documento": "1000000001",
            "primer_nombre": "Administrador 4",
            "segundo_nombre": "Kevin 1",
            "primer_apellido": "Del Sistema 4",
            "segundo_apellido": "Rodriguez",
            "fecha_nacimiento": null,
            "sexo": "M",
            "pais_nacimiento": "Colombia",
            "pais_residencia": "Sucre",
            "departamento": "sdfsd",
            "municipio": "fdsf",
            "comuna": "sdf",
            "barrio": "fsdsdf",
            "estrato": "6",
            "telefono_fijo": "34r324",
            "telefono_celular": "3002445521",
            "correo_electronico": "KEVINSRB.3145722121@GMAIL.COM",
            "documentos": [
                {
                    "id": 157,
                    "idconvocatoria": 1,
                    "tipo_documento": "Hoja de vida",
                    "tipo_documento_id": 1,
                    "activo": false,
                    "url_documento": "PC CAMILO FRANCO.pdf",
                    "url_participante": "",
                    "descripcion": "Esto es una descripción.",
                    "fecha_creacion": "2021-10-25"
                },
                {
                    "id": 158,
                    "idconvocatoria": 1,
                    "tipo_documento": "Anexo",
                    "tipo_documento_id": 1,
                    "activo": false,
                    "url_documento": "descarga1.pdf",
                    "url_participante": "",
                    "descripcion": "Esto es una descripción.",
                    "fecha_creacion": "2021-10-25"
                },
                {
                    "id": 194,
                    "idconvocatoria": 1,
                    "tipo_documento": "Hoja de vida",
                    "tipo_documento_id": 1,
                    "activo": null,
                    "url_participante": "",
                    "descripcion": "Esto es una descripción.",
                    "fecha_creacion": "2021-10-25"
                }
            ],
            "tipo_participante": 1,
            "links": [
                {
                    "index": 0,
                    "link": "http://oferta.senasofiaplus.edu.co/sofia-oferta/"
                },
                {
                    "index": 2,
                    "link": "https://www.youtube.com/watch?v=cqaNdyBxXaM&list=RDGMEMYvZjTda73N9EL0Qo2TnYngVMQ48-lCCiHLA&index=7"
                }
            ],
            "usuario_id": 1000000001,
            "fecha_creacion": "2021-10-21 00:00:00.000 +00:00",
            "fecha_modificacion": null,
            "usuario_creacion": null,
            "usuario_modificacion": null
        }
    ]


    return (
        <>
            <Row className="container-postulaciones" style={{ marginRight: '15px', marginLeft: '15px' }}>
                <Col span={24}>
                    <Header
                        className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold"
                    >
                        Verificación de propuestas
                    </Header>
                </Col>
                <Col span={8}>
                    <Input
                        icon={<Icon name="search" />}
                        fluid
                        placeholder="Buscar Nombre"
                    />
                </Col>
                <Col span={4}>
                    <Button
                        icon="filter"
                        className="button-filtro-adminconvocatorias"
                        onClick={handleChangeFilter}
                    />
                </Col>
                {openFilter &&
                    <FiltrosTabla

                    />
                }
                <Col span={24}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        scroll={{ x: 1500, y: 300 }}
                        size="large"
                        locale={{ emptyText: <Empty description="No hay datos" style={{ padding: '50px'}} /> }} 
                        rowClassName="sizeTable table-row"
                    />
                </Col>
            </Row>

            <ModalVerificar  
                openModal={openModal}
                setOpenModal={setOpenModal}
                datos={datos}
            />
        </>
    )
}
