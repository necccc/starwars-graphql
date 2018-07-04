const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class StarWarsAPI extends RESTDataSource {

  constructor(...args) {
    super(args)
    this.baseURL = 'https://swapi.co/api/';
  }

  willSendRequest(req) {
    //console.log('will send request');
  }

  async getPersonList(page = 1) {
    return this.get(`people/?page=${page}`);
  }

  async getPerson(id) {
    return this.get(`people/${id}`);
  }

  async getStarshipList(page = 1) {
    return this.get(`starships/?page=${page}`);
  }

  async getStarship(id) {
    return this.get(`starships/${id}`);
  }

  async getVehicleList(page = 1) {
    return this.get(`vehicles/?page=${page}`);
  }

  async getVehicle(id) {
    return this.get(`vehicles/${id}`);
  }

  async getSpeciesList(page = 1) {
    return this.get(`species/?page=${page}`);
  }

  async getSpecies(id) {
    return this.get(`species/${id}`);
  }

  async getPlanetList(page = 1) {
    return this.get(`planets/?page=${page}`);
  }

  async getPlanet(id) {
    return this.get(`planets/${id}`);
  }

}