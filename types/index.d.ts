declare interface I18nConfig {
  exclude?: Array<string | RegExp | TestFunction>;
  entry?: Array<string>;
  output?: {
    dir?: string;
    fileName?: string;
    printer: I18nParseResultPrinter | builtInI18nParseResultPrinter;
  }[];
  parser: I18nParserConfig[];
  test?: RegExp | TestFunction;
}

declare interface I18nParserConfig {
  test: string | RegExp | TestFunction;
  use: I18nParser;
}

declare type I18nParser = I18nParserFunction | builtInI18nParser;

declare type builtInI18nParser = 'vue-parser' | 'script-parser';

declare type builtInI18nParseResultPrinter = 'json-printer' | 'console-printer';

declare interface I18nParserFunction {
  (file: string, fileContent: string): I18nParseResult;
}

declare interface TestFunction {
  (content: string): boolean;
}

declare interface Position {
  line: number;
  column: number;
  index: number;
}

declare interface I18nMessage {
  content: string;
  loc: {
    start: Position | undefined;
    end: Position | undefined;
  };
}

declare interface I18nParseResult {
  messages: I18nMessage[];
  file: string;
}

declare interface I18nParseResultPrinter {
  (parseResultList: I18nParseResult[], dir: string, fileName: string): void;
}
