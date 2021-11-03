import { useState } from 'react'
import { useHistory } from 'react-router';
import apiConvocatorias from '../../../../api/api-convocatorias';
import { ObjNotificaciones } from '../../../../config/utils/notificaciones.utils';

export const useFormConvocatoria = () => {

    const participantes = [
        { id: 1, name: 'Persona natural' },
        { id: 2, name: 'Persona juridica' },
        { id: 3, name: 'Grupo conformado' },
    ];

    const [categoriasLinea, setcategoriasLinea] = useState([]);
    const history = useHistory();


    const [lineaConvocatorias, setLineaConvocatorias] = useState([]);
    const getLineaConvocatorias = async () => {
        try {
            const { data } = await apiConvocatorias.getLineaConvocatorias();
            const optionsLineaConvocatorias = data.map(lc => {
                return {
                    id: lc.idlineaconvocatoria,
                    name: lc.nombre
                }
            })
            setLineaConvocatorias(optionsLineaConvocatorias);
        } catch (error) {
            console.log(error);
        }
    }

    const [categoriasLC, setcategoriasLC] = useState([])
    const [isDisabledCategorias, setIsDisabledCategorias] = useState(true);
    const handleLineaConvocatoriaChange = async (value) => {
        try {
            const { data } = await apiConvocatorias.getCategoriasLineaConvocatoria(value);
            const optionCategorias = data.map(clc => {
                return {
                    id: clc.idcategorialineaconvocatoria,
                    name: clc.nombre
                }
            })
            setcategoriasLC(optionCategorias);
        } catch (error) {
            console.log(error);
        }
        setIsDisabledCategorias(false);
    }

    const [isEconomico, setIsEconomico] = useState(false);
    const handleTipoEstimuloChange = (value) => {
        if (value == 'Económico') {
            setIsEconomico(true);
        } else {
            setIsEconomico(false);
        }
    }

    const [isBolsaConcursable, setIsBolsaConcursable] = useState(false);
    const handleBolsaConcursableChange = (value) => {
        setIsBolsaConcursable(value);
    }




    // ENVIO FORMULARIO
    const handleConvocatoriaSubmit = async(values) => {
        let categoriasConvocatoria = values.categoria_linea_convocatoria.map(x => {
            let filtrado = categoriasLC.filter(data => data.id === x)
            return {
                value: filtrado[0].id,
                text: filtrado[0].name,
            }
        })
        let areas = values.area.map( x => {
            return {
                value: x,
                text: x
            }
        })
        let tipoParticipante = values.tipo_participante.map(x => {
            let filtrado = participantes.filter(data => data.id === x)
            return {
                value: filtrado[0].id,
                text: filtrado[0].name,
            }
        })
        values.categoria_linea_convocatoria = categoriasConvocatoria;
        values.area = areas;
        values.tipo_participante = tipoParticipante;
        try {
           const data =  await apiConvocatorias.postConvocatoria(values);
           ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
           history.push("/Administrador/cronogramaActividades");
        } catch (error) {
            console.log(error)
        }
    }

    return {
        lineaConvocatorias,
        getLineaConvocatorias,
        categoriasLC,
        isDisabledCategorias,
        handleLineaConvocatoriaChange,
        handleTipoEstimuloChange,
        isEconomico,
        handleBolsaConcursableChange,
        isBolsaConcursable,
        handleConvocatoriaSubmit
    }
}
