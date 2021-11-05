import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConvocatorias from "../../../../api/api-convocatorias";
import { ObjNotificaciones } from "../../../../config/utils/notificaciones.utils";

export const useFormConvocatoria = () => {
  const [convocatoria, setConvocatoria] = useState(initialValues);

  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const { idConvocatoria } = useSelector((state) => state.convocatoria);

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
  const handleLineaConvocatoriaChange = async (value, name) => {
    // setConvocatoria({
    //   ...convocatoria,
    //   [name]: value,
    // });

    if (name == "bolsa_concursable") {
      setIsBolsaConcursable(true);
    }

    if (name == "linea_convocatoria") {
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
    }
  };

  const [isEconomico, setIsEconomico] = useState(false);
  const handleTipoEstimuloChange = (value, name) => {
    setConvocatoria({
      ...convocatoria,
      [name]: value,
    });

    if (value == "Económico") {
      setIsEconomico(true);
    } else {
      setIsEconomico(false);
    }
  };

  const [isBolsaConcursable, setIsBolsaConcursable] = useState(false);
  const handleBolsaConcursableChange = (value, name) => {
    // console.log(value)
    setConvocatoria({
      ...convocatoria,
      [name]: value,
    });
    // setConvocatoria
    // console.log(value, name)
    // debugger
    // console.log({value, name})
    // setConvocatoria({
    //     ...convocatoria,
    //     [name]: value
    // })
    setIsBolsaConcursable(value);
  };

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
        setConvocatoria(data);
      } else {
        setConvocatoria(initialValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setConvocatoria({
      ...convocatoria,
      [name]: value,
    });
  };

  // ENVIO FORMULARIO
  const handleConvocatoriaSubmit = async () => {
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
      debugger
      // console.log(convocatoria)
      if (editarConvocatoria !== undefined) {
        const data = await  apiConvocatorias.editConvocatoria(idConvocatoria, convocatoria);
        ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
        return history.push("/Administrador/cronogramaActividades");
      }
      const data = await apiConvocatorias.postConvocatoria(convocatoria);
      ObjNotificaciones.MSG_SUCCESS("success", data.mensaje);
      history.push("/Administrador/cronogramaActividades");
    } catch (error) {
      console.log(error);
    }
  };

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
    handleConvocatoriaSubmit,
    getConvocatoria,
    convocatoria,
    handleInputChange,
    setConvocatoria,
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
  menoredad: false,
  modalidad: null,
  tipo_estimulo: null,
  descripcion_corta: "",
  noparticipa: "",
  perfil_participante: "",
  valor_total_entg: 0,
  bolsa_concursable: false,
  num_estimulos: 0,
};
