import { useState } from "react";
import PostulacionesApi from "../../../../api/postulacionesApi";

export const useGestionarPostulaciones = () => {

    const [postulaciones, setPostulaciones] = useState([]);
    const getPostulaciones = async() => {
        try {
            const { participantes } = await PostulacionesApi.getPostulaciones();
            setPostulaciones(participantes);
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
