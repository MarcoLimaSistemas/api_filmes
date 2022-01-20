"use strict";

const { refreshToken } = require("./refreshToken");
const moment = require("moment");

class RefereshTokenTest {
  constructor(token) {
    this.token = token;
    this.durationSecunds = 86400;
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

module.exports = RefereshTokenTest;
