const consolePrinter = (parseResultList: I18nParseResult[]) => {
  const jsonContent = JSON.stringify(parseResultList, null, 2);
  console.log(jsonContent);
};

export default consolePrinter;
