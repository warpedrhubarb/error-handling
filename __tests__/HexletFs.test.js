import HexletFs from '../src/HexletFs';

describe('FS', () => {
  let files;

  beforeEach(() => {
    files = new HexletFs();
  });

  it('#mkdirSync', () => {
    files.mkdirSync('/etc');
    expect(files.statSync('/etc').isDirectory()).toBeTruthy();

    files.mkdirSync('/etc/nginx');
    expect(files.statSync('/etc/nginx').isDirectory()).toBeTruthy();
  });

  it('#mkdirSync2', () => {
    files.mkdirSync('/var/');
    expect(files.statSync('/var////').isDirectory()).toBeTruthy();
    expect(files.statSync('/var').isDirectory()).toBeTruthy();

    files.mkdirSync('/var//log//////');
    expect(files.statSync('/var/log').isDirectory()).toBeTruthy();
    expect(files.statSync('/var///log').isDirectory()).toBeTruthy();
  });

  it('#touchSync', () => {
    files.touchSync('/file.txt');
    expect(files.statSync('/file.txt').isFile()).toBeTruthy();

    files.mkdirSync('/etc');
    files.touchSync('/etc/bashrc');
    expect(files.statSync('/etc/bashrc').isFile()).toBeTruthy();
  });
});

// describe('FS1', () => {
//   let files;
//
//   beforeEach(() => {
//     files = new HexletFs();
//     files.mkdirSync('/etc');
//     files.mkdirSync('/opt');
//     files.mkdirSync('/etc/nginx');
//   });
//
//   it('hexletFs', () => {
//     expect(files.mkdirSync('/opt/folder/inner')).toBe(false);
//     expect(files.statSync('/opt').isDirectory()).toBe(true);
//     expect(files.statSync('/etc/unknown')).toBe(null);
//
//     files.touchSync('/opt/file.txt');
//     files.touchSync('/etc/nginx/nginx.conf');
//     expect(files.statSync('/etc/nginx').isDirectory()).toBe(true);
//     expect(files.statSync('/etc/nginx').isFile()).toBe(false);
//     expect(files.statSync('/etc/nginx/nginx.conf').isDirectory()).toBe(false);
//     expect(files.statSync('/etc/nginx/nginx.conf').isFile()).toBe(true);
//     expect(files.mkdirSync('/etc/nginx/nginx.conf/wrong')).toBe(false);
//
//     expect(files.touchSync('/etc/nginx/nginx.conf/wrong')).toBe(false);
//     expect(files.touchSync('/opt/folder/inner')).toBe(false);
//     expect(files.statSync('/opt/file.txt').isFile()).toBe(true);
//
//     files.mkdirpSync('/etc/nginx/conf.d');
//     files.mkdirpSync('/usr/admin/docs');
//     expect(files.readdirSync('/usr/admin/docs')).toEqual([]);
//     expect(files.statSync('/etc/nginx/conf.d').isDirectory()).toBe(true);
//     expect(files.mkdirpSync('/etc/nginx/nginx.conf/wrong')).toBe(false);
//
//     expect(files.readdirSync('/etc/nginx')).toEqual(['nginx.conf', 'conf.d']);
//     expect(files.readdirSync('/')).toEqual(['etc', 'opt', 'usr']);
//     expect(files.readdirSync('/etc/nginx/undefined')).toBe(false);
//     expect(files.readdirSync('/etc/nginx/nginx.conf')).toBe(false);
//
//     files.rmdirSync('/etc/nginx/conf.d');
//     expect(files.readdirSync('/etc/nginx')).toEqual(['nginx.conf']);
//
//     expect(files.rmdirSync('/etc/unknown')).toBe(false);
//     expect(files.rmdirSync('/etc/nginx')).toBe(false);
//
//     expect(files.rmdirSync('/etc/nginx/nginx.conf')).toBe(false);
//
//     files.rmdirSync('/usr/admin/docs');
//     expect(files.readdirSync('/usr/admin/docs')).toBe(false);
//   });
// });

