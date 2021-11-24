import React from "react";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/styles.scss";

import { MasterProvider } from "./screens/Components/Context/UserContext";

export const App = () => {
  return (
    <Provider store={store}>
      {/* <MasterProvider> */}
      <AppRouter />
      {/* </MasterProvider> */}
    </Provider>
  );
};
