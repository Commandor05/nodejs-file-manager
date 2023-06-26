import { EOL } from "os";
import { stdout } from "process";

export function messageWithEol(message) {
  return `${message}${EOL}`;
}

export function printMessageWithEol(message) {
  stdout.write(messageWithEol(message));
}

export function printCurrentPath(path) {
  const message = `You are currently in ${path}`;
  printMessageWithEol(message);
}
