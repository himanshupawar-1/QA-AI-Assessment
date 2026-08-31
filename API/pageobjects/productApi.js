const productApi = {
  listEndpoint: "/products",
  searchEndpoint(query) {
    return `/products?q=${encodeURIComponent(query)}`;
  },
  productById(id) {
    return `/products/${id}`;
  },
};

module.exports = productApi;
