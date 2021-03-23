import axios from "axios";

const httpClient = axios.create({
  timeout: 100000
});
export default httpClient;
