import Stats from './Stats';

export default class Node {
  constructor(name) {
    this.name = name;
    this.stats = new Stats(this.isFile, this.isDirectory);
  }

  getStats() {
    return this.stats;
  }

  getName() {
    return this.name;
  }
}
