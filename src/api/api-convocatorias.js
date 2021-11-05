import { BaseConvocatoriaService } from "./baseApiConvocatorias";

export class ConvocatoriasService extends BaseConvocatoriaService {


    async postConvocatoria ( values ) {
        try {
            const { data } = await this.axiosClient.post(`${process.env.REACT_APP_SERVER_CONV}convocatorias`, values);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

    async getConvocatoriaById( idConvocatoria ) {
        try {
            const { data } = await this.axiosClient.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in getConvocatoriaById with stack: ${error}`);
        }
    }

    async getLineaConvocatorias () {
        try {
            const { data } = await this.axiosClient.get(`${this.baseAPI}convocatorias/lineasConvocatorias`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in getLineaConvocatorias with stack: ${error}`);
        }
    }


    async getCategoriasLineaConvocatoria ( value ) {
        try {
            const { data } = await this.axiosClient.get(`${this.baseAPI}convocatorias/lineasConvocatorias/${value}`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in getCategoriasLineaConvocatoria with stack: ${error}`);
        }
    }

    async editConvocatoria ( idConvocatoria, value ) {
        try {
            const { data } = await this.axiosClient.post(`${this.baseAPI}convocatorias/${idConvocatoria}`, value);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in postConvocatoria with stack: ${error}`);
        }
    }

    async getActividades () {
        try {
            const { data } = await this.axiosClient.get(`${this.baseAPI}actividades`);
            return data
        } catch (error) {
            throw new Error(`An unhandled exception in getActividades with stack: ${error}`);
        }
    }
}

export default new ConvocatoriasService();