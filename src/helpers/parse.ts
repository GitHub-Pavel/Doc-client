export const arr2Dropdown = (arr: any[], key: string, value: string) => {
  if (!arr || !arr.length) return null;
  const dropdownList: Record<string, string> = {};
  arr.map((item) => {
    if (item[key] && item[value]) {
      dropdownList[item[key]] = item[value];
    }
  });
  return dropdownList;
};
