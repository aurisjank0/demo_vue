import httpClient from "./httpClient.js";

const baseUrl = process.env.VUE_APP_BACKEND;

const PRODUCTS = "products";
const PRODUCT = "product";
const CALCULATE = "calculate";

const getProducts = () => httpClient.get(`${baseUrl}${PRODUCTS}`);

const getProductInfo = id => httpClient.get(`${baseUrl}${PRODUCT}/${id}`);

const getCalculation = request =>
  httpClient.post(`${baseUrl}${CALCULATE}`, request);

export { getProducts, getProductInfo, getCalculation };
