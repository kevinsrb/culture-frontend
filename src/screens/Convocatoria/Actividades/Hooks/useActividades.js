import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConvocatorias from "../../../../api/api-convocatorias";
import { ObjNotificaciones } from "../../../../config/utils/notificaciones.utils";

export const useActividades = () => {

    const { idConvocatoria } = useSelector((state) => state.convocatoria);
    const { editarConvocatoria } = useSelector((state) => state.edicion);

    const history = useHistory()

    const [actividades, setActividades] = useState([]);
    const [actividadesGet, setActividadesGet] = useState([]);

    const defaultCheckedList = ['Apertura', 'Resolución de otorgamiento', 'Cierre'];

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const getActividadesConvocatoria = async () => {
        if (editarConvocatoria) {
            try {
                const { data } = await apiConvocatorias.getConvocatoriaById(idConvocatoria)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < actividades.length);
        setCheckAll(list.length === actividades.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? actividades : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const handleSubmit = async () => {
        let array = defaultCheckedList.map(data => {
            let filter = checkedList.filter(check => check === data);
            if (checkedList.filter(check => check === data).length === 0) {
                return true
            }
            return false;
        })

        if (array.includes(true) > 0) {
            return console.log('No te envies')
        }

        let objActividades = checkedList.map(x => {
            let actividad = actividadesGet.find(a => a.nombre === x);
            return actividad;
        })

        try {
            const data = await apiConvocatorias.postActividades(idConvocatoria, objActividades);
            ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
            history.push("/Administrador/cronograma");
        } catch (error) {
            console.log(error)
        }

    }


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
        actividadesGet,
        indeterminate,
        onCheckAllChange,
        checkAll,
        checkedList,
        onChange,
        handleSubmit,
        getActividadesConvocatoria
    }
}
