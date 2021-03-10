import axios from "../utils/axios";

export const generationApi = {
  getGenerations: () => {
    const url = "/generation";
    return axios.get(url);
  },
};
