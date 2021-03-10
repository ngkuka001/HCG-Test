import actionTypes from "../constants";
import { pokemonApi, itemApi, versionApi, generationApi } from "../../api";

export const getPokemons = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_POKEMONS.REQUEST });
    pokemonApi.getPokemonCustom().then((res) => {
      console.log("check res");
      dispatch({
        type: actionTypes.GET_POKEMONS.SUCCESS,
        payload: res,
      });
    });
  };
};

// Change language name for pokemon
export const changeLanguagePokemon = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_LANGUAGE_POKEMON.REQUEST,
      payload: data,
    });
  };
};

export const getItems = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS.REQUEST });
    itemApi.getItemCustom().then((res) => {
      dispatch({
        type: actionTypes.GET_ITEMS.SUCCESS,
        payload: res,
      });
    });
  };
};

export const getVersions = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_VERSIONS.REQUEST });
    versionApi.getVersionCustom().then((res) => {
      dispatch({
        type: actionTypes.GET_VERSIONS.SUCCESS,
        payload: res,
      });
    });
  };
};

export const getGenerations = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_GENERATIONS.REQUEST });
    generationApi.getGenerations().then((res) => {
      console.log(res);
      dispatch({
        type: actionTypes.GET_GENERATIONS.SUCCESS,
        payload: res.data.results,
      });
    });
  };
};
