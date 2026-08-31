import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
const authApi = require("../../API/pageobjects/authApi");
const cartApi = require("../../API/pageobjects/cartApi");
const productApi = require("../../API/pageobjects/productApi");
const invoiceApi = require("../../API/pageobjects/invoiceApi");
const { buildRegisterPayload } = require("../../API/utilities/testDataFactory");

async function registerLoginAndToken(api) {
  const user = buildRegisterPayload();
  const register = await api.PostResponse(authApi.registerEndpoint, user, authApi.jsonHeaders);
  expect(register.status()).toBe(_Response.postPositive);
  const login = await api.PostResponse(
    authApi.loginEndpoint,
    { email: user.email, password: user.password },
    authApi.jsonHeaders
  );
  expect(login.status()).toBe(_Response.getPositive);
  const token = (await login.json()).access_token;
  return { user, token };
}

test.describe("Toolshop API — products, cart lines, invoice", () => {
  test("TC-API-05 Product catalog and search @smoke", async () => {
    const api = new commonMethods();
    const list = await api.GetResponse(productApi.listEndpoint, authApi.jsonHeaders);
    expect(list.status()).toBe(_Response.getPositive);
    const listBody = await list.json();
    expect(listBody.data.length).toBeGreaterThan(0);
    expect(listBody.data[0].id).toBeTruthy();

    const search = await api.GetResponse(productApi.searchEndpoint("hammer"), authApi.jsonHeaders);
    expect(search.status()).toBe(_Response.getPositive);
    const searchBody = await search.json();
    expect(searchBody.total).toBeGreaterThan(0);
  });

  test("TC-API-06 Add product to cart and verify contents @regression", async () => {
    const api = new commonMethods();
    const { token } = await registerLoginAndToken(api);
    const products = await (await api.GetResponse(productApi.listEndpoint, authApi.jsonHeaders)).json();
    const product = products.data.find((item) => item.in_stock) || products.data[0];

    const cart = await (await api.PostResponse(cartApi.createEndpoint, {}, authApi.authHeaders(token))).json();
    const add = await api.PostResponse(
      cartApi.cartById(cart.id),
      cartApi.addItemPayload(product.id, 2),
      authApi.authHeaders(token)
    );
    expect(add.status()).toBe(_Response.getPositive);

    const cartGet = await api.GetResponse(cartApi.cartById(cart.id), authApi.authHeaders(token));
    expect(cartGet.status()).toBe(_Response.getPositive);
    const cartBody = await cartGet.json();
    expect(cartBody.cart_items[0].product_id).toBe(product.id);
    expect(cartBody.cart_items[0].quantity).toBe(2);
  });

  test("TC-API-07 Generate cash-on-delivery invoice @regression", async () => {
    const api = new commonMethods();
    const { token } = await registerLoginAndToken(api);
    const products = await (await api.GetResponse(productApi.listEndpoint, authApi.jsonHeaders)).json();
    const product = products.data.find((item) => item.in_stock) || products.data[0];
    const cart = await (await api.PostResponse(cartApi.createEndpoint, {}, authApi.authHeaders(token))).json();
    await api.PostResponse(
      cartApi.cartById(cart.id),
      cartApi.addItemPayload(product.id, 1),
      authApi.authHeaders(token)
    );

    const invoice = await api.PostResponse(
      invoiceApi.createEndpoint,
      invoiceApi.invoicePayload(cart.id),
      authApi.authHeaders(token)
    );
    expect(invoice.status()).toBe(_Response.postPositive);
    const body = await invoice.json();
    expect(body.invoice_number).toMatch(/^INV-/);
    expect(body.cart_id === cart.id || body.id).toBeTruthy();
    expect(body.total).toBeGreaterThan(0);

    const list = await api.GetResponse(invoiceApi.listEndpoint, authApi.authHeaders(token));
    expect(list.status()).toBe(_Response.getPositive);
    const invoices = await list.json();
    expect(invoices.data.length).toBeGreaterThan(0);
  });

  test("TC-API-08 Invoices without token are unauthorized @regression", async () => {
    const api = new commonMethods();
    const response = await api.GetResponse(invoiceApi.listEndpoint, authApi.jsonHeaders);
    expect([401, 403]).toContain(response.status());
  });
});
