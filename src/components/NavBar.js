import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { SidebarData } from "../data/Sidedata";
import { participantesData } from "../data/participantesData";

import './Header.css';

import { Dropdown, Sidebar, Menu, Accordion, Icon } from "semantic-ui-react";
import escudoAlcaldia from '../assets/escudoAlcaldia.png'

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [state, setState] = useState({ activeIndex: 0 }) 

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = state
    const newIndex = activeIndex === index ? -1 : index

    setState({ activeIndex: newIndex })
  }



  return (
    <>
     {/* <IconContext.Provider value={{ color: "#004884" }}> */}
      <div className="navbar navbar_edit">
        <div>
          <span className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} disabled={sidebar}   />
          </span>
        </div>
        
        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
           <ul className="nav-menu-items" onClick={showSidebar}>
             <li className="navbar-toggle">
               <Link to="#" className="menu-bars">
                 <AiIcons.AiOutlineClose />
               </Link>
             </li>
            
             {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </IconContext.Provider> */}
    <Sidebar 
            as={Menu}
            animation='overlay'
            direction='left'
            vertical
            visible={sidebar}
            className="sidebar"
          >
            <Menu.Item as='a' disabled={!sidebar} onClick={showSidebar}>
              X 
            </Menu.Item>

            <div className="sidebar_container">
              <div>
                <figure>
                  <img src={escudoAlcaldia} className="sidebar_logo"   />
                </figure>
              </div>
              <span className="sidebar_sub_titulo">Secretaria de cultura ciudadana</span>
            </div>

            <Menu.Item as='a' key={1} >
                  <Link to="/homeParticipantes">
                    <span className="sidebar_items_title">Fomento a la cultura</span>
                  </Link>
                </Menu.Item>


            
            {SidebarData.map((item, index) => {
              return (
               
                <Menu.Item as='a' key={index} className="sidebar_items" >
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              );
            })}
            
            <Accordion>
              <Accordion.Title
                active={state.activeIndex === 0}
                index={0}
                onClick={handleClick}
              >
                <Menu.Item as='a' key={1} className="sidebar_items" >
                participantes
                <Icon name='dropdown' />
                </Menu.Item>
                
              </Accordion.Title>
              <Accordion.Content active={state.activeIndex === 0}>
                {participantesData.map((parti, index) => {
                return (
                
                  <Menu.Item as='a' key={index} className="sidebar_items" >
                    <Link to={parti.path}>
                      <span>{parti.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
              </Accordion.Content>

              
            </Accordion>

            <Menu.Item as='a' key={2} className="sidebar_items" >
              <Link>
                <span>Mis propuestas</span>
              </Link>
            </Menu.Item>

            <Menu.Item as='a' key={3} className="sidebar_items" >
              <Link>
                <span>Juradoss</span>
              </Link>
            </Menu.Item>

            <Menu.Item as='a' key={4} className="sidebar_items" >
              <Link>
                <span>Historico</span>
              </Link>
            </Menu.Item>
          </Sidebar>
          </div>
    </>
  );
}
