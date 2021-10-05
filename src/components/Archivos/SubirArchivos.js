import React from "react";
import { Input, Button, Grid, Segment, Form } from "semantic-ui-react";

export default function SubirArchivo({ file, type }) {
  const obtenerArchivo = (e) => {
    return file(e.target.files[0])
  };
  const obtenerTipo = (e) => {
      return type(e.target.value);
  }
  return (
    <Segment>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <label>Tipo documento</label>
            <Input fluid name="tipo_documento" onChange={obtenerTipo} />
          </Grid.Column>
          <Grid.Column>
            <label>Tipo documento</label>
            <Input fluid type="file" name="archivo" onChange={obtenerArchivo} />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Button>Guardar</Button>
          </Grid.Column>
          <Grid.Column>
            <Button>Agregar</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
