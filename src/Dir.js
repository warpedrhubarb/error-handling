import Node from './Node';

export default class Dir extends Node {
  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}
