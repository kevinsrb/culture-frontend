import { Col, Row, Divider as DividerAntd, Table } from "antd";
import { FormProvider } from "rc-field-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import ModalRevisarPropuesta from "./ModalPropuestas";
import { FiltrosTabla } from "../VerificacionPropuestas/FiltrosTabla";
import { useGestionarPostulaciones } from "../GestionarPostulaciones/Hooks/useGestionarPostulaciones";

export const Propuestas = () => {
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
      dataIndex: "nombre_propuesta",
      key: "nombre_propuesta",
      fixed: "left",
    },
    {
      title: "Participante",
      width: 120,
      dataIndex: "nombre_particpante",
      key: "nombre_particpante",
      fixed: "left",
    },
    {
      title: "Identificación participante",
      width: 200,
      dataIndex: "id_participante",
      key: "id_participante",
    },
    {
      title: "Estado",
      width: 130,
      dataIndex: "estado_jurado",
      key: "estado_jurado",
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
      title: "Revisar propuestas",
      width: 120,
      key: "acciones",
      fixed: "right",
      render: (datos) => (
        <>
          <Button className="botones-acciones" icon="pencil" onClick={() => showModal(datos)} />
        </>
      ),
    },
  ];

  const [datos, setDatos] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const showModal = (datos) => {
    // debugger
    setDatos(datos);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const actualizarDocumento = async (url_documento, index, doc) => {
    console.log(url_documento, datos.id_postulacion, index, doc.id);
    let documentos = [];
    for (let i in postulaciones) {
      if (postulaciones[i].id_postulacion === datos.id_postulacion) {
        for (let x in postulaciones[i].documentosAdministrativos) {
          if (doc.id === postulaciones[i].documentosAdministrativos[x].id) {
            documentos.push({
                descripcion: postulaciones[i].documentosAdministrativos[x].descripcion,
                documentoActualizado: postulaciones[i].documentosAdministrativos[x].documentoActualizado,
                estado_subsanable: postulaciones[i].documentosAdministrativos[x].estado_subsanable,
                fecha_creacion: postulaciones[i].documentosAdministrativos[x].fecha_creacion,
                id: postulaciones[i].documentosAdministrativos[x].id,
                idconvocatoria: postulaciones[i].documentosAdministrativos[x].idconvocatoria,
                obligatorio: postulaciones[i].documentosAdministrativos[x].obligatorio,
                subsanable: postulaciones[i].documentosAdministrativos[x].subsanable,
                tipo_documento: postulaciones[i].documentosAdministrativos[x].tipo_documento,
                tipo_documento_id: postulaciones[i].documentosAdministrativos[x].tipo_documento_id,
                tipo_persona: postulaciones[i].documentosAdministrativos[x].tipo_persona,
                url_documento: postulaciones[i].documentosAdministrativos[x].url_documento,
                url_participante: url_documento,
            });
          } else {
            documentos.push(postulaciones[i].documentosAdministrativos[x]);
          }
        }
        for (let y in postulaciones[i].documentosTecnicos) {
          documentos.push(postulaciones[i].documentosAdministrativos[y]);
        }
      }
    }
    console.log(documentos);
    // await axios
    //   .put(
    //     `${process.env.REACT_APP_SERVER_PART}participantes/documentos/${datos.id_participante}`,
    //     documentos
    //   )
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <Row className="container-postulaciones" style={{ marginRight: "15px", marginLeft: "15px" }}>
        <Col span={24}>
          <Header className="font-size-14px font-color-1B1C1D font-weight-600 font-family-Montserrat-SemiBold">
            Mis propuestas
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

      {/* <ModalPostulacion
                datos={datos}
                openModal={openModal}
                closeModal={closeModal}
            // actionButton={}
            /> */}
      <ModalRevisarPropuesta
        datos={datos}
        openModal={openModal}
        closeModal={closeModal}
        actionButton={closeModal}
        uploadFile={actualizarDocumento}
      />
    </>
  );
};
