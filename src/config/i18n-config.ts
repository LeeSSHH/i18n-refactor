import path from 'path';
import fs from 'fs';
import { dynamicImport } from '@/utils/DynamicImportUtil.ts';
const defaultConfig: I18nConfig = {
  exclude: ['\\node_modules\\', '\\dist\\', /\.spec\.(js|ts|jsx|tsx)$/],
  entry: ['D:\\code\\vue3-laern-1\\src\\components'],
  output: [
    {
      printer: 'console-printer',
    },
    {
      dir: 'i18n-scan-result',
      fileName: 'i18n-scan-result.json',
      printer: 'json-printer',
    },
  ],
  parser: [
    {
      test: /\.vue$/,
      use: 'vue-parser',
    },
    {
      test: /\.(mjs|cjs|js|jsx|ts|tsx)$/,
      use: 'script-parser',
    },
  ],
  test: /[\u4e00-\u9fff]/g,
};
let globalConfig = Object.assign({}, defaultConfig);

export const setConfig = (userConfig: I18nConfig) => {
  globalConfig = Object.assign(globalConfig, userConfig);
};

export const getConfig = () => {
  return globalConfig;
};

export const loadConfig = async () => {
  const configFile = path.resolve('.', 'i18n.config.js');
  if (!fs.existsSync(configFile)) {
    return;
  }
  const configContent = await dynamicImport(configFile);
  setConfig(configContent);
};
