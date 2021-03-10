const asyncType = (type) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
});

const GET_POKEMONS = asyncType("pokemon/GET_POKEMONS");
const CHANGE_LANGUAGE_POKEMON = asyncType("pokemon/CHANGE_LANGUAGE_POKEMON");
const GET_ITEMS = asyncType("item/GET_ITEMS");
const GET_VERSIONS = asyncType("version/GET_VERSIONS");
const GET_GENERATIONS = asyncType("generation/GET_GENERATIONS");

const actionTypes = {
  GET_POKEMONS,
  GET_ITEMS,
  GET_VERSIONS,
  GET_GENERATIONS,
  CHANGE_LANGUAGE_POKEMON
};

export default actionTypes;
