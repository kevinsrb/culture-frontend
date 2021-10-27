import React from "react";
import { Select, Icon } from "semantic-ui-react";

export default function SelectMultiple({ options, functiondata, labelName, selectName  }) {
  return (
    <>
      <label className="font-color-4B4B4B font-size-12px">{labelName}</label>
      <Select
        multiple
        className="font-family-Work-Sans"
        icon={<Icon style={{ float: "right", paddingTop:'4%' }} className="font-color-1FAEEF" name="angle down" />}
        placeholder="Seleccionar..."
        options={options}
        onChange={(e, { value }) => functiondata({ e, value, name: `${selectName}` })}
      />
    </>
  );
}
