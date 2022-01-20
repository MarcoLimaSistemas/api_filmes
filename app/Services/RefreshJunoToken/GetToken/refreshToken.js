const axios = require("axios");
const Env = use("Env");

module.exports = {
  async refreshToken() {
    console.log(
      `Basic ${Buffer.from(
        `${Env.get("JUNO_CLIENT")}:${Env.get("JUNO_SECRET")}`,
      ).toString("base64")}`,
    );
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const options = {
      method: "POST",
      url: Env.get("JUNO_URL_AUTH"),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${Env.get("JUNO_CLIENT")}:${Env.get("JUNO_SECRET")}`,
        ).toString("base64")}`,
      },
      data: params,
    };

    try {
      const response = await axios.request(options);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  },
};
