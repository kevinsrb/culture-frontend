import React, { useState } from "react";
import {
  Container,
  Form,
  Header,
  Grid,
  Checkbox,
  Divider,
  Segment,
  Button,
} from "semantic-ui-react";
export default function AceptarTermAndCondition(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  async function handleClick(index) {
    const newIndex = index != activeIndex ? index : null;
    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Container fluid>
        <Divider clearing />
        <Grid style={{ width: "100%", margin: 0 }}>
          <Grid.Column style={{ maxWidth: "99%" }}>
            <Form size="large">
              <Segment>
                <Grid style={{ width: "100%", margin: 0 }}>
                  <Grid.Column style={{ maxWidth: "99%" }}>
                    <Header
                      as="h3"
                      className="jura--form-heading"
                      floated="left"
                    >
                      Aceptar Términos Y condiciones
                    </Header>
                  </Grid.Column>
                </Grid>

                <Grid style={{ width: "100%", margin: 0 }}>
                  <Grid.Column style={{ maxWidth: "99%" }}>
                    <Segment size="large" className="alert--box-success">
                      <h5>
                        El registro de la información ha concluido exitosamente.
                      </h5>
                      <p>
                        Es necesario que lea con detenimiento las condiciones
                        generales de participación y le las acepte para concluir
                        el proceso de postulación como jurado en la vigencia de
                        2018.
                      </p>
                    </Segment>
                  </Grid.Column>
                </Grid>

                <Grid columns={1} className="tac--text-area overflow--text">
                  <Grid.Row>
                    <Grid.Column>
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Términos Y Condiciones
                      </Header>
                      <Divider clearing />

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec molestie commodo arcu sit
                                amet malesuada. Aenean ultricies risus a massa
                                dictum, malesuada bibendum sapien ornare. Nullam
                                tempor felis libero, sed commodo tortor rutrum
                                non. Curabitur efficitur mattis turpis, ac
                                euismod ligula gravida gravida.
                              </p>
                              <p>
                                Integer auctor et nibh sed tristique. Duis
                                congue urna sit amet diam maximus, nec
                                vestibulum risus lobortis. Aenean sed nunc id
                                mauris mattis gravida. Etiam congue urna ut
                                faucibus fermentum. Proin malesuada vulputate
                                mi. Phasellus dignissim posuere tortor at
                                pretium. Phasellus nec tortor quis nulla
                                condimentum molestie. Vivamus ultrices sapien
                                nulla, a viverra lacus condimentum ut. Fusce sit
                                amet ex ut erat laoreet cursus id ut velit.
                                Mauris malesuada velit orci, placerat
                                sollicitudin sem lacinia a. Nunc ipsum est,
                                volutpat vitae ante sed, vulputate fermentum
                                elit. Maecenas porttitor quam massa, at
                                dignissim felis rhoncus at. Duis maximus mattis
                                erat sit amet pulvinar. Donec vitae iaculis
                                purus, in sollicitudin sapien. Mauris vestibulum
                                lacus magna, nec bibendum massa tempor nec. Cras
                                semper volutpat turpis, sit amet laoreet orci
                                lobortis et. In non fermentum justo. Ut
                                tincidunt nibh bibendum sagittis eleifend.
                              </p>
                              <p>
                                Mauris consectetur pharetra volutpat. Aliquam
                                pellentesque lorem ac elit efficitur, ut iaculis
                                orci tempor. Nam vitae lectus vel ipsum congue
                                congue. Suspendisse tincidunt nulla vel lacus
                                eleifend, sed aliquet tellus tempus. Integer ut
                                sapien velit. In hac habitasse platea dictumst.
                                Integer dignissim, ante sit amet condimentum
                                condimentum, magna libero condimentum risus,
                                quis tempus urna sapien ut tortor. Integer
                                commodo risus vel augue aliquet, in molestie leo
                                tempus. Proin pharetra magna vitae sodales
                                varius. Integer hendrerit interdum arcu id
                                commodo. Proin dignissim mauris nulla, nec
                                tincidunt ligula hendrerit nec.
                              </p>

                              <p>
                                Mauris consectetur pharetra volutpat. Aliquam
                                pellentesque lorem ac elit efficitur, ut iaculis
                                orci tempor. Nam vitae lectus vel ipsum congue
                                congue. Suspendisse tincidunt nulla vel lacus
                                eleifend, sed aliquet tellus tempus. Integer ut
                                sapien velit. In hac habitasse platea dictumst.
                                Integer dignissim, ante sit amet condimentum
                                condimentum, magna libero condimentum risus,
                                quis tempus urna sapien ut tortor. Integer
                                commodo risus vel augue aliquet, in molestie leo
                                tempus. Proin pharetra magna vitae sodales
                                varius. Integer hendrerit interdum arcu id
                                commodo. Proin dignissim mauris nulla, nec
                                tincidunt ligula hendrerit nec.
                              </p>

                              <p>
                                Mauris consectetur pharetra volutpat. Aliquam
                                pellentesque lorem ac elit efficitur, ut iaculis
                                orci tempor. Nam vitae lectus vel ipsum congue
                                congue. Suspendisse tincidunt nulla vel lacus
                                eleifend, sed aliquet tellus tempus. Integer ut
                                sapien velit. In hac habitasse platea dictumst.
                                Integer dignissim, ante sit amet condimentum
                                condimentum, magna libero condimentum risus,
                                quis tempus urna sapien ut tortor. Integer
                                commodo risus vel augue aliquet, in molestie leo
                                tempus. Proin pharetra magna vitae sodales
                                varius. Integer hendrerit interdum arcu id
                                commodo. Proin dignissim mauris nulla, nec
                                tincidunt ligula hendrerit nec.
                              </p>
                              <p>
                                Mauris consectetur pharetra volutpat. Aliquam
                                pellentesque lorem ac elit efficitur, ut iaculis
                                orci tempor. Nam vitae lectus vel ipsum congue
                                congue. Suspendisse tincidunt nulla vel lacus
                                eleifend, sed aliquet tellus tempus. Integer ut
                                sapien velit. In hac habitasse platea dictumst.
                                Integer dignissim, ante sit amet condimentum
                                condimentum, magna libero condimentum risus,
                                quis tempus urna sapien ut tortor. Integer
                                commodo risus vel augue aliquet, in molestie leo
                                tempus. Proin pharetra magna vitae sodales
                                varius. Integer hendrerit interdum arcu id
                                commodo. Proin dignissim mauris nulla, nec
                                tincidunt ligula hendrerit nec.
                              </p>
                            </Grid>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="tac--foot-text">
                        <Checkbox label="El registro de la información ha concluido exitosamente." />
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      content="Atrás"
                      className="btn btn-primary"
                      onClick={() => props.goBack(8)}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Grid className="form--buton-box mt-1">
                      <Button
                        onClick={() => props.setShowPage(10)}
                        content="Guardar y Continuar"
                        className="btn btn-primary right floated"
                      />
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
