import os from "os";
import { InvalidInputError } from "../errors/invalidInputError.js";
import { OperationFailedError } from "../errors/operationFailedError.js";
import { printMessageWithEol } from "../utils/message.js";

export class OsController {
  constructor() {}

  getOsInfo(option) {
    if (!option) {
      throw new InvalidInputError();
    }

    const trimedOption = option.trim();
    try {
      switch (trimedOption) {
        case "--EOL":
          printMessageWithEol(JSON.stringify(os.EOL));
          break;
        case "--cpus":
          printMessageWithEol(`Amount of CPUs: ${os.availableParallelism()}`);
          printMessageWithEol(
            "Speed could show the wrong value on some platforms!"
          );
          os.cpus().forEach((item) =>
            printMessageWithEol(
              ` Model: ${item.model} | Speed: ${item.speed / 1024} GHz`
            )
          );
          break;
        case "--homedir":
          printMessageWithEol(os.homedir());
          break;
        case "--architecture":
          printMessageWithEol(os.arch());
          break;
        case "--username":
          printMessageWithEol(os.userInfo({ encoding: "buffer" }).username);
          break;
        default:
          throw new InvalidInputError();
      }
    } catch (error) {
      if (!error instanceof InvalidInputError) {
        throw new OperationFailedError();
      } else {
        throw error;
      }
    }
  }

  async run(inputValues) {
    this.getOsInfo(inputValues[1]);
  }
}
