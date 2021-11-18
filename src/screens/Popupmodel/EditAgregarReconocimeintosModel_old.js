import React, { useState } from 'react';
import { Header, Container, Form, Input, Button, Grid, Segment, Divider, Radio, Modal } from "semantic-ui-react";
export default function EditAgregarReconocimeintosModel(props) {
    return (
        <div>

            <Modal onClose={() => props.setEditEduOpen(false)}
                onOpen={() => props.setEditEduOpen(true)}
                open={props.editEduOpen}
                className="model--div">
                <Modal.Content className='model--containt' >
                    <Grid className='model--headr'>
                        <Grid.Column floated='left' width={10}>
                            <Header as="h4" className='jura--form-heading' floated="left"> Reconocimientos - <small>Todos los campos son obligatorios</small></Header>
                        </Grid.Column>
                        <Grid.Column floated='right text-right' width={5} style={{ textAlign: 'right' }}>
                            <p className="model--close-icon" onClick={() => props.setEditEduOpen(false)}>X </p>
                        </Grid.Column>
                    </Grid>

                    <Grid style={{ width: "100%", margin: 0 }}>
                        <Grid.Column style={{ maxWidth: "99%" }}>
                            <Form size="large">

                                <Divider clearing />

                                <Grid columns={4}>
                                    <Grid.Row>
                                        <Grid.Column >
                                            <label>Nombre</label>
                                            <Form.Input
                                                fluid
                                                placeholder=''
                                                name=""
                                                type="text"
                                            />
                                        </Grid.Column>

                                        <Grid.Column>
                                            <label>Institución que la Otorga</label>
                                            <Form.Input
                                                fluid
                                                placeholder=''
                                                name=""
                                                type="text"
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <label>Año</label>
                                            <Form.Input
                                                fluid
                                                placeholder=''
                                                name=""
                                                type="text"
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <label>Ciudad</label>
                                            <Form.Select
                                                fluid
                                                placeholder='Seleccionar...'
                                                name=""
                                                type="text"
                                            />
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
                                                />
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Grid columns={1}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Grid className='form--buton-box form--education mt-1'>
                                                <span className='link-font-text'>Limpiar campos</span>
                                                <Button content="Agregar" className="btn btn-primary" />
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