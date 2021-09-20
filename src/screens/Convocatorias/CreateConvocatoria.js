import React from 'react'
import { Container, Header, Input, Divider, Button } from "semantic-ui-react";

export const CreateConvocatoria = () => {
    return (
        <div className="padre">
            <div className="hijo">
                
                <Header as='h3'>Crear convocatoria</Header>
                <Divider />
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
                    <label>Actividades creada</label>
                    <textarea
                      name="acti_creada"
                      className="texarea_atividades" 
                    ></textarea>

                </div>

                <Divider />

                <Container textAlign='center'>
                   <Button basic color='red' content='Cancelar' className="btn" />
                   <Button basic color='blue' content='Guardar y continuar' className="btn" />
                </Container>
    
             
            </div>
        </div>
    )
}
