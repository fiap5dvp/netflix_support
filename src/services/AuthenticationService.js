const axios = require("axios");

class AuthenticationService {
  async getUserByToken(token) {
    try {
      const response = await axios({
        url: `${process.env.USER_SERVICE_URL}/api/users`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      return response.data;
    } catch (error) {
      throw {
        service: "User",
        baseUrl: process.env.USER_SERVICE_URL,
        error,
      };
    }
  }
}

module.exports = new AuthenticationService();
