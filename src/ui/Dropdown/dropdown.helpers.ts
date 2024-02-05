export const searchFilter = (
  values: Record<string, string> | null,
  search: string,
) => {
  const filteredValues: Record<string, string> | null = values
    ? { ...values }
    : null;

  if (filteredValues && search && search !== '') {
    Object.keys(filteredValues).forEach((key) => {
      const value = filteredValues![key];
      if (!value.includes(search)) {
        delete filteredValues![key];
      }
    });
  }

  return filteredValues;
};
