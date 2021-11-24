import React, { useState } from "react";
import { Header, Button, Modal, Image, Grid, Embed } from "semantic-ui-react";
export default function TermConditionModal(props:any) {
  return (
    <div>
      <Modal
        onClose={() => props.setViewEduOpen(false)}
        onOpen={() => props.setViewEduOpen(true)}
        open={props.viewEduOpen}
        // className="view-education--model"
        size="large"
      >
        <Grid className="model--headr">
          <Grid.Column floated="left" width={10}>
            <Header as="h4" className="jura--form-heading" floated="left">
              Terminos y condiciones
            </Header>
          </Grid.Column>
          <Grid.Column
            floated="right" className= "text-right"
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
        <Modal.Content scrolling>
          <Modal.Description className="text-center ">
            <p>
              Lorem ipsum dolor sit amet. Qui dolorem quia ea fugiat quia ut
              voluptas autem et pariatur Quis non eaque rerum eos iste ipsum id
              quibusdam molestiae! Hic quos fugit et soluta quam sed suscipit
              recusandae rem explicabo nulla. Aut quis quasi in aliquid mollitia
              est totam aperiam cum velit cupiditate eum autem eveniet? Est
              molestiae dolor 33 voluptatem nulla eum illo commodi ab sint
              vitae. Et exercitationem magni et consequuntur nisi rem similique
              rerum hic delectus ipsum qui facere eaque. Et voluptas natus ut
              architecto sequi qui laborum consequatur ut voluptas Quis ea
              fugiat illo aut explicabo voluptas sed repellat fugit! Est
              eligendi soluta quo consequatur fugiat sit fugiat ullam non quos
              odio 33 dicta deserunt. Hic maiores nulla aut soluta nihil est
              dolorem aliquid id molestiae fugit quo distinctio voluptatem et
              nobis voluptatum laudantium voluptas. Ut quisquam quia aut enim
              suscipit sit iure laborum At necessitatibus nulla? Eos aliquam
              vero sed recusandae possimus vero suscipit ut molestias doloremque
              hic quisquam placeat in sequi libero. Et quibusdam quod a ducimus
              alias qui eaque blanditiis ut voluptates quia in excepturi
              voluptate et dignissimos voluptas id esse possimus. Lorem ipsum
              dolor sit amet. Qui dolorem quia ea fugiat quia ut voluptas autem
              et pariatur Quis non eaque rerum eos iste ipsum id quibusdam
              molestiae! Hic quos fugit et soluta quam sed suscipit recusandae
              rem explicabo nulla. Aut quis quasi in aliquid mollitia est totam
              aperiam cum velit cupiditate eum autem eveniet? Est molestiae
              dolor 33 voluptatem nulla eum illo commodi ab sint vitae. Et
              exercitationem magni et consequuntur nisi rem similique rerum hic
              delectus ipsum qui facere eaque. Et voluptas natus ut architecto
              sequi qui laborum consequatur ut voluptas Quis ea fugiat illo aut
              explicabo voluptas sed repellat fugit! Est eligendi soluta quo
              consequatur fugiat sit fugiat ullam non quos odio 33 dicta
              deserunt. Hic maiores nulla aut soluta nihil est dolorem aliquid
              id molestiae fugit quo distinctio voluptatem et nobis voluptatum
              laudantium voluptas. Ut quisquam quia aut enim suscipit sit iure
              laborum At necessitatibus nulla? Eos aliquam vero sed recusandae
              possimus vero suscipit ut molestias doloremque hic quisquam
              placeat in sequi libero. Et quibusdam quod a ducimus alias qui
              eaque blanditiis ut voluptates quia in excepturi voluptate et
              dignissimos voluptas id esse possimus. Lorem ipsum dolor sit amet.
              Qui dolorem quia ea fugiat quia ut voluptas autem et pariatur Quis
              non eaque rerum eos iste ipsum id quibusdam molestiae! Hic quos
              fugit et soluta quam sed suscipit recusandae rem explicabo nulla.
              Aut quis quasi in aliquid mollitia est totam aperiam cum velit
              cupiditate eum autem eveniet? Est molestiae dolor 33 voluptatem
              nulla eum illo commodi ab sint vitae. Et exercitationem magni et
              consequuntur nisi rem similique rerum hic delectus ipsum qui
              facere eaque. Et voluptas natus ut architecto sequi qui laborum
              consequatur ut voluptas Quis ea fugiat illo aut explicabo voluptas
              sed repellat fugit! Est eligendi soluta quo consequatur fugiat sit
              fugiat ullam non quos odio 33 dicta deserunt. Hic maiores nulla
              aut soluta nihil est dolorem aliquid id molestiae fugit quo
              distinctio voluptatem et nobis voluptatum laudantium voluptas. Ut
              quisquam quia aut enim suscipit sit iure laborum At necessitatibus
              nulla? Eos aliquam vero sed recusandae possimus vero suscipit ut
              molestias doloremque hic quisquam placeat in sequi libero. Et
              quibusdam quod a ducimus alias qui eaque blanditiis ut voluptates
              quia in excepturi voluptate et dignissimos voluptas id esse
              possimus. Lorem ipsum dolor sit amet. Qui dolorem quia ea fugiat
              quia ut voluptas autem et pariatur Quis non eaque rerum eos iste
              ipsum id quibusdam molestiae! Hic quos fugit et soluta quam sed
              suscipit recusandae rem explicabo nulla. Aut quis quasi in aliquid
              mollitia est totam aperiam cum velit cupiditate eum autem eveniet?
              Est molestiae dolor 33 voluptatem nulla eum illo commodi ab sint
              vitae. Et exercitationem magni et consequuntur nisi rem similique
              rerum hic delectus ipsum qui facere eaque. Et voluptas natus ut
              architecto sequi qui laborum consequatur ut voluptas Quis ea
              fugiat illo aut explicabo voluptas sed repellat fugit! Est
              eligendi soluta quo consequatur fugiat sit fugiat ullam non quos
              odio 33 dicta deserunt. Hic maiores nulla aut soluta nihil est
              dolorem aliquid id molestiae fugit quo distinctio voluptatem et
              nobis voluptatum laudantium voluptas. Ut quisquam quia aut enim
              suscipit sit iure laborum At necessitatibus nulla? Eos aliquam
              vero sed recusandae possimus vero suscipit ut molestias doloremque
              hic quisquam placeat in sequi libero. Et quibusdam quod a ducimus
              alias qui eaque blanditiis ut voluptates quia in excepturi
              voluptate et dignissimos voluptas id esse possimus.
            </p>
          </Modal.Description>
        </Modal.Content>

        <Grid className="model--headr">
          <Grid.Column floated="left" width={10}></Grid.Column>
          <Grid.Column
            floated="right" 
            className="text-right"
            width={5}
            style={{ textAlign: "right" }}
          >
            <p
              className="model--close-icon"
              style={{ color: "#a5a5a5" }}
              onClick={() => props.setViewEduOpen(false)}
            >
              CERAR
            </p>
          </Grid.Column>
        </Grid>
      </Modal>
    </div>
  );
}
