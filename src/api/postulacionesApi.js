import axios from "axios";

const PostulacionesApi = {
    async getPostulaciones() {
        try {
           let response = await axios.get(`${process.env.REACT_APP_SERVER_PART}participantes/`); 
           return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}

export default PostulacionesApi;