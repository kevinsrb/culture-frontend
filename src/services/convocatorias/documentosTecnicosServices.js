import { BaseConvocatoriaService } from "../../config/axios/baseApiConvocatorias";

export class DocumentosService extends BaseConvocatoriaService {


    async getDocumentosTecnicos (idConvocatoria) {
        try {
            // const { data } = await this.axiosClient.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
            const { data } = await this.axiosClient.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/consultarDocumentosTecnicos/${idConvocatoria}`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

    async getArchivo (url_documento) {
        try {
            const  data  = await this.axiosClient.get(`${process.env.REACT_APP_SERVER_CONV}documentos/consultarArchivos/${url_documento}`,
              {
                responseType: "blob",
              });
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

    async postArchivo (formData) {
        console.log('formData')
        try {
            const { data } = await this.axiosClient.post(`${process.env.REACT_APP_SERVER_CONV}documentos/guardarArchivo`, formData, 
              {
                headers: { "content-type": "multipart/form-data" },
              })
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

    async postDocumentosTecnicos (idConvocatoria, documentos_tecnicos) {
        try {
            const { data } = await this.axiosClient.post(`${process.env.REACT_APP_SERVER_CONV}convocatorias/documentos_tecnicos/${idConvocatoria}`, documentos_tecnicos)
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

}

export default new DocumentosService();