import Node from './Node';

export default class File extends Node {
  isDirectory() {
    return false;
  }

  isFile() {
    return true;
  }
}
