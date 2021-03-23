const getDefaultState = () => {
  return {
    products: [],
    productSelected: "",
    productInfo: null
  };
};
const state = getDefaultState();

export { getDefaultState, state };
