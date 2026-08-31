const { request } = require("@playwright/test");
const getCurl = require("./requestToCurlLogger");

class commonMethods {
  constructor(apiRequest) {
    this.apiRequest = apiRequest;
    this.baseURL = process.env.API_URL || process.env.URL || "https://api.practicesoftwaretesting.com";
  }

  async _context() {
    if (this.apiRequest) {
      return this.apiRequest;
    }
    return request.newContext({ baseURL: this.baseURL });
  }

  _path(endPoint) {
    if (!endPoint) return "/";
    return endPoint.startsWith("/") ? endPoint : `/${endPoint}`;
  }

  GetResponse = async (endPoint, headers = {}) => {
    const context = await this._context();
    const path = this._path(endPoint);
    const response = await context.get(path.startsWith("http") ? path : `${this.baseURL}${path}`, {
      headers,
    });
    getCurl.logApiRequest("GET", path, headers);
    return response;
  };

  PostResponse = async (endPoint, payload, headers = {}) => {
    const context = await this._context();
    const path = this._path(endPoint);
    const response = await context.post(path.startsWith("http") ? path : `${this.baseURL}${path}`, {
      headers,
      data: payload,
    });
    getCurl.logApiRequest("POST", path, headers, payload);
    return response;
  };

  PutResponse = async (endPoint, headers = {}, payload = {}) => {
    const context = await this._context();
    const path = this._path(endPoint);
    const response = await context.put(path.startsWith("http") ? path : `${this.baseURL}${path}`, {
      headers,
      data: payload,
    });
    getCurl.logApiRequest("PUT", path, headers, payload);
    return response;
  };

  PatchResponse = async (endPoint, headers = {}, payload = {}) => {
    const context = await this._context();
    const path = this._path(endPoint);
    const response = await context.patch(path.startsWith("http") ? path : `${this.baseURL}${path}`, {
      headers,
      data: payload,
    });
    getCurl.logApiRequest("PATCH", path, headers, payload);
    return response;
  };

  DeleteResponse = async (endPoint, headers = {}, payload) => {
    const context = await this._context();
    const path = this._path(endPoint);
    const response = await context.delete(path.startsWith("http") ? path : `${this.baseURL}${path}`, {
      headers,
      data: payload,
    });
    getCurl.logApiRequest("DELETE", path, headers, payload);
    return response;
  };
}

module.exports = { commonMethods };
