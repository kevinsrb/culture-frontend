import React, { createContext, useState } from "react";

export const MasterContext = createContext("");
export const MasterProvider = (props) => {
  const [masterData, setMasterData] = useState();
  return (
    <MasterContext.Provider value={[masterData, setMasterData]}>
      {props.childern}
    </MasterContext.Provider>
  );
};