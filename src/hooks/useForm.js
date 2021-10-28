import { useState } from "react"

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = (event, result) => {
        const { name, value } = result || event.target;
        return setValues({ ...values, [name]: value });
    };

    const setState = (stateActual = {}) => {
        setValues( stateActual );
    }

      return [ values, handleInputChange, setState, reset ];

}