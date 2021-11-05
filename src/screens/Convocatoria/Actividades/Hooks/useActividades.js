import { useState } from "react";
import { useSelector } from "react-redux";
import apiConvocatorias from "../../../../api/api-convocatorias";

export const useActividades = () => {

    const { idConvocatoria } = useSelector((state) => state.convocatoria);
    const { editarConvocatoria } = useSelector((state) => state.edicion);

    const [actividades, setActividades] = useState([]);
    const [actividadesGet, setActividadesGet] = useState([]);

    const getActividades = async () => {
        try {
            const { data } = await apiConvocatorias.getActividades();
            
            const actividadesmap = data.map(ds => {
                return ds.nombre
            })


            // let todoJSON = JSON.parse(JSON.stringify(actividadesmap));
            // for (let i in todoJSON) {
            //     if (
            //         todoJSON[i].nombre.trim() === "Apertura" ||
            //         todoJSON[i].nombre.trim() === "Cierre" ||
            //         todoJSON[i].nombre.trim() === "Resolución de otorgamiento"
            //     ) {
            //         todoJSON[i].check = !todoJSON[i].check;
            //     }
            // }
            setActividades(actividadesmap);
            setActividadesGet(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getActividades,
        actividades,
        actividadesGet
    }
}
