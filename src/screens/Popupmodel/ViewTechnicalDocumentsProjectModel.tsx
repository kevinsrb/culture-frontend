import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Image,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { CloseOutlined } from '@ant-design/icons'

export default function ViewTechnicalDocumentsProjectModel(props: any) {

  return (
    <div>
      <Layout className="form_radius">
        <Content className='model__header'>
          <Content className='mdl_header_containt'>
            <Row className='mdl_heading_row'>
              <Col span={12} className=''>
                <h3 className='evel_mdl_title'>Previsualización: Nombre Documento.PDF</h3>
              </Col>
              <Col span={12} className=' text-right'>
                <a className="mdl_close_btn" onClick={() => props.setDocumentOpen(false)}><CloseOutlined /></a>
              </Col>
            </Row>
          </Content>
        </Content>
        {/* <Content className='model__header btm_border'>
          <Content className='mdl_header_containt'>
            <Row>
              <Col span={12} className='p-1'>
                <h3>Previsualización: Nombre Documento.PDF</h3>
              </Col>
              <Col span={12} className='p-1 text-right'>
                <a className="mdl_close_btn" onClick={() => props.setDocumentOpen(false)}><CloseOutlined /></a>
              </Col>
            </Row>
          </Content>
        </Content> */}
        <Content className="document_view_box" style={{ borderRadius: '0px 0px 15px 15px' }}>
          <Image
            style={{ width: '100%', height: '350px' }}
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Content>
      </Layout>

    </div>
  );
}
