import scriptParser from './script-parser.ts';
import vueParser from './vue-parser.ts';

const builtInParser: Record<builtInI18nParser, I18nParserFunction> = {
  'script-parser': scriptParser,
  'vue-parser': vueParser,
};

export default builtInParser;
