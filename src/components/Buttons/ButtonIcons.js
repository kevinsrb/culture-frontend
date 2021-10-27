import React from "react";
import { Button } from "semantic-ui-react";

export default function ButtonIcon({ iconRender, actionButton }) {
  return <Button className="botones-acciones" icon={iconRender} onClick={actionButton} />;
}
