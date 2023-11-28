import { clients, refreshClients } from "../../private/clients.js";

export class App {
  client;

  constructor(config) {
    this.config = config;
    this.findClient();
  }

  async turnOn() {
    if (!this.client) await this.findClient();
    if (!this.client) return;
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
    if (!this.client) await this.findClient();
    if (!this.client) return;
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
    if (!this.client) await this.findClient();
    if (!this.client) return;
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
