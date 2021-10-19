import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Home from "./Login";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("renders content", () => {
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  const component = render(
    <Router history={history}>
      <Home />
    </Router>
  );
  console.log(component);
});
