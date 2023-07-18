import { serializeForm} from '../../utils/serializeForm.js'
import { Checkbox } from "../ui/Checkbox/Checkbox.js"
import { Select } from "../ui/Select/Select.js"
import { prepareData } from "./prepareData.js";
import { Item } from '../Item/Item.js';

import './ItemForm.scss'

const brands = [
  { text: "Apple", value: "Apple" },
  { text: "ASUS", value: "ASUS" },
  { text: "Sony", value: "Sony" },
  { text: "Samsung", value: "Samsung" },
  { text: "Google", value: "Google" },
  { text: "OnePlus", value: "OnePlus" },
  { text: "Huawei", value: "Huawei" },
];

const models = [
  { text: "iPhone 14 Pro", value: "iPhone 14 Pro", brand: 'Apple' },
  { text: "Zenfone 8", value: "Zenfone 8", brand: 'ASUS' },
  { text: "Xperia 5 III", value: "Xperia 5 III", brand: 'Sony' },
  { text: "Pixel 7", value: "Pixel 7", brand: 'Google' },
  { text: "Nord 2", value: "Nord 2", brand: 'OnePlus' },
  { text: "P60 Pro", value: "P60 Pro", brand: 'Huawei' },
  { text: "S10", value: "S10", brand: 'Samsung' },
];

export const ItemForm = ({ initialValue = null, isEdit = false, afterEdit = () => { } }) => {
  const brandSelect = Select({
    className: 'form__select',
    items: brands,
    onChange: onBrandChange,
    name: 'brand',
    value: initialValue ? initialValue.name.split(' ')[0] : '',
    required: true,
  })
  const modelSelect = Select({
    className: 'form__select',
    items: initialValue ? models.filter(item => item.brand === initialValue.name.split(' ')[0]) : models,
    name: 'model',
    value: initialValue ? initialValue.name.split(' ')[1] : '',
    required: true,
  })
  const ref = `${Date.now()}-${Math.random()}`

  function onBrandChange() {
    const brandValue = brandSelect.getValue()
    modelSelect.setItems(models.filter(item => item.brand === brandValue));
  }

  const getMarkup = () => {
    return `<div class="container" data-ref='${ref}'>
              <form id='add-form' class="form" action="/add_item" method="post">
                <div class="form__body">      
                  <label class="form__label" for="price">Цена:</label>
                  <input class='ui-input form__input' type="number" id="price" name="price" value="${initialValue?.price ?? ''}" required>
            
                  <label class="form__label brand">Производитель:</label>
                  <label class="form__label model">Модель:</label>
                    
                  <label class="form__label" for="screen_size">Диагональ экрана:</label>
                  <input class='ui-input form__input' step=".01" type="number" id="screen_size" name="screen_size" value="${initialValue?.diagonal ?? ''}" required>
            
                  <label class="form__label" for="battery_capacity">Емкость аккумулятора:</label>
                  <input class='ui-input form__input' type="number" id="battery_capacity" name="battery_capacity" value="${initialValue?.battery ?? ''}" required>
            
                  <label class="form__label" for="ram_capacity">Объем оперативной памяти (ГБ):</label>
                  <input class='ui-input form__input' type="number" id="ram_capacity" name="ram_capacity" value="${initialValue?.ram ?? ''}" required>
            
                  <label class="form__label" for="mem_capacity">Объем встроенной памяти:</label>
                  <input class='ui-input form__input' type="number" id="mem_capacity" name="mem_capacity" value="${initialValue?.mem ?? ''}" required>
            
                  <label class="form__label" for="screen_resolution">Разрешение экрана:</label>
                  <input class='ui-input form__input' type="text" id="screen_resolution" name="screen_resolution" value="${initialValue?.screen ?? ''}" placeholder="1136x640" pattern="^\\d+x\\d+$"}" required>
              
                  <label class="form__label" for="case_material">Материал корпуса:</label>
                  <div class="form__material">
                    ${Checkbox({ name: 'glass', label: 'Стекло', checked: Boolean(initialValue?.materials[0]) }).getMarkup()}
                    ${Checkbox({ name: 'plastic', label: 'Пластик', checked: Boolean(initialValue?.materials[1]) }).getMarkup()}
                    ${Checkbox({ name: 'aluminum', label: 'Алюминий', checked: Boolean(initialValue?.materials[2]) }).getMarkup()}
                  </div>
                  <button class='ui-button' type="submit" >${isEdit ? "Сохранить" : "Добавить предмет"}</button>
                </div>
              </form>
            </div>`
  }

  const editItem = (items, value) => {
    const item = items.find(({ id }) => id === initialValue?.id)
    const newItem = { ...value, id: item.id }
    const newItems = items.map(element => element.id === item.id ? newItem : element)
    return newItems
  }

  const render = () => {
    const template = document.createElement('template');
    template.innerHTML = getMarkup();

    template.content.querySelector('.brand').appendChild(brandSelect.render())
    template.content.querySelector('.model').appendChild(modelSelect.render())

    template.content.getElementById('add-form').addEventListener('submit', function (event) {
      event.preventDefault();
      const data = prepareData(serializeForm(event.target))

      const items = JSON.parse(localStorage.getItem('items')) ?? []
      const newItems = isEdit ? editItem(items, data) : [...items, data]
      localStorage.setItem('items', JSON.stringify(newItems))

      if (!isEdit) document.querySelector('.item-list').appendChild(Item(data).render())
      if (isEdit && afterEdit) {
        afterEdit(newItems.find(({ id }) => id === initialValue?.id))
      }
    })

    return template.content
  }
  return ({ render })
}