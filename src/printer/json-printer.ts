import fs from 'fs';
import path from 'path';
const jsonPrinter = (
  parseResultList: I18nParseResult[],
  dir: string,
  fileName: string
) => {
  const jsonContent = JSON.stringify(parseResultList, null, 2);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fileName = path.resolve(dir, fileName);
  fs.writeFileSync(fileName, jsonContent);
};

export default jsonPrinter;
