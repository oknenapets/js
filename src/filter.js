import { Item } from "./components/Item/Item.js";
import { serializeFormFilter } from "./utils/serializeForm.js";

const filterForm = document.querySelector('.filter-form');

filterForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const data = serializeFormFilter(event.target)

  const filteredObject = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => Boolean(value))
  );

  updateItemList(filterItems(filteredObject))

})

const filterItems = (filterParams) => {
  const data = JSON.parse(localStorage.getItem('items'))

  const filteredData = data.filter(item => {
    const priceFilter = filterParams.price ? filterParams.price.some(range => {
      const price = parseInt(item.price);
      return price >= range.min && price <= range.max;
    }) : item;

    const brandFilter = Array.isArray(filterParams.brand) ? filterParams.brand.some(brand => item.name.includes(brand)) : item;

    return priceFilter && brandFilter;
  });
  return filteredData;
}

const updateItemList = (items) => {
  const itemList = document.querySelector('.item-list');
  itemList.innerHTML = ''
  items.forEach(item => {
    itemList.appendChild(Item(item).render())
  });
}
