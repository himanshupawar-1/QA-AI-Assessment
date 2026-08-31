const jsonHeaders = {
  accept: "application/json",
  "content-type": "application/json",
};

const authApi = {
  registerEndpoint: "/users/register",
  loginEndpoint: "/users/login",
  meEndpoint: "/users/me",
  jsonHeaders,
  authHeaders(token) {
    return {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    };
  },
};

module.exports = authApi;
