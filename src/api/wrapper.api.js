import httpClient from "./httpClient.js";
import authHeader from "@/service/auth-header";

const baseUrl = process.env.VUE_APP_BACKEND;

const PRODUCTS = "products";
const PRODUCT = "product";
const CALCULATE = "calculate";

const getProducts = () => httpClient.get(`${baseUrl}/${PRODUCTS}`, { headers: authHeader() });

const getProductInfo = id => httpClient.get(`${baseUrl}/${PRODUCT}/${id}`, { headers: authHeader() });

const getCalculation = request =>
  httpClient.post(`${baseUrl}/${CALCULATE}`, request, { headers: authHeader() });



export { getProducts, getProductInfo, getCalculation };
