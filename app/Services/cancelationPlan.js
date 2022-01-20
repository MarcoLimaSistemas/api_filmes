const Env = use("Env");
const axios = require("axios");
const Logger = use("Logger");
const { getToken } = require("./RefreshJunoToken/Handle");

/**
 * @typedef {Object} CancelationPlanLink
 * @property {string} href - URL of the cancelation plan
 **/

/**
 * @typedef {Object} CancelationPlanResponse
 * @property {string} id
 * @property {string} createdOn
 * @property {string} dueDay
 * @property {string} status
 * @property {string} startsOn
 * @property {string} nextBillingDate
 * @property {string} startsOn
 * @property {CancelationPlanLink[]} _links
 **/

module.exports = {
  /**
   * @param {string} idSubscribe
   * @throws {import('axios').AxiosError}
   * @returns {Promise<CancelationPlanResponse | never>}
   * */
  async cancelationSubscribe(idSubscribe) {
    const token = await getToken();
    Logger.info(`cancelando inscrição ${idSubscribe}`);

    /** @type {import('axios').AxiosRequestConfig}' } */
    const options = {
      method: "POST",
      url: `${Env.get(
        "JUNO_URL_API",
      )}/subscriptions/${idSubscribe}/cancelation`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
    };

    /** @type {CancelationPlanResponse} */
    const response = await axios.request(options);
    return response;
  },
};
