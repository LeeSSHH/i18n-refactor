import { getConfig } from '@/config/i18n-config.ts';

const testString = (literal: string) => {
  const config: I18nConfig = getConfig();
  if (config.test instanceof RegExp) {
    return config.test.test(literal);
  } else if (typeof config.test === 'function') {
    return config.test(literal);
  }
  return false;
};

export { testString };
