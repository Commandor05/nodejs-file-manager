import { printMessageWithEol } from "./message.js";

export class Majordomo {
  constructor(name) {
    this.name = name || "Anonymous user";
  }

  sayHi() {
    const message = `Welcome to the File Manager, ${this.name}!`;
    printMessageWithEol(message);
  }

  sayBye() {
    const message = `Thank you for using File Manager, ${this.name}, goodbye!`;
    printMessageWithEol(message);
  }
}