// describe('FS2', () => {
//   let files;
//
//   beforeEach(() => {
//     files = new HexletFs();
//     files.mkdirpSync('/etc');
//     files.mkdirpSync('/opt');
//     files.touchSync('/opt/file.txt');
//     files.mkdirpSync('/etc/nginx/conf.d');
//   });
//
//   it('#writeFileSync', () => {
//     const [data, err] = files.writeFileSync('/etc/unknown/file', 'body');
//     expect(data).toBe(null);
//     expect(err.code).toBe('ENOENT');
//
//     const [data2, err2] = files.writeFileSync('/etc', 'body');
//     expect(data2).toBe(null);
//     expect(err2.code).toBe('EISDIR');
//
//     const [data3, err3] = files.writeFileSync('/opt/file.txt/wrong', 'body');
//     expect(data3).toBe(null);
//     expect(err3.code).toBe('ENOTDIR');
//   });
//
//   it('#readFileSync', () => {
//     files.writeFileSync('/etc/nginx/nginx.conf', 'directives');
//     const [data, err] = files.readFileSync('/etc/nginx/nginx.conf');
//     expect(data).toBe('directives');
//     expect(err).toBe(null);
//
//     const [data2, err2] = files.readFileSync('/etc/nginx');
//     expect(data2).toBe(null);
//     expect(err2.code).toBe('EISDIR');
//
//     const [data3, err3] = files.readFileSync('/etc/unknown');
//     expect(data3).toBe(null);
//     expect(err3.code).toBe('ENOENT');
//   });
//
//   it('#unlinkSync', () => {
//     files.writeFileSync('/etc/nginx/nginx.conf', 'directives');
//     files.unlinkSync('/etc/nginx/nginx.conf');
//     const [data, err] = files.readdirSync('/etc/nginx');
//     expect(err).toBe(null);
//     expect(data).toEqual(['conf.d']);
//
//     const [data2, err2] = files.unlinkSync('/etc/nginx');
//     expect(data2).toBe(null);
//     expect(err2.code).toBe('EPERM');
//
//     const [data3, err3] = files.unlinkSync('/etc/nginx/unexist.file');
//     expect(data3).toBe(null);
//     expect(err3.code).toBe('ENOENT');
//   });
//
//   it('#writeFileSync&readFileSync', () => {
//     const [data, err] = files.writeFileSync('/opt/another-file.txt', 'body');
//     expect(data.getMeta().getName()).toBe('another-file.txt');
//     expect(err).toBe(null);
//     const [data2, err2] = files.readFileSync('/opt/another-file.txt');
//     expect(data2).toBe('body');
//     expect(err2).toBe(null);
//   });
// });

describe('FS3', () => {
  let files;

  beforeEach(() => {
    files = new HexletFs();
    files.mkdirpSync('/etc/nginx');
    files.mkdirpSync('/opt');
    files.touchSync('/opt/file.txt');
    files.mkdirpSync('/etc/nginx/conf.d');
    files.touchSync('/etc/nginx/nginx.conf');
  });

  it('#copySync', () => {
    expect(() => files.copySync('undefined', '/etc'))
      .toThrow(/ENOENT/);

    expect(() => files.copySync('/opt', '/etc')).toThrow(/EISDIR/);

    expect(() => files.copySync('/op/file.txt', '/etc/file.txt/inner'))
      .toThrow(/ENOENT/);

    expect(() => files.copySync('/opt/file.txt', '/etc/undefined/inner'))
      .toThrow(/ENOENT/);

    files.copySync('/opt/file.txt', '/etc');
    expect(files.statSync('/etc/file.txt').isFile()).toBeTruthy();

    files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf');
    expect(files.readFileSync('/etc/nginx/nginx.conf')).toBe('');
  });

  it('#copySync2', () => {
    files.writeFileSync('/opt/file.txt', 'body');
    files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf');
    expect(files.readFileSync('/etc/nginx/nginx.conf')).toBe('body');

    files.copySync('/opt/file.txt', '/etc');
    expect(files.readFileSync('/etc/file.txt')).toBe('body');

    files.copySync('/opt/file.txt', '/opt/newfile');
    expect(files.readFileSync('/opt/newfile')).toBe('body');
  });

  it('#copySync3', () => {
    files.mkdirpSync('/etc/nginx/conf.d');
    files.touchSync('/etc/nginx/nginx.conf');
    files.writeFileSync('/opt/file.txt', 'body');

    expect(() => files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf/testFile'))
      .toThrow(/ENOENT/);
  });
});
