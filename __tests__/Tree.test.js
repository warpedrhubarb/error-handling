import Tree from '../src/Tree';

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = new Tree('/');
    tree.addChild('var')
      .addChild('lib')
      .addChild('run');
    tree.addChild('etc');
    tree.addChild('home');
  });

  it('#hasChildren', () => {
    expect(tree.hasChildren()).toBe(true);
    const emptyTree = new Tree('/');
    expect(emptyTree.hasChildren()).toBe(false);
  });

  it('#hasChild', () => {
    expect(tree.hasChild('/')).toBe(false);
    expect(tree.hasChild('etc')).toBe(true);
  });

  it('#getParent', () => {
    const subtree = tree.getChild('var');
    expect(subtree.getParent()).toEqual(tree);
  });

  it('#getChild', () => {
    const subtree = tree.getChild('var');
    expect(subtree.getKey()).toBe('var');
  });

  it('#getChild undefined', () => {
    const subtree = tree.getChild('undefined');
    expect(subtree).toBeUndefined();
  });

  it('#getDeepChild', () => {
    const subtree = tree.getDeepChild(['var', 'lib']);
    expect(subtree.getKey()).toBe('lib');
    const parent = subtree.getParent();
    expect(parent.getKey()).toBe('var');
  });

  it('#getDeepChild undefined', () => {
    const subtree = tree.getDeepChild(['var', 'lib', 'one', 'two']);
    expect(subtree).toBeUndefined();
    const subtree02 = tree.getDeepChild([]);
    expect(subtree02).toBeUndefined();
  });

  it('#removeChild', () => {
    const subtree = tree.getChild('var');
    expect(subtree.hasChildren()).toBe(true);
    subtree.removeChild('lib');
    expect(subtree.hasChildren()).toBe(false);
  });

  it('#getChildren', () => {
    const dirs = tree.getChildren().map((child) => child.getKey());
    expect(dirs).toEqual(['var', 'etc', 'home']);
  });
});
