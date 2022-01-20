const axios = require("axios");
const Env = use("Env");
const { getToken } = require("./RefreshJunoToken/Handle");
module.exports = {
  async getCredCardHash(creditCardHash) {
    const token = await getToken();
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/credit-cards/tokenization`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        creditCardHash: creditCardHash,
      },
    };
    console.log("gerando hash id");
    try {
      const response = await axios.request(options);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  },
};
