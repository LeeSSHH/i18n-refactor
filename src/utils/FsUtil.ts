import path from 'path';
import fs from 'fs';

/**
 * Scan all files in the specified directory.
 * @param {string} dir - The directory to scan.
 * @param {string} ext - The specified file extension, must start with `.`, e.g. `.js`, or you can use `RegExp`, e.g. `/\.ts$/` .
 * @returns {Array} A list of files with the specified extension in the given directory.
 */
export const listFiles = (
  dir: string,
  test: string | RegExp | TestFunction,
  exclude?: Array<string | RegExp | TestFunction>
): string[] => {
  if (!fs.existsSync(dir)) {
    throw new Error(`The folder [${dir}] doesn't exists.`);
  }
  const result: string[] = [];
  const stack: string[] = [];
  stack.push(path.resolve(dir));
  while (stack.length > 0) {
    const folder = stack.pop()!;
    fs.readdirSync(folder).forEach((item: string) => {
      item = path.join(folder, item);
      if (needExclude(item, exclude)) {
        return;
      }
      if (fs.statSync(item).isDirectory()) {
        stack.push(item);
      } else {
        const extName = path.extname(item);
        if (typeof test === 'string' && extName === test) {
          result.push(item);
        } else if (test instanceof RegExp && test.test(extName)) {
          result.push(item);
        } else if (typeof test === 'function' && test(extName)) {
          result.push(item);
        }
      }
    });
  }
  return result;
};

const needExclude = (
  filePath: string,
  exclude?: Array<string | RegExp | TestFunction>
): boolean => {
  if (!exclude || exclude.length === 0) {
    return false;
  }
  let result = false;
  for (const regular of exclude) {
    if (typeof regular === 'string') {
      result = result || filePath.includes(regular);
      if (result) {
        break;
      }
    } else if (regular instanceof RegExp) {
      result = result || regular.test(filePath);
      if (result) {
        break;
      }
    } else if (typeof regular === 'function') {
      result = result || !!regular(filePath);
      if (result) {
        break;
      }
    }
  }
  return result;
};
