const Env = use("Env");
const axios = require("axios");
const { getToken } = require("./RefreshJunoToken/Handle");

/**
 * @typedef {Object} Split
 * @property {string} recepientToken
 * @property {number} amount
 * @property {number} percentage
 * @property {boolean} amountRemainder
 * @property {boolean} chargeFee
 **/

/**
 * @typedef {Object} CancelPaymentRequest
 * @property {number} amount
 * @property {Split[]} split
 **/

/**
 * @typedef {Object} Refund
 * @property {string} id
 * @property {string} chargeId
 * @property {string} releaseDate yyyy-MM-dd HH:mm:ss
 * @property {string} paybackDate yyyy-MM-dd HH:mm:ss
 * @property {number} paybackAmount
 * @property {string} status
 **/

/**
 * @typedef {Object} Link
 * @property {string} href
 **/

/**
 * @typedef {Object} LinkSelf
 * @property {Link} self
 **/

/**
 * @typedef {Object} CancelationPaymentResponse
 * @property {string} transactionId
 * @property {number} installments
 * @property {Refund[]} refunds
 * @property {LinkSelf} _links
 **/

module.exports = {
  /**
   * @param {string} idCharge
   * @param {CancelPaymentRequest} data
   * @throws {import('axios').AxiosError}
   * @returns {Promise<void | never>}
   * */
  async cancelPayment(idCharge, data) {
    console.log("cancelando pagamento", idCharge);
    const token = await getToken();

    /** @type {import('axios').AxiosRequestConfig}' } */
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/payments/${idCharge}/refunds`,
      headers: {
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...data,
      },
    };

    /** @type {CancelationPaymentResponse} */
    const response = await axios.request(options);
    return response;
  },
};
