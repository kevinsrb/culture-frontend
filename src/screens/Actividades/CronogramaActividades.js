import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ObjConstanst } from '../../config/utils/constanst'
import { CrearActividades } from './CrearActividades';
import { Button, Container, Form, Grid, Header, Divider, Segment, Search, Checkbox } from "semantic-ui-react";
export const CronogramaActividades = () => {

  const [actividades, setActividades] = useState([]);
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState([]);

  let objActividadesSelecionadas = {};


  const handleCargarActividades = async () => {
    const response = await axios.get(`${ObjConstanst.IP_CULTURE}actividades`)
      .then(({ data }) => {
        let actividadesmap = data.data.map(ds => {
          return {
            idactividad: ds.idactividad,
            nombre: ds.nombre,
            check: false,
            key: ds.idactividad,
          }
        })
        setActividades(actividadesmap);
      })
      .catch(function (error) {
        console.error(error);
      })
  };


  useEffect(() => {
    handleCargarActividades()
  }, [])

  const handletoggleChange = (actividad, event, result) => {
    let actividadChange = JSON.parse(JSON.stringify(actividades))
    actividadChange[actividad.idactividad - 1].check = !actividadChange[actividad.idactividad - 1].check
    setActividades(actividadChange);
    //let idActividad = actividad.idActividad
    //setActividadesSeleccionadas([...actividadesSeleccionadas, idActividad])
    
  }

  const handelGuardarActiviadesConvocatorias = () => {
    var cad=[];

    console.log(actividadesSeleccionadas)

    for(let i in actividadesSeleccionadas){
      cad.push('{0: "nombre: '+actividadesSeleccionadas[i]+'"}');
    }



    console.log(cad);
  }


  const handelSeleccionarCheckbox = () => {
    let checkboxes = document.querySelectorAll('.check');
    console.log(checkboxes)

    // for(var i=0, n=checkboxes.length;i<n;i++) {
    //   checkboxes[i].checked = source.checked;
    // }

  }

  return (
    <>
      <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
        <Grid.Column style={{ maxWidth: "100%" }}>

          <Form size="large" onSubmit={handelGuardarActiviadesConvocatorias}>
            <Segment>
              <Header as="h4" floated="right">
                Codigo de convocatoria #: 1
              </Header>
              <Header as="h4" floated="left">
                Cronograma de actividades
              </Header>
              <Divider clearing />

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>

                    <Header as="h4" floated="left">
                      <Search />
                    </Header>
                  </Grid.Column>
                  <Grid.Column>               
                    <CrearActividades />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <label>Seleccionar actividades</label>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h4" floated="right">
                      <Form.Checkbox
                        label="seleccionar todo"
                        name="dinamico"
                      />
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>


              <Segment className="container_checks">

                <Grid columns={2}>
                  {
                    actividades.length > 0 ?
                      actividades.map(actividad => (
                        <Grid.Column>
                          <Checkbox
                            label={actividad.nombre}
                            key={actividad.key}
                            value={actividad.idactividad}
                            name={actividad.nombre}
                            checked={actividad.check}
                            className="check"
                            onChange={() => handletoggleChange(actividad)}
                          />
                        </Grid.Column>
                      ))
                      : null
                  }
                </Grid>

              </Segment>

              <Container textAlign='right'>
                <Button basic color='red' content='Atras' className="btn" />
                <Button basic color='blue' content='Guardar y continuar' className="btn" />
              </Container>

            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  )
}
