import axios from "../utils/axios";

export const versionApi = {
  getVersions: () => {
    const url = "/version-group";
    return axios.get(url);
  },

  getVersionCustom: async () => {
    const response = await versionApi.getVersions();
    const versionCommon = response.data.results;
    console.log(versionCommon)
    const urls = versionCommon.map((version) => {
      return axios.get(version.url);
    });
    
    const allRes = await Promise.all(urls);
    const versions = allRes.map((res) => ({
      id: res.data.id,
      name: res.data.name,
      subVersions: res.data.versions
    }));
    return versions;
  },
};
