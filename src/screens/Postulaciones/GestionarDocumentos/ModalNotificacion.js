import React from "react";
import { Modal, Form } from "semantic-ui-react";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import Inputs from "../../../components/Input";

export default function ModalNotificacion({ openModal, closeModal, actionButton }) {
  return (
    <Modal centered={false} open={openModal} onClose={closeModal}>
      <Modal.Header>Notificación</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label className="font-size-12px font-color-4B4B4B">Digite el número de días</label>
              <Inputs placeHolder="Digite el número de días" />
            </Form.Field>
            <Form.Field>
              <label className="font-size-12px font-color-4B4B4B">Fecha inicial subsanación</label>
              <Inputs placeHolder="" />
            </Form.Field>
            <Form.Field>
              <label className="font-size-12px font-color-4B4B4B">Fecha final subsanación</label>
              <Inputs placeHolder="" />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <ButtonPrimary labelButton="Enviar Notificaciones Subsanación" actionButton={actionButton} />
      </Modal.Actions>
    </Modal>
  );
}
