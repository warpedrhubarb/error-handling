import path from 'path';
import errors from 'errno';
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
      return [null, errors.code.ENOENT];
    }
    return [current.getMeta().getStats(), null];
  }

  unlinkSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    if (current.getMeta().isDirectory()) {
      return [null, errors.code.EPERM];
    }
    return [current.getParent().removeChild(current.getKey()), null];
  }

  writeFileSync(filepath, content) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (!parent.getMeta().isDirectory()) {
      return [null, errors.code.ENOTDIR];
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [parent.addChild(base, new File(base, content)), null];
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    if (!current.getMeta().isFile()) {
      return [null, errors.code.EISDIR];
    }
    return [current.getMeta().getBody(), null];
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
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    if (!current.getMeta().isDirectory()) {
      return [null, errors.code.ENOTDIR];
    }
    return [current.getChildren().map((child) => child.getKey()), null];
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (!parent.getMeta().isDirectory()) {
      return [null, errors.code.ENOTDIR];
    }
    return [parent.addChild(base, new File(base, '')), null];
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
