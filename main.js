import { clients, refreshClients } from "../../private/clients.js";

export class App {
  client;

  constructor(config) {
    this.config = config;
    this.findClient();
  }

  async turnOn() {
    await this.findClient();
    return JSON.parse(
      (
        await this.client.request("http", "request", [
          "GET",
          new URL(this.config.address).origin + "/relay/0?turn=on",
          "",
          "",
        ])
      ).result.response
    ).ison;
  }

  async turnOff() {
    await this.findClient();
    return JSON.parse(
      (
        await this.client.request("http", "request", [
          "GET",
          new URL(this.config.address).origin + "/relay/0?turn=off",
          "",
          "",
        ])
      ).result.response
    ).ison;
  }

  async isOn() {
    await this.findClient();
    return JSON.parse(
      (
        await this.client.request("http", "request", [
          "GET",
          new URL(this.config.address).origin + "/relay/0",
          "",
          "",
        ])
      ).result.response
    ).ison;
  }

  async findClient() {
    await refreshClients();
    if (clients[this.config.client]) this.client = clients[this.config.client];
  }
}
