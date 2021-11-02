import { Col, Row, Divider as DividerAntd, Table } from "antd";
import { FormProvider } from "rc-field-form";
import React, { useEffect, useState } from "react";
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
import ModalPostulacion from "../ModalPostualcion";
import { FiltrosTabla } from "./FiltrosTabla";
import { useGestionarPostulaciones } from "./Hooks/useGestionarPostulaciones";

export const GestionarPostulaciones = () => {
  const { openFilter, handleChangeFilter, getPostulaciones, postulaciones } = useGestionarPostulaciones();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPostulaciones();
    }
    return () => {
      mounted = false;
    };
  }, []);

  console.log(postulaciones);

  const columns = [
    {
      title: "Propuesta",
      width: 120,
      dataIndex: "id_participante",
      key: "id_participante",
      fixed: "left",
    },
    {
      title: "Participante",
      width: 120,
      fixed: "left",
      render: (datos, index) => {
        return `${datos.primer_nombre} ${datos.segundo_nombre} ${datos.primer_apellido} ${datos.segundo_apellido};`;
      },
    },
    {
      title: "Identificación participante",
      width: 200,
      dataIndex: "numero_documento",
      key: "numero_documento",
    },
    {
      title: "Estado",
      width: 130,
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Barrio",
      width: 150,
      dataIndex: "barrio",
      key: "barrio",
    },
    {
      title: "Comuna",
      width: 140,
      dataIndex: "comuna",
      key: "comuna",
    },
    {
      title: "Teléfono Fijo",
      width: 150,
      dataIndex: "telefono_fijo",
      key: "telefono_fijo",
    },
    {
      title: "Teléfono Celular",
      width: 169,
      dataIndex: "telefono_celular",
      key: "telefono_celular",
    },
    {
      title: "Pais residencia",
      width: 169,
      dataIndex: "pais_residencia",
      key: "pais_residencia",
    },
    {
      title: "Ver propuesta",
      width: 110,
      fixed: "right",
      render: (datos) => (
        <>
          <Button
            className="botones-acciones"
            icon="search"
            onClick={() => {
              console.log(datos);
              setDatos(datos[0]);
              showModal(datos);
            }}
          />
        </>
      ),
    }
  ];

  const [datos, setDatos] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const showModal = (datos) => {
    setDatos(datos);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Row className="container-postulaciones" style={{ marginRight: "15px", marginLeft: "15px" }}>
        <Col span={24}>
          <Header className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold">
            Busqueda de propuestas
          </Header>
        </Col>
        <Col span={8}>
          <Input icon={<Icon name="search" />} fluid placeholder="Buscar Nombre" />
        </Col>
        <Col span={4}>
          <Button icon="filter" className="button-filtro-adminconvocatorias" onClick={handleChangeFilter} />
        </Col>
        {openFilter && <FiltrosTabla />}
        <Col span={24}>
          <Table
            dataSource={postulaciones}
            columns={columns}
            scroll={{ x: 1500, y: 300 }}
            size="large"
            rowClassName="sizeTable table-row"
            bordered={false}
          />
        </Col>
      </Row>

      <ModalPostulacion
        datos={datos}
        openModal={openModal}
        closeModal={closeModal}
        // actionButton={}
      />
    </>
  );
};
