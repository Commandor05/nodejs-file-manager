import { InvalidInputError } from "../errors/invalidInputError.js";

export class AppController {
  constructor(configuration) {
    this.configuration = configuration;
  }

  configuration = {};

  async run(inputValues) {
    const commands = Object.keys(this.configuration);

    if (commands.includes(inputValues[0])) {
      await this.configuration[inputValues[0]].run(inputValues);
    } else {
      throw new InvalidInputError();
    }
  }
}
