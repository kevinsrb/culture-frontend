import React from "react";
import { useHistory } from "react-router-dom";
import { Modal, Select, Button, Grid, Form } from "semantic-ui-react";
import { NumeroConvocatoria } from "../../components/Maestras/NumeroConvocatoria";

const maestras = [
  { key: 1, value: 1, text: "Número convocatoria" },
  { key: 2, value: 2, text: "Línea convocatoria" },
  { key: 3, value: 3, text: "Categoría convocatoría" },
  { key: 4, value: 4, text: "Actividad cronograma" },
  { key: 5, value: 5, text: "Documentos administrativos" },
  { key: 6, value: 6, text: "Documentos técnicos" },
  { key: 7, value: 7, text: "Documentación general convocatoria" },
];

const ArrayConvocatoria = [
  {
    key: 1,
    value: 1,
    maestra: "Numero Convocatoria",
    nombre: "Anexo",
    asociadoa: "N/A",
    descripcion_corta: "N/A",
    activo: "Si",
  },
];

export const VentanaCreacionMaestras = () => {
  const State = {
    valorMaestra: 0,
    openVentana: true,
    arrayMaestras: [],
  };
  const StateComponents = {
    nombre: "",
    activosi: true,
    activono: false,
  };

  const history = useHistory();
  const [principalState, setPrincipalState] = React.useState(State);
  const [componentsState, setComponentsState] = React.useState(StateComponents);

  React.useEffect(() => {
    cargandoDatos();
  }, []);

  const cargandoDatos = () => {
    setPrincipalState({ ...principalState, arrayMaestras: maestras });
  };

  const seleccionarMaestra = (event, result) => {
    console.log(event, result);
    let valor = result.options.filter((data) => data.value === result.value);
    console.log(valor);
    return setPrincipalState({ ...principalState, valorMaestra: valor[0].value });
  };

  return (
    <div>
      <Modal open={principalState.openVentana} size="large">
        <Modal.Header>Gestionar maestras</Modal.Header>
        <Form>
          <Modal.Description>
            <Form.Field>
              <Select
                fluid
                placeholder="Seleccionar"
                options={principalState.arrayMaestras}
                onChange={seleccionarMaestra}
              />
            </Form.Field>
            {principalState.valorMaestra === 1 ? (
              <NumeroConvocatoria
                nombre={componentsState.nombre}
                onChangenombre={(value) => setComponentsState({ ...componentsState, nombre: value })}
                activosi={componentsState.activosi}
                onChangeActivoSi={() => setComponentsState({ ...componentsState, activosi: true, activono: false })}
                activono={componentsState.activono}
                onChangeActivoNo={() => setComponentsState({ ...componentsState, activosi: false, activono: true })}
                arrayNumerosConvocatoria={ArrayConvocatoria}
              />
            ) : null}
            {principalState.valorMaestra === 2 ? (
              <NumeroConvocatoria
                nombre={componentsState.nombre}
                onChangenombre={(value) => setComponentsState({ ...componentsState, nombre: value })}
                activosi={componentsState.activosi}
                onChangeActivoSi={() => setComponentsState({ ...componentsState, activosi: true, activono: false })}
                activono={componentsState.activono}
                onChangeActivoNo={() => setComponentsState({ ...componentsState, activosi: false, activono: true })}
                arrayNumerosConvocatoria={ArrayConvocatoria}
              />
            ) : null}
            {principalState.valorMaestra === 3 ? (
              <NumeroConvocatoria
                nombre={componentsState.nombre}
                onChangenombre={(value) => setComponentsState({ ...componentsState, nombre: value })}
                activosi={componentsState.activosi}
                onChangeActivoSi={() => setComponentsState({ ...componentsState, activosi: true, activono: false })}
                activono={componentsState.activono}
                onChangeActivoNo={() => setComponentsState({ ...componentsState, activosi: false, activono: true })}
                arrayNumerosConvocatoria={ArrayConvocatoria}
              />
            ) : null}
          </Modal.Description>
        </Form>
        <Modal.Actions>
          <Grid className="contenido-acciones-modal-actividades" centered>
            <Button className="botones-redondos" basic color="blue" onClick={() => console.log("aca")}>
              Cancelar
            </Button>
            <Button className="botones-redondos" color="blue" onClick={() => console.log("aca")}>
              Asignar Actividades
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
