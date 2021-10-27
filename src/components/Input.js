import React from "react";
import { Input } from "semantic-ui-react";

export default function Inputs({ errorInput, valueInput, handleInputChange, labelName, placeHolder, nameInput }) {
  return (
    <Input
      fluid
      error={errorInput}
      placeholder={placeHolder}
      className="font-color-4B4B4B border-left-1-gray-input"
      label={<label className="font-color-4B4B4B">{labelName}</label>}
      name={nameInput}
      value={valueInput}
      onChange={handleInputChange}
    />
  );
}
