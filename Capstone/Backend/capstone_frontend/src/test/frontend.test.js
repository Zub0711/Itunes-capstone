import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

// In this test I will be creating a snapshot test for the app.js component
// I start of by using test and set my test message and create a arrow function
// I then assign the varibale const tree and renderer.create to snapshot test my app.js component
test("snapshot test", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
// I then create a unit text for my app component
// use it and set the message to "component renders"

it("Component renders", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // I then use screen.getbytestid to get the id of the component
  const component = screen.getByTestId("componentTest");
  // and I use expect and toBeInTheDocument to conduct the test
  expect(component).toBeInTheDocument();
});
