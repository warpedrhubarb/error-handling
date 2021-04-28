import HexletFs from '../src/HexletFs';

describe('FS', () => {
  let files;

  beforeEach(() => {
    files = new HexletFs();
  });

  it('#mkdirSync', () => {
    expect(!files.isDirectory('/etc')).toBe(true);

    files.mkdirSync('/etc');
    expect(files.isDirectory('/etc')).toBe(true);

    files.mkdirSync('/etc/nginx');
    expect(files.isDirectory('/etc/nginx')).toBe(true);
  });

  it('#mkdirSync2', () => {
    expect(!files.isDirectory('/var//')).toBe(true);

    files.mkdirSync('/var/');
    expect(files.isDirectory('/var////')).toBe(true);
    expect(files.isDirectory('/var')).toBe(true);

    files.mkdirSync('/var//log//////');
    expect(files.isDirectory('/var/log')).toBe(true);
    expect(files.isDirectory('/var///log')).toBe(true);
  });

  it('#mkdirSync3', () => {
    expect(files.isDirectory('/etc/nginx')).toBe(false);

    files.mkdirSync('/etc/nginx');
    expect(files.isDirectory('/etc/nginx')).toBe(false);

    files.mkdirSync('/etc');
    files.mkdirSync('/etc/nginx');
    expect(files.isDirectory('/etc/nginx')).toBe(true);
  });

  it('#mkdirSync4', () => {
    expect(!files.isFile('/file.txt')).toBe(true);

    files.touchSync('/file.txt');
    expect(files.isFile('/file.txt')).toBe(true);

    expect(files.isDirectory('/file.txt/unknown')).toBe(false);

    files.mkdirSync('/file.txt/unknown');
    expect(files.isDirectory('/file.txt/unknown')).toBe(false);
  });

  it('#touchSync', () => {
    expect(files.isFile('/file.txt')).toBe(false);

    files.touchSync('/unknown1/file.txt');
    expect(files.isFile('/unkown1/file.txt')).toBe(false);

    files.touchSync('/file.txt');
    expect(files.isFile('/file.txt')).toBe(true);

    files.mkdirSync('/etc');
    files.touchSync('/etc/bashrc');
    expect(files.isFile('/etc/bashrc')).toBe(true);
  });

  it('#touchSync2', () => {
    expect(!files.isFile('/file.txt')).toBe(true);

    files.touchSync('/file.txt');
    expect(files.isFile('/file.txt')).toBe(true);

    expect(files.isFile('/file.txt/another.txt')).toBe(false);

    files.touchSync('/file.txt/another.txt');
    expect(files.isFile('/file.txt/another.txt')).toBe(false);
  });
});
