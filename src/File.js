import Node from './Node';

export default class File extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  isDirectory() {
    return false;
  }

  isFile() {
    return true;
  }
}
