const Env = use('Env')
const axios = require('axios');
const { getToken } = require('./RefreshJunoToken/Handle');

module.exports = {
    async createPayment(chargeId, billing, creditCardId) {
    const token = await getToken()
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/payments`,
      headers: {
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        chargeId,
        billing,
        creditCardDetails: {creditCardId}
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