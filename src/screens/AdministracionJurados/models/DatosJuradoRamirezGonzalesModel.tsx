import React, { useRef } from 'react'
import { Layout, Row, Col, Form, Input, Select, Table, Modal, Button, Space, } from "antd";

export default function DatosJuradoRamirezGonzalesModel(props:any) {
    const { Content } = Layout;
    const { Search } = Input;

    // const fileSel = useRef(null)

    const columns = [
        {
            title: 'No',
            width: 10,
            dataIndex: 'sNo',
            key: 'sNo',
        },
        {
            title: 'Nombre proyecto',
            width: 40,
            dataIndex: 'nombreProyecto',
            key: 'nombreproyecto',
        },
        { title: 'Codigo', width: 30, dataIndex: 'codigo', key: 'codigo' },
        { title: 'Línea', width: 30, dataIndex: 'linea', key: 'linea' },
        { title: 'Categoria', width: 150, dataIndex: 'categoria', key: 'categoria' },
        { title: 'Valor a pagar', width: 150, dataIndex: 'valorPagar', key: 'valorPagar' },
        /* {
            title: 'Valor a pagar',
            key: 'valorPagar',
            // fixed: 'right',
            width: 150,
            render: () => <Input placeholder="Basic usage" />,
        }, */
    ];

    const data = [
        {
            sNo: '1',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '2',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '3',
            nombreProyecto: 'Nombre proyecto',
            codigo: 'Código',
            linea: 'Línea',
            categoria: 'categoria',
            valorPagar: <Input placeholder="Basic usage" />
        },
        {
            sNo: '',
            nombreProyecto: '',
            codigo: '',
            linea: '',
            categoria: '',
            valorPagar: <span><b>Total a pagar: $350.000</b></span>
        },

    ];

    function fileSelectd() {
        //@ts-ignore
        document.getElementById('fileselect').click();
    }
    return (
        <div>
            <Content>
                <Content style={{height:300, overflow:'auto'}}>
                    <Table pagination={false} columns={columns} dataSource={data} scroll={{ x: 900 }} className='adt--form-table' />
                </Content>
                <Content className='mt-2'>

                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input type='file' placeholder="Basic usage" id='fileselect' style={{ display: 'none' }} />
                        <Search
                            onClick={() => fileSelectd()}
                            placeholder="Nombre documento.pdf"
                            enterButton="Adjuntar"
                            size="large"
                            className='adt--file-fild' />
                    </Space>
                </Content>
            </Content>
        </div>
    )

}