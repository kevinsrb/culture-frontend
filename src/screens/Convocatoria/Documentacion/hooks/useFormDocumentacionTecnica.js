import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import documentosTecnicosServices from "../../../../services/convocatorias/documentosTecnicosServices";
import { ObjNotificaciones } from "../../../../config/utils/notificaciones.utils";
import { edicionConvocatoria, idConvocatorias } from "../../../../store/actions/convocatoriaAction";

export const useFormDocumentacionTecnica = () => {
  const [principalState, setPrincipalState] = useState(initialValues);

  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);

  const history = useHistory();
  const dispatch = useDispatch();
  

   const cargarDocumentosTecnicos = async () => {
    let array = [];
    if (editarConvocatoria !== undefined) {
      const { data } = await documentosTecnicosServices.getDocumentosTecnicos(idConvocatoria);
      if (data.documentos === null) return;
      for (var i in data.documentos) {
        if (data.documentos[i].tipo_documento_id === 1) {
          data.documentos[i].index = i;
          array.push(data.documentos[i]);
        }
      }
      console.log(array, 'aqui');
      return setPrincipalState({ ...principalState, documentacion: array });
    }
  };


  const agregarFila = () => {
    let array = [];
    if (!principalState.editar) {
      console.log("esta agregando");
      array = [
        ...principalState.documentacion,
        {
          index: principalState.documentacion.length,
          tipo_documento: principalState.tipo_documento,
          url_documento: principalState.url_documento,
          descripcion: principalState.descripcion,
          activo: principalState.activo,
        },
      ];
      return setPrincipalState({
        ...principalState,
        tipo_documento: "",
        descripcion: "",
        documentacion: array,
        filename: "",
        url_documento: "",
        editar: false,
      });
    }



    let documentacionJSON = JSON.parse(JSON.stringify(principalState.documentacion));
    console.log(principalState.index)
    console.log(documentacionJSON)
    documentacionJSON[principalState.index].tipo_documento = principalState.tipo_documento;
    documentacionJSON[principalState.index].url_documento = principalState.url_documento;
    documentacionJSON[principalState.index].descripcion = principalState.descripcion;
    documentacionJSON[principalState.index].activo = principalState.activo;

    return setPrincipalState({
      ...principalState,
      tipo_documento: "",
      descripcion: "",
      documentacion: documentacionJSON,
      filename: "",
      url_documento: "",
      editar: false,
    });
  };

  const editardocumentacion = (data) => {

    return setPrincipalState({
      ...principalState,
      index: data.index,
      descripcion: data.descripcion,
      tipo_documento: data.tipo_documento,
      url_documento: data.url_documento,
      filename: data.url_documento,
      editar: true,
    });
  };

  const verDocumentacion = async (documento) => {

    

    const {data}  = await documentosTecnicosServices.getArchivo(documento.url_documento);
    console.log(data)

    
    if(data){
        let mimetype;
        let tipo = documento.url_documento.split(".");
        var file, fileURL;
        switch (tipo[1]) {
          case "pdf":
            mimetype = "application/pdf";
            file = new Blob([data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "docx":
            mimetype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            file = new Blob([data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "xlsx":
            mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            file = new Blob([data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          case "ppt":
            mimetype = "application/vnd.ms-powerpoint";
            file = new Blob([data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
          default:
            mimetype = "application/pdf";
            file = new Blob([data], {
              type: mimetype,
            });
            fileURL = URL.createObjectURL(file);
            break;
        }

        console.log(principalState.openModalViewer, 'cvxdc')

        return setPrincipalState({
          ...principalState,
          pdf: fileURL,
          namepdf: data.url_documento,
          openModalViewer: !principalState.openModalViewer,
        });
    }
    
  };

  const eliminarDocumentacion = async (data) => { 
    let array = [];
    let copy = principalState.documentacion.map((data) => data);
    array = copy.filter((doc) => doc.index !== data.index);
    return setPrincipalState({ ...principalState, documentacion: array });
  };

  const guardarArchivo = async (e) => {
 
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("archivo", file);

      console.log(formData)

     await documentosTecnicosServices.postArchivo(formData);

      return setPrincipalState({
        ...principalState,
        url_documento: e.target.files[0].name,
        file: e.target.files[0],
        filename: e.target.files[0].name,
        tipo_documento_file: e.target.files[0].type,
      });
    }
  };

  const backComponente = () => {
    dispatch(edicionConvocatoria(true));
    dispatch(idConvocatorias(idConvocatoria));
    return history.push("/Administrador/documentos");
  };

  let conteoDocumentosTecnicos = 0;
  const handelAsociarDocumentosTecnicos = async () => {
    let idconvocatoria = idConvocatoria;
    if (principalState.documentacion.length === 0) {
      return console.error("NO HAY NINGUN DOCUMENTO ASOCIADO");
    }
    if (principalState.documentacion[conteoDocumentosTecnicos]) {
      console.log(principalState.documentacion)
      try {
        let tipo_documento_id = 1;
        if (editarConvocatoria !== undefined) {
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos/editar`, {
            idconvocatoria,
            descripcion: principalState.documentacion[conteoDocumentosTecnicos].descripcion,
            url_documento: principalState.documentacion[conteoDocumentosTecnicos].url_documento,
            activo: principalState.documentacion[conteoDocumentosTecnicos].activo,
            tipo_documento: principalState.documentacion[conteoDocumentosTecnicos].tipo_documento,
            tipo_documento_id,
          });
        } else {
          await axios.post(`${process.env.REACT_APP_SERVER_CONV}documentos/documentosTecnicos`, {
            idconvocatoria,
            descripcion: principalState.documentacion[conteoDocumentosTecnicos].descripcion,
            url_documento: principalState.documentacion[conteoDocumentosTecnicos].url_documento,
            activo: principalState.documentacion[conteoDocumentosTecnicos].activo,
            tipo_documento: principalState.documentacion[conteoDocumentosTecnicos].tipo_documento,
            tipo_documento_id,
          });
        }
        conteoDocumentosTecnicos++;
        console.log(conteoDocumentosTecnicos)
        return handelAsociarDocumentosTecnicos();
      } catch (error) {
        return console.error(error);
      }
    }
    await ObjNotificaciones.MSG_SUCCESS("success", "Se Han asociado los documentos correctamente");
    history.push("/Administrador/documentacionConvocatoria");
  };



  
  return {
    cargarDocumentosTecnicos,
    agregarFila,
    editardocumentacion,
    verDocumentacion,
    eliminarDocumentacion,
    guardarArchivo,
    backComponente,
    handelAsociarDocumentosTecnicos,
    principalState,
    setPrincipalState
  }


};

const initialValues = {
    tipo_documento: "",
    descripcion: "",
    activo: false,
    documentacion: [],
    existedocumentos: [],
    editar: false,
    filename: "",
    file: "",
    pdf: "",
    namepdf: "",
    url_documento: "",
    tipo_documento_file: "",
    openModalViewer: "",
    conteodescripcion: "0/250",
    index: 0,
  };