import { combineReducers } from "redux";
import pokemonState from "./pokemon";
import itemReducer from "./item";
import versionReducer from "./version";
import generationReducer from "./generation";

const rootReducer = combineReducers({
  pokemons: pokemonState,
  items: itemReducer,
  versions: versionReducer,
  generations: generationReducer
});

export default rootReducer;
