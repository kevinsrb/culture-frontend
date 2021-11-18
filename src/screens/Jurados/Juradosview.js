import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Image, Header, Input, Button, Grid, Select, Segment, Divider } from "semantic-ui-react";
import Sidebar from '../../components/NavBar';
import HeaderMenu from '../../components/Header';

import '../../App.css'
export default function Juradosview() {

    const history = useHistory();

    useEffect(()=>{
        setShowPages()
    },[])

    async function setShowPages() {
       
        await localStorage.setItem("showPage", 0);
      }

    return (
        <div>
            <Container fluid >

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="form--left-box">
                            <Sidebar />
                        </Grid.Column>
                        <Grid.Column className="form--right-box">
                                <HeaderMenu />
                                <Grid className="jura--main-page" style={{marginTop: '0px' }}>
                                    <Form className="text-center" style={{width:'100%'}} >
                                        <Form.Field className='jura--head-text' >
                                            <Header as="h3" className="sub-header-jurados">
                                                Bienvenido al banco de jurados para convocatorias de fomento y estímulos para el arte y la cultura
                                                <Header.Subheader className="sub-header-jurados jura--head-subtext">Inscribe tu hoja de vida para postularte al banco de jurados.</Header.Subheader>
                                            </Header>
                                        </Form.Field>
                                    </Form>
                                </Grid>

                                <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
                                    <Grid.Column className='register-btn-box' >
                                        <Segment style={{ borderRadius: '1.3rem' }}>
                                            <Header as="h4" floated="left">Banco de jurado</Header>
                                            <Divider clearing />

                                            <Container textAlign="center jura--btn-box">
                                                <Button onClick={() => (history.push('/juradosRegistration'),
                                                localStorage.setItem("showPage", 1))} content="btn btn-primary jura--regs-form-btn" className="btn btn-primary">Inscribir hoja de vida</Button>
                                            </Container>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

