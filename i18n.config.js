const config = {
  exclude: ['\\node_modules\\', '\\dist\\', /\.spec\.(js|ts|jsx|tsx)$/],
  entry: ['.'],
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
export default config;
