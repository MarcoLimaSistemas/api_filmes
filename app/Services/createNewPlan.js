const Env = use("Env");
const axios = require("axios");
const Logger = use("Logger");
const { getToken } = require("./RefreshJunoToken/Handle");
module.exports = {
  /**
   * @param {string} professionaName
   * @param {string} amount
   **/
  async createNewPlan(professionaName, amount) {
    const token = await getToken();
    console.log(
      `criando novo plano para ${professionaName} no valor de ${amount}`,
    );
    // const params = new URLSearchParams();
    // params.append();
    // params.append();
    /** @type {import('axios').AxiosRequestConfig} */
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/plans`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: `Mensalidade do plano Seu.net - ${professionaName}`,
        amount: amount,
      },
    };

    const response = await axios.request(options);
    Logger.info(response.data);
    return response.data;
  },
};
