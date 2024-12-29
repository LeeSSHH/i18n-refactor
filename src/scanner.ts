import { listFiles } from './utils/FsUtil.ts';
import { getConfig, loadConfig } from './config/i18n-config.ts';
import builtInParser from './parser/index.ts';
import builtPrinter from './printer/index.ts';
import fs from 'fs';

export const scan = async () => {
  await loadConfig();
  const { parser, entry, exclude } = getConfig();
  const parseResultList: I18nParseResult[] = [];
  parser.forEach((parserConfig) => {
    const filesToScan: Array<string> = [];
    const { use, test } = parserConfig;
    entry!.forEach((dir) => {
      filesToScan.push(...listFiles(dir, test, exclude!));
    });
    let parser;
    if (typeof use === 'string' && builtInParser[use]) {
      parser = builtInParser[use];
    } else if (typeof use === 'function') {
      parser = use;
    } else {
      throw new Error(`Invalid parser [${use}]`);
    }
    filesToScan.forEach((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parseResult = parser(filePath, fileContent);
      if (parseResult.messages.length > 0) {
        parseResultList.push(parseResult);
      }
    });
  });
  outputParseResult(parseResultList);
};

const outputParseResult = (parseResultList: I18nParseResult[]) => {
  const { output } = getConfig();
  output?.forEach(({ dir, fileName, printer }) => {
    if (typeof printer === 'string' && builtPrinter[printer]) {
      builtPrinter[printer](parseResultList, dir!, fileName!);
    } else if (typeof printer === 'function') {
      printer(parseResultList, dir!, fileName!);
    } else {
      throw new Error(`Invalid printer [${printer}]`);
    }
  });
};
