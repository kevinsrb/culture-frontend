import React from "react";
import { Button } from "semantic-ui-react";

export default function ButtonPrimary({ actionButton, labelButton }) {
    return (
        <Button className="botones-redondos" color="blue" onClick={actionButton} content={labelButton} />
    )
}