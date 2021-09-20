import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import CreateNotice from "./CreateNotice";
import { Router } from "react-router";

test("renders content", () => {
  const history = createMemoryHistory();
  const route = "/noticias";
  history.push(route);
  const component = render(
    <Router history={history}>
      <CreateNotice />
    </Router>
  );
  component.getByText('Información general')
});
