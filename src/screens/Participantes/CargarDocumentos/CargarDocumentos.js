import React from 'react'
import { DocumentosTecnicos } from './DocumentosTecnicos'
import { DocumentosAdministrativos } from './DocumentosAdministrativos'
import { Container, Tab } from 'semantic-ui-react'

export const CargarDocumentos = () => {

    const panes = [
        {
          menuItem: 'Documento tecnicos',
          render: () => <DocumentosTecnicos attached={false} />,
        },
        {
          menuItem: 'Documentos administrativos',
          render: () => <DocumentosAdministrativos   attached={false} />,
        }
      ]

    return (
        <>
        <Container fluid>
          <div>
              <label>Cargar documentos</label>
          </div>
        </Container>

        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </>
    )
}




