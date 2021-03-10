import actionTypes from "../constants";
const initialState = {
  loading: false,
  error: null,
  pokemons: [],
  language: "en",
};

export default function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_POKEMONS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_POKEMONS.SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        pokemons: action.payload,
      };

    case actionTypes.CHANGE_LANGUAGE_POKEMON.REQUEST:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}
