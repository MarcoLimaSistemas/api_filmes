"use strict";
const moment = require("moment");
const { refreshToken } = require("./refreshToken");

class RefereshTokenProd {
  constructor(token) {
    this.token = token;
    this.durationSecunds = 3600;
  }

  async getToken(oldDateToken) {
    if (oldDateToken) {
      const isValidToken = moment(oldDateToken)
        .add(this.durationSecunds, "seconds")
        .isAfter(moment());
      if (isValidToken) return this.token;
    }
    return await this.createToken();
  }

  async createToken() {
    return await refreshToken();
  }
}

module.exports = RefereshTokenProd;
