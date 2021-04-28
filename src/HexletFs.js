import path from 'path';
import Tree from '@hexlet/trees';

const getPathParts = (filepath) => filepath.split(path.sep).filter((part) => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const current = this.findNode(dir);
    return current.addChild(base, { type: 'file' });
  }

  isFile(filepath) {
    const node = this.findNode(filepath);
    return Boolean(node) && node.getMeta().type === 'file';
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const parent = this.findNode(dir);
    return parent.addChild(base, { type: 'dir' });
  }

  isDirectory(filepath) {
    const node = this.findNode(filepath);
    return Boolean(node) && node.getMeta().type === 'dir';
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
