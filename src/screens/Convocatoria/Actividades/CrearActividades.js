import React, { useState } from 'react'
import { Button, Container, Form, Header, Input, Modal } from 'semantic-ui-react'

export const CrearActividades = () => {

    const [open, setOpen] = useState(false)

    const handleInputChange = (event, result) => {
        const { name, value } = result || event.target;
    };

    return (
        <Modal className="modal_crearActividades"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Header as="h5" floated="right" className="crearActvidad">Crear actividad</Header>}
            >
            <Modal.Header>Crear actividad</Modal.Header>
            <Modal.Content>
                <label>Nombre de la actividad</label>
                <div className="input-group">
                    <Input  fluid
                    placeholder='Nombre'
                    name="name"
                    className="input_nombre"
                    />
                    <Button primary className="btn btn_agregar">Agregar</Button>
                </div>

                <div className="container_actividades">
                    <Form.Select 
                      placeholder='Seleccionar' 
                      size='large' 
                      label="Actividades creadas" 
                      name="modalidad"
                      onChange={ handleInputChange }
                    />
                </div>
                
            </Modal.Content>
            <Modal.Actions>
                <Container textAlign='center'>
                   <Button basic color='red' content='Atras' className="btn" onClick={() => setOpen(false)} />
                   <Button basic color='blue' content='Guardar y continuar' className="btn" onClick={() => setOpen(false)} />
                </Container>
            </Modal.Actions>
        </Modal>
    )
}
