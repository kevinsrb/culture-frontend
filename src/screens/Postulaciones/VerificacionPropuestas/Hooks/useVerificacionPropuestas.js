import { useState } from "react";
import {
    Button
} from "semantic-ui-react";
 
import PostulacionesApi from "../../../../api/postulacionesApi";
export const useVerificacionPropuestas = () => {

    const columns = [
        {
            title: "Propuesta",
            width: 120,
            dataIndex: "id_participante",
            key: "id_participante",
            // fixed: "left",
        },
        {
            title: "Participante",
            width: 120,
            // fixed: "left",
            render: (datos, index) => {
                return `${ datos.primer_nombre } ${ datos.segundo_nombre } ${ datos.primer_apellido } ${ datos.segundo_apellido };`
            },
        },
        {
            title: "Identificación participante",
            width: 200,
            dataIndex: "numero_documento",
            key: "numero_documento",
        },
        {
            title: "Estado",
            width: 100,
            dataIndex: "estado",
            key: "estado",
        },
        {
            title: "Barrio",
            width: 100,
            dataIndex: "barrio",
            key: "barrio",
        },
        {
            title: "Comuna",
            width: 100,
            dataIndex: "comuna",
            key: "comuna",
        },
        {
            title: "Teléfono Fijo",
            width: 150,
            dataIndex: "telefono_fijo",
            key: "telefono_fijo",
        },
        {
            title: "Teléfono Celular",
            width: 169,
            dataIndex: "telefono_celular",
            key: "telefono_celular",
        },
        {
            title: "Pais residencia",
            width: 169,
            dataIndex: "pais_residencia",
            key: "pais_residencia",
        },
        {
            title: "Aceptar propuesta",
            width: 120,
            key: "acciones",
            fixed: "right",
            render: (datos) => (
                <>
                    <Button className="botones-acciones" icon="check" onClick={() => showModal(datos)} />
                </>
            ),
        },
        {
            title: "Rechazar propuesta",
            width: 120,
            key: "acciones",
            fixed: "right",
            render: (datos) => (
                <>
                    <Button className="botones-acciones" icon="trash" />
                </>
            ),
        },
    ];

    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState({})
    const showModal = (datos) => {
        setDatos(datos)
        setOpenModal(true);
    }

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
        postulaciones,
        openModal,
        showModal,
        columns,
        setOpenModal,
        datos
    }

    return {}
}
