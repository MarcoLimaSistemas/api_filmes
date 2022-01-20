"use strict";

const RefereshTokenProd = require("./GetToken/RefreshProd");
const RefereshTokenTest = require("./GetToken/RefreshTeste");
const JunoToken = use("App/Models/JunoToken");
const Env = use("Env");
const Logger = use("Logger");

module.exports = {
  /**
   * @param  {string} token - The string token
   * @param  {moment} oldDataToken - The created data token
   * @return {Promise<string>} The string token
   */
  async getToken() {
    const tokenJuno = await JunoToken.last();
    let token = "";
    const nodeEnv = Env.get("NODE_ENV");
    switch (nodeEnv) {
      case "dev":
        token = await new RefereshTokenTest(
          (tokenJuno && tokenJuno.token) || undefined,
        ).getToken((tokenJuno && tokenJuno.created_at) || undefined);
        break;
      case "production":
        token = await new RefereshTokenProd(
          (tokenJuno && tokenJuno.token) || undefined,
        ).getToken((tokenJuno && tokenJuno.created_at) || undefined);
        break;
      default:
        throw Error("node env não possui um valor válido");
    }
    await JunoToken.findOrCreate({ token });
    Logger.info(`token solicitado ${token}`);
    return token;
  },
};
