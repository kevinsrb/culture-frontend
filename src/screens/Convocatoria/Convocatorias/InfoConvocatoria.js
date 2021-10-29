import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edicionConvocatoria } from "../../../store/actions/convocatoriaAction";
import axios from "axios";
import { Form, Grid, Header, Divider, Segment, Button, Icon, Breadcrumb, Dropdown } from "semantic-ui-react";
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
} from "../../../data/selectOption.data";

//Alertas y notificaciones
import { ObjNotificaciones } from "../../../config/utils/notificaciones.utils";

export function InfoConvocatoria() {
  const objConvocatoria = {
    nombre_convocatoria: "",
    linea_convocatoria: "",
    categoria_linea_convocatoria: [],
    entidad: "",
    pseudonimossi: true,
    pseudonimosno: false,
    pseudonimo: true,
    tipo_participante: [],
    cobertura: "",
    ciclo: "",
    linea_estrategica: "",
    area: [],
    conveniosi: false,
    conveniono: true,
    convenido: false,
    modalidad: "",
    tipo_estimulo: "",
    valor_total_entg: 0,
    bolsa_concursable: false,
    num_estimulos: 0,
    descripcion_corta: "",
    perfil_participante: "",
    noparticipa: "",
    mayoredadsi: true,
    mayoredadno: false,
    mayoredad: true,
    conteodescripcion_corta: "0/250",
    conteonoparticipa: "0/250",
    conteoperfil_participante: "0/250",
    usuario: "",
  };

  const stateErrores = {
    nombre_convocatoria: false,
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
  const [categoriasLineaconvocatoria, setCategoriasLineaconvocatoria] = useState([]);
  const [tipoparticipanteseleccionado, setTipoparticipanteseleccionado] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState([]);
  const [tipocategoriasseleccionado, setTipocategoriasseleccionado] = useState([]);
  const [errores, setErrores] = useState(stateErrores);

  const history = useHistory();
  const dispatch = useDispatch();
  const { idConvocatoria } = useSelector((state) => state.convocatoria);
  const { editarConvocatoria } = useSelector((state) => state.edicion);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    cargarSelectLineaConvocatoria();
  }, [dispatch]);

  useEffect(() => {
    cargarEdicion();
  }, []);

  const cargarEdicion = async () => {
    console.log(user);
    console.log(editarConvocatoria);
    if (editarConvocatoria === undefined) {
      return setConvocatoria({ ...convocatoria, usuario_creacion: user.idusuario });
    }
    let participantes = [];
    let categorias = [];
    let areas = [];
    let response = await axios.get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`);
    console.log(response, "este es el response");
    for (var i in response.data.data.tipo_participante) {
      participantes.push(response.data.data.tipo_participante[i].value);
    }
    setTipoparticipanteseleccionado(participantes);
    let lineasconvocatorias = await axios.get(
      `${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${response.data.data.linea_convocatoria}`
    );
    categoriaslineasconvocatoriaMap = lineasconvocatorias.data.data.map((ds) => {
      return {
        key: ds.idcategorialineaconvocatoria,
        value: ds.idcategorialineaconvocatoria,
        text: ds.nombre,
      };
    });
    setCategoriasLineaconvocatoria(categoriaslineasconvocatoriaMap);
    console.log(categoriasLineaconvocatoria);
    for (var x in response.data.data.categoria_linea_convocatoria) {
      categorias.push(response.data.data.categoria_linea_convocatoria[x].value);
    }
    setTipocategoriasseleccionado(categorias);
    for (var y in response.data.data.area) {
      areas.push(response.data.data.area[y].value);
    }
    setAreaSeleccionada(areas);
    console.log(tipocategoriasseleccionado);
    return setConvocatoria({
      ...convocatoria,
      nombre_convocatoria: response.data.data.nombre_convocatoria,
      linea_convocatoria: response.data.data.linea_convocatoria,
      categoria_linea_convocatoria: response.data.data.categoria_linea_convocatoria,
      entidad: response.data.data.entidad,
      pseudonimos: response.data.data.pseudonimo,
      tipo_participante: response.data.data.tipo_participante,
      cobertura: response.data.data.cobertura,
      ciclo: response.data.data.ciclo,
      linea_estrategica: response.data.data.linea_estrategica,
      area: response.data.data.area,
      convenido: response.data.data.esconvenio,
      modalidad: response.data.data.modalidad,
      tipo_estimulo: response.data.data.tipo_estimulo,
      valor_total_entg: response.data.data.valor_total_entg,
      bolsa_concursable: response.data.data.bolsa_concursable,
      num_estimulos: response.data.data.num_estimulos,
      descripcion_corta: response.data.data.descripcion_corta,
      perfil_participante: response.data.data.perfil_participante,
      noparticipa: response.data.data.noparticipa,
      usuario_creacion: user.idusuario,
    });
    // console.log(convocatoria, tipoparticipanteseleccionado);
  };

  //funciones
  const cargarSelectLineaConvocatoria = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias`)
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
      setErrores({ ...errores, categoria_linea_convocatoria: false });
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
    } else if (stateActualizar === "tipo_participante") {
      setErrores({ ...errores, tipo_participante: false });
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
    } else if (stateActualizar === "area") {
      setErrores({ ...errores, area: false });
      setAreaSeleccionada(result.value);
      if (event.target.className.indexOf("delete") >= 0) {
        let arrayAreas = [];
        for (var i in convocatoria.area) {
          for (var x in result.value) {
            if (convocatoria.area[i].value === result.value[x]) arrayAreas.push(convocatoria.area[i]);
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
    if (convocatoria.nombre_convocatoria === "") {
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

    delete axios.defaults.headers.common["Authorization"];

    // if (user.trim() !== "") {
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;
    // }

    console.log(user, "user");

    if (editarConvocatoria === undefined) {
      e.preventDefault();
      console.log(convocatoria);
      return await axios
        .post(`${process.env.REACT_APP_SERVER_CONV}convocatorias`, convocatoria)
        .then((data) => {
          console.log(data);
          ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
          history.push("/Administrador/cronogramaActividades");
        })
        .catch(function (error) {
          //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
        });
    }

    await axios
      .post(`${process.env.REACT_APP_SERVER_CONV}convocatorias/${idConvocatoria}`, convocatoria)
      .then((data) => {
        console.log(data);
        ObjNotificaciones.MSG_SUCCESS("success", data.data.mensaje);
        history.push("/Administrador/cronograma");
        dispatch(edicionConvocatoria());
      })
      .catch(function (error) {
        //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
      });
  };

  const handleInputChange = (event, result) => {
    const { name, value } = result || event.target;
    setErrores({ ...errores, [name]: false });
    if (name === "valor_total_entg") {
      event.target.value = event.target.value.toString().replace(/[^0-9]/g, "");
      event.target.value = event.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return setConvocatoria({ ...convocatoria, [name]: event.target.value });
    }
    return setConvocatoria({ ...convocatoria, [name]: value });
  };
  const conteoCaracteres = (event) => {
    if (
      event.target.name === "descripcion_corta" ||
      event.target.name === "noparticipa" ||
      event.target.name === "perfil_participante"
    ) {
      if (
        event.keyCode === 27 ||
        event.keyCode === 112 ||
        event.keyCode === 113 ||
        event.keyCode === 114 ||
        event.keyCode === 115 ||
        event.keyCode === 116 ||
        event.keyCode === 117 ||
        event.keyCode === 118 ||
        event.keyCode === 119 ||
        event.keyCode === 120 ||
        event.keyCode === 121 ||
        event.keyCode === 122 ||
        event.keyCode === 123 ||
        event.keyCode === 9 ||
        event.keyCode === 13 ||
        event.keyCode === 20 ||
        event.keyCode === 16 ||
        event.keyCode === 17 ||
        event.keyCode === 91 ||
        event.keyCode === 93 ||
        event.keyCode === 17 ||
        event.keyCode === 45 ||
        event.keyCode === 33 ||
        event.keyCode === 36 ||
        event.keyCode === 46 ||
        event.keyCode === 35 ||
        event.keyCode === 34 ||
        event.keyCode === 37 ||
        event.keyCode === 38 ||
        event.keyCode === 39 ||
        event.keyCode === 40
      ) {
        return;
      }
      let numero = convocatoria[event.target.name].length + 1;
      if (event.keyCode === 8) numero = convocatoria[event.target.name].length - 1;
      if (numero === -1) numero = 0;
      return setConvocatoria({ ...convocatoria, [`conteo${event.target.name}`]: `${numero}/250` });
    }
  };

  const handleLineaConvocatoria = async (event, results) => {
    const { name, value } = results || event.target;
    setErrores({ ...errores, linea_convocatoria: false });
    setConvocatoria({ ...convocatoria, [name]: value });
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_CONV}convocatorias/lineasConvocatorias/${value}`)
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
      .catch(function (error) { });
  };

  const handletoggleChange = (event, result) => {
    const { name, checked } = result || event.target;
    console.log(name, checked);
    if (name === "pseudonimossi") {
      return setConvocatoria({ ...convocatoria, [name]: true, pseudonimosno: false, pseudonimo: true });
    }
    if (name === "pseudonimosno") {
      return setConvocatoria({ ...convocatoria, [name]: true, pseudonimossi: false, pseudonimo: false });
    }
    if (name === "conveniosi") {
      return setConvocatoria({ ...convocatoria, [name]: true, conveniono: false, convenido: true });
    }
    if (name === "conveniono") {
      return setConvocatoria({ ...convocatoria, [name]: true, conveniosi: false, convenido: false });
    }
    if (name === "mayoredadsi") {
      return setConvocatoria({ ...convocatoria, [name]: true, mayoredadno: false, mayoredad: true });
    }
    if (name === "mayoredadno") {
      return setConvocatoria({ ...convocatoria, [name]: true, mayoredadsi: false, mayoredad: false });
    }
    return setConvocatoria({ ...convocatoria, [name]: checked });
  };

  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  const backComponente = () => {
    history.push("/Administrador/");
  };

  return (
    <React.Fragment>
      <Grid className="no-margin">
        <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
          <Breadcrumb style={{ paddingLeft: "4%" }}>
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
            <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
            <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
              Crear convocatoria
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Grid className="no-margin">
        <Grid.Column
          className="background-color-6DA3FC-opacity-025 no-margin"
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2% !important" }}
        >
          <span className="font-color-1B1C1D font-size-14px">Crear convocatoria :</span>
          <Dropdown
            text={<span className="font-color-1B1C1D font-family-Montserrat-Regular">Informacion general</span>}
            icon={
              <Icon style={{ float: "right", paddingLeft: "5%" }} className="font-color-1FAEEF" name="angle down" />
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Información General
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Cronograma</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">
                Doc. Administrativos
              </Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. Técnicos</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Doc. General</Dropdown.Item>
              <Dropdown.Item className="font-color-1B1C1D font-family-Montserrat-Regular">Públicación</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
      <Grid style={{ marginBottom: "8%", marginLeft: "0", marginTop: "0", marginRight: "0" }}>
        <Grid.Column style={{ maxWidth: "100%", padding: "2%" }}>
          <Form size="large" onSubmit={handleCreateConvocatoria} autoComplete="off">
            <Segment className="segment-shadow">
              <Header as="h4" floated="right" style={{ marginBottom: "0.5%" }}>
                <span className="font-color-B0B0B0 font-family-Montserrat-Thin font-size-12px">
                  {" "}
                  Código de convocatoria {idConvocatoria}
                </span>
              </Header>
              <Header
                className="font-size-14px font-family-Montserrat-SemiBold"
                floated="left"
                style={{ marginBottom: "0" }}
              >
                Información general&nbsp;-&nbsp;
                <span
                  style={{ marginBottom: "0" }}
                  className="font-color-DB2828 font-size-10px font-family-Montserrat-SemiBold no-margin"
                >
                  Todos los campos son obligatorios
                </span>
              </Header>
              <Divider clearing style={{ marginTop: "0", marginBottom: "3%" }} />
              <Form.Group widths="equal">
                <Form.Input
                  error={errores.numero_convocatoria}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Nombre de la convocatoria</label>}
                  // placeholder="Seleccionar..."
                  // options={NumeroConvocatoiriaOptions}
                  name="nombre_convocatoria"
                  value={convocatoria.numero_convocatoria}
                  onChange={handleInputChange}
                  style={{ paddingRight: "2%" }}
                  // icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Select
                  error={errores.linea_convocatoria}
                  className="font-color-4B4B4B"
                  placeholder="Seleccionar..."
                  label={<label className="font-color-4B4B4B">Línea convocatoria</label>}
                  name="linea_convocatoria"
                  value={convocatoria.linea_convocatoria}
                  onChange={(handleInputChange, handleLineaConvocatoria)}
                  options={lineaConvocatoriaOptions}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Dropdown
                  error={errores.categoria_linea_convocatoria}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Categorías línea convocatoria</label>}
                  value={tipocategoriasseleccionado}
                  placeholder="Seleccionar..."
                  fluid
                  multiple
                  selection
                  name="categoria_linea_convocatoria"
                  options={categoriasLineaconvocatoria}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "categoria")}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right", marginTop: "2%" }} color="blue" name="angle down" />}
                />

                <Form.Select
                  error={errores.entidad}
                  className="font-color-4B4B4B"
                  placeholder="Seleccionar..."
                  label={<label className="font-color-4B4B4B">Entidad</label>}
                  options={EntidadOptions}
                  name="entidad"
                  value={convocatoria.entidad}
                  onChange={handleInputChange}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
              </Form.Group>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Dropdown
                      error={errores.tipo_participante}
                      className="font-color-4B4B4B"
                      label={<label className="font-color-4B4B4B">¿Quién puede participar?</label>}
                      placeholder="Seleccionar..."
                      value={tipoparticipanteseleccionado}
                      fluid
                      multiple
                      selection
                      name="tipo_participante"
                      options={QuienParticipaOptions}
                      onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "tipo_participante")}
                      style={{ paddingRight: "2%" }}
                      icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>
                      ¿Seudónimos?&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                    </label>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="Si"
                            name="pseudonimossi"
                            value={convocatoria.pseudonimossi}
                            checked={convocatoria.pseudonimossi}
                            onChange={handletoggleChange}
                          />
                        </Grid.Column>
                        <Grid.Column style={{ paddingLeft: "5%" }}>
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="No"
                            name="pseudonimosno"
                            value={convocatoria.pseudonimosno}
                            checked={convocatoria.pseudonimosno}
                            onChange={handletoggleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider clearing />

              <Form.Group widths="equal">
                <Form.Dropdown
                  error={errores.ciclo}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Ciclo</label>}
                  placeholder="Seleccionar..."
                  fluid
                  selection
                  options={CicloOptions}
                  name="ciclo"
                  value={convocatoria.ciclo}
                  onChange={handleInputChange}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Dropdown
                  error={errores.linea_estrategica}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Linea estratégica</label>}
                  placeholder="Seleccionar..."
                  fluid
                  search
                  selection
                  name="linea_estrategica"
                  value={convocatoria.linea_estrategica}
                  options={LineaEstrategicaOptions}
                  onChange={handleInputChange}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />

                <Form.Dropdown
                  error={errores.area}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Área</label>}
                  placeholder="Seleccionar..."
                  fluid
                  search
                  selection
                  multiple
                  name="area"
                  value={areaSeleccionada}
                  options={AreaOptions}
                  onChange={(event, result) => capturarValoresOptionsMultiple(event, result, "area")}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right", marginTop: "2%" }} color="blue" name="angle down" />}
                />

                <Form.Dropdown
                  error={errores.cobertura}
                  className="font-color-4B4B4B"
                  label={<label className="font-color-4B4B4B">Cobertura</label>}
                  placeholder="Seleccionar..."
                  fluid
                  selection
                  options={CoberturaOptions}
                  name="cobertura"
                  value={convocatoria.cobertura}
                  onChange={handleInputChange}
                  style={{ paddingRight: "2%" }}
                  icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                />
              </Form.Group>

              {/* <Divider clearing /> */}

              <Grid columns={2}>
                <Grid.Row >
                  <Grid.Column width={3}>
                    <label>
                      ¿Es convenio?&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                    </label>
                    <Grid columns={1}>
                      <Grid.Row>
                        <Form.Group style={{ marginLeft: '10px' }}>
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="Si"
                            name="conveniosi"
                            value={convocatoria.conveniosi}
                            checked={convocatoria.conveniosi}
                            onChange={handletoggleChange}
                          />
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="No"
                            name="conveniono"
                            value={convocatoria.conveniono}
                            checked={convocatoria.conveniono}
                            onChange={handletoggleChange}
                          />
                        </Form.Group>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column style={{marginLeft: '100px'}}>
                    <label>¿Mayor de edad?</label>
                    <Grid columns={1} >
                      <Grid.Row style={{ marginLeft: '15px' }}>
                        <Form.Group>
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="Si"
                            name="mayoredadsi"
                            value={convocatoria.mayoredadsi}
                            checked={convocatoria.mayoredadsi}
                            onChange={handletoggleChange}
                          />
                          <Form.Checkbox
                            className="font-color-4B4B4B"
                            radio
                            label="No"
                            name="mayoredadno"
                            value={convocatoria.mayoredadno}
                            checked={convocatoria.mayoredadno}
                            onChange={handletoggleChange}
                          />
                        </Form.Group>

                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider clearing />


              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Select
                      error={errores.modalidad}
                      className="font-color-4B4B4B"
                      placeholder="Seleccionar..."
                      size="large"
                      label={<label className="font-color-4B4B4B">Modalidad de estimulo</label>}
                      value={convocatoria.modalidad}
                      options={ModalidadEstimuloOptions}
                      name="modalidad"
                      onChange={handleInputChange}
                      style={{ paddingRight: "2%" }}
                      icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Select
                      error={errores.tipo_estimulo}
                      className="font-color-4B4B4B"
                      placeholder="Seleccionar..."
                      label={<label className="font-color-4B4B4B">Tipo de estimulo</label>}
                      options={TipoEstimuloOptions}
                      value={convocatoria.tipo_estimulo}
                      name="tipo_estimulo"
                      onChange={handleInputChange}
                      style={{ paddingRight: "2%" }}
                      icon={<Icon style={{ float: "right" }} color="blue" name="angle down" />}
                    />
                  </Grid.Column>

                  {convocatoria.tipo_estimulo === "Económico" && (
                    <>
                      <Grid.Column>
                        <Form.Input
                          error={errores.valor_total_entg}
                          fluid
                          placeholder="Valor"
                          className="font-color-4B4B4B"
                          label={<label className="font-color-4B4B4B">Valor total de recursos</label>}
                          name="valor_total_entg"
                          value={convocatoria.valor_total_entg}
                          onChange={handleInputChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label className="font-color-4B4B4B">Bolsa Concursable</label>
                          <Form.Checkbox
                            toggle
                            className="font-color-4B4B4B"
                            name="bolsa_concursable"
                            value={convocatoria.bolsa_concursable}
                            checked={convocatoria.bolsa_concursable}
                            onChange={handletoggleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                      {/* <Grid.Column>
                        <Form.Input
                          fluid
                          className="font-color-4B4B4B"
                          placeholder="Seleccionar..."
                          label="Numero de estimulos"
                          name="num_estimulos"
                          value={convocatoria.num_estimulos}
                          onChange={handleInputChange}
                        />
                      </Grid.Column> */}
                    </>
                  )}
                </Grid.Row>
              </Grid>

              <Divider clearing />

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.TextArea
                      required
                      className="no-margin"
                      label={
                        <label className="font-color-4B4B4B">
                          Descripción corta&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                        </label>
                      }
                      name="descripcion_corta"
                      value={convocatoria.descripcion_corta}
                      onChange={handleInputChange}
                      onKeyDown={conteoCaracteres}
                      maxLength="250"
                    />
                    <label style={{ float: "right" }} className="no-margin no-padding font-color-F28C02 font-size-10px">
                      {convocatoria.conteodescripcion_corta}
                    </label>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.TextArea
                      required
                      className="no-margin"
                      label={
                        <label className="font-color-4B4B4B">
                          ¿Quién no puede participar?&nbsp;-&nbsp;
                          <span className="font-size-10px no-margin font-color-4B4B4B">opcional</span>
                        </label>
                      }
                      name="noparticipa"
                      value={convocatoria.noparticipa}
                      onChange={handleInputChange}
                      onKeyDown={conteoCaracteres}
                      maxLength="250"
                    />
                    <label style={{ float: "right" }} className="no-margin no-padding font-color-F28C02 font-size-10px">
                      {convocatoria.conteonoparticipa}
                    </label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.TextArea
                      required
                      className="no-margin"
                      label={
                        <label className="font-color-4B4B4B">
                          Perfil de participante&nbsp;-&nbsp;<span className="font-size-10px no-margin">opcional</span>
                        </label>
                      }
                      name="perfil_participante"
                      value={convocatoria.perfil_participante}
                      onChange={handleInputChange}
                      onKeyDown={conteoCaracteres}
                      maxLength="250"
                    />
                    <label style={{ float: "right" }} className="no-margin no-padding font-color-F28C02 font-size-10px">
                      {convocatoria.conteoperfil_participante}
                    </label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <p align="right">
                      <Button className="border-radius-16 font-color-B0B0B0" type="submit">
                        Guardar y continuar
                      </Button>
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={1} className="container-absolute">
        <Grid.Row>
          <Button className="font-size-12px button-back" onClick={backComponente}>
            Atrás
          </Button>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}
