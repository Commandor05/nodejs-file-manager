import { homedir } from "os";
import path, { sep } from "path";
import { access } from "fs/promises";
import { InvalidInputError } from "../errors/invalidInputError.js";
import { OperationFailedError } from "../errors/operationFailedError.js";

class PathController {
  currentPath = "";

  constructor() {
    this.currentPath = this.getHomeDirectory();
  }

  getHomeDirectory() {
    return homedir();
  }

  getCurrentPath() {
    return this.currentPath;
  }

  getUpDirectory() {
    const pathArray = this.currentPath.split(sep);
    if (pathArray.length > 1) {
      pathArray.pop();
    }

    this.currentPath = pathArray.join(sep) || sep;

    return this.currentPath;
  }

  isAbsolutePath(path) {
    return path.isAbsolute(path);
  }

  async changeDirectory(currentPath, newPath) {
    if (!newPath) {
      throw new InvalidInputError();
    }
    const isAbsolutePath = path.isAbsolute(newPath);
    let resultPath = path.resolve(newPath);

    try {
      if (!isAbsolutePath) {
        resultPath = path.resolve(currentPath, newPath);
      }

      await access(resultPath);
      return resultPath;
    } catch (e) {
      throw new OperationFailedError();
    }
  }

  async run(inputValues) {
    const currentPath = this.getCurrentPath();
    if (inputValues[0] === "up") {
      this.currentPath = this.getUpDirectory(currentPath);
    } else if (inputValues[0] === "cd") {
      this.currentPath = await this.changeDirectory(
        currentPath,
        inputValues[1]
      );
    }
  }
}

export const pathController = new PathController();
