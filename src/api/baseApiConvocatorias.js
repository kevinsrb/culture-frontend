import axios from "axios";

export class BaseConvocatoriaService {
    axiosClient;
    baseAPI;

    constructor() {
        this.initializeConfig();
        this.axiosClient = axios.create();
        this.baseAPI = `${process.env.REACT_APP_SERVER_CONV}`;
    }


    async initializeConfig() {
        this.configAxios();
    }

    configAxios() {
        this.axiosClient = axios.create({
            baseURL: this.baseAPI
        })
    }
}