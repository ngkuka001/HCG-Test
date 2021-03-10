import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Pokemon from "../pages/Pokemon/Pokemon";

export const Routers = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/pokemon">
        <Pokemon />
      </Route>
    </Switch>
  );
};
