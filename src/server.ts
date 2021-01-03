import { executeWithFreshModules } from './utils';

export const requireAsIfOnServer = <FileType>(path: string): FileType => {
  return executeWithFreshModules(() => {
    return executeAsIfOnServerSync<FileType>(() => require(path));
  });
};

export const executeAsIfOnServer = async <T>(f: () => T) => {
  const tmpWindow = global.window;
  const tmpDocument = global.document;

  // @ts-ignore
  delete global.window;
  // @ts-ignore
  delete global.document;

  try {
    return await f();
  } finally {
    global.window = tmpWindow;
    global.document = tmpDocument;
  }
};

export const executeAsIfOnServerSync = <T>(f: () => T): T => {
  const tmpWindow = global.window;
  const tmpDocument = global.document;

  // @ts-ignore
  delete global.window;
  // @ts-ignore
  delete global.document;

  try {
    return f();
  } finally {
    global.window = tmpWindow;
    global.document = tmpDocument;
  }
};
