const Env = use("Env");
const axios = require("axios");
module.exports = {
  /**
   *
   * @param {string} idJuno - É o id que voltou no cadastro da fatura
   * @param {string} token - Bearer token
   *
   */
  async getBillingJuno(token, idJuno) {
    const options = {
      method: "GET",
      url: `${Env.get("JUNO_URL_API")}/charges/${idJuno}`,
      headers: {
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
};
