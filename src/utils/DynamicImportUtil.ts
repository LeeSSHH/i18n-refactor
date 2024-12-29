import url from 'url';
function dynamicImport(module: string): Promise<I18nConfig> {
  return new Promise((resolve, reject) => {
    let result;
    try {
      result = require(module);
      return resolve(result);
    } catch (error) {
      try {
        import('file://' + module).then((moduleContent: any) => {
          resolve(moduleContent.default);
        });
      } catch (_err) {
        reject(`import ${module} faild`);
      }
    }
  });
}

export { dynamicImport };
