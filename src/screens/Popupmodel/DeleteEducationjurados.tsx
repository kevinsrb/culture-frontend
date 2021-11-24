import React, { useState } from "react";
import { Header, Button, Modal, Image, Grid } from "semantic-ui-react";
export default function DeleteEducationjurados(props:any) {
  // const [open, setOpen] = React.useState(false)
  return (
    <div>
      <Modal
        onClose={() => props.setDeleteEduOpen(false)}
        onOpen={() => props.setDeleteEduOpen(true)}
        open={props.deleteEduOpen}
        className="delete--model"
      >
        <Modal.Content>
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header
                as="h4"
                className="jura--form-heading"
                floated="left"
              ></Header>
            </Grid.Column>
            <Grid.Column
              floated="right"
              className='text-right'
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon "
                onClick={() => props.setDeleteEduOpen(false)}
              >
                X{" "}
              </p>
            </Grid.Column>
          </Grid>
          <Modal.Description className="text-center delet--conf-edu">
            <Header className="dlt--title">
              Se eliminará la educación formal
            </Header>
            <p className="dlt--mdl-text">
              Está a punto de eliminar "Título de educación formal"
            </p>
            <h5 className="dlt-text-cont">¿Desea eliminarla?</h5>
          </Modal.Description>
          <Modal.Actions className="text-center ">
            <a
              //   href="#"
              className="csl--dlt curser-pointer"
              onClick={() => props.setDeleteEduOpen(false)}
            >
              Cancelar
            </a>
            <Button
              content="Aceptar"
              className="btn btn-primary"
              onClick={() => props.deleteEdu(false)}
            />
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </div>
  );
}
