import { readdir, readFile, writeFile, rename, access, rm } from "fs/promises";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import zlib from "node:zlib";
import path from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { OperationFailedError } from "../errors/operationFailedError.js";
import { printMessageWithEol } from "../utils/message.js";

export class FileOperations {
  async calcHash(targetFilePath) {
    try {
      const fileBuffer = await readFile(targetFilePath, { encoding: "utf8" });
      const hash = createHash("sha256");
      hash.update(fileBuffer);

      const hex = hash.digest("hex");
      printMessageWithEol(hex);
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async list(sourceDirPath) {
    try {
      const files = await readdir(sourceDirPath, { withFileTypes: true });
      const filesList = [];

      function FileListItem(name, type) {
        this.name = name;
        this.type = type;
      }

      for (const file of files) {
        filesList.push(
          new FileListItem(file.name, file.isDirectory() ? "Directory" : "File")
        );
      }

      console.table(filesList);
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async read(targetFilePath) {
    try {
      const fileContent = await readFile(targetFilePath);
      printMessageWithEol(`${fileContent}\n`);
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async createFile(targetFilePath) {
    try {
      await writeFile(targetFilePath, "");
      printMessageWithEol("File was created!");
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async renameFile(sourcePath, destinationPath) {
    try {
      await rename(sourcePath, destinationPath);
      printMessageWithEol("File was renamed");
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async copyFile(sourcePath, destinationPath) {
    const destinationParsedPath = path.parse(destinationPath);
    try {
      await access(sourcePath);
      await access(destinationParsedPath.dir);
      const readStream = createReadStream(sourcePath);
      let writeStream = createWriteStream(destinationPath);
      readStream.pipe(writeStream);
      printMessageWithEol("File was copied");
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  moveFile = async (sourcePath, destinationPath) => {
    const destinationParsedPath = path.parse(destinationPath);
    try {
      await access(sourcePath);
      await access(destinationParsedPath.dir);
      const readStream = createReadStream(sourcePath);
      let writeStream = createWriteStream(destinationPath);
      readStream.pipe(writeStream);
      writeStream.on("finish", async () => {
        await rm(sourcePath);
      });
      printMessageWithEol("File was moved");
    } catch (error) {
      throw new OperationFailedError();
    }
  };

  async removeFile(filePath) {
    try {
      await rm(filePath);
      printMessageWithEol("File was removed");
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async decompress(sourcePath, destinationPath) {
    const destinationParsedPath = path.parse(destinationPath);

    try {
      await access(sourcePath);
      await access(destinationParsedPath.dir);
      const readableSream = createReadStream(sourcePath);
      const writableSream = createWriteStream(destinationPath);
      const brotli = zlib.createBrotliDecompress();

      await pipeline(readableSream, brotli, writableSream);

      printMessageWithEol("File was decompressed");
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async compress(sourcePath, destinationPath) {
    const destinationParsedPath = path.parse(destinationPath);

    try {
      await access(sourcePath);
      await access(destinationParsedPath.dir);
      const readableSream = createReadStream(sourcePath);
      const writableSream = createWriteStream(destinationPath);
      const brotli = zlib.createBrotliCompress();

      await pipeline(readableSream, brotli, writableSream);

      printMessageWithEol("File was compressed");
    } catch (error) {
      throw new OperationFailedError();
    }
  }
}
