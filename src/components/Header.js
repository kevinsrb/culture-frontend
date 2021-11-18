import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
// import { SidebarData } from "./Sidedata";
// import './Header.css';
import { Dropdown } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
export default function Menuheader() {
  const [sidebar, setSidebar] = useState(false);
  const [seleDrop, setSeleDrop] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [showPageName, setShowPageName] = useState();
  const [pageNo, setPageNo] = useState();
  useEffect(() => {

    getShowPages()
  }, [])

  async function getShowPages() {
    const pages = await localStorage.getItem("showPage");
    setPageNo(pages);
    let pageName = ''
    if (pages == 1) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 2) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 3) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 4) {
      pageName = ' Inscribir hoja de vida'
    }
    if (pages == 5) {
      pageName = 'Convocatorias'
    }
    if (pages == 6) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 7) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 8) {
      pageName = 'Inscribir hoja de vida'
    }
    if (pages == 9) {
      pageName = 'Inscribir hoja de vida'
    }
    await setShowPageName(pageName);

  }

  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]

  return (
    <IconContext.Provider value={{ color: "#004884" }}>

      <div className="navbar" style={{ padding: 5, marginBottom: '-15px' }}>
        {/* <div >
          <Link to="/" className="menu-bars" style={{fontSize: '22px'}}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items nav-header-menu" onClick={showSidebar} >

            <li className="navbar-toggle menu--items">
              <Link to="" className="menu-bars menu--link" style={{ fontSize: '14px', color: 'black' }}>Hola, Luisa María Sánchez Cadavid</Link>
            </li>
            <li className="navbar-toggle menu--items">
              <Link className="menu-bars menu--link menu--niti-bl-icon" >
                <Icon disabled name='bell' /><small>91+</small>
              </Link>
            </li>
            <li className="navbar-toggle menu--items">
              <a className="menu-bars menu--link" style={{ fontSize: '22px' }}>
                {/* <FaIcons.FaBars onClick={showSidebar} /> */}
                <FaIcons.FaBars />
              </a>
            </li>

            {/* <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </div>

      <div className='second--header'>
        <div className='snd-head--menu-box'>
          <ul className='snd-head_menu'>
            <li className='snd--link-itm'><a className='snd--link'><Icon disabled name='home' /></a></li>
            <li className='snd--link-itm'>/<a className='snd--link'> Jurados </a></li>
            <li className='snd--link-itm'>/<a className='snd--link'> {showPageName}</a></li>
          </ul>
        </div>
      </div>
      {pageNo >= 1 ?
        <div className='third--header'>
          <div className='trd-head--menu-box'>
            <ul className='trd-head_menu'>
              <li className='trd--link-itm'><span className='trd--link'><b> Inscribir Hoja de vida:</b> </span></li>
              <li className='trd--link-itm'>
                <div class="head-trd-dropdown">
                  <span className='trd--link trd-drop-text' onClick={() => setSeleDrop((seleDrop) ? false : true)}>Publicaciones <Icon className='head_dwn' disabled name='angle down' /></span>
                  <div class={`head-trd-dropdown-content ${(seleDrop) ? 'active' : ''}`}>
                    <ul className='trd-drop--men'>
                      <li className='trd-drop-itm'><a>Datos Personales</a></li>
                      <li className='trd-drop-itm'><a>Áreas de Conocimiento</a></li>
                      <li className='trd-drop-itm'><a>Educación Formal</a></li>
                    </ul>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </div>
        : ''
      }

    </IconContext.Provider>
  );
}
