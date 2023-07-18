export const serializeForm = (formNode) => {
  const { elements } = formNode
  const data = {}

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, type } = element
      const value = type === 'checkbox' ? element.checked : element.value
      data[name] = value
    });

  return data
}
export const serializeFormFilter = (formNode) => {
  const { elements } = formNode;
  const data = {};

  const priceRanges = [];
  const priceInputs = Array.from(elements).filter((item) => item.name === 'price');
  priceInputs.forEach((input) => {
    const value = input.dataset.value;
    if (input.checked && value) {
      if (value.includes('price_less_than')) {
        priceRanges.push({ min: 0, max: parseInt(value.split('_')[3]) });
      } else if (value.includes('price_between')) {
        const range = value.split('_');
        priceRanges.push({ min: parseInt(range[2]), max: parseInt(range[3]) });
      }
      if (data.price) {
        data.price.push(value);
      } else {
        data.price = [value];
      }
    }
  });

  const brandInputs = Array.from(elements).filter((item) => item.name === 'brand');
  const selectedBrands = brandInputs
    .filter((input) => input.checked)
    .map((input) => input.dataset.value);

  if (selectedBrands.length > 0) {
    data.brand = selectedBrands;
  }

  Array.from(elements)
    .filter((item) => !!item.name && item.type !== 'checkbox')
    .forEach((element) => {
      data[element.name] = element.value;
    });

  if (priceRanges.length > 0) {
    data.price = priceRanges;
  }

  return data;
};
