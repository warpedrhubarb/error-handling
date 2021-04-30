import path from 'path';
import Tree from './Tree';

import Dir from './Dir';
import File from './File';

const getPathParts = (filepath) => filepath.split(path.sep).filter((part) => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const current = this.findNode(filepath);
    if (current) {
      return false;
    }
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || !parent.getMeta().isDirectory()) {
      return false;
    }
    return parent.addChild(base, new Dir(base));
  }

  mkdirpSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      const { dir } = path.parse(filepath);
      this.mkdirpSync(dir);
    } else if (!current.getMeta().isDirectory()) {
      return false;
    }
    return this.mkdirSync(filepath);
  }

  readdirSync(filepath) {
    const current = this.findNode(filepath);
    if (!current || !current.getMeta().isDirectory()) {
      return false;
    }
    return current.getChildren()
      .map((child) => child.getKey());
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || !parent.getMeta().isDirectory()) {
      return false;
    }
    return parent.addChild(base, new File(base, ''));
  }

  rmdirSync(filepath) {
    const { base } = path.parse(filepath);
    const current = this.findNode(filepath);
    if (!current) {
      return false;
    }
    if (!current.getMeta().isDirectory() || current.hasChildren()) {
      return false;
    }
    return current.getParent().removeChild(base);
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
