import path from 'path';
import errors from 'errno';
import Tree from './Tree';
import Dir from './Dir';
import File from './File';
import HexletFsError from './HexletFsError.js';

const getPathParts = (filepath) => filepath.split(path.sep).filter((part) => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    return current.getMeta().getStats();
  }

  copySync(src, dest) {
    const srcBody = this.readFileSync(src);
    const destNode = this.findNode(dest);

    if (destNode && destNode.getMeta().getStats().isDirectory()) {
      const { base } = path.parse(src);
      const fullDest = path.join(dest, base);
      return this.writeFileSync(fullDest, srcBody);
    }

    return this.writeFileSync(dest, srcBody);
  }

  unlinkSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EPERM, filepath);
    }
    return current.getParent().removeChild(current.getKey());
  }

  writeFileSync(filepath, content) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || !parent.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    return parent.addChild(base, new File(base, content));
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (!current.getMeta().isFile()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    return current.getMeta().getBody();
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
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (!current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.ENOTDIR, filepath);
    }
    return current.getChildren().map((child) => child.getKey());
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (!parent.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.ENOTDIR, filepath);
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
