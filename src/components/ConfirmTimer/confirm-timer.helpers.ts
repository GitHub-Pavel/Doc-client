export const num2Preview = (number: number) => {
  const numStr = String(number);
  return numStr.length === 1 ? '0' + numStr : numStr;
};
