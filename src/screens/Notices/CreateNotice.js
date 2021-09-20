import React, { useState } from "react";
import { Form, Grid, Header, Input, Divider, Segment, List, Icon } from "semantic-ui-react";

export default function CreateNotice() {
  const [Links, setLinks] = useState([]);
  const [Valuelink, setValuelink] = useState("");
  const [Uploadimages, setUploadimages] = useState([]);
  function handleClick() {
    if (Valuelink.trim() !== "") {
      setLinks([...Links, Valuelink]);
      setValuelink("");
    }
  }
  function deleteLink(item) {
    let antLinks = Links;
    let newLinks = antLinks.filter((items) => items.trim() !== item);
    setLinks(newLinks);
  }
  function deleteFiles(item) {
    let antUploadimages = Uploadimages;
    let newUploadimages = antUploadimages.filter((items) => items.trim() !== item);
    setUploadimages(newUploadimages);
  }
  function onUploadfiles(e) {
    let file = e.target.files;
    console.log(file);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log(formData);
    setUploadimages([...Uploadimages, e.target.files[0].name])

  }
  return (
    <React.Fragment>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Header as="h4">Crear noticia</Header>
          <Form size="large">
            <Segment>
              <Header as="h4" floated="right">
                Noticia #: 1
              </Header>
              <Header as="h4" floated="left">
                Información general
              </Header>
              <Divider clearing />
              <Form.Group widths="equal">
                <Form.Input fluid label="Titulo" />
                <Form.Input fluid label="Autor" />
                <Form.Input fluid label="Fecha" />
                <Form.Input fluid label="Hora" />
              </Form.Group>
              <Form.TextArea label="Descripción" />
              <Form.TextArea label="Dependencias" />
              <Input
                name="ValueLink"
                action={{
                  content: "Agregar Link",
                  onClick: (e) => handleClick(e),
                }}
                value={Valuelink}
                onChange={(e) => setValuelink(e.target.value)}
              />
              <List>
                {Links.length > 0
                  ? Links.map(function (item) {
                      return (
                        <List.Item>
                          <List.Content>
                            <a>{item}</a>
                            <Icon name="trash" onClick={() => deleteLink(item)} />
                          </List.Content>
                        </List.Item>
                      );
                    })
                  : null}
              </List>
              <Header as="h4">Subir archivo</Header>
              <Input
                type="file"
                content="Adjuntar archivo"
                labelPosition="left"
                icon="file"
                onChange={e => onUploadfiles(e)}
              />
              <List>
                {Uploadimages.length > 0
                  ? Uploadimages.map(function (item) {
                      return (
                        <List.Item>
                          <List.Content>
                            <a>{item}</a>
                            <Icon name="trash" onClick={() => deleteFiles(item)} />
                          </List.Content>
                        </List.Item>
                      );
                    })
                  : null}
              </List>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}
