import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Modal, Button, Header, Image } from 'semantic-ui-react'



export const VerConvocatoria = (props) => {

    const history = useHistory();

    const continuar = () =>{
        history.push('/seleccionarRol')
    }

    const [open, setOpen] = useState(false)

    const { numero_convocatoria, descripcion_corta } = props.datos;

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<span className="ver_convocatoria">Ver convocatoria</span>}
        >
      <Modal.Header>{numero_convocatoria}</Modal.Header>
      <Modal.Content image>

        <Modal.Description>
          <p>
            {descripcion_corta}
          </p>
          
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)} className="btn btn-secondary">
          cerrar
        </Button>
        <Button
          onClick={() => setOpen(false)}
          className="btn btn-primary"
          onClick={continuar}
        >Postularme
        </Button>

      </Modal.Actions>
    </Modal>
    )
}
