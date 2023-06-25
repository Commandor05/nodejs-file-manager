import readline from "readline";
import { stdin as input, stdout as output } from "process";
const readLine = readline.createInterface({ input, output });
import { Majordomo } from "./utils/majordomo.js";
import { parseUserNameFromArgs } from "./utils/services.js";

const userName = parseUserNameFromArgs();
const majordomo = new Majordomo(userName);

majordomo.sayHi();

readLine.on("line", async (input) => {
  let inputValues = input.split(" ");

  if (inputValues[0] === ".exit") {
    process.exit();
  }
});

process.on("exit", () => majordomo.sayBye());
