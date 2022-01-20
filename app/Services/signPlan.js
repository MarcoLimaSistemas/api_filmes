const axios = require("axios");
const Env = use("Env");
const { getToken } = require("./RefreshJunoToken/Handle");
/**
 *A Address
* @typedef {Object} Address
* @property {string} street - Rua.*
* @property {string} number - Número. Se não houver, envie N/A. *
* @property {string} complement - Complemento. *
* @property {string} neighborhood - Bairro. *
* @property {string} city - Cidade *
* @property {date} state - Estado em sigla de Unidade Federativa (UF). *
* @property {number} postCode - Código de Endereçamento Postal no Brasil (CEP) *
* A billing
* @typedef {Object} Billing
* @property {string} name - Nome do comprador.*
* @property {string} document - CPF ou CNPJ do comprador. Envie sem ponto ou traço. *
* @property {string} email - Email do comprador. *
* @property {Address} address - Endereço. *
* @property {string} phone - Telefone do comprador *
* @property {date} birthDate - Data de nascimento do comprador *
* @property {boolean} notify - Define se o compador receberá emails de notificação diretamente da Juno *
*
* @return {Promise<Object>} The string token

*/
module.exports = {
  /**
   * A hook to hash the user password before saving
   * @param {Billing} billing
   */
  async singPlan(billing, dueDay, planId, chargeDescription, creditCardId) {
    const token = await getToken();
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/subscriptions`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        dueDay,
        planId,
        chargeDescription,
        creditCardDetails: {
          creditCardId,
        },
        billing,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("novo assinatura de plano confirmada", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  },
};
