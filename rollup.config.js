import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
export default {
  // 核心选项
  input: {
    'scanner.cjs': 'src/scanner.ts',
    'scan-cli.cjs': 'src/scan-cli.ts',
  }, // 必须
  output: {
    // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    dir: 'dist',
    entryFileNames: '[name]', // 必须
    format: 'cjs', // 必须
  },
  plugins: [typescript(), clear({ targets: ['./dist'] })],
  external: ['path', 'fs'],
};
