import axios from "../utils/axios";

const mergeArrays = (arr1 = [], arr2 = []) => {
  let res = [];
  res = arr1.map((obj) => {
    const index = arr2.findIndex((el) => el["id"] == obj["id"]);
    const { names } = index !== -1 ? arr2[index] : {};
    return {
      ...obj,
      names,
    };
  });
  return res;
};

export const pokemonApi = {
  getPokemons: () => {
    const url = "/pokemon?limit=200";
    return axios.get(url);
  },

  getPokemonByName: (name) => {
    const url = `/pokemon/${name}`;
    return axios.get(url);
  },

  getPokemonCustom: async () => {
    const response = await pokemonApi.getPokemons();
    const pokemonCommon = response.data.results;
    const urls = pokemonCommon.map((pokemon) => {
      return axios.get(pokemon.url);
    });

    const urlSepecials = pokemonCommon.map((pokemon) => {
      const url = `/pokemon-species/${pokemon.name}`;
      return axios.get(url);
    });
    const allResSpecials = await Promise.all(urlSepecials);
    const pokemonSpecials = allResSpecials.map((res) => ({
      id: res.data.id,
      names: res.data.names,
    }));

    const allRes = await Promise.all(urls);
    const pokemons = allRes.map((res) => ({
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.other["official-artwork"].front_default,
      height: res.data.height,
      weight: res.data.weight,
      stats: {
        hp: res.data.stats.find((stat) => (stat.stat.name = "hp")).base_stat,
        attack: res.data.stats.find((stat) => (stat.stat.name = "attack"))
          .base_stat,
        defense: res.data.stats.find((stat) => (stat.stat.name = "defense"))
          .base_stat,
        speed: res.data.stats.find((stat) => (stat.stat.name = "speed"))
          .base_stat,
      },
    }));

    const newPokemons = mergeArrays(pokemons, pokemonSpecials)
    console.log("newPokemons", newPokemons)
    return newPokemons;
  },
};
