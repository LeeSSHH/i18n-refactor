import jsonPrinter from './json-printer.ts';
import consolePrinter from './console-printer.ts';

const builtInParser: Record<
  builtInI18nParseResultPrinter,
  I18nParseResultPrinter
> = {
  'json-printer': jsonPrinter,
  'console-printer': consolePrinter,
};

export default builtInParser;
