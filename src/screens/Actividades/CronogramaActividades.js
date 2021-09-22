import React from 'react'
import { Button, Container, Form, Grid, Header, Divider, Segment, Search } from "semantic-ui-react";
import { CrearActividades } from './CrearActividades';
export const CronogramaActividades = () => {

  const initialState = { isLoading: false, results: [], value: '' }

    return (
        <>
          <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
            <Grid.Column style={{ maxWidth: "100%" }}>
            
              <Form size="large">
                <Segment>
                  <Header as="h4" floated="right">
                      Codigo de convocatoria #: 1
                  </Header>
                  <Header as="h4" floated="left">
                      Cronograma de actividades
                  </Header>
                  <Divider clearing />

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>  
                        
                        <Header as="h4" floated="left">
                          <Search/>
                        </Header>
                      </Grid.Column>
                      <Grid.Column>  
                        <Header as="h4" floated="right">
                          <CrearActividades />
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>  

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column> 
                        <label>Seleccionar actividades</label>
                      </Grid.Column>
                      <Grid.Column>  
                        <Header as="h4" floated="right">
                          <Form.Checkbox
                          label="seleccionar todo"
                        />
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid> 


                  <Segment>
                    
                  </Segment>

                <Container textAlign='right'>
                   <Button basic color='red' content='Atras' className="btn" />
                   <Button basic color='blue' content='Guardar y continuar' className="btn" />
                </Container>
                  
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </>
    )
}
