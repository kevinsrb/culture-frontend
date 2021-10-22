import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/Sidedata";
import { participantesData } from "../data/participantesData";

import "./Header.css";

import { Sidebar, Menu, Accordion, Icon } from "semantic-ui-react";
import escudoAlcaldia from "../assets/escudoAlcaldia.png";

export default function Navbar() {
  const sidebar = true;
  const [state, setState] = React.useState({ activeIndex: 0 });
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ activeIndex: newIndex });
  };

  return (
    <>
      <div className="navbar navbar_edit">
        <Sidebar as={Menu} animation="overlay" direction="left" vertical visible={sidebar} className="sidebar">
          <div className="sidebar_container">
            <div>
              <figure>
                <img src={escudoAlcaldia} className="sidebar_logo" />
              </figure>
            </div>
            <span className="sidebar_sub_titulo font-family-Montserrat-Regular font-size-12px">Secretaria de cultura ciudadana</span>
          </div>

          <Menu.Item as="a" key={1}>
            <Link to="/homeParticipantes">
              <span className="sidebar_items_title">Fomento a la cultura</span>
            </Link>
          </Menu.Item>

          {SidebarData.map((item, index) => {
            return (
              <Menu.Item as="a" key={index} className="sidebar_items font-family-Montserrat-Regular font-size-12px">
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            );
          })}

          <Accordion>
            <Accordion.Title active={state.activeIndex === 0} index={0} onClick={handleClick}>
              <Menu.Item as="a" key={1} className="sidebar_items font-family-Montserrat-Regular font-size-12px">
                Participantes
                <Icon name="dropdown" />
              </Menu.Item>
            </Accordion.Title>
            <Accordion.Content active={state.activeIndex === 0}>
              {participantesData.map((parti, index) => {
                return (
                  <Menu.Item as="a" key={index} className="sidebar_items">
                    <Link to={parti.path}>
                      <span>{parti.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Accordion.Content>
          </Accordion>

          <Menu.Item as="a" key={2} className="sidebar_items font-family-Montserrat-Regular font-size-12px">
            <Link>
              <span>Mis propuestas</span>
            </Link>
          </Menu.Item>

          <Menu.Item as="a" key={3} className="sidebar_items font-family-Montserrat-Regular font-size-12px">
            <Link>
              <span>Juradoss</span>
            </Link>
          </Menu.Item>

          <Menu.Item as="a" key={4} className="sidebar_items font-family-Montserrat-Regular font-size-12px">
            <Link>
              <span>Historico</span>
            </Link>
          </Menu.Item>
        </Sidebar>
      </div>
    </>
  );
}
