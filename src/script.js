import './style.scss'
import { Item } from './components/Item/Item.js'
import { ItemForm } from './components/ItemForm/ItemForm.js';
import { Modal } from './components/ui/Modal/Modal';
import './filter.js'

const filterMenu = document.querySelectorAll('.filter-form')

filterMenu.forEach(item => item.addEventListener('click', (event) => {
  const target = event.target;
  const collapseTitle = target.closest('.ui-collapse__title');

  if (collapseTitle) {
    const collapse = collapseTitle.parentNode;
    const arrow = collapseTitle.querySelector('.ui-arrow');

    collapse.classList.toggle('ui-collapse_active');
    arrow.classList.toggle('ui-arrow_active');
  }
}))

let renderedCount = 0;

const loadItems = () => {
  const itemList = document.querySelector('.item-list');
  const items = JSON.parse(localStorage.getItem('items')) ?? [];
  const newItems = items.slice(renderedCount, renderedCount + 3);

  newItems.forEach((item) => {
    itemList.appendChild(Item(item).render());
    renderedCount++;
  });
};

loadItems();

window.addEventListener('scroll', (event) => {
  const target = event.target;
  if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100) {
    loadItems();
  }
});
document.body.appendChild(Modal().render())
document.querySelector('.item-list__button').addEventListener('click', () => modal.update(ItemForm({}).render()))

document.querySelector('.button-delete-all').addEventListener('click', () => {
  document.querySelectorAll('.item__checkbox:checked').forEach(item =>item.closest('.item').remove())
})


// const brandSelect = Select({ className: 'filters__select', items: brands, onChange: onBrandChange, name: 'brand' })
// const modelSelect = Select({ className: 'filters__select', items: models, name: 'model' })

// function onBrandChange() {
//   const brandValue = brandSelect.getValue()
//   modelSelect.setItems(models.filter(item => item.brand === brandValue));
// }

// document.body.appendChild(ItemForm().render());
// document.body.appendChild(brandSelect.render());

