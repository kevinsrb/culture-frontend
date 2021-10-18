import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import { PersonaNatural } from './PersonaNatural'
import { PersonaJuridica } from './PersonaJuridica'
import { GrupoConformado } from './GrupoConformado'

export const Inscripcion = () => {

    const panes = [
      {
        menuItem: 'Persona natural',
        render: () => <PersonaNatural attached={false} />,
      },
      {
        menuItem: 'Persona juridica',
        render: () => <PersonaJuridica   attached={false} />,
      },
      {
        menuItem: 'Grupo conformado',
        render: () => <GrupoConformado  attached={false} />,
      },
    ]

    return (
      <>
        <Container fluid>
          <div>
              <label>Formulario de inscripcion</label>
          </div>
        </Container>

        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </>
    )
}
