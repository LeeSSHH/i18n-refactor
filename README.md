# i18n-refactor
Scan all magic strings to assist with the internationalization refactor.

# Installation
```
npm install -g i18n-refactor
```

# Getting started
Run this command, it will read `i18n.config.js` from current directory, and scan all magic strings
```
i18n-scan
```

# Configuration
ES Module style
```javascript
import CustomPrinter from 'xxx';
import CustomParser from 'xxx';

export default {
  // Excludes file paths; supports string, RegExp, or Function.
  exclude: ['\\node_modules\\', '\\dist\\', /\.spec\.(js|ts|jsx|tsx)$/],
  // Scanner entry
  entry: ['./src'],
  // Output config
  output: [
    // Built-in console printer
    {
      printer: 'console-printer',
    },
    // Builti-in JSON printer
    {
      // Output dir
      dir: 'i18n-scan-result',
      // Output file name
      fileName: 'i18n-scan-result.json',
      // Printer name or a printer function
      printer: 'json-printer',
    },
    // Optional, custom printer
    {
      dir: 'i18n-scan-result',
      fileName: 'i18n-scan-result.xlsx',
      printer: CustomPrinter
    }
  ],
  // File parser config
  parser: [
    {
      // Test file name; supports string, RegExp, or Function.
      test: /\.vue$/,
      // Built-in Vue parser
      use: 'vue-parser',
    },
    {
      test: /\.(mjs|cjs|js|jsx)$/,
      // Built-in script parser
      use: 'script-parser',
    },
    {
      test: /\.(ts|tsx)$/,
      // Built-in script parser
      use: CustomParser,
    },
  ],
  // Magic strings test; supports RegExp or Function.
  test: /[\u4e00-\u9fff]/g,
}
```

CommonJS style
```javascript
const CustomPrinter = require('xxx');
const CustomParser = require('xxx');

module.exports = {
  // Excludes file paths; supports string, RegExp, or Function.
  exclude: ['\\node_modules\\', '\\dist\\', /\.spec\.(js|ts|jsx|tsx)$/],
  // Scanner entry
  entry: ['./src'],
  // Output config
  output: [
    // Built-in console printer
    {
      printer: 'console-printer',
    },
    // Builti-in JSON printer
    {
      // Output dir
      dir: 'i18n-scan-result',
      // Output file name
      fileName: 'i18n-scan-result.json',
      // Printer name or a printer function
      printer: 'json-printer',
    },
    // Optional, custom printer
    {
      dir: 'i18n-scan-result',
      fileName: 'i18n-scan-result.xlsx',
      printer: CustomPrinter
    }
  ],
  // File parser config
  parser: [
    {
      // Test file name; supports string, RegExp, or Function.
      test: /\.vue$/,
      // Built-in Vue parser
      use: 'vue-parser',
    },
    {
      test: /\.(mjs|cjs|js|jsx)$/,
      // Built-in script parser
      use: 'script-parser',
    },
    {
      test: /\.(ts|tsx)$/,
      // Built-in script parser
      use: CustomParser,
    },
  ],
  // Magic strings test; supports RegExp or Function.
  test: /[\u4e00-\u9fff]/g,
}
```