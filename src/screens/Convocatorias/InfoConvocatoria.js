import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { consultarIdConvocatoria, edicionConvocatoria } from "../../store/actions/convocatoriaAction";
import axios from "axios";

import { ObjConstanst } from "../../config/utils/constanst";
import { Form, Grid, Header, Divider, Segment, Button } from "semantic-ui-react";
import {
  LineaEstrategicaOptions,
  CicloOptions,
  CoberturaOptions,
  ModalidadEstimuloOptions,
  EntidadOptions,
  AreaOptions,
  TipoEstimuloOptions,
  NumeroConvocatoiriaOptions,
  QuienParticipaOptions,
} from "../../data/selectOption.data";

//Alertas y notificaciones
import { ObjNotificaciones } from "../../config/utils/notificaciones.utils";

export function InfoConvocatoria() {
  const objConvocatoria = {
    numero_convocatoria: "",
    linea_convocatoria: "",
    categoria_linea_convocatoria: [],
    entidad: "",
    pseudonimos: false,
    tipo_participante: [],
    cobertura: "",
    ciclo: "",
    linea_estrategica: "",
    area: [],
    convenido: false,
    modalidad: "",
    tipo_estimulo: "",
    valor_total_entg: 0,
    bolsa_concursable: false,
    num_estimulos: 0,
    descripcion_corta: "",
    perfil_participante: "",
    noparticipa: "",
  };

  const stateErrores = {
    numero_convocatoria: false,
    linea_convocatoria: false,
    categoria_linea_convocatoria: false,
    entidad: false,
    pseudonimos: false,
    tipo_participante: false,
    cobertura: false,
    ciclo: false,
    linea_estrategica: false,
    area: false,
    convenido: false,
    modalidad: false,
    tipo_estimulo: false,
    valor_total_entg: false,
    num_estimulos: false,
  };

  //variables
  let LineaConvocatoriaOptionsMap = {};
  let categoriaslineasconvocatoriaMap;

  //States
  const [convocatoria, setConvocatoria] = useState(objConvocatoria);
  const [lineaConvocatoriaOptions, setlineaConvocatoriaOptions] = useState();
  const [numeroConvocatoria, setNumeroConvocatoria] = useState();
  const [participantesSeleccionados, setParticipantesSeleccionados] = useState([]);
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState([]);
  const [tipoparticipanteseleccionado, setTipoparticipanteseleccionado] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState([]);
  const [errores, setErrores] = useState(stateErrores);

  const history = useHistory();
  const dispatch = useDispatch();
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);

  useEffect(() => {
    cargarSelectLineaConvocatoria();
    // if(idConvocatoria != undefined){
    //   dispatch(consultarIdConvocatoria())
    // }
    
  }, [dispatch]);

  useEffect(() => {
    cargarEdicion();
  }, []);

  const cargarEdicion = async () => {
    console.log(editarConvocatoria);
    if (editarConvocatoria === undefined) {
      return;
    }
    let participantes = [];
    let categorias = [];
    for (var i in editarConvocatoria.tipo_participante) {
      participantes.push(editarConvocatoria.tipo_participante[i].value);
    }
    setTipoparticipanteseleccionado(participantes);
    await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias/${editarConvocatoria.idnumero_convocatoria}`)
      .then(({ data }) => {
        console.log(data);
        categoriaslineasconvocatoriaMap = data.data.map((ds) => {
          return {
            key: ds.idcategorialineaconvocatoria,
            value: ds.idcategorialineaconvocatoria,
            text: ds.nombre,
          };
        });
        setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
      })
      .catch(function (error) {});
    for (var x in editarConvocatoria.categoria_linea_convocatoria) {
      categorias.push(editarConvocatoria.categoria_linea_convocatoria[x].value);
    }
    setTipocategoriasseleccionado(categorias);
    setConvocatoria({
      numero_convocatoria: editarConvocatoria.idnumero_convocatoria,
      linea_convocatoria: editarConvocatoria.linea_convocatoria,
      categoria_linea_convocatoria: editarConvocatoria.categoria_linea_convocatoria,
      entidad: editarConvocatoria.entidad,
      pseudonimos: editarConvocatoria.pseudonimo,
      tipo_participante: editarConvocatoria.tipo_participante,
      cobertura: editarConvocatoria.cobertura,
      ciclo: editarConvocatoria.ciclo,
      linea_estrategica: editarConvocatoria.linea_estrategica,
      area: editarConvocatoria.area,
      convenido: editarConvocatoria.esconvenio,
      modalidad: editarConvocatoria.modalidad,
      tipo_estimulo: editarConvocatoria.tipo_estimulo,
      valor_total_entg: editarConvocatoria.valor_total_entg,
      bolsa_concursable: editarConvocatoria.bolsa_concursable,
      num_estimulos: editarConvocatoria.num_estimulos,
      descripcion_corta: editarConvocatoria.descripcion_corta,
      perfil_participante: editarConvocatoria.perfil_participante,
      noparticipa: editarConvocatoria.noparticipa,
    });
    console.log(convocatoria, tipoparticipanteseleccionado);
  };

  //funciones
  const cargarSelectLineaConvocatoria = async () => {
    const response = await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias`)
      .then(({ data }) => {
        LineaConvocatoriaOptionsMap = data.data.map((ds) => {
          return {
            key: ds.idlineaconvocatoria,
            value: ds.idlineaconvocatoria,
            text: ds.nombre,
          };
        });
        setlineaConvocatoriaOptions(LineaConvocatoriaOptionsMap);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const capturarValoresOptionsMultiple = (event, result, stateActualizar) => {
    let posicion = result.value.length - 1;
    let option = result.options.filter((data) => data.value === result.value[posicion]);
    let array = [];

    if (stateActualizar === "categoria") {
      setErrores({...errores, categoria_linea_convocatoria: false});
      setTipocategoriasseleccionado(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arraycategorias = [];
        for (var i in convocatoria.categoria_linea_convocatoria) {
          for (var x in result.value) {
            if (convocatoria.categoria_linea_convocatoria[i].value === result.value[x])
              arraycategorias.push(convocatoria.categoria_linea_convocatoria[i]);
          }
        }
        return setConvocatoria({ ...convocatoria, categoria_linea_convocatoria: arraycategorias });
      }
      if (option.length === 0) return;
      let repetido = convocatoria.categoria_linea_convocatoria.filter(
        (data) => data.text.trim() === option[0].text.trim()
      );
      if (repetido.length > 0) return;
      array = [...convocatoria.categoria_linea_convocatoria, option[0]];
      return setConvocatoria({ ...convocatoria, categoria_linea_convocatoria: array });
    } else  if (stateActualizar === "tipo_participante" ){
      setErrores({...errores, tipo_participante: false});
      setTipoparticipanteseleccionado(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arrayparticipantes = [];
        for (var i in convocatoria.tipo_participante) {
          for (var x in result.value) {
            if (convocatoria.tipo_participante[i].value === result.value[x])
              arrayparticipantes.push(convocatoria.tipo_participante[i]);
          }
        }
        return setConvocatoria({ ...convocatoria, tipo_participante: arrayparticipantes });
      }
      if (option.length === 0) return;
      let repetido = convocatoria.tipo_participante.filter((data) => data.text.trim() === option[0].text.trim());
      if (repetido.length > 0) return;
      array = [...convocatoria.tipo_participante, option[0]];
      return setConvocatoria({ ...convocatoria, tipo_participante: array });
    }else if(stateActualizar === "area"){
      setErrores({...errores, area: false});
      setAreaSeleccionada(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arrayAreas = [];
        for (var i in convocatoria.area) {
          for (var x in result.value) {
            if (convocatoria.area[i].value === result.value[x])
              arrayAreas.push(convocatoria.area[i]);
          }
        }
        return setConvocatoria({ ...convocatoria, area: arrayAreas });
      }
      if (option.length === 0) return;
      let repetido = convocatoria.area.filter((data) => data.text.trim() === option[0].text.trim());
      if (repetido.length > 0) return;
      array = [...convocatoria.area, option[0]];
      return setConvocatoria({ ...convocatoria, area: array });
    }
  };

  const handleCreateConvocatoria = async (e) => {
    let arrayErrores = stateErrores;
    let error = false;
    if (convocatoria.numero_convocatoria === "") {
      arrayErrores = {
        ...arrayErrores,
        numero_convocatoria: true,
      };
      error = true;
    }
    if (convocatoria.linea_convocatoria === "") {
      arrayErrores = {
        ...arrayErrores,
        linea_convocatoria: true,
      };
      error = true;
    }
    if (convocatoria.categoria_linea_convocatoria.length === 0) {
      arrayErrores = {
        ...arrayErrores,
        categoria_linea_convocatoria: true,
      };
      error = true;
    }
    if (convocatoria.entidad === "") {
      arrayErrores = {
        ...arrayErrores,
        entidad: true,
      };
      error = true;
    }
    if (convocatoria.tipo_participante.length === 0) {
      arrayErrores = {
        ...arrayErrores,
        tipo_participante: true,
      };
      error = true;
    }
    if (convocatoria.cobertura === "") {
      arrayErrores = {
        ...arrayErrores,
        cobertura: true,
      };
      error = true;
    }
    if (convocatoria.ciclo === "") {
      arrayErrores = {
        ...arrayErrores,
        ciclo: true,
      };
      error = true;
    }
    if (convocatoria.linea_estrategica === "") {
      arrayErrores = {
        ...arrayErrores,
        linea_estrategica: true,
      };
      error = true;
    }
    if (convocatoria.area.length === 0) {
      arrayErrores = {
        ...arrayErrores,
        area: true,
      };
      error = true;
    }
    if (convocatoria.modalidad === "") {
      arrayErrores = {
        ...arrayErrores,
        modalidad: true,
      };
      error = true;
    }
    if (convocatoria.tipo_estimulo === "") {
      arrayErrores = {
        ...arrayErrores,
        tipo_estimulo: true,
      };
      error = true;
    }

    if (error) {
      return setErrores(arrayErrores);
    }


    if (editarConvocatoria === undefined) {
      e.preventDefault();
      console.log(convocatoria);
      return await axios
        .post(`${ObjConstanst.IP_CULTURE}convocatorias`, convocatoria)
        .then((data) => {
          console.log(data);
          ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
          history.push("/cronogramaActividades");
        })
        .catch(function (error) {
          //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
        });
    }

    await axios
      .post(`${ObjConstanst.IP_CULTURE}convocatorias/${editarConvocatoria.idconvocatorias}`, convocatoria)
      .then((data) => {
        console.log(data);
        ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
        history.push("/adminconvocatorias");
        dispatch(edicionConvocatoria());
      })
      .catch(function (error) {
        //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
      });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    console.log(value, name);
    setErrores({...errores, [name]: false});
    return setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handleLineaConvocatoria = async (event, results) => {
    const { name, value } = results || event.target;
    setErrores({...errores, linea_convocatoria: false});
    setConvocatoria({ ...convocatoria, [name]: value });
    const response = await axios
      .get(`${ObjConstanst.IP_CULTURE}convocatorias/lineasConvocatorias/${value}`)
      .then(({ data }) => {
        console.log(data);
        categoriaslineasconvocatoriaMap = data.data.map((ds) => {
          return {
            key: ds.idcategorialineaconvocatoria,
            value: ds.idcategorialineaconvocatoria,
            text: ds.nombre,
          };
        });
        setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
      })
      .catch(function (error) {});
  };

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    setConvocatoria({ ...convocatoria, [name]: checked });
  };

  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  return (
    <React.Fragment>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>
          <Form size="large" onSubmit={handleCreateConvocatoria} autoComplete="off">
            <Segment>
              <Header as="h4" floated="right">
               <span className="codigo_convovcatoria"> Codigo de convocatoria #: {idConvocatoria}</span>
              </Header>
              <Header as="h4" floated="left">
                Informacion general - <span className="text_campo_obligatorios">Todos los campos son obligatorios</span>
              </Header>
              <Divider clearing />
              <Form.Group widths="equal">
                <Form.Select
                  placeholder="Seleccionar"
                  label="Número de la convocatoria"
                  options={NumeroConvocatoiriaOptions}
                  name="numero_convocatoria"
                  value={convocatoria.numero_convocatoria.toString()}
                  onChange={handleInputChange}
                  required
                  error={errores.numero_convocatoria}
                />

                <Form.Select
                  placeholder="Seleccionar"
                  label="Línea convocatoria"
                  name="linea_convocatoria"
                  value={convocatoria.linea_convocatoria}
                  onChange={(handleInputChange, handleLineaConvocatoria)}
                  options={lineaConvocatoriaOptions}
                  required
                  error={errores.linea_convocatoria}
                />

                <Form.Dropdown
                  required
                  error={errores.categoria_linea_convocatoria}
                  label="Categorías línea convocatoria"
                  value={tipocategoriasseleccionado}
                  placeholder="Seleccionar"
                  fluid
                  multiple
                  selection
                  name="categoria_linea_convocatoria"
                  options={categoriasLineaconvocatoria}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "categoria")}
                />

                <Form.Select
                  required
                  error={errores.entidad}
                  placeholder="Seleccionar"
                  label="Entidad"
                  options={EntidadOptions}
                  name="entidad"
                  value={convocatoria.entidad}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Dropdown
                      required
                      error={errores.tipo_participante}
                      label="¿Quien puede participar?"
                      placeholder="Seleccionar"
                      value={tipoparticipanteseleccionado}
                      fluid
                      multiple
                      selection
                      name="tipo_participante"
                      options={QuienParticipaOptions}
                      onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "tipo_participante")}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>¿Convocatoria maneja pseudonimos?</label>
                    <Form.Checkbox
                      toggle
                      name="pseudonimos"
                      value={convocatoria.pseudonimos}
                      checked={convocatoria.pseudonimos}
                      onChange={handletoggleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider clearing />

              <Form.Group widths="equal">
                <Form.Dropdown
                  required
                  error={errores.ciclo}
                  label="Ciclo"
                  placeholder="Seleccionar"
                  fluid
                  selection
                  options={CicloOptions}
                  name="ciclo"
                  value={convocatoria.ciclo}
                  onChange={handleInputChange}
                />

                <Form.Dropdown
                  required
                  error={errores.linea_estrategica}
                  label="Linea estrategica"
                  placeholder="Seleccionar"
                  fluid
                  search
                  selection
                  name="linea_estrategica"
                  value={convocatoria.linea_estrategica}
                  options={LineaEstrategicaOptions}
                  onChange={handleInputChange}
                />

                <Form.Dropdown
                  required
                  error={errores.area}
                  label="Área"
                  placeholder="Seleccionar"
                  fluid
                  search
                  selection
                  multiple
                  name="area"
                  value={areaSeleccionada}
                  options={AreaOptions}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "area")}
                />

                <Form.Dropdown
                  required
                  error={errores.cobertura}
                  label="Cobertura"
                  placeholder="Seleccionar"
                  fluid
                  selection
                  options={CoberturaOptions}
                  name="cobertura"
                  value={convocatoria.cobertura}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Divider clearing />

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <strong>¿Es convenio?</strong>
                    <Form.Checkbox
                      toggle
                      name="convenido"
                      checked={convocatoria.convenido}
                      onChange={handletoggleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider clearing />

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Select
                      required
                      error={errores.modalidad}
                      placeholder="Seleccionar"
                      size="large"
                      label="Modalidad de estimulo"
                      value={convocatoria.modalidad}
                      options={ModalidadEstimuloOptions}
                      name="modalidad"
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Form.Group widths="equal">
                <Form.Select
                  required
                  error={errores.tipo_estimulo}
                  placeholder="Seleccionar"
                  label="Tipo de estimulo"
                  options={TipoEstimuloOptions}
                  value={convocatoria.tipo_estimulo}
                  name="tipo_estimulo"
                  onChange={handleInputChange}
                />

                {convocatoria.tipo_estimulo == "economico" && (
                  <>
                    <Form.Input
                      fluid
                      placeholder="Search..."
                      label="Valor total de recursos que entregará la convocatoria"
                      name="valor_total_entg"
                      value={convocatoria.valor_total_entg}
                      onChange={handleInputChange}
                    />

                    <Form.Field>
                      <label>bolsa concursable</label>
                      <Form.Checkbox
                        toggle
                        name="bolsa_concursable"
                        value={convocatoria.bolsa_concursable}
                        checked={convocatoria.bolsa_concursable}
                        onChange={handletoggleChange}
                      />
                    </Form.Field>

                    <Form.Input
                      fluid
                      placeholder="Seleccionar"
                      label="Numero de estimulos"
                      name="num_estimulos"
                      value={convocatoria.num_estimulos}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </Form.Group>

              <Divider clearing />

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.TextArea
                      
                      label="Descripcion corta"
                      name="descripcion_corta"
                      value={convocatoria.descripcion_corta}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.TextArea
                      required
                      label="Perfil de participante"
                      name="perfil_participante"
                      value={convocatoria.perfil_participante}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.TextArea
                      required
                      label="¿Quien no puede participar?"
                      name="noparticipa"
                      value={convocatoria.noparticipa}
                      onChange={handleInputChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <p align="right">
                      <Button type="submit">Guardar y continuar</Button>
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}
