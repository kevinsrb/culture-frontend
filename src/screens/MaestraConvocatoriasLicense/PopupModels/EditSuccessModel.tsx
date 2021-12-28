import React, { useState } from 'react';
import {
    Layout,
    Button,
    Select
} from "antd";
import { Container, Grid } from "semantic-ui-react";
import { LeftOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { json } from 'stream/consumers';
export default function EditSuccessModel(props: any) {
    const { Content } = Layout
    const { Option } = Select

    return (
        <div>
            <Layout
                className="mb-1 mdl_pd_lf_rg model_info"
                style={{ borderRadius: "15px 15px 15px 15px", margin:'auto' }}
            >

                <Content className="asgevl__top_mdl_box">
                    <Content className='text-center mt-2 mb-2'>
                        <Content className='heading'>
                            <h2 className='succ_mdl_title'>Proceso exitoso</h2>
                            <p className='succ_mdl_text'>Los cambios se han guardado exitosamente</p>
                        </Content>
                        <Content className='text-center mt-2'>
                            <Button onClick={()=>{props.setIsEditSuccessModal(false);}} className="btn-submit form_bg_btn mt-2" type="primary">Aceptar</Button>
                        </Content>

                    </Content>
                </Content>



            </Layout>
        </div>
    )
}