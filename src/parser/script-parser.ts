import * as babelParser from '@babel/parser';
import * as babelTypes from '@babel/types';
import babelTraverser from '@babel/traverse';
import { testString } from '@/utils/ParserUtil.ts';

const scriptParser: I18nParserFunction = (file, fileContent) => {
  try {
    const ast = buildAst(fileContent);
    const messages = traverseAst(ast);
    return {
      file,
      messages,
    };
  } catch (e) {
    throw new Error(`Parse file [${file}] failed: ${e}`);
  }
};

const traverseAst = (ast: babelTypes.Node) => {
  const messages: I18nMessage[] = [];
  babelTraverser.default(ast, {
    StringLiteral(path) {
      const value = path.node.value;
      if (testString(value)) {
        messages.push({
          content: value,
          loc: {
            start: Object.assign({}, path.node.loc?.start),
            end: Object.assign({}, path.node.loc?.end),
          },
        });
      }
    },
    TemplateElement(path) {
      // const { quasis, expressions } = path.node;
      // if (quasis.every((item) => !testString(item.value.raw))) {
      //   return false;
      // }
      // console.log(path);
      // return false;
    },
  });
  return messages;
};

const buildAst = (code: string) => {
  let ast = babelParser.parse(code, {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowUndeclaredExports: true,
    strictMode: false,
    plugins: ['typescript', 'jsx'],
  });
  return ast;
};

export default scriptParser;
