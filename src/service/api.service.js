import axios from "axios";

const commonConfig = {
  Headers: {
    "Content-Type": "application/json",
  },
};
const createService = (baseURL) => axios.create({ baseURL, ...commonConfig });
export default createService;
