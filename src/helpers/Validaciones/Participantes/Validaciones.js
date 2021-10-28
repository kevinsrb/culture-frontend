import * as Yup from 'yup';

export const  PersonaNaturalSchema = Yup.object().shape({
    tipo_identificacion: Yup.string().required("El tipo de identificacion es requerido"),
    numero_documento: Yup.number().required("El numero de identificacion es requerido"),
    primer_nombre: Yup.string().required("El primer nombre es requerido"),
    primer_apellido: Yup.string().required("El primer apellido es requerido"),
    fecha_nacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
    sexo: Yup.string().required("El sexo es requerido"),
    pais_residencia: Yup.string().required("El pais es requerido"),
    telefono_fijo: Yup.number().required("El telefono es requerido"),
    telefono_celular: Yup.number().required("El telefono celular es requerido")
});

