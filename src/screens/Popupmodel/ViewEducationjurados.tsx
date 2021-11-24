import React, { useState } from "react";
import { Header, Button, Modal, Image, Grid, Embed } from "semantic-ui-react";
export default function ViewEducationjurados(props:any) {
  const { editData, baseUrl, image } = props;
  const img = image ? image : baseUrl + editData?.certification;
  const type = ["png", "jpg", "jpeg"].includes(img.split(".").pop());
  console.log("type: ", type);
  return (
    <div>
      <Modal
        onClose={() => props.setViewEduOpen(false)}
        onOpen={() => props.setViewEduOpen(true)}
        open={props.viewEduOpen}
        className="view-education--model"
      >
        <Grid className="model--headr">
          <Grid.Column floated="left" width={10}>
            <Header as="h4" className="jura--form-heading" floated="left">
              Previsualización: Nombre Documento.PDF
            </Header>
          </Grid.Column>
          <Grid.Column
            floated="right"className= "text-right"
            width={5}
            style={{ textAlign: "right" }}
          >
            <p
              className="model--close-icon"
              onClick={() => props.setViewEduOpen(false)}
            >
              X{" "}
            </p>
          </Grid.Column>
        </Grid>
        <Modal.Content>
          <Modal.Description className="text-center">
            {type ? (
              <div className="text-center">
                <Image src={img}  style={{display: 'inline-block'}}/>

              </div>
            ) : (
              <iframe
                src={img}
                style={{
                  maxHeight: 700,
                  height: 500,
                  width: 450,
                }}
              />
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}
