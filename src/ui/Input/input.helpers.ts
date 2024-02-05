export const validateValue = (type: 'text' | 'number', value?: string) => {
  if (!value) {
    return '';
  }

  if (type === 'text') {
    return value;
  }

  return value.replace(/[^0-9]/g, '');
};
