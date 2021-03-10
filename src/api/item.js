import axios from "../utils/axios";

export const itemApi = {
  getItems: () => {
    const url = "/item?offset=20&limit=10";
    return axios.get(url);
  },
  
  getItemCustom: async () => {
    const response = await itemApi.getItems();
    const itemCommon = response.data.results;
    const urls = itemCommon.map((item) => {
      return axios.get(item.url);
    });
    
    const allRes = await Promise.all(urls);
    const items = allRes.map((res) => ({
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.default
    }));
    return items;
  },
};
