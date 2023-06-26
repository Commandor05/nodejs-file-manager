import { pathController } from "./pathController.js";
import { fileOperationsMap } from "../config/fileOperationsMap.js";

export class FsController {
  constructor() {}

  async run(inputValues) {
    const [operation, ...params] = inputValues;
    const currentPath = pathController.getCurrentPath();
    const operationsMap = fileOperationsMap;
    const funcArgs = operationsMap[operation].argBuilder.call(
      null,
      currentPath,
      params
    );
    const { source, method } = operationsMap[operation];
    await source[method](...funcArgs);
  }
}
