import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Header,
  Input,
  Button,
  Grid,
  Segment,
  Divider,
  Radio,
  Table,
  Label,
  Menu,
  Icon,
  Modal,
  Image,
  TextArea,
} from "semantic-ui-react";
import loginimage from "../../../../assets/login.png";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditAgregarReconocimeintosModel from "../../../Popupmodel/EditAgregarReconocimeintosModel";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
export default function AgregarReconocimeintos(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewEduOpen, setViewEduOpen] = useState(false);
  const [editEduOpen, setEditEduOpen] = useState(false);
  const [deleteEduOpen, setDeleteEduOpen] = useState(false);
  const [proyecto, setProyecto] = useState([
    { key: "1", value: "af", text: "Nombre reconocimiento 1" },
    { key: "2", value: "ax", text: "Nombre reconocimiento 2" },
    { key: "3", value: "al", text: "Nombre reconocimiento 3" },
  ]);

  async function handleClick(index) {
    const newIndex = index != activeIndex ? index : null;
    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Container fluid>
        <ViewModel viewEduOpen={viewEduOpen} setViewEduOpen={setViewEduOpen} />
        <EditAgregarReconocimeintosModel
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
        />
        <DeleteEducationjurados
          deleteEduOpen={deleteEduOpen}
          setDeleteEduOpen={setDeleteEduOpen}
        />

        <Grid style={{ width: "100%", margin: 0 }}>
          <Grid.Column style={{ maxWidth: "99%" }}>
            <Form size="large">
              <Segment>
                <Header as="h4" className="jura--form-heading" floated="left">
                  Reconocimientos -{" "}
                  <small>Todos los campos son obligatorios</small>
                </Header>
                <Divider clearing />

                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Nombre</label>
                      <Form.Input fluid placeholder="" name="" type="text" />
                    </Grid.Column>

                    <Grid.Column>
                      <label>Institución que la Otorga</label>
                      <Form.Input fluid placeholder="" name="" type="text" />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Año</label>
                      <Form.Input fluid placeholder="" name="" type="text" />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Ciudad</label>
                      <Form.Select
                        fluid
                        placeholder="Seleccionar..."
                        name=""
                        type="text"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Anexar documento</label>
                        <Input
                          label={{ basic: true, content: "Adjuntar" }}
                          labelPosition="right"
                          placeholder=""
                          className="usr--img-input input-ful-w"
                          width={60}
                        />
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="form--buton-box form--education mt-1">
                        <span className="link-font-text">Limpiar campos</span>
                        <Button content="Agregar" className="btn btn-primary" />
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

        <Grid style={{ width: "100%", margin: "0px 0rem" }}>
          <Grid.Column style={{ maxWidth: "99%" }}>
            <Form size="large">
              <Segment>
                <Header as="h4" className="jura--form-heading" floated="left">
                  Mis Reconocimientos
                </Header>
                <Divider clearing />

                <Grid columns={1}>
                  <div className="form--tblrow">
                    <Table celled className="main-data-table">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell className="headcol">
                            <div className="display-flex">
                              <span>No.</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.HeaderCell>
                          <Table.HeaderCell className="col--head">
                            Institución que la otorga
                          </Table.HeaderCell>
                          <Table.HeaderCell className="col--head">
                            Año
                          </Table.HeaderCell>
                          <Table.HeaderCell className="col--head">
                            Ciudad
                          </Table.HeaderCell>
                          <Table.HeaderCell className="col--head">
                            Anexar documento
                          </Table.HeaderCell>
                          <Table.HeaderCell className="headcol2">
                            Acciones
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>1</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>2</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>3</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>4</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>5</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>6</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell className="headcol">
                            <div className="display-flex">
                              <span>7</span>
                              <span>Nombre reconocimiento</span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Artista plástico
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            2019
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Medellìn
                          </Table.Cell>
                          <Table.Cell className="col--bdy-text">
                            Nombre documento
                          </Table.Cell>
                          <Table.Cell className="headcol2">
                            <Icon
                              onClick={() => setViewEduOpen(true)}
                              name="eye"
                            />
                            <Icon
                              onClick={() => setEditEduOpen(true)}
                              name="pencil alternate"
                            />
                            <Icon
                              onClick={() => setDeleteEduOpen(true)}
                              name="trash"
                              style={{ color: "red" }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                  <Container
                    className="pagination-box"
                    style={{ width: "100%", margin: 26 }}
                  >
                    <Grid>
                      <Grid.Column floated="right" width={5}>
                        <Menu floated="right" pagination>
                          <Menu.Item as="a" icon>
                            <Icon name="chevron left" />
                          </Menu.Item>
                          <Menu.Item as="a">1</Menu.Item>
                          <Menu.Item as="a">2</Menu.Item>
                          <Menu.Item as="a">3</Menu.Item>
                          <Menu.Item as="a">4</Menu.Item>
                          <Menu.Item as="a" icon>
                            <Icon name="chevron right" />
                          </Menu.Item>
                        </Menu>
                      </Grid.Column>
                    </Grid>
                  </Container>
                </Grid>

                <Divider clearing />
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="form--buton-box mt-1">
                        <Button
                          onClick={() => props.setShowPage(8)}
                          content="Guardar y Continuar"
                          className="btn btn-primary"
                        />
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
