export default {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_SELECTED_PRODUCT(state, payload) {
    state.productSelected = payload;
  },
  SET_PRODUCT_INFO(state, payload) {
    state.productInfo = payload;
  }
};
