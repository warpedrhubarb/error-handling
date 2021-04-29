export default class Stats {
  constructor(isFile, isDirectory) {
    this.isFile = isFile;
    this.isDirectory = isDirectory;
  }

  isFile() {
    return this.isFile;
  }

  isDirectory() {
    return this.isDirectory;
  }
}
