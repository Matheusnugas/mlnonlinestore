import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/details/:id" component={Details} />
      <Route exact path="/cart" component={Cart} />
    </BrowserRouter>
  );
}

export default App;
