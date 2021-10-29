import { useState } from "react";
import PostulacionesApi from "../../../../api/postulacionesApi";

export const useGestionarPostulaciones = () => {

    

    const [postulaciones, setPostulaciones] = useState([]);
    const getPostulaciones = async() => {
        try {
            const { postulaciones } = await PostulacionesApi.getPostulaciones();
            console.log(postulaciones)
            setPostulaciones(postulaciones);
        } catch (error) {
            console.log(error);
        }
    }

    const [openFilter, setOpenFilter] = useState(false);
    const handleChangeFilter = () => {
        setOpenFilter(!openFilter);
    }

    return {
        openFilter,
        handleChangeFilter,
        getPostulaciones,
        postulaciones
    }
}
