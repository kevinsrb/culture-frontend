import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Grid, Menu } from "semantic-ui-react";
export default function AdministradorPostulacionesDeJurado(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeItem, setActiveItem] = useState("Mis_Proyectos");

  async function handleClick(index) {
    const newIndex = index != activeIndex ? index : null;
    setActiveIndex(newIndex);
  }

  async function handleItemClick(item) {
    setActiveItem(item);
  }

  return (
    <div>
      <Container fluid>
        <Grid style={{ width: "100%", margin: 0 }}>
          <Grid.Column style={{ maxWidth: "99%" }}>
            <Grid className="main-box">
              <Header as="h4" className="jura--form-heading" floated="left">
                Jurados
              </Header>
            </Grid>
          </Grid.Column>
        </Grid>

        <Grid style={{ width: "100%", margin: 0 }}>
          <Grid.Column style={{ maxWidth: "99%" }}>
            <Menu pointing secondary className="menu--drop-link">
              <Menu.Item
                name="Mis Proyectos"
                active={activeItem === "Mis_Proyectos"}
                onClick={() => handleItemClick("Mis_Proyectos")}
              />
              <Menu.Item
                name="Hoja de vida"
                active={activeItem === "Hoja_de_vida"}
                onClick={() => handleItemClick("Hoja_de_vida")}
              />
            </Menu>
          </Grid.Column>
        </Grid>

        <Grid style={{ width: "100%", margin: 0 }}>
          <Grid.Column
            style={{ maxWidth: "99%" }}
            className="history--show-det"
          >
            <span className="text--con">
              HISTORIA DE USUARIO EN CONSTRUCCIÓN
            </span>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
