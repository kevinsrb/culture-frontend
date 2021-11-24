import React, { useState } from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Grid, Icon, Sidebar, Image } from "semantic-ui-react";
// DATA ROUTE IS HERE
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
const sidebardataAdmin = [
  {
    title: "Administración",
    path: "/Administrador/",
    cName: "navbar-text",
  },
  {
    title: "Convocatorias",
    path: "/Administrador/",
    cName: "navbar-text",
  },
  {
    title: "Postulaciones",
    path: "/Administrador/gestionarPostulacionesdocumentos",
    cName: "navbar-text",
  },
];

const sidebardataUser = [
  {
    title: "Convocatorias",
    path: "/Usuario/",
    cName: "navbar-text",
  },
  {
    title: "Mis propuestas",
    path: "/Usuario/misPropuestas",
    cName: "navbar-text",
  },
  {
    title: "Jurados",
    path: "/Usuario/",
    href: "/Usuario/Jurados",
    // cName: "navbar-text",
  },
  /* {
    title: "Administracion Jurados",
    path: "/Usuario/",
    href: "/Usuario/AdministracionJurados",
    cName: "navbar-text",
  }, */
];

// PARTICIPANTES
export default function Navbar() {
  // const sidebar = true;
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [state, setState] = React.useState({ activeIndex: 0 });
  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ activeIndex: newIndex });
  };
  const { user }: any = useState<any>("ADMI");

  return (
    <>

      <IconContext.Provider value={{ color: "#004884", }}>
        <div className="navbar">
          {/* <div className='menu--head'>
            <span className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </span>
          </div> */}

          <Sidebar animation="overlay" direction="left" vertical visible={sidebar} className="sidebar navbar js--sidebar">
            <Grid className="no-margin background-color-6DA3FC js-side--top">
              <Grid.Row className="text-center no-padding-bottom">
                <Image src='/static/media/escudoAlcaldia.196c7a80.png' style={{ width: "60%", margin: 'auto' }} fluid />
              </Grid.Row>
              <Grid.Row className="text-center">
                <span className="font-family-Montserrat-Regular sidbar--top-txt font-size-12px font-color-FFFFFF">
                  Secretaria de cultura ciudadana
                </span>
              </Grid.Row>
            </Grid>
            <Grid className="no-margin container-menu js--sbar-menu" columns={1}>
              <Grid.Row>
                <span className="pl-2 font-color-632264 sidebar-title-text">Fomento a la cultura</span>
              </Grid.Row>
              {user === "ADMI"
                ? sidebardataAdmin.map((item, index) => {
                  return (
                    <Grid.Row key={index} columns={1}>
                      <Link to={item.path} className=''>
                        <span className="pl-2 font-family-Montserrat-Regular font-size-12px font-color-1B1C1D sidebar-padding">
                          {item.title}
                        </span>
                      </Link>
                    </Grid.Row>
                  );
                })
                : sidebardataUser.map((item, index) => {
                  if (item.href) {
                    return (
                      <Grid.Row key={index} columns={1} className='sidebar--menlink font--menu-item active' >
                        <a style={{ marginLeft: '0%' }} href={item.href} className=" pl-2 font-family-Montserrat-Regular font-size-12px font-color-1B1C1D">
                          {item.title}
                        </a>
                      </Grid.Row>
                    );
                  } else {
                    return (
                      <Grid.Row key={index} columns={1}>
                        <Link to={item.path} className='font--menu-item'>
                          <span className="pl-2 font-family-Montserrat-Regular font-size-12px font-color-1B1C1D sidebar--menu-link">
                            {item.title}
                          </span>
                        </Link>
                      </Grid.Row>
                    );
                  }
                })}
            </Grid>
          </Sidebar>
        </div>
      </IconContext.Provider>
    </>
  );
}

/* export default function UserRouter() {
 return (
   <React.Fragment>
     <div
       style={{
         display: "flex",
         minHeight: "100vh",
         backgroundColor: "#F7FBFF",
       }}
     >
       <div style={{ width: "18.75%" }}>
         <Navbar />
       </div>
       <div style={{ width: "81.25%" }}>
         <Grid className="menu-usuario-principal no-margin">
           <Grid.Row>
             <Grid.Column style={{ display: "flex", justifyContent: "flex-end" }}>
               <span className="font-family-Montserrat-Regular font-size-10px">Hola,</span>
               <span
                 className="font-family-Montserrat-Bold font-size-10px"
                 style={{ marginLeft: "0.2%", marginRight: "1%" }}
               >
                 Luisa María Sanchez Cadavid
               </span>
               <Icon name="bell" className="font-color-FF8900" />
               <span
                 className="font-family-Montserrat-SemiBold font-size-10px font-color-FF8900"
                 style={{ marginLeft: "0", marginRight: "1.5%" }}
               >
                 99+
               </span>
               <Icon name="bars" className="font-color-1FAEEF" size="large" />
             </Grid.Column>
           </Grid.Row>
         </Grid>
       </div>
     </div>
   </React.Fragment>
 );
}  */
