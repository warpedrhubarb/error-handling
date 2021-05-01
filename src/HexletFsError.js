export default class extends Error {
  constructor({ code, errno, description }, path) {
    super(`${code}: ${description}, ${path}`);

    this.name = this.constructor.name;
    this.stack = (new Error()).stack;
    this.code = code;
    this.errno = errno;
    this.path = path;
  }
}
