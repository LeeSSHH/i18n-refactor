import { listFiles } from '@/utils/FsUtil';
import { describe, expect } from '@jest/globals';

describe('FsUtil', () => {
  describe('listFiles', () => {
    it('list all js files', () => {
      const result = listFiles('./src', '.ts');
      expect(result.every((item) => item.endsWith('.ts'))).toBeTruthy();
    });
  });
});
