import axios from "axios";
import { types } from "../types/types";
import { ObjConstanst } from '../../config/utils/constanst'

export const consultarIdConvocatoria = () => {
    return async (dispatch) => {
        const response = await axios.get(`${ObjConstanst.IP_CULTURE}convocatorias/numero`)
        .then(({data}) =>  {
          dispatch(idConvocatorias( data.data ))
        })
        .catch(function (error) {
          
        })
    }
   
}

export const idConvocatorias = (idConvocatoria) => ({
    type: types.idConvocatoria,
    payload:  {
        idConvocatoria,
    }
})

export const edicionConvocatoria = (editarConvocatoria) => ({
    type: types.edicion,
    payload:  {
        editarConvocatoria,
    }
})


