import { EOL } from "os";
import { stdout } from "process";

export function messageWithEol(message) {
  return `${message}${EOL}`;
}

export function printMessageWithEol(message) {
  stdout.write(messageWithEol(message));
}
