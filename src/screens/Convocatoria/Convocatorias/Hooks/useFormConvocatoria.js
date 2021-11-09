  import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConvocatorias from "../../../../api/api-convocatorias";
import { ObjNotificaciones } from "../../../../config/utils/notificaciones.utils";

export const useFormConvocatoria = () => {
  const [convocatoria, setConvocatoria] = useState(initialValues);
  const [errores_style, setErrores_style] = useState(initialStateErrores);
  const [isDisabledForm, setIsDisabledForm] = useState(true);

  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  // useState

  const participantes = [
    { id: 1, name: "Persona natural" },
    { id: 2, name: "Persona juridica" },
    { id: 3, name: "Grupo conformado" },
  ];

  const [categoriasLinea, setcategoriasLinea] = useState([]);
  const history = useHistory();

  const [lineaConvocatorias, setLineaConvocatorias] = useState([]);
  const getLineaConvocatorias = async () => {
    try {
      const { data } = await apiConvocatorias.getLineaConvocatorias();
      const optionsLineaConvocatorias = data.map((lc) => {
        return {
          id: lc.idlineaconvocatoria,
          name: lc.nombre,
        };
      });
      setLineaConvocatorias(optionsLineaConvocatorias);
    } catch (error) {
      console.log(error);
    }
  };

  const [categoriasLC, setcategoriasLC] = useState([]);
  const [isDisabledCategorias, setIsDisabledCategorias] = useState(true);
  const [isEconomico, setIsEconomico] = useState(false);
  const [isBolsaConcursable, setIsBolsaConcursable] = useState(false);


  const getConvocatoria = async (idConvocatoria, user, editarConvocatoria) => {
    // debugger;
    try {
      if (editarConvocatoria) {
        const { data } = await apiConvocatorias.getConvocatoriaById(idConvocatoria);
        if (data.tipo_estimulo === "Económico") {
          setIsEconomico(true);
          if (data.bolsa_concursable) {
            setIsBolsaConcursable(true);
          }
        }
        const categorias = await apiConvocatorias.getCategoriasLineaConvocatoria(data.linea_convocatoria);
        const optionCategorias = categorias.data.map((clc) => {
          return {
            id: clc.idcategorialineaconvocatoria,
            name: clc.nombre,
          };
        });
        data.categoria_linea_convocatoria = data.categoria_linea_convocatoria.map((x) => {
          let array = [];
          array.push(x.value);
          let arrayConcat = array.concat(array);
          return arrayConcat[0];
        });
        data.tipo_participante = data.tipo_participante.map((x) => {
          let array = [];
          array.push(x.value);
          let arrayConcat = array.concat(array);
          return arrayConcat[0];
        });
        data.area = data.area.map((x) => {
          let array = [];
          array.push(x.value);
          let arrayConcat = array.concat(array);
          return arrayConcat[0];
        });
        // console.log(data)
        // debugger
        setcategoriasLC(optionCategorias);
        setConvocatoria({
          ...data,
          error: {
            descripcion_corta_style: "",
            noparticipa_style: "",
            perfil_participante_style: "",
          },
          alterno: {
            nombre_convocatoria: true,
            linea_convocatoria: true,
            categoria_linea_convocatoria: true,
            tipo_participante: true,
            ciclo: true,
            linea_estrategica: true,
            area: true,
            cobertura: true,
            modalidad: true,
            tipo_estimulo: true,
          }
        });
        setIsDisabledForm(false);
      } else {
        setConvocatoria(initialValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'nombre_convocatoria') {
      setConvocatoria({
        ...convocatoria,
        [name]: value,
        alterno: {
          ...convocatoria.alterno,
          [name]: value == '' ? false : true
        }
      });

      convocatoria.alterno[name] = value == '' ? false : true

      let array = Object.values(convocatoria.alterno);
      if (array.filter(data => data === false).length === 0) {
        setIsDisabledForm(false);
      }

      return;
    }

    setConvocatoria({
      ...convocatoria,
      [name]: value,
    });

    convocatoria.alterno[name] = value;

    let array = Object.values(convocatoria.alterno);
    if (array.filter(data => data === false).length === 0) {
      setIsDisabledForm(false);
    } else {
      setIsDisabledForm(true);
    }

  };

  const handleSelectChange = async (value, name) => {
    if (name == 'linea_convocatoria') {
      try {
        const { data } = await apiConvocatorias.getCategoriasLineaConvocatoria(value);
        const optionCategorias = data.map((clc) => {
          return {
            id: clc.idcategorialineaconvocatoria,
            name: clc.nombre,
          };
        });
        setcategoriasLC(optionCategorias);
      } catch (error) {
        console.log(error);
      }
      setIsDisabledCategorias(false);
      setConvocatoria({
        ...convocatoria,
        [name]: value,
        alterno: {
          ...convocatoria.alterno,
          [name]: true
        }
      })

      convocatoria.alterno[name] = value;
      let array = Object.values(convocatoria.alterno);
      if (array.filter(data => data === false).length === 0) {
        setIsDisabledForm(false);
      } else {
        setIsDisabledForm(true);
      }

      return;
    }

    if (name == 'tipo_participante' || name == 'categoria_linea_convocatoria' || name == 'area') {
      setConvocatoria({
        ...convocatoria,
        [name]: value,
        alterno: {
          ...convocatoria.alterno,
          [name]: value.length == 0 ? false : true
        }
      })

      convocatoria.alterno[name] = value.length == 0 ? false : true;
      let array = Object.values(convocatoria.alterno);
      if (array.filter(data => data === false).length === 0) {
        setIsDisabledForm(false);
      } else {
        setIsDisabledForm(true);
      }

      return;
    }

    if (name == 'ciclo' || name == 'linea_estrategica' || name == 'cobertura' || name == 'modalidad' || name == 'tipo_estimulo') {
      // debugger
      if (name == 'tipo_estimulo') {
        if (value == 'Económico') {
          setIsEconomico(true);
        } else {
          setIsEconomico(false);
        }
      }

      setConvocatoria({
        ...convocatoria,
        [name]: value,
        alterno: {
          ...convocatoria.alterno,
          [name]: value == '' ? false : true
        }
      })

      convocatoria.alterno[name] = value == '' ? false : true
      let array = Object.values(convocatoria.alterno);
      if (array.filter(data => data === false).length === 0) {
        setIsDisabledForm(false);
      } else {
        setIsDisabledForm(true);
      }

      return;
    }

    if (name == 'bolsa_concursable') {
      if(value){
        setIsBolsaConcursable(true)
      } else {
        setIsBolsaConcursable(false)

      }
    }

    if (name == 'tipo_estimulo') {
      if (value == 'Económico') {
        setIsEconomico(true);
      } else {
        setIsEconomico(false);
      }
    }

    setConvocatoria({
      ...convocatoria,
      [name]: value,
    })

    convocatoria.alterno[name] = value;
    let array = Object.values(convocatoria.alterno);
    if (array.filter(data => data === false).length === 0) {
      setIsDisabledForm(false);
    } else {
      setIsDisabledForm(true);
    }
  }

  // ENVIO FORMULARIO
  const handleConvocatoriaSubmit = async () => {
    let error = {
      ...convocatoria.error,
      errorstate: false,
    }
    if (convocatoria.descripcion_corta == '') {
      error.descripcion_corta_style = "ant-form-item-has-error"
      error.errorstate = true
      // setConvocatoria({ ...convocatoria, error: { ...convocatoria.error, descripcion_corta_style: "ant-form-item-has-error" } })
    }
    if (convocatoria.noparticipa == '') {
      error.noparticipa_style = "ant-form-item-has-error"
      error.errorstate = true
      // setConvocatoria({ ...convocatoria, error: { ...convocatoria.error, noparticipa_style: "ant-form-item-has-error" } })
    }
    if (convocatoria.perfil_participante == '') {
      error.perfil_participante_style = "ant-form-item-has-error"
      error.errorstate = true
      // setConvocatoria({ ...convocatoria, error: { ...convocatoria.error, perfil_participante_style: "ant-form-item-has-error" } })
    }
    if (convocatoria.modalidad == '') {
      error.modalidad_style = "ant-form-item-has-error"
      error.errorstate = true
      // setConvocatoria({ ...convocatoria, error: { ...convocatoria.error, perfil_participante_style: "ant-form-item-has-error" } })
    }
    if (error.errorstate) {
      setConvocatoria({ ...convocatoria, error })
    }
    let categoriasConvocatoria = convocatoria.categoria_linea_convocatoria.map((x) => {
      let filtrado = categoriasLC.filter((data) => data.id === x);
      return {
        value: filtrado[0].id,
        text: filtrado[0].name,
      };
    });
    let areas = convocatoria.area.map((x) => {
      return {
        value: x,
        text: x,
      };
    });
    let tipoParticipante = convocatoria.tipo_participante.map((x) => {
      let filtrado = participantes.filter((data) => data.id === x);
      return {
        value: filtrado[0].id,
        text: filtrado[0].name,
      };
    });
    convocatoria.categoria_linea_convocatoria = categoriasConvocatoria;
    convocatoria.area = areas;
    convocatoria.tipo_participante = tipoParticipante;
    try {
      if (editarConvocatoria !== undefined) {
        const data = await apiConvocatorias.editConvocatoria(idConvocatoria, convocatoria);
        ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        return history.push("/Administrador/cronogramaActividades");
      }

      const data = await apiConvocatorias.postConvocatoria(convocatoria);
      ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
      history.push("/Administrador/cronogramaActividades");
      // console.log(convocatoria)
    } catch (error) {
      console.log(error);
    }
  };

  return {
    lineaConvocatorias,
    getLineaConvocatorias,
    categoriasLC,
    isDisabledCategorias,
    isEconomico,
    isBolsaConcursable,
    handleConvocatoriaSubmit,
    getConvocatoria,
    convocatoria,
    handleInputChange,
    setConvocatoria,
    errores_style,
    isDisabledForm,
    setIsDisabledForm,
    handleSelectChange
  };
};

const initialValues = {
  nombre_convocatoria: "",
  linea_convocatoria: null,
  categoria_linea_convocatoria: [],
  entidad: "SCC",
  tipo_participante: [],
  pseudonimo: false,
  ciclo: null,
  linea_estrategica: null,
  area: [],
  cobertura: null,
  esconvenio: false,
  menor_edad: false,
  modalidad: null,
  tipo_estimulo: null,
  descripcion_corta: "",
  noparticipa: "",
  perfil_participante: "",
  valor_total_entg: 0,
  bolsa_concursable: false,
  num_estimulos: 0,
  error: {
    descripcion_corta_style: "",
    noparticipa_style: "",
    perfil_participante_style: "",
    modalidad_style: "",
  },
  alterno: {
    nombre_convocatoria: false,
    linea_convocatoria: false,
    categoria_linea_convocatoria: false,
    tipo_participante: false,
    ciclo: false,
    linea_estrategica: false,
    area: false,
    cobertura: false,
    tipo_estimulo: false,
  }
};

const initialStateErrores = {
  descripcion_corta_style: "",
  noparticipa_style: "",
  perfil_participante_style: "",
}