import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sidebardataAdmin, sidebardataUser } from "../data/Sidedata";
import { participantesData } from "../data/participantesData";

import "./Header.css";

import { Sidebar, Menu, Accordion, Image, Grid } from "semantic-ui-react";
import escudoAlcaldia from "../assets/medellin.png";

export default function Navbar() {
  const sidebar = true;
  const [state, setState] = React.useState({ activeIndex: 0 });
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ activeIndex: newIndex });
  };
  const { user } = useSelector((state) => state);

  return (
    <>
      <Sidebar as={Menu} animation="overlay" direction="left" vertical visible={sidebar} className="sidebar">
        <Grid className="no-margin background-color-6DA3FC">
          <Grid.Row className="justify-content-center no-padding-bottom">
            <Image src={escudoAlcaldia} style={{ width: "50%", height: "50%" }} fluid />
          </Grid.Row>
          <Grid.Row className="justify-content-center">
            <span className="font-family-Montserrat-Regular font-size-12px font-color-FFFFFF">
              Secretaria de cultura ciudadana
            </span>
          </Grid.Row>
        </Grid>
        <Grid className="no-margin container-menu" columns={1}>
          <Grid.Row>
            <span className="font-color-632264">Fomento a la cultura</span>
          </Grid.Row>
          {user.id_tipo === "ADMI"
            ? sidebardataAdmin.map((item, index) => {
                return (
                  <Grid.Row key={index} columns={1}>
                    <Link to={item.path}>
                      <span className="font-family-Montserrat-Regular font-size-12px font-color-1B1C1D sidebar-padding">
                        {item.title}
                      </span>
                    </Link>
                  </Grid.Row>
                );
              })
            : sidebardataUser.map((item, index) => {
                if (item.href) {
                  return (
                    <Grid.Row key={index} columns={1}>
                      <a style={{ marginLeft:'7%' }} href={item.href} className="font-family-Montserrat-Regular font-size-12px font-color-1B1C1D">
                        {item.title}
                      </a>
                    </Grid.Row>
                  );
                } else {
                  return (
                    <Grid.Row key={index} columns={1}>
                      <Link to={item.path}>
                        <span className="font-family-Montserrat-Regular font-size-12px font-color-1B1C1D">
                          {item.title}
                        </span>
                      </Link>
                    </Grid.Row>
                  );
                }
              })}
        </Grid>
      </Sidebar>
    </>
  );
}
