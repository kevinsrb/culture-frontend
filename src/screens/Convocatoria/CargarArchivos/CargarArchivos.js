import React, { useRef } from 'react'
import Browse from '../../../assets/Browse.png'
import { Form, Grid, Header, Divider, Segment, Input, Button, Dropdown , Select} from "semantic-ui-react";


export const CargarArchivos = () => {

  function actualizarInputFile() {
    var filename = "'" + this.value.replace(/^.*[\\\/]/, '') + "'";
    this.parentElement.style.setProperty('--fn', filename);
    }

    return (
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Form size="large"  autoComplete="off">
    
            <Segment className="container">
              <Form.Group widths="equal">
                <Form.Select 
                  placeholder='Seleccionar' 
                  label="Tipo documento" 
                  name="linea_convocatoria"
                />

                <Form.Field>
                  <label>Seleccione un archivo</label>
                  <img src={Browse} />
                  <div class="choose_file">
                    
                    <span>Choose File</span>
                    <Form.Input type="file" />
                  </div>
              
                </Form.Field>
              </Form.Group>   
            </Segment>
          </Form>
        </Grid.Column>
    </Grid>

        
    )
}
