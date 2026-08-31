const cartApi = {
  createEndpoint: "/carts",
  cartById(cartId) {
    return `/carts/${cartId}`;
  },
  addItemPayload(productId, quantity = 1) {
    return { product_id: productId, quantity };
  },
};

module.exports = cartApi;
