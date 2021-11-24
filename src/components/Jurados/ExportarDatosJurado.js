import React, { useState } from "react";
import { Button, Divider, Header, Icon, Modal } from "semantic-ui-react";
import { Select, Checkbox } from "antd";

const { Option } = Select;

export const ExportarDatosJurado = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        centered={false}
        closeIcon={
          <Icon
            name="x"
            style={{
              color: "#9F0505",
              position: "absolute",
              right: 20,
              top: 25,
              cursor: "pointer",
            }}
          />
        }
        trigger={
          <Button className="btn" primary>
            Exportar datos de jurado
          </Button>
        }
      >
        <Modal.Header>Exportar datos de jurados</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header size="small" as="h2">
              Estado de postulación
            </Header>
            <Divider />
            <Select defaultValue="" style={{ width: "200px" }}>
              <Option value="Todos">Todos</Option>
              <Option value="Postulados">Postulados</Option>
              <Option value="Aceptados">Aceptados</Option>
              <Option value="No responden">No responden</Option>
              <Option value="Rechazaron">Rechazaron</Option>
            </Select>
            <Header size="small" as="h2">
              Seleccionar formatos
            </Header>
            <Divider />
            <Checkbox.Group
              style={{ display: "flex" }}
              options={[".PDF", ".XLS"]}
              defaultValue={[]}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button className="btn" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button className="btn" primary onClick={() => setOpen(false)}>
            Descargar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
