import React from 'react';
import { Table } from 'semantic-ui-react';

export const TableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={1} >
                    No.
                </Table.HeaderCell>
                <Table.HeaderCell width={2} >
                    Nombre
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Codigo
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Fecha
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Estado
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Publicada
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Entidad
                </Table.HeaderCell>
                <Table.HeaderCell width={2} >
                    Linea estratégica
                </Table.HeaderCell>
                <Table.HeaderCell width={2} >
                    Area
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Creado por
                </Table.HeaderCell>
                <Table.HeaderCell width={1} >
                    Acciones
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}