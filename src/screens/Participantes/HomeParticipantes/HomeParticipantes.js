import React from 'react'
import { Container, Segment, Header, Divider } from 'semantic-ui-react'

export const HomeParticipantes = () => {
    return (
       <Container>
           <Segment>
            <Header as="h4" floated="left">
               Modulo de aprticipantes
            </Header>
            <Divider clearing />
           </Segment>
       </Container>
    )
}
