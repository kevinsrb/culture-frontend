import React, { useState } from 'react';
import { Header, Container, Form, Input, Button, Grid, Segment, Divider, Radio, Modal, TextArea } from "semantic-ui-react";
export default function EditarExperienciaProfesionalModel(props:any) {

    const [proyecto, setProyecto] = React.useState([
        { key: '1', value: 'af', text: 'Nombre entidad 1' },
        { key: '2', value: 'ax', text: 'Nombre entidad 2' },
        { key: '3', value: 'al', text: 'Nombre entidad 3' },
    ])

    return (
        <div>
            <Modal
                onClose={() => props.setEditEduOpen(false)}
                onOpen={() => props.setEditEduOpen(true)}
                open={props.editEduOpen}
                className="model--div"
            >
                <Modal.Content className='model--containt' >
                    <Grid className='model--headr'>
                        <Grid.Column floated='left' width={10}>
                            <Header as="h4" className='jura--form-heading' floated="left"> Editar Experiencia Profesional - <small>Todos los campos son obligatorios</small></Header>
                        </Grid.Column>
                        <Grid.Column floated='right' className='text-right' width={5} style={{ textAlign: 'right' }}>
                            <p className="model--close-icon" onClick={() => props.setEditEduOpen(false)}>X </p>
                        </Grid.Column>
                    </Grid>


                    <Grid style={{ width: "100%", margin: 0 }}>
                        <Grid.Column style={{ maxWidth: "99%" }}>
                            <Form size="large">
                                <Grid columns={4}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <label>Nombre entidad / Proyecto</label>
                                            <Form.Select
                                                fluid
                                                placeholder='Seleccionar...'
                                                name="numero_documento"
                                                type="text"
                                                value='Nombre entidad'
                                                options={proyecto}
                                            />

                                        </Grid.Column>
                                        <Grid.Column>
                                            <label>Fecha de inicio</label>
                                            <Form.Group>
                                                <Form.Input placeholder='DD' width={5} value='20' />
                                                <Form.Input placeholder='MM' width={5} value='11' />
                                                <Form.Input placeholder='AAAA' width={6} value='2019' />
                                                <img className='form--icon-img' src='images/calendar.png' />
                                            </Form.Group>
                                        </Grid.Column>                    
                                        <Grid.Column>
                                            <label>Fecha de terminación</label>
                                            <Form.Group>
                                                <Form.Input placeholder='DD' width={5} value='20' />
                                                <Form.Input placeholder='MM' width={5} value='11' />
                                                <Form.Input placeholder='AAAA' width={6} value='2019' />
                                                <img className='form--icon-img' src='images/calendar.png' />
                                            </Form.Group>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <label>Cargo / Rol desempeñado</label>
                                            <Form.Input
                                                fluid
                                                placeholder=''
                                                name="numero_documento"
                                                type="text"
                                                value='Fomento a la Cultura 2021'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Grid columns={1}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form className='form--dec-input'>
                                                <label>Funciones principales</label>
                                                <TextArea
                                                    placeholder=""
                                                    rows={4}
                                                    rowsMax={4}
                                                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, sapien eget consequat fringilla, urna nisl rutrum metus, eu volutpat enim justo eu ipsum. Pellentesque tortor dolor, imperdiet sed eros ut, mattis sollicitudin tortor. Fusce aliquet pretium nulla a semper. Praesent condimentum ac tortor ac ultricies. Sed eu augue mattis, iaculis tellus eget, sodales erat. Nullam blandit luctus felis, in laoreet nisi. Vestibulum accumsan elit tortor, ut ultrices lacus porttitor ut. Nulla elementum blandit lectus eu consequat."
                                                />

                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Grid columns={1}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form className='form--dec-input'>
                                                <label>Anexar documento</label>
                                                <Input
                                                    label={{ basic: true, content: 'Adjuntar' }}
                                                    labelPosition='right'
                                                    placeholder=''
                                                    className="input--adj"
                                                    value='Nombre del archivo.pdf Eliminar'
                                                />
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>


                                <Grid columns={1}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Grid className='form--buton-box form--education mt-1'>
                                                <span className='link-font-text'>Cancelar</span>
                                                <span className='link-font-text'>Limpiar campos</span>
                                                <Button content="Guardar Cambios" className="btn btn-primary fm--btn" />
                                            </Grid>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </Form>
                        </Grid.Column>
                    </Grid>


                </Modal.Content>

            </Modal>
        </div>
    )

}