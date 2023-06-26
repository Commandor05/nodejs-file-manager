export class InvalidInputError extends Error {
  constructor() {
    super();
    this.message = "Invalid input";
    this.name = "InvalidInputError";
  }
}
