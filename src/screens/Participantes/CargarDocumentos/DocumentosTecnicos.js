import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import fileDownload from 'js-file-download';
import { ObjConstanst } from '../../../config/utils/constanst'
import { Container, Card, Header, Button } from 'semantic-ui-react'

export const DocumentosTecnicos = () => {

  const State = {
    tipo_documento: "",
    filename: "",
    file: "",
    descripcion: '',
    url_participante: '',
    tipo_documento_file: "",
  };
  
      const fileInputRef = useRef();


    const { documentos_convocatoria } = useSelector((state) => state.participantes);


    const documentosTecnicos =  documentos_convocatoria.filter(doct => doct.tipo_documento_id == 1)   

    const [documentos, setDocumentos] = useState(documentosTecnicos)
    const [principalState, setPrincipalState] = useState(State);
    console.log(documentos)

    const descargarPlantilla = async ( url_documento, e) => {
      console.log(url_documento)
      
      if(url_documento != undefined){
        await axios.get(`${ObjConstanst.IP_CULTURE}documentos/consultarArchivos/${url_documento}`, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, url_documento);
        });
      }
    }

    const saveFile = async (datos, e) => {     

    const { idconvocatoria, tipo_documento, descripcion } = datos;
    const { name } = e.target.files[0];

    const guardarDocumento = {
      idconvocatoria: idconvocatoria,
      descripcion: descripcion,
      url_participante: name,
      tipo_documento: tipo_documento,
      tipo_documento_id: 3,
    }

    await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos`, guardarDocumento )
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);
      await axios
        .post(`${ObjConstanst.IP_PARTICIPANTES}documentos/guardarArchivo`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((data) => {
          
        })
        .catch(function (error) {
          console.log(error);
        });

        return setPrincipalState({
          ...principalState,
          idconvocatoria: idconvocatoria,
          descripcion: descripcion,
          url_participante: name,
          tipo_documento: tipo_documento,
          tipo_documento_id: 3,
        });
      
    }
  };

    return (
      <Container>
        {documentos.length > 0 ? (
         documentos.map((datos, index) => (
          <Card.Group>
            {
              principalState.url_participante === '' ? (
                <Card className="cards_container">
                  <Card.Content className="cards_content">
                    <Card.Header>
                      {datos.tipo_documento}

                      </Card.Header>

                    <Card.Description>
                      {datos.descripcion}
                      
                    </Card.Description>

              <div className="container_botones">
                {datos.url_documento &&
                  <Header as="h4" floated="left" className="plantilla" onClick={((e) => descargarPlantilla(datos.url_documento, e) )} >
                    Descargar plantilla
                  </Header>
                }

                <Container textAlign="right">
                  <Button 
                  content="Cargar plantilla" 
                  className="btn btn-primary-outline"
                  onClick={() => fileInputRef.current.click()}
                  />
                
                  <input ref={fileInputRef} type="file" hidden onChange={((e) =>  saveFile(datos, e)) } />
                
                  
                </Container>
              </div>

              </Card.Content>
            </Card>
              ): (
                <Card className="cards_container card_archivo_subido">
                  <Card.Content className="cards_content ">
                    <Card.Header>
                      {datos.tipo_documento}

                      </Card.Header>

                    <Card.Description>
                      {datos.descripcion}
                      
                    </Card.Description>

                  <div className="container_botones">
                    {datos.url_documento &&
                      <Header as="h4" floated="left" className="plantilla" onClick={((e) => descargarPlantilla(datos.url_documento, e) )} >
                        Descargar plantilla
                      </Header>
                    }

                    <Container textAlign="right">
                      <Button 
                      content="Cargar plantilla" 
                      className="btn btn-primary-outline"
                      onClick={() => fileInputRef.current.click()}
                      />
                      <input ref={fileInputRef} type="file" hidden onChange={((e) =>  saveFile(datos, e))} />
                    </Container>
                  </div>

                  </Card.Content>
            </Card>
              )
            }
            
          </Card.Group>
        ))
        ) : (
            <span>No hay datos por mostrar</span>
        )}

        <Container textAlign="right">
          <Button 
          content="guardar y continuar" 
          className="btn btn-primary-outline"
          // onClick={() => fileInputRef.current.click()}
          />
        </Container>
      </Container>
    )
}
