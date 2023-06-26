import readline from "readline";
import { stdin as input, stdout as output } from "process";
const readLine = readline.createInterface({ input, output });
import { Majordomo } from "./utils/majordomo.js";
import { parseUserNameFromArgs } from "./utils/services.js";
import { printCurrentPath, printMessageWithEol } from "./utils/message.js";
import { appConfig } from "./config/appConfig.js";
import { pathController } from "./fs/pathController.js";
import { AppController } from "./utils/appController.js";
import { OsController } from "./os/osController.js";
import { FsController } from "./fs/fsController.js";
import { InvalidInputError } from "./errors/invalidInputError.js";
import { OperationFailedError } from "./errors/operationFailedError.js";

const userName = parseUserNameFromArgs();
const majordomo = new Majordomo(userName);
const pathOperations = ["up", "cd"];
const osOperations = ["os"];
const osController = new OsController();
const fsOperations = [
  "ls",
  "mv",
  "cat",
  "add",
  "rn",
  "rm",
  "cp",
  "compress",
  "decompress",
  "hash",
];
const fsController = new FsController();

appConfig.addControllerForOperatins(pathController, pathOperations);
appConfig.addControllerForOperatins(osController, osOperations);
appConfig.addControllerForOperatins(fsController, fsOperations);

const appController = new AppController(
  appConfig.getAppControlerConfiguration()
);

majordomo.sayHi();
printCurrentPath(pathController.getCurrentPath());

readLine.on("line", async (input) => {
  let inputValues = input.split(" ");

  try {
    await appController.run(inputValues);
  } catch (error) {
    if (
      error instanceof InvalidInputError ||
      error instanceof OperationFailedError
    ) {
      printMessageWithEol(error.message);
    } else {
      console.log(error);
    }
  } finally {
    printCurrentPath(pathController.getCurrentPath());
  }

  if (inputValues[0] === ".exit") {
    process.exit();
  }
});

process.on("exit", () => majordomo.sayBye());
