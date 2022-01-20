const Env = use("Env");
const axios = require("axios");
const { getToken } = require("./RefreshJunoToken/Handle");
module.exports = {
  async getCharge(idCharge) {
    const token = await getToken();

    const options = {
      method: "GET",
      url: `${Env.get("JUNO_URL_API")}/charges/${idCharge}`,
      headers: {
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(options)
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
};
