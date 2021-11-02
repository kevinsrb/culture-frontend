import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

function ItemRenderer(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span className="breadcrumb-participantes-activo no-margin">{route.breadcrumbName}</span> : <Link className="breadcrumb-participantes no-margin" to={paths.join("/")}>{route.breadcrumbName}</Link>;
}

export default function BreadcrumbPaticipantes({ routesComing }) {
  return (
    <>
      <Breadcrumb itemRender={ItemRenderer} routes={routesComing} />
    </>
  );
}
