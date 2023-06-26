import path from "path";
import { FileOperations } from "../fs/fileOperations.js";
import { InvalidInputError } from "../errors/invalidInputError.js";

const fileOperations = new FileOperations();

function buildSouurcePath(currentPath, params) {
  if (params.length === 0 || !currentPath) {
    throw new InvalidInputError();
  }
  return [path.resolve(currentPath, params[0])];
}

function buildSouurceAndTargetPath(currentPath, params) {
  if (params.length !== 2 || !currentPath) {
    throw new InvalidInputError();
  }

  const sourcePath = path.resolve(currentPath, params[0]);
  const targetPath = path.resolve(currentPath, params[1]);
  return [sourcePath, targetPath];
}

function buildSouurceAndTargetPathByBase(currentPath, params) {
  if (params.length !== 2 || !currentPath) {
    throw new InvalidInputError();
  }
  const sourcePath = path.resolve(currentPath, params[0]);
  const destination = path.resolve(currentPath, params[1]);
  const fileName = path.parse(sourcePath).base;
  const targetPath = path.join(destination, fileName);
  return [sourcePath, targetPath];
}

function getCurrentPath(currentPath, _) {
  if (!currentPath) {
    throw new InvalidInputError();
  }
  return [currentPath];
}

export const fileOperationsMap = {
  hash: {
    source: fileOperations,
    method: "calcHash",
    argBuilder: buildSouurcePath,
  },
  ls: {
    source: fileOperations,
    method: "list",
    argBuilder: getCurrentPath,
  },
  cat: {
    source: fileOperations,
    method: "read",
    argBuilder: buildSouurcePath,
  },
  add: {
    source: fileOperations,
    method: "createFile",
    argBuilder: buildSouurcePath,
  },
  rn: {
    source: fileOperations,
    method: "renameFile",
    argBuilder: buildSouurceAndTargetPath,
  },
  cp: {
    source: fileOperations,
    method: "copyFile",
    argBuilder: buildSouurceAndTargetPathByBase,
  },
  mv: {
    source: fileOperations,
    method: "moveFile",
    argBuilder: buildSouurceAndTargetPathByBase,
  },
  rm: {
    source: fileOperations,
    method: "removeFile",
    argBuilder: buildSouurcePath,
  },
  compress: {
    source: fileOperations,
    method: "compress",
    argBuilder: buildSouurceAndTargetPath,
  },
  decompress: {
    source: fileOperations,
    method: "decompress",
    argBuilder: buildSouurceAndTargetPath,
  },
};
