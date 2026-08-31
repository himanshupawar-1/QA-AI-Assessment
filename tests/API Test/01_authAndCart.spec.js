import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
const authApi = require("../../API/pageobjects/authApi");
const cartApi = require("../../API/pageobjects/cartApi");
const { buildRegisterPayload } = require("../../API/utilities/testDataFactory");
const suiteInfo = require("../../API/utilities/requestToCurlLogger");

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

test.describe("Toolshop API — auth and cart", () => {
  test("TC-API-01 Register a new customer @smoke", async () => {
    const payload = buildRegisterPayload();
    const api = new commonMethods();
    const response = await api.PostResponse(authApi.registerEndpoint, payload, authApi.jsonHeaders);
    expect(response.status()).toBe(_Response.postPositive);
    const body = await response.json();
    expect(body.email).toBe(payload.email);
    expect(body.id).toBeTruthy();
    new storeResponseToJsonFile().storeJsonDataToFile({ id: body.id }, "lastRegisteredUserMeta");
  });

  test("TC-API-02 Login returns bearer token @smoke", async () => {
    const payload = buildRegisterPayload();
    const api = new commonMethods();
    expect((await api.PostResponse(authApi.registerEndpoint, payload, authApi.jsonHeaders)).status()).toBe(
      _Response.postPositive
    );
    const response = await api.PostResponse(
      authApi.loginEndpoint,
      { email: payload.email, password: payload.password },
      authApi.jsonHeaders
    );
    expect(response.status()).toBe(_Response.getPositive);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toBe("bearer");
    new storeResponseToJsonFile().storeJsonDataToFile({ token_type: body.token_type }, "AccessTokenMeta");
  });

  test("TC-API-03 Invalid login is rejected @regression", async () => {
    const payload = buildRegisterPayload();
    const api = new commonMethods();
    expect((await api.PostResponse(authApi.registerEndpoint, payload, authApi.jsonHeaders)).status()).toBe(
      _Response.postPositive
    );
    const response = await api.PostResponse(
      authApi.loginEndpoint,
      { email: payload.email, password: "WrongPass#999" },
      authApi.jsonHeaders
    );
    expect([401, 400]).toContain(response.status());
    const body = await response.json();
    expect(body.error || body.message).toBeTruthy();
  });

  test("TC-API-04 Authenticated user can create a cart @smoke", async () => {
    const payload = buildRegisterPayload();
    const api = new commonMethods();
    expect((await api.PostResponse(authApi.registerEndpoint, payload, authApi.jsonHeaders)).status()).toBe(
      _Response.postPositive
    );
    const login = await api.PostResponse(
      authApi.loginEndpoint,
      { email: payload.email, password: payload.password },
      authApi.jsonHeaders
    );
    const token = (await login.json()).access_token;
    const cart = await api.PostResponse(cartApi.createEndpoint, {}, authApi.authHeaders(token));
    expect(cart.status()).toBe(_Response.postPositive);
    const body = await cart.json();
    expect(body.id).toBeTruthy();
  });
});
