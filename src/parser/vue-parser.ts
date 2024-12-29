import {
  NodeTypes,
  type Node,
  type ParentNode,
  ElementNode,
  TextNode,
  SourceLocation,
  AttributeNode,
  InterpolationNode,
  DirectiveNode,
} from '@vue/compiler-core';
import { parse, SFCDescriptor, SFCParseResult } from '@vue/compiler-sfc';
import scriptParser from './script-parser.ts';
import { testString } from '@/utils/ParserUtil.ts';

const vueParser: I18nParserFunction = (file, fileContent) => {
  try {
    const { template, script, scriptSetup } = parseSFC(fileContent);
    const templateMessages: I18nMessage[] = traverseTemplateAst(template?.ast);
    const scripteMessages: I18nMessage[] = traverseScriptAst(
      script?.content,
      script?.loc!,
      file
    );
    const scripteSetupMessages: I18nMessage[] = traverseScriptAst(
      scriptSetup?.content,
      scriptSetup?.loc!,
      file
    );
    const messages = [
      ...templateMessages,
      ...scripteMessages,
      ...scripteSetupMessages,
    ];
    return {
      file,
      messages,
    };
  } catch (e) {
    throw new Error(`Parse file [${file}] failed: ${e}`);
  }
};

const parseSFC = (code: string): SFCDescriptor => {
  const ast: SFCParseResult = parse(code);
  return ast.descriptor;
};

const traverseTemplateAst = (ast: Node | undefined) => {
  const stack = [ast];
  const messages: I18nMessage[] = [];
  while (stack.length > 0) {
    let node = stack.pop();
    if (ignore(node)) {
      continue;
    }
    switch (node?.type) {
      case NodeTypes.ELEMENT:
        const elementNode = node as ElementNode;
        stack.push(...elementNode.props);
        break;
      case NodeTypes.ATTRIBUTE: {
        const attrNode = node as AttributeNode;
        const { value } = attrNode;
        if (!value) {
          break;
        }
        const { content, loc } = value;
        visitNode(content, loc);
        break;
      }
      case NodeTypes.INTERPOLATION:
        const interpolationNode = node as InterpolationNode;
        const { content, loc } = interpolationNode;
        if (content.type === NodeTypes.SIMPLE_EXPRESSION) {
          visitNode(content.content, loc);
        }
        break;
      case NodeTypes.DIRECTIVE: {
        const directiveNode = node as DirectiveNode;
        const { exp } = directiveNode;
        if (exp && exp.type === NodeTypes.SIMPLE_EXPRESSION) {
          visitNode(exp.content, exp.loc);
        }
        break;
      }
      case NodeTypes.TEXT: {
        const textNode = node as TextNode;
        const { content, loc } = textNode;
        visitNode(content, loc);
        break;
      }
    }
    if ((node as ParentNode).children?.length) {
      stack.push(...(node as ParentNode).children);
    }
  }
  return messages;
};

const visitNode = (content: string, loc: SourceLocation) => {
  const messages = [];
  if (testString(content)) {
    messages.push({
      content,
      loc: {
        start: {
          line: loc.start.line,
          column: loc.start.column,
          index: loc.start.offset,
        },
        end: {
          line: loc.end.line,
          column: loc.end.column,
          index: loc.end.offset,
        },
      },
    });
  }
  return messages;
};

const traverseScriptAst = (
  scriptContent: string | undefined,
  scriptLoc: SourceLocation,
  file: string
) => {
  if (!scriptContent) {
    return [];
  }
  const messages = [];
  const parseResult = scriptParser(file, scriptContent);
  parseResult.messages.forEach(({ loc }) => {
    const { start, end } = loc;
    // There may be some tags, such as <template>, before <script>.
    // However, the scriptParser is unaware of this.
    // So adjust the position offset accordingly.
    if (start) {
      start.line += scriptLoc.start.line - 1;
      start.index += scriptLoc.start.offset;
    }
    if (end) {
      end.line += scriptLoc.start.line - 1;
      end.index += scriptLoc.start.offset;
    }
  });
  messages.push(...parseResult.messages);
  return messages;
};

const ignore = (node: Node | undefined) => {
  if (!node) {
    return true;
  }
  if (node.type === NodeTypes.COMMENT) {
    return true;
  }
  return false;
};

export default vueParser;
