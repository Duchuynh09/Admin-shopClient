import apiService from "./api.service";

export default class Service {
  constructor(baseUrl) {
    this.api = apiService(`/api/${baseUrl}`);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return await this.api.post("/", data).data;
  }
  async getOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  update = async (id) => await this.api.patch(`/${id}`);
}
